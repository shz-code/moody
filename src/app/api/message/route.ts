import { db } from "@/db";
import { index } from "@/lib/pinecone";
import { sendMessageValidator } from "@/lib/validator";
import { GoogleGenerativeAI, TaskType } from "@google/generative-ai";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { PineconeStore } from "@langchain/pinecone";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) return new Response("Unauthorized", { status: 401 });

  const body = await req.json();

  const { fileId, message } = sendMessageValidator.parse(body);

  const file = await db.file.findFirst({
    where: { id: fileId, userId: user.id },
  });

  if (!file) return new Response("Not Found", { status: 404 });

  // await db.message.create({
  //   data: {
  //     text: message,
  //     isUserMessage: true,
  //     userId: user.id,
  //     fileId,
  //   },
  // });

  // Search vector data
  const embeddings = new GoogleGenerativeAIEmbeddings({
    model: "text-embedding-004", // 768 dimensions
    taskType: TaskType.RETRIEVAL_DOCUMENT,
    title: `${file.name}`,
  });

  const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
    pineconeIndex: index,
    namespace: file.id,
  });

  const results = await vectorStore.similaritySearch(message, 4);

  const chats = await db.message.findMany({
    where: {
      fileId: file.id,
    },
    orderBy: {
      createdAt: "asc",
    },
    take: 6,
  });

  const formattedMessages = chats.map((msg) => ({
    role: msg.isUserMessage ? "user" : "model",
    parts: [{ text: msg.text }],
  }));

  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [
          {
            text: `Use the following pieces of context (or previous conversation if needed) to answer the users question in markdown format. \nIf you don't know the answer, just say that you don't know, don't try to make up an answer.
            \n----------------\n     
            PREVIOUS CONVERSATION:
            ${formattedMessages.map((message) => {
              if (message.role === "user")
                return `User: ${message.parts[0].text}\n`;
              return `Model: ${message.parts[0].text}\n`;
            })}    
            \n----------------\n
            CONTEXT:
            ${results.map((r) => r.pageContent).join("\n\n")}`,
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "Use the following pieces of context (or previous conversation if needed) to answer the users question in markdown format.",
          },
        ],
      },
    ],
  });

  let modelResponse = "";

  const stream = new ReadableStream({
    async start(controller) {
      let result = await chat.sendMessageStream(`${message}`);
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        controller.enqueue(chunkText);
        modelResponse += chunkText;
      }

      // await db.message.create({
      //   data: {
      //     fileId,
      //     userId: user.id,
      //     text: modelResponse,
      //     isUserMessage: false,
      //   },
      // });
      controller.close();
    },
  });

  return new Response(stream);
};

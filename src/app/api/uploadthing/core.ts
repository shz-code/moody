import { db } from "@/db";
import { index } from "@/lib/pinecone";
import { TaskType } from "@google/generative-ai";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { PineconeStore } from "@langchain/pinecone";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  pdfUploader: f({ pdf: { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {
      const { getUser } = getKindeServerSession();
      const user = await getUser();

      if (!user || !user.id) throw new Error("Unauthorized");
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const createdFile = await db.file.create({
        data: {
          key: file.key,
          name: file.name,
          userId: metadata.userId,
          url: file.url,
          uploadStatus: "PROCESSING",
        },
      });
      try {
        const res = await fetch(file.url);

        const blob = await res.blob();

        const loader = new PDFLoader(blob);

        const docs = await loader.load();

        const pageCount = docs.length;

        // Vectorize and index entire document

        const embeddings = new GoogleGenerativeAIEmbeddings({
          model: "text-embedding-004", // 768 dimensions
          taskType: TaskType.RETRIEVAL_DOCUMENT,
          title: `${file.name}`,
        });

        await PineconeStore.fromDocuments(docs, embeddings, {
          pineconeIndex: index,
          namespace: createdFile.id,
        });

        await db.file.update({
          data: {
            uploadStatus: "SUCCESS",
          },
          where: {
            id: createdFile.id,
          },
        });
      } catch (error) {
        await db.file.update({
          data: {
            uploadStatus: "FAILED",
          },
          where: {
            id: createdFile.id,
          },
        });
      }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

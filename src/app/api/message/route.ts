import { db } from "@/db";
import { sendMessageValidator } from "@/lib/validator";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
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

  await db.message.create({
    data: {
      text: message,
      isUserMessage: true,
      userId: user.id,
      fileId,
    },
  });

  //
};

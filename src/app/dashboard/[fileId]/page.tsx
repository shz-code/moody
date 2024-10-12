import { db } from "@/db";
import { authCallbackLink } from "@/lib/utils";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { notFound, redirect } from "next/navigation";
import { FC } from "react";

interface PageProps {
  params: {
    fileId: string;
  };
}

const Page: FC<PageProps> = async ({ params }) => {
  const { fileId } = params;

  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.id) redirect(authCallbackLink(`dashboard/${fileId}`));

  const file = await db.file.findFirst({
    where: { id: fileId, userId: user.id },
  });

  if (!file) notFound();

  return <div>{fileId}</div>;
};
export default Page;

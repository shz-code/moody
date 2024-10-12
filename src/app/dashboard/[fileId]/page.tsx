import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
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

  if (!user || !user.id) redirect(`/auth-callback?origin=dashboard/${fileId}`);

  return <div>{fileId}</div>;
};
export default Page;

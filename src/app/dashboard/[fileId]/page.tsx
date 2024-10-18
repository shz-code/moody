import ChatWrapper from "@/components/ChatWrapper/ChatWrapper";
import { db } from "@/db";
import { authCallbackLink } from "@/lib/utils";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import dynamic from "next/dynamic";
import { notFound, redirect } from "next/navigation";
import { FC } from "react";

const PdfRenderer = dynamic(
  () => import("@/components/PdfRenderer/PdfRenderer"),
  { ssr: false }
);

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

  return (
    <div className="flex-grow">
      <div className="mx-auto w-full max-w-[1400px] lg:flex xl:px-2 h-full">
        {/* Left sidebar & main wrapper */}
        <div className="w-full">
          <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
            {/* Main area */}
            <PdfRenderer url={file.url} />
          </div>
        </div>

        <div className="w-full border-t border-gray-200 lg:w-3/4 lg:border-x lg:border-t-0">
          <ChatWrapper fileId={fileId} />
        </div>
      </div>
    </div>
  );
};
export default Page;

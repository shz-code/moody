"use client";
import { trpc } from "@/app/_trpc/client";
import { ChevronLeft, Loader2, XCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { buttonVariants } from "../ui/button";
import { ChatContextProvider } from "./ChatContext";
import ChatInput from "./ChatInput";
import Messages from "./Messages";

const ChatWrapper = ({ fileId }: { fileId: string }) => {
  const [needFetch, setNeedFetch] = useState<boolean>(false);
  const { data, isLoading } = trpc.getFileUploadStatus.useQuery(
    { fileId },
    {
      retry: needFetch,
      retryDelay: 500,
    }
  );

  useEffect(() => {
    if (!isLoading) {
      if (data?.status != "SUCCESS" && data?.status != "FAILED")
        setNeedFetch(true);
    }
  }, [data, isLoading]);

  if (isLoading)
    return (
      <div className="relative min-h-full bg-zinc-50 flex divide-y divide-zinc-200 flex-col justify-between gap-2">
        <div className="flex-1  flex justify-center items-center flex-col my-28">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin" />
            <h3 className="font-semibold text-cl">Loading...</h3>
            <p className="text-zinc-500 text-sm">
              We&apos;re working on your pdf
            </p>
          </div>
        </div>
      </div>
    );

  if (data?.status === "PROCESSING")
    return (
      <div className="relative min-h-full bg-zinc-50 flex divide-y divide-zinc-200 flex-col justify-between gap-2">
        <div className="flex-1  flex justify-center items-center flex-col my-28">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin" />
            <h3 className="font-semibold text-cl">Processing...</h3>
            <p className="text-zinc-500 text-sm">This won&apos;t take long</p>
          </div>
        </div>
      </div>
    );

  if (data?.status === "FAILED")
    return (
      <div className="relative min-h-full bg-zinc-50 flex divide-y divide-zinc-200 flex-col justify-between gap-2">
        <div className="flex-1  flex justify-center items-center flex-col my-28">
          <div className="flex flex-col items-center gap-2">
            <XCircle className="h-8 w-8 text-red-500" />
            <h3 className="font-semibold text-cl">Too many pages in PDF</h3>
            <p className="text-zinc-500 text-sm">
              Your <span className="font-medium">Free</span> plan supports up to
              5 pages per PDF.
            </p>
            <Link
              href="/dashboard"
              className={buttonVariants({
                variant: "destructive",
                className: "mt-4",
              })}
            >
              <ChevronLeft className="h-3 w-3 mr-1.5" /> Back
            </Link>
          </div>
        </div>
      </div>
    );

  return (
    <div className="relative min-h-full bg-zinc-50 flex divide-y divide-zinc-200 flex-col justify-between gap-2">
      <div className="flex-1 justify-between flex flex-col mb-28">
        <Messages />
      </div>
      <ChatContextProvider fileId={fileId}>
        <ChatInput />
      </ChatContextProvider>
    </div>
  );
};
export default ChatWrapper;

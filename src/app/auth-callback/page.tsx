"use client";
import { useRouter, useSearchParams } from "next/navigation";

import { Loader2 } from "lucide-react";
import { trpc } from "../_trpc/client";

const Page = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const origin = searchParams.get("origin");

  const { data, isLoading, isError, error } =
    trpc.authCallback.useQuery(undefined);

  if (isLoading)
    return (
      <div className="w-full mt-24 flex justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-zinc-800" />
          <h3 className="font-semibold text-xl">Setting up your account...</h3>
          <p>You will be redirected automatically.</p>
        </div>
      </div>
    );

  if (isError) {
    return (
      <div className="w-full mt-24 flex justify-center">
        <div className="flex flex-col items-center gap-2">
          <h3 className="font-semibold text-xl">
            There was an error setting up your account...
          </h3>
          <p>Please login again.</p>
        </div>
      </div>
    );
  }

  // return <div>ok</div>;
  return data?.success && router.push(origin ? `/${origin}` : "/dashboard");
};
export default Page;

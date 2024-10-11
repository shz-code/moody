import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const Home = async () => {
  return (
    <div className="container mb-12 mt-28 sm:mt40 flex flex-col justify-center items-center text-center">
      <div className="mx-auto mb-4 rounded-full border border-gray-200 bg-white px-7 py-2 shadow-md backdrop-blur transition-all hover:border-gray-300 cursor-pointer hover:bg-white/50">
        <p className="text-sm font-semibold text-gray-700">
          Private Beta Release
        </p>
      </div>
      <h1>
        Chat with your <span className="brand-color">documents</span> in
        seconds.
      </h1>
      <p className="mt-5 max-w-prose text-zinc-700 sm:text-lg">
        Quill allows you to have conversations with any PDF document. Simply
        upload your file and start asking questions right away.
      </p>
      <Link
        className={buttonVariants({ size: "lg", className: "mt-5" })}
        href={"/dashboard"}
        target="_blank"
      >
        Get started <ArrowRight className="ml-2 h-5 w-5" />
      </Link>
    </div>
  );
};

export default Home;

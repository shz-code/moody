import { format } from "date-fns";
import { MessageSquare, Plus, Trash } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import UploadButton from "./UploadButton";

const Dashboard = () => {
  return (
    <main className="container">
      <div className="mt-8 flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0">
        <h2>My Files</h2>

        <UploadButton />
      </div>

      {/* display all user files */}
      <ul className="mt-8 grid grid-cols-1 gap-6 divide-y divide-zinc-200 md:grid-cols-2 lg:grid-cols-3">
        <li className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow transition hover:shadow-lg">
          <Link href={`/dashboard/#`} className="flex flex-col gap-2">
            <div className="pt-6 px-6 flex w-full items-center justify-between space-x-6">
              <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-r from-[#ff80b5] to-[#9089fc]" />
              <div className="flex-1 truncate">
                <div className="flex items-center space-x-3">
                  <h3 className="truncate text-lg font-medium text-zinc-900">
                    File Name
                  </h3>
                </div>
              </div>
            </div>
          </Link>

          <div className="px-6 mt-4 grid grid-cols-3 place-items-center py-2 gap-6 text-xs text-zinc-500">
            <div className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              {format(new Date(), "MMM yyyy")}
            </div>

            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              mocked
            </div>

            <Button size="sm" className="w-full" variant="destructive">
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        </li>
      </ul>
    </main>
  );
};
export default Dashboard;

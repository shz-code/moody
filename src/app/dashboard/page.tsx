import Dashboard from "@/components/Dashboard/Dashboard";
import { db } from "@/db";
import { authCallbackLink } from "@/lib/utils";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.id) redirect(authCallbackLink("dashboard"));

  const dbUser = await db.user.findFirst({
    where: {
      id: user.id,
    },
  });

  if (!dbUser) redirect(authCallbackLink("dashboard"));

  return <Dashboard />;
};
export default Page;

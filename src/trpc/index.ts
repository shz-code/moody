import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { TRPCError } from "@trpc/server";
import { privateProcedure, procedure, router } from "./trpc";

export const appRouter = router({
  authCallback: procedure.query(async () => {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user.id || !user.email) throw new TRPCError({ code: "UNAUTHORIZED" });

    // Check if user is in db
    const dbUser = await db.user.findFirst({
      where: {
        id: user.id,
      },
    });

    if (!dbUser)
      await db.user.create({
        data: {
          id: user.id,
          email: user.email,
        },
      });
    return { success: true };
  }),
  getUserFiles: privateProcedure.query(async ({ ctx }) => {
    const { userId } = ctx;
    return await db.file.findMany({
      where: {
        userId,
      },
    });
  }),
});
// export type definition of API
export type AppRouter = typeof appRouter;

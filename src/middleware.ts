import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const middleware = async (request: NextRequest) => {
  const pathname = request.nextUrl.pathname;

  const { getUser } = await getKindeServerSession();
  const user = await getUser();

  const authPages = ["/api/auth/login", "/api/auth/register"];
  const sensitivePages = ["/dashboard", "/auth-callback"];
  const isAuthPage = authPages.some((route) => route === pathname);
  const isSensitivePage = sensitivePages.some((route) =>
    pathname.startsWith(route)
  );

  if (user && isAuthPage)
    return NextResponse.redirect(new URL("/dashboard", request.url));
  else if (!user && isSensitivePage)
    return NextResponse.redirect(new URL("/api/auth/login", request.url));
};

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/dashboard/:path*", "/auth-callback", "/api/auth/:path*"],
};

export default middleware;

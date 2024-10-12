import {
  LoginLink,
  LogoutLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ArrowRight, LogOut } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

const Navbar = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <header className="sticky top-0 z-30 border-b bg-primary-foreground">
      <div className="container py-4 flex justify-between items-center">
        <div className="logo">
          <Link href="/" className="font-bold brand-color text-xl">
            moody.
          </Link>
        </div>
        <div className="flex gap-2">
          <nav className="hidden md:block">
            <ul className="flex">
              <li>
                <Link
                  className={buttonVariants({ variant: "ghost" })}
                  href="/pricing"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  className={buttonVariants({ variant: "ghost" })}
                  href="/faq"
                >
                  FAQ
                </Link>
              </li>
              <li>
                {user ? (
                  <LogoutLink
                    className={buttonVariants({
                      variant: "destructive",
                      className: "hover:bg-red-100",
                    })}
                  >
                    Logout <LogOut className="ml-2 h-5 w-5" />
                  </LogoutLink>
                ) : (
                  <LoginLink className={buttonVariants({ variant: "outline" })}>
                    Sign in
                  </LoginLink>
                )}
              </li>
            </ul>
          </nav>
          {!user && (
            <RegisterLink className={buttonVariants()}>
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </RegisterLink>
          )}
        </div>
      </div>
    </header>
  );
};
export default Navbar;

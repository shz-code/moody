import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

const Navbar = () => {
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
                <LoginLink className={buttonVariants({ variant: "outline" })}>
                  Sign in
                </LoginLink>
              </li>
            </ul>
          </nav>
          <RegisterLink className={buttonVariants()}>
            Get Started <ArrowRight className="ml-2 h-5 w-5" />
          </RegisterLink>
        </div>
      </div>
    </header>
  );
};
export default Navbar;

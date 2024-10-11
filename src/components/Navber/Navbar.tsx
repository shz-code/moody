import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { ArrowRight, FileMusic } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

const Navbar = () => {
  return (
    <header className="container">
      <div className="py-4 flex justify-between items-center">
        <div className="logo">
          <FileMusic className="h-12 w-12 brand-color" />
        </div>
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <Link
              href={"/"}
              legacyBehavior
              passHref
              className="inline-block w-full"
            >
              <NavigationMenuLink className={cn(navigationMenuTriggerStyle())}>
                Home
              </NavigationMenuLink>
            </Link>
            <NavigationMenuItem>
              <NavigationMenuTrigger>About Moody</NavigationMenuTrigger>
              <NavigationMenuContent>
                <Link
                  href={"/"}
                  legacyBehavior
                  passHref
                  className="hover:bg-accent inline-block w-full"
                >
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Developer
                  </NavigationMenuLink>
                </Link>
                <Link
                  href={"/"}
                  legacyBehavior
                  passHref
                  className="hover:bg-accent inline-block w-full"
                >
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Pricing
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <Button>
          Get Started <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};
export default Navbar;

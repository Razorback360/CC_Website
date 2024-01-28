import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UserNav } from "./user-nav";
import { useSession } from "next-auth/react";
import { Icons } from "@/components/icons";
import { useRouter } from "next/router";
import { cn } from "@/lib/utils";

type Props = {
  // ...
};

const SiteHeader = (props: Props) => {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <nav
      className={cn(
        "flex justify-between items-center lg:text-xl md:text-lg px-6 py-2 hover:px-7 bg-background outline outline-2 outline-border hover:outline-none hover:bg-accent",
        "select-none h-fit z-50 transition-all duration-100 shadow-lg fixed inset-x-0 mx-auto w-fit top-4 rounded-lg ",
      )}
    >
      <Icons.logo className="h-16 w-16 cursor-pointer mr-4" />
      <ul
        className={cn(
          "flex flex-row gap-2 flex-shrink-0 items-center text-center justify-end",
          // sideMenuOpen ? "active" : "",
        )}
      >
        <Button variant="link">
          <Link href="...">About Us</Link>
        </Button>
        <Button variant="link">
          <Link href="...">Contact</Link>
        </Button>
        <Button variant="link">
          <Link href="...">Events</Link>
        </Button>
        <Button variant="default">
          <Link href="...">Join Us</Link>
        </Button>
        {!!session?.user && <UserNav />}
      </ul>
    </nav>
  );
};

export default SiteHeader;

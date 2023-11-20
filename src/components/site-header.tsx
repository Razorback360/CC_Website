import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UserNav } from "./user-nav";
import { useSession } from "next-auth/react";
import { Icons } from "@/components/icons";

type Props = {
  // ...
};

const SiteHeader = (props: Props) => {
  const { data: session } = useSession();

  return (
    <nav className="w-full top-0 relative flex flex-row items-center pe-4">
      {/* socials */}
      {/* main nav */}
      <div className="flex flex-row justify-between items-center w-full py-4 px-2 sm:w-2/3 sm:mx-auto">
        {/* <Image
              priority
              quality={100}
              src="/cc-kfupm-logo.svg"
              fill={true}
              sizes="24rem"
              placeholder="empty"
              alt="kfupm campus at its finest"
            /> */}
        <Icons.logo className="w-20" />
        <ul className="flex gap-2 items-center justify-center">
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
        </ul>
      </div>
      {!!session?.user && <UserNav />}
    </nav>
  );
};

export default SiteHeader;

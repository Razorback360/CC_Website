import React from "react";
import { Button } from "@/components/ui/button";
import { Icons } from "./icons";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

type Props = {
  // ...
};

const SiteHeader = (props: Props) => {
  return (
    <nav className="w-full top-0 relative">
      {/* socials */}
      {/* main nav */}
      <div className="flex flex-row justify-between items-center w-full px-2 sm:w-2/3 sm:mx-auto">
        {/* <Image
              priority
              quality={100}
              src="/cc-kfupm-logo.png"
              fill={true}
              sizes="24rem"
              placeholder="empty"
              alt="kfupm campus at its finest"
            /> */}
        <img
          className="w-16 aspect-square"
          src="/cc-kfupm-logo.png"
          placeholder="empty"
          alt="kfupm campus at its finest"
        />
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
    </nav>
  );
};

export default SiteHeader;

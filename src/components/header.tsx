import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Icons } from "./icons";
import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/theme-toggle";
type Props = {
  // ...
};

const SiteHeader = (props: Props) => {
  const [sidebar, setSidebar] = useState(false)
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
        <Image
        width={64}
        height={64}
          className="aspect-square"
          src="/cc-kfupm-logo.png"
          placeholder="empty"
          alt="KFUPMCC Logo"
        />
        <a className="flex md:hidden hover:cursor-pointer" onClick={(e) => {setSidebar(!sidebar)}}>
        <Icons.menu/>
        </a>

        <ul className="gap-2 items-center justify-center hidden md:flex">
        <Button variant="link">
            <Link href="...">Members</Link>
          </Button>
          <Button variant="link">
            <Link href="...">Events</Link>
          </Button>
          <Button variant="link">
            <Link href="...">About Us</Link>
          </Button>
          <Button variant="link">
            <Link href="...">Contact</Link>
          </Button>
          <ThemeToggle/>
          <Button variant="default">
            <Link href="...">Join Us</Link>
          </Button>
        </ul>
      </div>
      <div className={`min-w-full min-h-[50vh] ${sidebar ? "absolute z-50 bg-background overflow-hidden" : "hidden"}`}>
      <ul className="gap-2 items-start justify-center flex flex-col">
        <Button variant="link">
            <Link href="...">Members</Link>
          </Button>
          <Button variant="link">
            <Link href="...">Events</Link>
          </Button>
          <Button variant="link">
            <Link href="...">About Us</Link>
          </Button>
          <Button variant="link">
            <Link href="...">Contact</Link>
          </Button>
          <div className="flex flex-row gap-2 mx-2">
        <ThemeToggle/>
          <Button variant="default">
            <Link href="...">Join Us</Link>
          </Button>
        </div>
        </ul>
      </div>
    </nav>
  );
};

export default SiteHeader;

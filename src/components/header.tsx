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
      <div className="bg-accent border-y border-y-foreground">
        <div className="flex flex-row justify-between w-full sm:w-2/3 sm:mx-auto my-auto">
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
          <ul className="flex gap-2 items-center justify-center pe-8">
            <li className="flex items-center justify-center">
              <Button variant="link" className="text-foreground">
                <Link href="...">Upcoming events</Link>
              </Button>
            </li>
            <li className="flex items-center justify-center">
              <Button variant="link" className="text-foreground">
                <Link href="...">Membership Form</Link>
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default SiteHeader;

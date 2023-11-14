import React from "react";
import { Button } from "@/components/ui/button";
import { Icons } from "../components/ui/icons";
import Link from "next/link";

type Props = {
  // ...
};

const Header = (props: Props) => {
  return (
    <nav className="w-full top-0 relative">
      {/* socials */}
      <div className="bg-blue-600">
        <div className="py-2 flex flex-row justify-between w-full sm:w-2/3 sm:mx-auto">
          <ul className="items-center flex gap-2 h-fit justify-center">
            <li className="flex items-center justify-center  ">
              <Button className="p-2 aspect-square" variant="default">
                <Link href="...">
                  <Icons.linkedin className="fill-white" />
                </Link>
              </Button>
            </li>
            <li className="flex items-center justify-center  ">
              <Button className="p-2 aspect-square" variant="default">
                <Link href="...">
                  <Icons.twitter className="fill-white" />
                </Link>
              </Button>
            </li>
          </ul>

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

      {/* main nav */}
      <div className="bg-accent border-y border-y-foreground">
        <div className="flex flex-row justify-between w-full sm:w-2/3 sm:mx-auto">
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
        </div>
      </div>
    </nav>
  );
};

export default Header;

import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import { api } from "@/utils/api";
import { Button } from "@/components/ui/button";
import { Icons } from "../components/ui/icons";

export default function Home() {
  return (
    <>
      <Head>
        <title>Computer Club - KFUPM</title>
        <meta name="description" content="computer club of kfupm" />
        <link rel="icon" href="/cc-kfupm-logo.ico" />
      </Head>
      <div className="flex min-h-full flex-col items-center justify-center bg-white">
        <nav className="w-full top-0 relative">
          {/* socials */}
          <div className="bg-blue-600">
            <div className="py-2 flex flex-row justify-between w-full sm:w-2/3 sm:mx-auto">
              <ul className="items-center flex gap-2 h-fit justify-center ps-8">
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
                  <Button variant="link" className="text-white">
                    <Link href="...">Upcoming events</Link>
                  </Button>
                </li>
                <li className="flex items-center justify-center">
                  <Button variant="link" className="text-white">
                    <Link href="...">Membership Form</Link>
                  </Button>
                </li>
              </ul>
            </div>
          </div>

          {/* main nav */}
          <div className="bg-white w-full outline outline-slate-300 outline-1">
            <div className="py-2 flex flex-row justify-between w-full sm:w-2/3 sm:mx-auto">
              <div className="w-12 aspect-square">
                <Image
                  priority
                  quality={100}
                  src="/cc-kfupm-logo.png"
                  fill={true}
                  sizes="24rem"
                  placeholder="empty"
                  alt="kfupm campus at its finest"
                />
              </div>
            </div>
          </div>
        </nav>
        {/* hero image */}
        <div className="relative h-96 w-full sm:w-2/3 sm:mx-auto ">
          <Image
            className="sm:rounded-lg"
            priority
            quality={100}
            src="/kfupm-campus-night.jpg"
            fill={true}
            sizes="100vw"
            placeholder="empty"
            objectFit="cover"
            objectPosition="center"
            alt="kfupm campus at its finest"
          />
        </div>
      </div>
    </>
  );
}

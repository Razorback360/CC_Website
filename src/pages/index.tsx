import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import SiteHeader from "@/components/header";

export default function Home() {
  return (
    <>
      <Head>
        <title>Computer Club - KFUPM</title>
        <meta name="description" content="computer club of kfupm" />
        <link rel="icon" href="/cc-kfupm-logo.ico" />
      </Head>
      <div className="flex min-h-full flex-col items-center justify-center bg-">
        <SiteHeader />
        {/* hero image */}
        <img
          className="relative w-full sm:mx-auto  overflow-clip"
          src="/landing-page-hero.jpg"
          alt="kfupm campus at its finest"
        />

        <section className="mt-4 bg-background w-full">
          <Separator className="w-full my-4 fill-secondary" />
        </section>
      </div>
    </>
  );
}

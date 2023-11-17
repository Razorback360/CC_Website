import Head from "next/head";
import Image from "next/image";

import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <>
      <Head>
        <title>Computer Club - KFUPM</title>
        <meta name="description" content="Home of KFUPM's Computer Club" />
      </Head>
      <div>
        {/* hero image */}
        <img
          className="relative w-full sm:mx-auto  overflow-clip"
          src="/landing-page-hero.jpg"
          alt="kfupm campus at its finest"
        />

        <section className="mt-4 w-full">
          <Separator className="w-full my-4" />
        </section>
      </div>
    </>
  );
}

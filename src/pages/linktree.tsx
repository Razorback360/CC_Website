import { Icons } from "@/components/icons";
import { siteConfig } from "@/config/site";
import Head from "next/head";
import React from "react";

// cool blocks with contrasty borders
const iconClasses = "p-4 border-2 border-secondary-foreground rounded-sm";

const Linktree = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Follow KFUPM_CC</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col gap-4 items-center justify-center px-20 text-center">
        <Icons.logo className="mx-auto my-4 w-72" />
        <h1 className="text-3xl font-semibold tracking-tight">@kfupm_cc</h1>
        <h1 className="text-xl ">
          The official accounts for Computer Club at KFUPM
        </h1>
        <div className="flex sm:flex-row items-center justify-center gap-4 px-8 pt-4">
          <a
            href={siteConfig.links.twitter}
            title={siteConfig.links.twitter}
            className={iconClasses}
          >
            <Icons.twitter className="w-12 h-12 text-secondary-foreground" />
          </a>
          <a
            href={siteConfig.links.linkedin}
            title={siteConfig.links.linkedin}
            className={iconClasses}
          >
            <Icons.linkedin className="w-12 h-12 text-secondary-foreground" />
          </a>
          <a
            href={siteConfig.links.github}
            title={siteConfig.links.github}
            className={iconClasses}
          >
            <Icons.gitHub className="w-12 h-12 text-secondary-foreground" />
          </a>
          <a
            href={siteConfig.links.youtube}
            title={siteConfig.links.youtube}
            className={iconClasses}
          >
            <Icons.youtube className="w-12 h-12 text-secondary-foreground" />
          </a>
          <a
            href={siteConfig.links.whatsapp}
            title={siteConfig.links.whatsapp}
            className={iconClasses}
          >
            <Icons.whatsapp className="w-12 h-12 text-secondary-foreground" />
          </a>
        </div>
      </main>
    </div>
  );
};

export default Linktree;

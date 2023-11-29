import { Icons } from "@/components/icons";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import Head from "next/head";
import React from "react";

// cool blocks with contrasty borders
const iconStyles =
  "flex flex-row gap-4 text-xl items-center justify-center font-semibold p-6 w-full sm:p-4 border-2 border-secondary-foreground rounded-md sm:hover:bg-secondary-foreground sm:hover:text-background sm:transition-colors sm:duration-200 sm:ease-in-out";

const Linktree = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Follow KFUPM_CC</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col gap-4 items-center justify-center px-2 sm:px-20 text-center">
        <div
          className={cn(
            "w-[32rem] h-[36rem] absolute items-center justify-center blur-[200px]",
            "bg-[rgb(69,69,228)] bg-gradient-to-br from-[rgba(69,69,228,1)] via-[rgba(125,24,255,1)] to-[rgba(172,24,255,1)] opacity-30",
          )}
          style={{
            borderRadius: "30% 70% 68% 32% / 30% 71% 29% 70% ",
            zIndex: 0,
          }}
        ></div>
        <Icons.logo className="w-52 sm:my-4 sm:w-72" />
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
          @kfupm_cc
        </h1>
        <h1 className="text-xl">
          The official accounts for Computer Club at KFUPM
        </h1>
        <div className="flex flex-col sm:flex-row items-center justify-center container gap-2 sm:gap-4 px-4 sm:px-8 pt-4 z-10">
          <a
            href={siteConfig.links.twitter}
            title={siteConfig.links.twitter}
            className={iconStyles}
            target="_blank"
          >
            <Icons.twitter className="w-8 sm:w-12 h-8 sm:h-12" />
            <div className="mx-auto sm:hidden">Twitter</div>
          </a>
          <a
            href={siteConfig.links.linkedin}
            title={siteConfig.links.linkedin}
            className={iconStyles}
            target="_blank"
          >
            <Icons.linkedin className="w-8 sm:w-12 h-8 sm:h-12" />
            <div className="mx-auto sm:hidden">Linkedin</div>
          </a>
          {/* <a
            href={siteConfig.links.github}
            title={siteConfig.links.github}
            className={iconStyles}
            target="_blank"
          >
            <Icons.gitHub className="w-8 sm:w-12 h-8 sm:h-12" />
            <div className="mx-auto sm:hidden">Github</div>
          </a> */}
          <a
            href={siteConfig.links.youtube}
            title={siteConfig.links.youtube}
            className={iconStyles}
            target="_blank"
          >
            <Icons.youtube className="w-8 sm:w-12 h-8 sm:h-12" />
            <div className="mx-auto sm:hidden">Youtube</div>
          </a>
          <a
            href={siteConfig.links.whatsapp}
            title={siteConfig.links.whatsapp}
            className={iconStyles}
            target="_blank"
          >
            <Icons.whatsapp className="w-8 sm:w-12 h-8 sm:h-12" />
            <div className="mx-auto sm:hidden">Whatsapp</div>
          </a>
        </div>
      </main>
    </div>
  );
};

export default Linktree;

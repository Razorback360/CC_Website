import { Icons } from "@/components/icons";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import Head from "next/head";

// cool blocks with contrasty borders
const iconStyles =
  "flex flex-row gap-4 text-xl sm:aspect-square items-center justify-center font-semibold p-4 w-full sm:p-6 sm:max-w-fit border-2 border-secondary-foreground rounded-md active:bg-secondary-foreground active:text-background sm:hover:bg-secondary-foreground sm:hover:text-background sm:transition-colors sm:duration-200 sm:ease-in-out";

const Linktree = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 transition-all">
      <Head>
        <title>Follow KFUPM_CC</title>
      </Head>

      <main className="flex flex-col gap-4 items-center justify-center px-2 sm:px-20 text-center">
        <div
          className={cn(
            "sm:w-[32rem] sm:h-[36rem] w-full h-[28rem] absolute items-center justify-center blur-[200px]",
            "dark:bg-[rgb(69,69,228)] dark:bg-gradient-to-br dark:from-[rgba(69,69,228,1)] dark:via-[rgba(125,24,255,1)] dark:to-[rgba(172,24,255,1)] dark:opacity-30",
            "bg-[rgb(69,109,228)] bg-gradient-to-br from-[#8f45e4] via-[rgba(44,24,255,1)] to-[rgba(24,125,255,1)] opacity-50",
            "animate-slow-pulse cursor-pointer",
          )}
          style={{
            borderRadius: "30% 70% 68% 32% / 30% 71% 29% 70% ",
            zIndex: 0,
          }}
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        ></div>
        <Icons.logo className="w-44 sm:my-4 sm:w-72" />
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
          @kfupm_cc
        </h1>
        <h1 className="text-xl px-16">
          The official accounts for Computer Club at KFUPM
        </h1>
        <div className="flex flex-col sm:flex-row items-center justify-center container gap-2 sm:gap-4 px-4 sm:px-8 pt-4 z-10">
          <a
            href={siteConfig.links.twitter}
            title={siteConfig.links.twitter}
            className={iconStyles}
            target="_blank"
          >
            <div className="flex flex-row justify-between sm:justify-center items-center w-full h-full">
              <Icons.twitter className="w-8 sm:w-12 h-8 sm:h-12" />
              <div className="self-center w-full absolute inset-x-0 sm:hidden">
                Twitter
              </div>
            </div>
          </a>
          <a
            href={siteConfig.links.linkedin}
            title={siteConfig.links.linkedin}
            className={iconStyles}
            target="_blank"
          >
            <div className="flex flex-row justify-between sm:justify-center items-center w-full h-full">
              <Icons.linkedin className="w-8 sm:w-12 h-8 sm:h-12" />
              <div className="self-center w-full absolute inset-x-0 sm:hidden">
                Linkedin
              </div>
            </div>
          </a>
          {/* <a
            href={siteConfig.links.github}
            title={siteConfig.links.github}
            className={iconStyles}
            target="_blank"
          >
            <div className="flex flex-row justify-between sm:justify-center items-center w-full h-full">
              <Icons.gitHub className="w-8 sm:w-12 h-8 sm:h-12" />
              <div className="self-center w-full absolute inset-x-0 sm:hidden">Github</div>
            </div>
          </a> */}
          <a
            href={siteConfig.links.youtube}
            title={siteConfig.links.youtube}
            className={iconStyles}
            target="_blank"
          >
            <div className="flex flex-row justify-between sm:justify-center items-center w-full h-full">
              <Icons.youtube className="w-8 sm:w-12 h-8 sm:h-12" />
              <div className="self-center w-full absolute inset-x-0 sm:hidden">
                Youtube
              </div>
            </div>
          </a>
          <a
            href={siteConfig.links.whatsapp}
            title={siteConfig.links.whatsapp}
            className={iconStyles}
            target="_blank"
          >
            <div className="flex flex-row justify-between sm:justify-center items-center w-full h-full">
              <Icons.whatsapp className="w-8 sm:w-12 h-8 sm:h-12" />
              <div className="self-center w-full absolute inset-x-0 sm:hidden">
                Whatsapp
              </div>
            </div>
          </a>
          <a
            href={siteConfig.links.telegram}
            title={siteConfig.links.telegram}
            className={iconStyles}
            target="_blank"
          >
            <div className="flex flex-row justify-between sm:justify-center items-center w-full h-full">
              <Icons.telegram className="w-8 sm:w-12 h-8 sm:h-12" />
              <div className="self-center w-full absolute inset-x-0 sm:hidden">
                Telegram
              </div>
            </div>
          </a>
        </div>
      </main>
    </div>
  );
};

export default Linktree;

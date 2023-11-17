import * as React from "react";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { ThemeToggle } from "@/components/theme-toggle";
import { useTheme } from "next-themes";

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  const {theme} = useTheme();
  const fill = theme === "light" ? "#000000" : "#FFFFFF"
  return (
    <footer className={cn(className)}>
      <div className="container flex flex-col items-center justify-between gap-4 mt-10 md:h-24 ">
        <div className="flex items-center gap-4 px-8 flex-row md:gap-2 md:px-0">
          <a href={siteConfig.links.twitter} title={siteConfig.links.twitter}  className="hover:cursor-pointer"> 
          <Icons.twitter fill={fill} href={siteConfig.links.twitter} title={siteConfig.links.twitter}  className="hover:cursor-pointer"/>
          </a>
          <a href={siteConfig.links.linkedin} title={siteConfig.links.linkedin}  className="hover:cursor-pointer"> 
          <Icons.linkedin fill={fill} href={siteConfig.links.linkedin} className="hover:cursor-pointer"/>
          </a>
          <a href={siteConfig.links.github} title={siteConfig.links.github}  className="hover:cursor-pointer"> 
          <Icons.gitHub fill={fill} href={siteConfig.links.youtube} className="hover:cursor-pointer"/>
          </a>
          <a href={siteConfig.links.youtube} title={siteConfig.links.youtube}  className="hover:cursor-pointer"> 
          <Icons.youtube href={siteConfig.links.youtube} className="hover:cursor-pointer"/>
          </a>
          <a href={siteConfig.links.whatsapp} title={siteConfig.links.whatsapp}  className="hover:cursor-pointer"> 
          <Icons.whatsapp href={siteConfig.links.whatsapp} className="hover:cursor-pointer"/>
          </a>
          <a href={siteConfig.links.email} title={siteConfig.links.email}  className="hover:cursor-pointer"> 
          <Icons.email href={siteConfig.links} className="hover:cursor-pointer"/>
          </a>
        </div>
        <div className="flex items-center gap-4 px-8 flex-row md:gap-2 md:px-0">
        <p className="text-center text-sm leading-loose md:text-left">
            Built using{" "}
            <a
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              shadcn
            </a>
            . Hosted on{" "}
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Vercel
            </a>
            . The source code is available on{" "}
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}

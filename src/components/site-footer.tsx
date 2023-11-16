import * as React from "react";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { ThemeToggle } from "@/components/theme-toggle";
import { useRouter } from "next/router";

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  const router = useRouter();
  return (
    <footer className={cn(className)}>
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24  md:py-0">
        {/* already a member section with a signin button */}
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose md:text-left">
            Already a member?{" "}
            <a
              onClick={async () => await router.push("/auth/login")}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Sign in
            </a>
          </p>
        </div>
        <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <Icons.logo />
            <p className="text-center text-sm leading-loose md:text-left">
              Built by{" "}
              <a
                href={siteConfig.links.twitter}
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
              . Illustrations by{" "}
              <a
                href="https://popsy.co"
                target="_blank"
                rel="noreferrer"
                className="font-medium underline underline-offset-4"
              >
                Popsy
              </a>
              . The source code is available on{" "}
              <a
                href={siteConfig.links.youtube}
                target="_blank"
                rel="noreferrer"
                className="font-medium underline underline-offset-4"
              >
                GitHub
              </a>
              .
            </p>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
}

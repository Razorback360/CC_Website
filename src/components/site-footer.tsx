import * as React from "react";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { ThemeToggle } from "@/components/theme-toggle";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { LocaleSwitcher } from "@/components/core/locale_switcher";
import { Separator } from "@/components/ui/separator";

function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  const router = useRouter();
  return (
    <footer
      className={cn(
        className,
        "flex flex-col items-center justify-between py-2 gap-4 h-fit w-full",
      )}
    >
      <div className="flex flex-row pt-4 px-8 w-full justify-between">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0 md:h-fit">
          <ThemeToggle />
          <Separator orientation="vertical" />
          <LocaleSwitcher />
        </div>
        <div className="flex items-center justify-center gap-4 px-8 flex-row md:gap-2 md:px-0">
          <a
            href={siteConfig.links.twitter}
            title={siteConfig.links.twitter}
            className="flex items-center hover:cursor-pointer fill-secondary-foreground hover:bg-stone-200 rounded p-2"
          >
            <p>Twitter</p>
            <Icons.twitter
              title={siteConfig.links.twitter}
              className="hover:cursor-pointer  ml-4"
            />
          </a>
          <a
            href={siteConfig.links.linkedin}
            title={siteConfig.links.linkedin}
            className="flex items-center hover:cursor-pointer fill-secondary-foreground hover:bg-stone-200 rounded p-2"
          >
            <p>Linkedin</p>
            <Icons.linkedin className="hover:cursor-pointer  ml-4" />
          </a>
          <a
            href={siteConfig.links.github}
            title={siteConfig.links.github}
            className="flex items-center hover:cursor-pointer fill-secondary-foreground hover:bg-stone-200 rounded p-2"
          >
            <p>Github</p>
            <Icons.gitHub className="hover:cursor-pointer  ml-4" />
          </a>
          <a
            href={siteConfig.links.youtube}
            title={siteConfig.links.youtube}
            className="flex items-center hover:cursor-pointer fill-secondary-foreground hover:bg-stone-200 rounded p-2"
          >
            <p>Youtube</p>
            <Icons.youtube className="hover:cursor-pointer  ml-4" />
          </a>
          <a
            href={siteConfig.links.whatsapp}
            title={siteConfig.links.whatsapp}
            className="flex items-center hover:cursor-pointer fill-secondary-foreground hover:bg-stone-200 rounded p-2"
          >
            <p>Whatsapp</p>
            <Icons.whatsapp className="hover:cursor-pointer  ml-4" />
          </a>
          <a
            href={siteConfig.links.email}
            title={siteConfig.links.email}
            className="flex items-center hover:cursor-pointer fill-secondary-foreground hover:bg-stone-200 rounded p-2"
          >
            <p>Email</p>
            <Icons.email className="hover:cursor-pointer ml-4" />
          </a>
        </div>
      </div>

      <div className="flex flex-row items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
        <Icons.logo className="w-16" />
        <p className="text-center text-sm leading-loose md:text-left">
          Built by{" "}
          <a
            href={siteConfig.links.twitter}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            CC KFUPM
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
        <p className="text-center text-sm leading-loose md:text-left">
          Already a member?{" "}
          <Button
            onClick={async () => await router.push("/auth/login")}
            variant="link"
            rel="noreferrer"
            className="font-medium underline underline-offset-4 px-1"
          >
            Sign in
          </Button>
        </p>
      </div>
    </footer>
  );
}

export default SiteFooter;

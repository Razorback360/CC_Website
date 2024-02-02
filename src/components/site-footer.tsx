import React from "react";

import { Icons } from "@/components/icons";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/config/site";
import { cn, handleLocaleChange } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/router";

function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  const socialLinks = siteConfig.links;
  return (
    <footer
      className={cn(
        className,
        "flex md:flex-row items-center justify-between md:gap-4 h-fit w-full md:px-32 md:py-10",
        "flex-col gap-8 px-6 py-6",
      )}
    >
      <div className="flex flex-row items-center gap-4 md:flex-row md:gap-2">
        <Icons.logo className="w-16 md:me-4" />
        <p className="text-center md:text-base text-sm leading-none md:text-start">
          © {new Date().getFullYear()} KFUPM Computer Club - All rights
          reserved
        </p>
      </div>
      <div className="flex items-center justify-center flex-row flex-wrap gap-1 md:gap-2">
        <ThemeToggle />
        <LanguageToggle />
        <Separator orientation="vertical" asChild>
          <>|</>
        </Separator>
        <FooterSocialLink
          href={socialLinks.twitter}
          title={socialLinks.twitter}
        >
          <Icons.twitter title={socialLinks.twitter} />
        </FooterSocialLink>
        <FooterSocialLink
          href={socialLinks.linkedin}
          title={socialLinks.linkedin}
        >
          <Icons.linkedin />
        </FooterSocialLink>
        {/* <FooterSocialLink
            href={socialLinks.github}
            title={socialLinks.github}
          >
            <Icons.gitHub />
          </FooterSocialLink> */}
        <FooterSocialLink
          href={socialLinks.youtube}
          title={socialLinks.youtube}
        >
          <Icons.youtube />
        </FooterSocialLink>
        <FooterSocialLink
          href={socialLinks.whatsapp}
          title={socialLinks.whatsapp}
        >
          <Icons.whatsapp />
        </FooterSocialLink>
        <FooterSocialLink
          href={socialLinks.telegram}
          title={socialLinks.telegram}
        >
          <Icons.telegram />
        </FooterSocialLink>
        {/* <FooterSocialLink href={socialLinks.email} title={socialLinks.email}>
            <Icons.email />
          </FooterSocialLink> */}
      </div>
    </footer>
  );
}

export default SiteFooter;

type FooterSocialLinkProps = {
  href: string;
  title: string;
  children: React.ReactNode;
};

const FooterSocialLink = ({ href, title, children }: FooterSocialLinkProps) => {
  return (
    <Button className="text-xl" variant="outline" size="icon" asChild>
      <Link target="_blank" rel="noopener noreferrer" href={href} title={title}>
        {children}
      </Link>
    </Button>
  );
};

const LanguageToggle = () => {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="flex flex-col gap-0 text-xl"
          variant="outline"
          size="icon"
          onClick={async () =>
            await handleLocaleChange(
              router,
              router.locale === "en" ? "ar" : "en",
            )
          }
        >
          <Icons.languages />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent>
          <DropdownMenuItem
            // eslint-disable-next-line @typescript-eslint/no-misused-promises, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
            onClick={async () => await handleLocaleChange(router, "ar")}
          >
            {router.locale === "ar" && <Icons.check className="me-2 h-4 w-4" />}
            العربية
          </DropdownMenuItem>
          <DropdownMenuItem
            // eslint-disable-next-line @typescript-eslint/no-misused-promises, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
            onClick={async () => await handleLocaleChange(router, "en")}
          >
            {router.locale === "en" && <Icons.check className="me-2 h-4 w-4" />}
            English
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
};

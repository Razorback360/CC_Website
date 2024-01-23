import React, { useEffect } from "react";
import SiteHeader from "./site-header";
import SiteFooter from "./site-footer";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/router";
import { HeaderFooterExclusionRoutes } from "@/config/site";
import SignoutPopup from "@/components/popups/SignoutPopup";
import { Toaster } from "./ui/toaster";

type Props = {
  children: React.ReactNode;
};

const AppLayout = ({ children, ...props }: Props) => {
  const { pathname, locale } = useRouter();

  useEffect(() => {
    if (locale === "ar") {
      document.body.setAttribute("dir", "rtl");
    } else {
      document.body.setAttribute("dir", "ltr");
    }
  }, [locale]);

  return (
    <div className="flex min-h-full flex-col items-center justify-center">
      <SignoutPopup>
        {/* exclude header and footer from specified list of pages */}
        {!HeaderFooterExclusionRoutes.includes(pathname) && <SiteHeader />}
        {!HeaderFooterExclusionRoutes.includes(pathname) && (
          <Separator className="w-full" />
        )}
        {children}
        <Toaster />
        {!HeaderFooterExclusionRoutes.includes(pathname) && (
          <section className="mt-4 w-full">
            <Separator className="w-full my-4" />
          </section>
        )}
        {!HeaderFooterExclusionRoutes.includes(pathname) && (
          <SiteFooter className="mb-10" />
        )}
      </SignoutPopup>
    </div>
  );
};

export default AppLayout;

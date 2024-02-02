import SignoutPopup from "@/components/popups/SignoutPopup";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { HeaderFooterInclusionRoutes } from "@/config/site";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import SiteFooter from "./site-footer";
import SiteHeader from "./site-header";
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
    <div className="h-full w-full flex-col items-center justify-center scroll-smooth">
      <SignoutPopup>
        {/* exclude header and footer from specified list of pages */}
        {HeaderFooterInclusionRoutes.includes(pathname) && <SiteHeader />}
        {children}
        <Toaster />
        <TailwindIndicator />
        {HeaderFooterInclusionRoutes.includes(pathname) && (
          <SiteFooter className="mb-10" />
        )}
      </SignoutPopup>
    </div>
  );
};

export default AppLayout;

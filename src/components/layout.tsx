import React from "react";
import SiteHeader from "./site-header";
import { SiteFooter } from "./site-footer";
import { useRouter } from "next/router";
import { HeaderFooterExclusionRoutes } from "@/config/site";

type Props = {
  children: React.ReactNode;
};

const AppLayout = ({ children, ...props }: Props) => {
  const { pathname } = useRouter();
  return (
    <div className="flex min-h-full flex-col items-center justify-center">
      {/* exclude header and footer from specified list of pages */}
      {!HeaderFooterExclusionRoutes.includes(pathname) && <SiteHeader />}
      {children}
      {!HeaderFooterExclusionRoutes.includes(pathname) && <SiteFooter />}
    </div>
  );
};

export default AppLayout;

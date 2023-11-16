import React from "react";
import SiteHeader from "./site-header";
import { SiteFooter } from "./site-footer";

type Props = {
  children: React.ReactNode;
};

const AppLayout = ({ children, ...props }: Props) => {
  return (
    <div className="flex min-h-full flex-col items-center justify-center">
      <SiteHeader />
      {children}
      <SiteFooter />
    </div>
  );
};

export default AppLayout;

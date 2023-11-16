import React from "react";
import SiteHeader from "./header";
import { SiteFooter } from "./footer";

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

import React from "react";
import SiteHeader from "./header";
import { SiteFooter } from "./footer";
import { Separator } from "@/components/ui/separator";

type Props = {
  children: React.ReactNode;
};

const AppLayout = ({ children, ...props }: Props) => {
  return (
    <div className="flex min-h-full flex-col items-center justify-center">
      <SiteHeader />
      {children}
      <section className="mt-4 w-full">
          <Separator className="w-full my-4" />
      </section>
      <SiteFooter />
    </div>
  );
};

export default AppLayout;

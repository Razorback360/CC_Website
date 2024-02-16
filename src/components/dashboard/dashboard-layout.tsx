import { Icons } from "@/components/icons";
import * as React from "react";

import { UserProfile } from "@/components/core/user-profile";
import Nav from "@/components/dashboard/nav";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import Head from "next/head";

type DashboardLayoutProps = {
  pageTitle: string;
  description: string;
  children: React.ReactNode;
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
};

const DashboardLayout = ({
  pageTitle,
  description,
  defaultLayout = [265, 440, 655],
  defaultCollapsed = false,
  navCollapsedSize = 0,
  children,
}: DashboardLayoutProps) => {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);

  const { data: session } = useSession({
    // if not logged in, route to login page
    required: true,
  });

  const title = `${pageTitle} | KFUPM CC`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <TooltipProvider delayDuration={0}>
        <ResizablePanelGroup
          direction="horizontal"
          onLayout={(sizes: number[]) => {
            document.cookie = `react-resizable-panels:layout=${JSON.stringify(
              sizes,
            )}`;
          }}
          className="max-h-screen items-stretch select-none"
        >
          <ResizablePanel
            defaultSize={defaultLayout[0]}
            collapsedSize={navCollapsedSize}
            collapsible={true}
            minSize={17}
            maxSize={22}
            onCollapse={() => {
              setIsCollapsed(true);
              document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
                true,
              )}`;
            }}
            onExpand={() => {
              setIsCollapsed(false);
              document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
                false,
              )}`;
            }}
            className={cn(
              isCollapsed &&
                "min-w-fit transition-all duration-300 ease-in-out",
            )}
          >
            <div
              className={cn(
                "flex h-fit items-center justify-center",
                isCollapsed ? "h-fit w-fit" : "",
              )}
            >
              <UserProfile isCollapsed={isCollapsed} />
            </div>
            <Separator />
            <Nav
              isCollapsed={isCollapsed}
              links={[
                {
                  title: "Overview",
                  label: "",
                  icon: Icons.chart,
                  variant: "ghost",
                  href: "/dashboard/overview",
                },
                {
                  title: "Events",
                  label: "",
                  icon: Icons.events,
                  variant: "ghost",
                  href: "/dashboard/events",
                },
                {
                  title: "Members",
                  label: "",
                  icon: Icons.users,
                  variant: "ghost",
                  href: "/dashboard/members",
                },
                {
                  title: "Privileges",
                  label: "",
                  icon: Icons.dCheck,
                  variant: "ghost",
                  href: "#",
                },
              ]}
            />
          </ResizablePanel>
          <ResizableHandle withHandle={false} />
          {children}
        </ResizablePanelGroup>
      </TooltipProvider>
    </>
  );
};

export default DashboardLayout;

import * as React from "react";
import { Icons } from "@/components/icons";

import { UserProfile } from "@/components/core/user-profile";
import Nav from "@/components/dashboard/nav";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { TooltipProvider } from "@/components/ui/tooltip";

type DashboardLayoutProps = {
  children: React.ReactNode;
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
};

const DashboardLayout = ({
  defaultLayout = [265, 440, 655],
  defaultCollapsed = false,
  navCollapsedSize = 0,
  children,
}: DashboardLayoutProps) => {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(
            sizes,
          )}`;
        }}
        className="h-full items-stretch"
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
            isCollapsed && "min-w-fit transition-all duration-300 ease-in-out",
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
                label: "128",
                icon: Icons.chart,
                variant: "ghost",
                href: "/dashboard/overview",
              },
              {
                title: "Events",
                label: "9",
                icon: Icons.events,
                variant: "ghost",
                href: "/dashboard/events",
              },
              {
                title: "Members",
                label: "",
                icon: Icons.users,
                variant: "ghost",
                href: "#",
              },
              {
                title: "Privileges",
                label: "23",
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
  );
};

export default DashboardLayout;

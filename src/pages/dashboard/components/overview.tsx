import * as React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Icons } from "@/components/icons";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import UserProfile from "@/pages/dashboard/components/user-profile";
import Nav from "@/pages/dashboard/components/nav";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface MailProps {
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
}

export default function DashboardOverview({
  defaultLayout = [265, 440, 655],
  defaultCollapsed = false,
  navCollapsedSize,
}: MailProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);

  return (
    <div className="h-screen w-screen">
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
            minSize={15}
            maxSize={20}
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
              "min-w-[50px] transition-all duration-300 ease-in-out",
            )}
          >
            <div
              className={cn(
                "flex h-[52px] items-center justify-center",
                isCollapsed ? "h-[52px]" : "px-2",
              )}
            >
              <UserProfile />
            </div>
            <Separator />
            <Nav
              isCollapsed={isCollapsed}
              links={[
                {
                  title: "Overview",
                  label: "128",
                  icon: Icons.chart,
                  variant: "default",
                  href: "/dashboard/test",
                  href: "/dashboard/overview"
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
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
            <div className="flex items-center px-4 py-3">
              <h1 className="text-xl font-bold">Club Overview</h1>
            </div>
            <Separator />
            <h1 className="font-semibold text-lg m-5 -mb-1">Club Statistics</h1>
            <div className="flex flex-row w-full justify-around">
              <Card className="w-1/2 m-5">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Events
                  </CardTitle>
                  <Icons.events />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">600</div>
                  <p className="text-xs text-muted-foreground">
                    +20.1% from last month
                  </p>
                </CardContent>
              </Card>
              <Card className="w-1/2 m-5">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Documentations
                  </CardTitle>
                  <Icons.eventsRemain />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">560</div>
                  <p className="text-xs text-muted-foreground">
                    +180.1% from last month
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="flex flex-row w-full -mt-5 justify-around">
              <Card className="w-1/2 m-5">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Images
                  </CardTitle>
                  <Icons.media />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">400</div>
                </CardContent>
              </Card>
              <Card className="w-1/2 m-5">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Members
                  </CardTitle>
                  <Icons.users />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">50</div>
                </CardContent>
              </Card>
            </div>
            <Separator className="m-auto w-11/12" />
            <h1 className="font-semibold text-lg m-5 -mb-1">Recent Activity</h1>
            <ScrollArea className="h-[48vh] border pt-5 mx-5 mt-5 rounded-xl">
              <div className="space-y-8 mx-5">
                {/* TODO: Codeblock below up until comment to be used as a return to recentActivity.map() */}
                <div className="flex items-center border rounded-xl px-5 py-3">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="/avatars/01.png" alt="Avatar" />
                    <AvatarFallback>OM</AvatarFallback>
                  </Avatar>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Olivia Martin</p>
                    <p className="text-sm text-muted-foreground">
                      Created event
                    </p>
                  </div>
                  <div className="ml-auto font-medium">2024/06/02</div>
                </div>
              </div>
              {/* END */}
            </ScrollArea>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={defaultLayout[2]} minSize={30}>
            <div className="flex items-center px-4 py-3">
              <h1 className="text-xl font-bold"><br /></h1>
            </div>
            <Separator />
            <h1 className="font-semibold text-lg m-5">Upcoming Events</h1>
            <ScrollArea className="h-[87vh] ">
              <div className="flex flex-col gap-2 p-4 pt-0">
                {[{ id: "#21321", title: "Test Event", category: "Workshop", date: "2024/06/02", semester: "232", description: "Lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet" },
                { id: "#21321", title: "Test Event", category: "Workshop", date: "2024/06/02", semester: "232", description: "Lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet" },
                { id: "#21321", title: "Test Event", category: "Workshop", date: "2024/06/02", semester: "232", description: "Lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet" },
                { id: "#21321", title: "Test Event", category: "Workshop", date: "2024/06/02", semester: "232", description: "Lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet" },
                { id: "#21321", title: "Test Event", category: "Workshop", date: "2024/06/02", semester: "232", description: "Lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet" },
                { id: "#21321", title: "Test Event", category: "Workshop", date: "2024/06/02", semester: "232", description: "Lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet" },
                { id: "#21321", title: "Test Event", category: "Workshop", date: "2024/06/02", semester: "232", description: "Lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet" },
                { id: "#21321", title: "Test Event", category: "Workshop", date: "2024/06/02", semester: "232", description: "Lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet" },
                { id: "#21321", title: "Test Event", category: "Workshop", date: "2024/06/02", semester: "232", description: "Lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet" }].map((event, index) => {
                  return (
                    <button
                      key={index}
                      className={cn(
                        "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
                      )}

                    >
                      <div className="flex w-full flex-col gap-1">
                        <div className="flex items-center">
                          <div className="flex items-center gap-2">
                            <div className="font-semibold">{event.title}</div>
                          </div>
                          <div
                            className={cn(
                              "ml-auto text-xs text-foreground"
                            )}
                          >
                            {event.date}
                          </div>
                        </div>
                      </div>
                      <div className="line-clamp-2 text-xs text-muted-foreground">
                        {event.description.substring(0, 300)}
                      </div>
                      <div className="flex items-center gap-2">

                        <Badge variant="secondary">
                          {event.category}
                        </Badge>
                        <Badge variant="secondary">
                          {event.semester}
                        </Badge>
                      </div>
                    </button>
                  )
                })}
              </div>
            </ScrollArea>
          </ResizablePanel>
        </ResizablePanelGroup>
      </TooltipProvider>
    </div>
  );
}

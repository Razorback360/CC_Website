import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/icons";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { ResizableHandle, ResizablePanel } from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { api } from "@/utils/api";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

interface DashboardLayoutProps {
  defaultLayout: number[];
}

export default function DashboardOverview({
  defaultLayout,
}: DashboardLayoutProps) {
  const { data: semesterStats, isLoading: semesterStatsLoading } =
    api.utils.getSemesterStats.useQuery();
  const { data: recentActivity, isLoading: recentActivityLoading } =
    api.system.getSystemUpdates.useQuery();

  return (
    <>
      <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
        <div className="flex items-center p-4">
          <h1 className="text-3xl font-bold">Club Overview</h1>
        </div>
        <Separator />
        <div className="grid grid-cols-2 gap-2 p-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-bold">Total Events</CardTitle>
              <Icons.events size={28} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {semesterStats && semesterStatsLoading
                  ? "Loading..."
                  : semesterStats?.events.totalEventsThisMonth}
              </div>
              <p className="text-xs mt-2 text-muted-foreground">
                {/* +20.1% from last month */}
                {semesterStatsLoading
                  ? "Loading..."
                  : semesterStats
                  ? semesterStats.events.percentageChange +
                    "%" +
                    // up or down based on percentage change
                    (semesterStats?.events.percentageChange > 0
                      ? " up"
                      : " down") +
                    " from last month"
                  : "Failed to load data"}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-bold">
                Documentations
              </CardTitle>
              <Icons.eventsRemain size={28} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">560</div>
              <p className="text-xs mt-2 text-muted-foreground">
                +180.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-bold">Images</CardTitle>
              <Icons.media size={28} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">400</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-bold">Members</CardTitle>
              <Icons.users size={28} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {semesterStats?.totalMembersThisSemester}
              </div>{" "}
            </CardContent>
          </Card>
        </div>
        <Separator className="m-auto w-11/12" />
        <Card className="m-4">
          <CardHeader className="flex flex-row items-center ">
            <Icons.history size={28} className="mr-4" />
            <CardTitle className="font-semibold text-2xl m-0">
              Recent Activity
            </CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="h-[48vh] p-4">
            <ScrollArea>
              <div className="flex flex-col gap-2">
                {recentActivityLoading
                  ? "Loading..."
                  : recentActivity
                  ? recentActivity.map((activity, index) => {
                      return (
                        <Button
                          key={index}
                          className="flex items-center h-fit px-4 py-4"
                          variant="outline"
                        >
                          <Avatar className="h-12 w-12">
                            <AvatarImage
                              src={activity.Author.profileImage ?? ""}
                              alt="Avatar"
                            />
                            <AvatarFallback>OM</AvatarFallback>
                          </Avatar>
                          <div className="ml-4 space-y-1">
                            <p className="text-sm font-medium leading-none">
                              {activity.Author.name ?? "Unknown"}
                            </p>
                            <p className="text-sm text-muted-foreground text-start">
                              {/* convert to a simple title case from "EVENT_UPDATE" */}
                              {activity.type
                                .split("_")
                                .map((word) => {
                                  return (
                                    word.charAt(0).toUpperCase() +
                                    word.slice(1).toLowerCase()
                                  );
                                })
                                .join(" ")}
                            </p>
                          </div>
                          <div className="ml-auto ">
                            {/* format date with time */}
                            {format(activity.date, "dd MMM yyyy - hh:mm a")}
                          </div>
                        </Button>
                      );
                    })
                  : "Failed to load data"}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </ResizablePanel>
      <ResizableHandle withHandle={false} />
      <ResizablePanel defaultSize={defaultLayout[2]} minSize={30}>
        <div className="flex items-center p-4">
          <h1 className="font-bold text-3xl">Upcoming Events</h1>
        </div>
        <Separator />
        <ScrollArea className="h-[95vh]">
          <div className="flex flex-col gap-2 p-4">
            {[
              {
                id: "#21321",
                title: "Test Event",
                category: "Workshop",
                date: "2024/06/02",
                semester: "232",
                description:
                  "Lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet",
              },
              {
                id: "#21321",
                title: "Test Event",
                category: "Workshop",
                date: "2024/06/02",
                semester: "232",
                description:
                  "Lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet",
              },
              {
                id: "#21321",
                title: "Test Event",
                category: "Workshop",
                date: "2024/06/02",
                semester: "232",
                description:
                  "Lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet",
              },
              {
                id: "#21321",
                title: "Test Event",
                category: "Workshop",
                date: "2024/06/02",
                semester: "232",
                description:
                  "Lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet",
              },
              {
                id: "#21321",
                title: "Test Event",
                category: "Workshop",
                date: "2024/06/02",
                semester: "232",
                description:
                  "Lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet",
              },
              {
                id: "#21321",
                title: "Test Event",
                category: "Workshop",
                date: "2024/06/02",
                semester: "232",
                description:
                  "Lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet",
              },
              {
                id: "#21321",
                title: "Test Event",
                category: "Workshop",
                date: "2024/06/02",
                semester: "232",
                description:
                  "Lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet",
              },
              {
                id: "#21321",
                title: "Test Event",
                category: "Workshop",
                date: "2024/06/02",
                semester: "232",
                description:
                  "Lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet",
              },
              {
                id: "#21321",
                title: "Test Event",
                category: "Workshop",
                date: "2024/06/02",
                semester: "232",
                description:
                  "Lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet",
              },
            ].map((event, index) => {
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
                      <div className={cn("ml-auto text-xs text-foreground")}>
                        {event.date}
                      </div>
                    </div>
                  </div>
                  <div className="line-clamp-2 text-xs text-muted-foreground">
                    {event.description.substring(0, 300)}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{event.category}</Badge>
                    <Badge variant="secondary">{event.semester}</Badge>
                  </div>
                </button>
              );
            })}
          </div>
        </ScrollArea>
      </ResizablePanel>
    </>
  );
}

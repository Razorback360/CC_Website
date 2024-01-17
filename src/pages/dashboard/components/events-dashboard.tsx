import React, { useState } from "react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Icons } from "@/components/icons";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import UserProfile from "@/pages/dashboard/components/user-profile";
import Nav from "@/pages/dashboard/components/nav";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { RouterOutputs, api } from "@/utils/api";
import EventList from "@/pages/dashboard/components/events-list";
import EventDisplay from "./event-display";
import { useSelectedEvent } from "@/utils/hooks/use-selected-event";
import { Event } from "@prisma/client";

interface DashboardEventsProps {
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
}

export default function DashboardEvents({
  defaultLayout = [265, 600, 600],
  defaultCollapsed = false,
  navCollapsedSize,
}: DashboardEventsProps) {
  const { selectedEvent, selectEvent } = useSelectedEvent();
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  // if there's no data returned from the api, use placeholder data
  const { data: events } = api.event.getAll.useQuery(undefined, {
    onSuccess: (data) => {
      if (!selectedEvent) selectEvent(data[0]);
    },
  });

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
              "flex h-fit py-3 items-center justify-center max-h-16",
              isCollapsed ? "h-fit" : "px-2",
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
                variant: "ghost",
                href: "/dashboard/test",
              },
              {
                title: "Events",
                label: "9",
                icon: Icons.events,
                variant: "default",
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
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
          <div className="flex items-center px-4 py-2 h-16">
            <h1 className="text-xl font-bold">Events Management</h1>
            <Tooltip>
              <TooltipTrigger asChild className="ml-auto">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    selectEvent(undefined);
                  }}
                >
                  <Icons.add />
                  <span className="sr-only">Reply</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Reply</TooltipContent>
            </Tooltip>
          </div>
          <Separator />
          <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <EventList events={events ?? []} />
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle={false} />
        <ResizablePanel defaultSize={defaultLayout[2]}>
          <div className="ml-auto flex items-center p-5 max-h-16">
            <h1 className="font-semibold text-lg">
              {selectedEvent
                ? `Editing ${selectedEvent?.title}`
                : "Creating an Event"}
            </h1>
          </div>
          <Separator />
          <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 h-full">
            <EventDisplay />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}

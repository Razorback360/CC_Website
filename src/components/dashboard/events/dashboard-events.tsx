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
import Nav from "@/components/dashboard/nav";
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
import EventList from "@/components/dashboard/events/events-list";
import EventDisplay from "./event-display";
import { useSelectedEvent } from "@/utils/hooks/use-selected-event";
import { Event } from "@prisma/client";
import DeleteEventPopup from "@/components/popups/delete-event-popup";
import { AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { UserProfile } from "@/components/core/user-profile";
import { useSystemUpdates } from "@/utils/hooks/use-selected-event copy";

interface DashboardLayoutProps {
  defaultLayout: number[];
}

export default function DashboardEvents({
  defaultLayout,
}: DashboardLayoutProps) {
  const { selectedEvent, selectEvent } = useSelectedEvent();
  const [isCreatingNewEvent, setIsCreatingNewEvent] = useState(false);

  const { data: events, refetch } = api.event.getAll.useQuery(undefined, {
    onSuccess: (data) => {
      if (!selectedEvent && !isCreatingNewEvent) {
        selectEvent(data[0]);
        setIsCreatingNewEvent(false);
      }
    },
  });

  const apiUtils = api.useUtils();
  const { createSystemUpdateAsync } = useSystemUpdates();

  const { mutateAsync: deleteEvent, isLoading: loadingDelete } =
    api.event.delete.useMutation({
      onSettled: async (data, error, variables, context) => {
        if (error) {
          toast({
            title: "Failed to delete event!",
            description: error.message,
            variant: "destructive",
          });
          return;
        }
        if (data) {
          await createSystemUpdateAsync({
            referenceId: data.id,
            description: `Deleted event: ${data.title}`,
            type: "EVENT_DELETE",
          });
          selectEvent(data);
          await apiUtils.event.getAll.invalidate();
          toast({
            title: "Event Deleted!",
            description: "Your event has been deleted successfully.",
          });
        }
      },
    });

  return (
    <DeleteEventPopup
      eventTitle={selectedEvent?.title ?? "_UNDEFINED_"}
      onConfirm={async () => {
        if (!selectedEvent) return;
        await deleteEvent({ id: selectedEvent.id });
      }}
    >
      <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
        <div className="flex items-center p-4 ">
          <h1 className="text-3xl font-bold">Events Management</h1>
          <Tooltip>
            <TooltipTrigger asChild className="ml-auto">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  selectEvent(undefined);
                  setIsCreatingNewEvent(true);
                }}
              >
                <Icons.add />
                <span className="sr-only">Create Event</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Create Event</TooltipContent>
          </Tooltip>
        </div>
        <Separator />
        <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <EventList
            events={events ?? []}
            isCreatingNewEvent={isCreatingNewEvent}
            setIsCreatingNewEvent={setIsCreatingNewEvent}
          />
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle={false} />
      <ResizablePanel defaultSize={defaultLayout[2]}>
        <div className={cn("ml-auto flex items-center p-4")}>
          <h1 className="font-bold text-3xl">
            {selectedEvent
              ? `Editing Event: ${selectedEvent?.title}`
              : "Creating an Event"}
          </h1>
          <Tooltip>
            <TooltipTrigger asChild className="ml-auto">
              <AlertDialogTrigger
                asChild
                disabled={!selectedEvent?.id || loadingDelete}
              >
                <Button
                  variant={!selectedEvent?.id ? "ghost" : "destructive"}
                  size="icon"
                  disabled={!selectedEvent || loadingDelete}
                >
                  <Icons.trash />
                  <span className="sr-only">Delete Event</span>
                </Button>
              </AlertDialogTrigger>
            </TooltipTrigger>
            <TooltipContent>Delete Event</TooltipContent>
          </Tooltip>
        </div>
        <Separator />
        <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 h-full">
          <EventDisplay isCreatingNewEvent={isCreatingNewEvent} />
        </div>
      </ResizablePanel>
    </DeleteEventPopup>
  );
}

import { useState } from "react";

import EventList from "@/components/dashboard/events/events-list";
import { Icons } from "@/components/icons";
import DeleteEventPopup from "@/components/popups/delete-event-popup";
import { AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ResizableHandle, ResizablePanel } from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { api } from "@/utils/api";
import { useDeleteEvent } from "@/utils/hooks/use-crud-event";
import { useSelectedEvent } from "@/utils/hooks/use-selected-event";
import EventDisplay from "./event-display";

interface DashboardEventsProps {
  defaultLayout: number[];
}

export default function DashboardEvents({
  defaultLayout,
}: DashboardEventsProps) {
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

  const { mutateAsync: deleteEvent, loading: loadingDelete } = useDeleteEvent(
    setIsCreatingNewEvent,
  );

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
          <h1 className="font-bold text-[1.30rem]">Events Management</h1>
          <Tooltip>
            <TooltipTrigger asChild className="ms-auto">
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
        <div className={cn("ms-auto flex items-center p-4")}>
          <h1 className="font-bold text-[1.30rem]">
            {selectedEvent
              ? `Editing Event: ${selectedEvent?.title}`
              : "Creating an Event"}
          </h1>
          <Tooltip>
            <TooltipTrigger asChild className="ms-auto">
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

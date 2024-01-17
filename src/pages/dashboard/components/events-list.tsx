import { ComponentProps } from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Event } from "@prisma/client";
import { type RouterOutputs } from "@/utils/api";
import { useSelectedEvent } from "@/pages/dashboard/components/use-selected-event";

type EventListProps = {
  events: RouterOutputs["event"]["getAll"];
};

export default function EventList({ events }: EventListProps) {
  const { selectedEvent, selectEvent } = useSelectedEvent();

  return (
    <ScrollArea className="h-full my-5">
      <div className="flex flex-col gap-2 p-4 pt-0">
        {events?.map((event, index) => {
          return (
            <button
              key={index}
              className={cn(
                "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
                selectedEvent?.id === event.id && "bg-muted",
              )}
              onClick={() => selectEvent(event)}
            >
              <div className="flex w-full flex-col gap-1">
                <div className="flex items-center">
                  <div className="flex items-center gap-2">
                    <div className="font-semibold">{event.title}</div>
                  </div>
                  <div
                    className={cn(
                      "ml-auto text-xs text-foreground",
                      selectedEvent?.id === event.id
                        ? "text-foreground"
                        : "text-muted-foreground",
                    )}
                  >
                    {event.date.toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div className="line-clamp-2 text-xs text-muted-foreground">
                {event.description.substring(0, 300)}
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{event.Category.name}</Badge>
                <Badge variant="secondary">Term {event.Semester.number}</Badge>
              </div>
            </button>
          );
        })}
      </div>
    </ScrollArea>
  );
}

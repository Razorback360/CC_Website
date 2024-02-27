import { Icons } from "@/components/icons";
import DeleteEventPopup from "@/components/popups/delete-event-popup";
import UploadEventAttachmentsDialog from "@/components/popups/upload-event-attachments";
import { AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuIconItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { DialogTrigger } from "@/components/ui/dialog";
import LoadingOverlay from "@/components/ui/loading-overlay";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { type RouterOutputs } from "@/utils/api";
import {
  useDeleteEvent,
  useUpdateEventPublicStatus,
} from "@/utils/hooks/use-crud-event";
import { useSelectedEvent } from "@/utils/hooks/use-selected-event";
import { format } from "date-fns";

type EventListProps = {
  events: RouterOutputs["event"]["getAll"];
  setIsCreatingNewEvent: (isCreatingNewEvent: boolean) => void;
  isLoading: boolean;
};

export default function EventList({
  events,
  setIsCreatingNewEvent,
  isLoading = false,
}: EventListProps) {
  const { selectedEvent, selectEvent } = useSelectedEvent();

  const { mutateAsync: deleteEvent, loading: loadingDelete } = useDeleteEvent(
    setIsCreatingNewEvent,
  );

  const { mutateAsync: setEventPublicStatus } = useUpdateEventPublicStatus();

  return (
    <LoadingOverlay loading={isLoading || loadingDelete}>
      <ScrollArea className="h-[92vh]">
        <div className="flex flex-col gap-2 p-4">
          {events?.map((event, index) => {
            return (
              <DeleteEventPopup
                eventTitle={event.title}
                onConfirm={async () => {
                  await deleteEvent({ id: event.id });
                }}
                key={index}
              >
                <UploadEventAttachmentsDialog eventTitle={event.title}>
                  <ContextMenu>
                    <ContextMenuTrigger asChild>
                      <button
                        className={cn(
                          "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
                          selectedEvent?.id === event.id && "bg-muted",
                        )}
                        onClick={() => {
                          selectEvent(event);
                          setIsCreatingNewEvent(false);
                        }}
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
                              {format(new Date(event.date), "dd/MM/yyyy")}
                            </div>
                          </div>
                        </div>

                        <div className="line-clamp-2 text-xs text-muted-foreground">
                          {event.description.substring(0, 300)}
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">
                            {event.Category.name}
                          </Badge>
                          <Badge variant="secondary">
                            Term {event.Semester.number}
                          </Badge>
                        </div>
                      </button>
                    </ContextMenuTrigger>
                    <ContextMenuContent className="w-48 space-y-1">
                      <DialogTrigger asChild>
                        <ContextMenuIconItem icon={<Icons.upload />}>
                          Upload Images
                        </ContextMenuIconItem>
                      </DialogTrigger>
                      <AlertDialogTrigger asChild>
                        <ContextMenuIconItem
                          className={cn("text-red-500")}
                          disabled={loadingDelete}
                          icon={<Icons.trash />}
                        >
                          Delete Event
                        </ContextMenuIconItem>
                      </AlertDialogTrigger>
                      <ContextMenuSeparator />
                      <ContextMenuCheckboxItem
                        checked={event.public}
                        onClick={async () => {
                          await setEventPublicStatus({
                            id: event.id,
                            public: !event.public,
                          });
                        }}
                      >
                        Public
                      </ContextMenuCheckboxItem>
                    </ContextMenuContent>
                  </ContextMenu>
                </UploadEventAttachmentsDialog>
              </DeleteEventPopup>
            );
          })}
        </div>
      </ScrollArea>
    </LoadingOverlay>
  );
}

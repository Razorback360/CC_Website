import { atom, useAtom } from "jotai";

import { type Attachment, type Event } from "@prisma/client";

export const selectedEventAtom = atom<
  | (Event & {
      Attachments: Attachment[];
      src: string | undefined;
    })
  | undefined
>(undefined);

export const useSelectedEvent = () => {
  const [selectedEvent, setSelectedEvent] = useAtom(selectedEventAtom);

  const selectEvent = (
    event:
      | (Event & {
          Attachments: Attachment[];
        })
      | undefined,
  ) => {
    const poster = event?.Attachments.find(
      (attachment) => attachment.type === "EVENT_POSTER",
    );

    setSelectedEvent(
      event
        ? {
            ...event,
            src: poster?.src,
          }
        : undefined,
    );
  };

  return { selectedEvent, selectEvent };
};

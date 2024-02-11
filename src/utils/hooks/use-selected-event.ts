import { atom, useAtom } from "jotai";

import { type Attachment, type Event } from "@prisma/client";

export const selectedEventAtom = atom<
  | (Event & {
     Attachments: Attachment[];
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
    setSelectedEvent(event);
  };

  return { selectedEvent, selectEvent };
};
import { atom, useAtom } from "jotai";

import { type Event } from "@prisma/client";

export const selectedEventAtom = atom<Event | undefined>(undefined);

export const useSelectedEvent = () => {
  const [selectedEvent, setSelectedEvent] = useAtom(selectedEventAtom);

  const selectEvent = (event: Event | undefined) => {
    setSelectedEvent(event);
  };

  return { selectedEvent, selectEvent };
};

import { atom, useAtom } from "jotai";

import { type Event } from "@prisma/client";

export const selectedEventAtom = atom<Event | null>(null);

export const useSelectedEvent = () => {
  const [selectedEvent, setSelectedEvent] = useAtom(selectedEventAtom);

  const selectEvent = (event: Event) => {
    setSelectedEvent(event);
  };

  return { selectedEvent, selectEvent };
};

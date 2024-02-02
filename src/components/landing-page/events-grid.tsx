import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { type RouterOutputs } from "@/utils/api";
import { format } from "date-fns";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

interface EventsGridProps {
  events: RouterOutputs["event"]["getAll"] | undefined;
}

export const EventsGrid = ({ events }: EventsGridProps) => {
  if (!events || events.length === 0) {
    return (
      <div className="select-none flex flex-col gap-8 justify-center items-center h-[150vh] bg-gray-700">
        <h2
          className="animate-floating text-6xl font-extrabold text-gray-400"
          style={{ textShadow: "0 0 6rem black" }}
        >
          No Events
        </h2>
        <p
          // style={{ textShadow: "0 0 2rem black" }}
          className="text-gray-500 font-semibold text-2xl z-10"
        >
          Check back later for more events.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full grid lg:grid-cols-2 gap-2">
      {events.map((event, index) => {
        return (
          <EventCard key={event.title + index} event={event} index={index} />
        );
      })}
    </div>
  );
};

export default EventsGrid;

type EventCardProps = {
  event: RouterOutputs["event"]["getAll"][number];
  index: number;
};

const EventCard = ({ event, index }: EventCardProps) => {
  return (
    <Card
      key={index}
      className="flex flex-row items-center rounded-md p-2 text-sm transition-all w-full h-64 flex-grow-0"
    >
      <CardHeader className="relative flex items-center justify-center h-full rounded-md select-none p-2 flex-shrink-0 aspect-square max-w-[50%] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <Image
          className="h-full w-full flex-shrink-0 object-cover object-center rounded-md"
          src={
            event.Attachments.at(0)?.src ?? `/event (${(index % 4) + 1}).png`
          }
          width={350}
          height={350}
          loading="lazy"
          objectFit="cover"
          objectPosition="center"
          alt="event image"
        />
      </CardHeader>
      <div className="flex flex-col items-center justify-between gap-2 p-1 w-full h-full max-h-full">
        <CardContent className="p-1 flex flex-col items-start justify-start h-full w-full flex-grow-0">
          <p className="sm:text-xl sm:font-semibold lg:text-2xl lg:font-bold xl:text-xl xl:font-bold flex-shrink-0">
            {event.title}
          </p>
          <Badge
            className="text-xs md:text-sm max-w-fit mt-1 flex-shrink-0"
            variant="secondary"
          >
            {event.Semester.number}
          </Badge>
          <p
            dir="rtl"
            className="text-ellipsis text-xs lg:text-sm mt-1 h-full flex-grow-0 line-clamp-[2] whitespace-pre-wrap text-right"
          >
            {/* check all spaces that are supposed to be new lines, and replace them with \n */}
            {event.description}
          </p>
        </CardContent>
        <CardFooter className="w-full p-2 flex-shrink-0">
          <Button
            className="w-full font-bold"
            size="sm"
            variant="default"
            asChild
          >
            <Link href={`/events/${event.id}`}>
              View - {format(event.date, "dd MMM")}
            </Link>
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};

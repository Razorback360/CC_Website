import React from "react";
import { Event } from "types";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {
  info: Event;
} & React.HTMLAttributes<HTMLImageElement>;

const EventCard = (props: Props) => {
  return (
    <div className="w-full flex gap-4 items-center my-4">
      <Icons.point className="text-6xl" />
      <div className="flex w-full items-center justify-between gap-2">
        <div>
          <h3 className="font-bold text-2xl">{props.info.name}</h3>
          <p className="line-clamp-2">{props.info.description}</p>
        </div>
        <Button variant="default">
          <Link href="...">
            <Icons.link />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default EventCard;

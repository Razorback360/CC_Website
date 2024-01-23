import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getNameInitials } from "@/lib/utils";
import { type RouterOutputs } from "@/utils/api";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

type RecentActivityCardProps = {
  activity: RouterOutputs["system"]["getSystemUpdates"][0];
};

const RecentActivityCard = ({ activity }: RecentActivityCardProps) => {
  return (
    <Button className="flex items-center h-fit px-4 py-4" variant="outline">
      <Avatar className="h-12 w-12">
        <AvatarImage src={activity.Author.profileImage ?? ""} alt="Avatar" />
        <AvatarFallback>
          {getNameInitials(activity.Author.name ?? "UNKNOWN")}
        </AvatarFallback>
      </Avatar>
      <div className="ml-4 space-y-1">
        <p className="text-sm font-medium leading-none">
          {activity.Author.name ?? "Unknown"}
        </p>
        <p className="text-sm text-muted-foreground text-start">
          {/* convert to a simple title case from "EVENT_UPDATE" */}
          {activity.type
            .split("_")
            .map((word) => {
              return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
            })
            .join(" ")}
        </p>
      </div>
      <div className="ml-auto ">
        {/* format date with time */}
        {format(activity.date, "dd MMM yyyy - hh:mm a")}
      </div>
    </Button>
  );
};

export default RecentActivityCard;

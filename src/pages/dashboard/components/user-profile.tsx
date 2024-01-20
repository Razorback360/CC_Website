import * as React from "react";

import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function UserProfile() {
  // TODO fetch profile info
  return (
    <div className="flex w-full items-center gap-4 px-4">
      <img
        src="/profilePic.png"
        alt="person"
        className="rounded-full lg:w-[45px] mx-auto lg:m-0"
      />
      <h2 className="font-bold text-xl">User</h2>
    </div>
  );
}

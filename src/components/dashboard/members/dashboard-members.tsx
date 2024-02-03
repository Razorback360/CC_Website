import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { ResizableHandle, ResizablePanel } from "@/components/ui/resizable";
import { api } from "@/utils/api";
import { useSelectedMember } from "@/utils/hooks/use-selected-member";
import DeleteMemberPopup from "@/components/popups/delete-member-popup";
import AddNewMemberFormDialog from "@/components/popups/add-member-dialog";
import { DialogTrigger } from "@/components/ui/dialog";
import MemberCard from "@/components/dashboard/MemberCard";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import MemberDisplay from "@/components/dashboard/members/member-display";

type DashboardMembersProps = {
  defaultLayout: number[];
};

const DashboardMembers = ({ defaultLayout }: DashboardMembersProps) => {
  const { selectedMember, selectMember } = useSelectedMember();

  const { data: members, refetch: refetchMembers } = api.user.getAll.useQuery(
    undefined,
    {
      onSuccess: (data) => {
        if (
          !selectedMember ||
          (selectedMember &&
            !data.filter((member) => member.id === selectedMember.id).length)
        ) {
          if (!data[0]) return;
          selectMember(data[0]);
        }
      },
    },
  );

  return (
    <AddNewMemberFormDialog>
      <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
        <div className="flex items-center p-4 ">
          <h1 className="text-3xl font-bold">Members Management</h1>
          <Tooltip>
            <DialogTrigger asChild>
              <TooltipTrigger asChild className="ml-auto">
                <Button variant="ghost" size="icon">
                  <Icons.add />
                  <span className="sr-only">Create Member</span>
                </Button>
              </TooltipTrigger>
            </DialogTrigger>
            <TooltipContent>Create Member</TooltipContent>
          </Tooltip>
        </div>
        <Separator />
        <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <ScrollArea className="h-[92vh] ">
            <div className="flex flex-col gap-2 p-4 ">
              {members?.map((member) => (
                <MemberCard member={member} key={member.id} />
              ))}
            </div>
          </ScrollArea>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle={false} />
      <ResizablePanel defaultSize={defaultLayout[2]}>
        <div className={cn("flex items-center p-4")}>
          <h1 className="font-bold text-3xl">
            Editing Member:{" "}
            {selectedMember?.name ?? `${selectedMember?.studentId} (Unsingned)`}
          </h1>
        </div>
        <Separator />
        <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 h-full">
          <MemberDisplay />
        </div>
      </ResizablePanel>
    </AddNewMemberFormDialog>
  );
};

export default DashboardMembers;

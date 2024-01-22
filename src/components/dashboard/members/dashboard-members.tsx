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
import { AlertDialogTrigger } from "@/components/ui/alert-dialog";
import AddNewMemberFormDialog from "@/components/popups/add-member-dialog";
import { DialogTrigger } from "@/components/ui/dialog";
import MemberCard from "@/components/dashboard/MemberCard";

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

  //   const { mutateAsync: deleteMember, loading: loadingDelete } =
  //     api.user.delete.useMutation(undefined, {
  //       onSuccess: () => {
  //         refetchMembers();
  //         selectMember(members[0]);
  //       },
  // });

  return (
    <DeleteMemberPopup
      memberName={selectedMember?.name ?? "_UNDEFINED_"}
      // eslint-disable-next-line @typescript-eslint/require-await
      onConfirm={async () => {
        if (!selectedMember) return;
      }}
    >
      <AddNewMemberFormDialog>
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
          <div className="flex items-center p-4 ">
            <h1 className="text-3xl font-bold">Members Management</h1>
            <Tooltip>
              <DialogTrigger asChild>
                <TooltipTrigger asChild className="ml-auto">
                  <Button variant="ghost" size="icon" onClick={() => {}}>
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
            {/* <MemberCard members={members ?? []} /> */}
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle={false} />
        <ResizablePanel defaultSize={defaultLayout[2]}>
          <div className={cn("flex items-center p-4")}>
            <h1 className="font-bold text-3xl">
              {selectedMember
                ? `Editing Member: ${selectedMember?.name}`
                : "Creating an Member"}
            </h1>
          </div>
          <Separator />
          <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 h-full">
            {/* <MemberDisplay isCreatingNewMember={isCreatingNewMember} /> */}
          </div>
        </ResizablePanel>
      </AddNewMemberFormDialog>
    </DeleteMemberPopup>
  );
};

export default DashboardMembers;

import { type User } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getNameInitials } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuIconItem,
  ContextMenuSeparator,
  ContextMenuCheckboxItem,
  ContextMenu,
} from "@/components/ui/context-menu";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import DeleteMemberPopup from "@/components/popups/delete-member-popup";
import { AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useSelectedMember } from "@/utils/hooks/use-selected-member";
import { api } from "@/utils/api";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

type Props = {
  member: User;
} & React.HTMLAttributes<HTMLImageElement>;

const MemberCard = ({ member }: Props) => {
  const { selectedMember, selectMember } = useSelectedMember();
  const apiUtils = api.useUtils();

  const { mutateAsync: deleteMember, isLoading: loadingDelete } =
    api.user.delete.useMutation({
      onSuccess: async () => {
        await apiUtils.user.getAll.invalidate();
      },
    });

  useEffect(()=>{},[selectedMember])
  return (
    <DeleteMemberPopup
      memberName={selectedMember?.name ?? "_UNDEFINED_"}
      // eslint-disable-next-line @typescript-eslint/require-await
      onConfirm={async () => {
        if (!selectedMember) return;
        await deleteMember({ id: selectedMember.id });
      }}
    >
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "transition-all h-32 w-full p-0",
              selectedMember?.id === member.id && "bg-muted",
            )}
            onClick={() => {
              selectMember(member);
              // console.log(selectedMember)
            }}
          >
            <div
              className={cn(
                "flex flex-row gap-4 justify-start p-4 items-center h-full w-full",
                // member.name === null && "blur-sm",
              )}
            >
              <Avatar className="h-16 w-16">
                <AvatarImage src={member.profileImage ?? undefined} />
                <AvatarFallback>
                  {getNameInitials(member.name ?? "UNKNOWN")}
                </AvatarFallback>
              </Avatar>
              <div
                className={cn(
                  "flex flex-col items-start justify-start w-full h-full",
                  selectedMember?.id === member.id && "",
                )}
              >
                <h2 className="text-xl font-bold h-fit">
                  {member.name ?? `${member.studentId} (Unsingned)`}
                </h2>
                <div className="flex flex-row flex-wrap items-start h-full w-full justify-start gap-1 mt-1">
                  <Badge variant="default" className="w-fit">
                    {member.role}
                  </Badge>
                  <p
                    className={`${
                      member.enabled ? "bg-green-500" : "bg-red-500"
                    } rounded-sm text-center px-3`}
                  >
                    {member.enabled ? "Active" : "Removed"}
                  </p>
                  {member.tags?.map((tag, index) => (
                    <Badge
                      variant="outline"
                      key={index}
                      className="bg-primary rounded-sm text-white px-2  text-sm"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </Button>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-64">
          <AlertDialogTrigger asChild>
            <ContextMenuIconItem
              className={cn("text-red-500")}
              disabled={!selectedMember || loadingDelete}
              icon={<Icons.trash />}
            >
              Delete Event
            </ContextMenuIconItem>
          </AlertDialogTrigger>
          <ContextMenuSeparator />
          <ContextMenuCheckboxItem checked>Public</ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem>Show Full URLs</ContextMenuCheckboxItem>
        </ContextMenuContent>
      </ContextMenu>
    </DeleteMemberPopup>
  );
};

export default MemberCard;

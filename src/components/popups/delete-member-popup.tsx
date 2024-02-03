"use client";

import React from "react";
import { signOut } from "next-auth/react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { buttonVariants } from "@/components/ui/button";

type PopupProps = {
  memberName: string;
  onConfirm: () => Promise<void>;
} & React.ComponentProps<typeof AlertDialog>;

const DeleteMemberPopup = ({ children, memberName, onConfirm }: PopupProps) => {
  return (
    <AlertDialog>
      {children}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete {memberName}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            You will not be able to recover this record.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={buttonVariants({ variant: "destructive" })}
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={async () => await onConfirm()}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteMemberPopup;

import React from "react";
import Head from "next/head";
import AddNewMemberFormDialog from "@/components/popups/AddMemberDialog";
import { Button } from "@/components/ui/button";

const CreateMemberTest = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Create Member Popup</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col gap-4 items-center justify-center px-2 sm:px-20 text-center">
        <AddNewMemberFormDialog>
          <Button variant="outline">Add Member</Button>
        </AddNewMemberFormDialog>
      </main>
    </div>
  );
};

export default CreateMemberTest;

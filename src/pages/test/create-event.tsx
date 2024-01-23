import React from "react";
import Head from "next/head";
import AddEventFormDialog from "@/components/popups/AddEventFormDialog";
import { Button } from "@/components/ui/button";

const CreateEventTest = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Create Event Popup</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col gap-4 items-center justify-center px-2 sm:px-20 text-center">
        <AddEventFormDialog>
          <Button variant="outline">Add Event</Button>
        </AddEventFormDialog>
      </main>
    </div>
  );
};

export default CreateEventTest;

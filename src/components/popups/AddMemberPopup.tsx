import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import LabelsInput from "@/components/labels-input";
import React from "react";

const addMemberFormSchema = z.object({
  recordName: z.string().min(2).max(50),
  studentId: z.string().min(2).max(10),
  major: z.string().min(2).max(50),
  position: z.string().min(2).max(20),
  privileges: z.string().min(2).max(100),
  tags: z.array(z.string().min(2).max(15)).min(0),
});

type AddNewMemberFormDialogProps = {
  children: React.ReactNode;
} & React.ComponentProps<typeof Dialog>;

export default function AddNewMemberFormDialog({
  children,
  ...props
}: AddNewMemberFormDialogProps) {
  const form = useForm<z.infer<typeof addMemberFormSchema>>({
    resolver: zodResolver(addMemberFormSchema),
    defaultValues: {
      recordName: "",
      studentId: "",
      major: "",
      position: "",
      // TODO @SauceX22 add default privilege setting
      privileges: "",
      tags: [],
    },
  });

  function onSubmit(data: z.infer<typeof addMemberFormSchema>) {
    // Do something with the form values.
    console.log(data);
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Dialog {...props}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Add member</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="recordName"
              render={({ field }) => (
                <div className="grid grid-cols-4 items-center gap-2">
                  <FormLabel htmlFor="record-name">Member Name</FormLabel>
                  <FormControl>
                    <Input
                      className="col-span-3"
                      id="record-name"
                      placeholder="Example Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="col-start-2 col-span-3">
                    {form.formState.errors.recordName?.message}
                  </FormMessage>
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="studentId"
              render={({ field }) => (
                <div className="grid grid-cols-4 items-center gap-2">
                  <FormLabel htmlFor="student-id">Student ID</FormLabel>
                  <FormControl>
                    <Input
                      className="col-span-3"
                      id="student-id"
                      placeholder="S20xxxxxxx"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="col-start-2 col-span-3">
                    {form.formState.errors.studentId?.message}
                  </FormMessage>
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="major"
              render={({ field }) => (
                <div className="grid grid-cols-4 items-center gap-2">
                  <FormLabel htmlFor="major">Major</FormLabel>
                  <FormControl>
                    <Input
                      className="col-span-3"
                      id="major"
                      placeholder="CS"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="col-start-2 col-span-3">
                    {form.formState.errors.major?.message}
                  </FormMessage>
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <div className="grid grid-cols-4 items-center gap-2">
                  <FormLabel htmlFor="position">Working Position</FormLabel>
                  <FormControl>
                    <Input
                      className="col-span-3"
                      id="position"
                      placeholder="Media-related Position"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="col-start-2 col-span-3">
                    {form.formState.errors.position?.message}
                  </FormMessage>
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="privileges"
              render={({ field }) => (
                <div className="grid grid-cols-4 items-center gap-2">
                  <FormLabel htmlFor="privileges">Member Privileges</FormLabel>
                  <FormControl>
                    <Input
                      className="col-span-3"
                      id="privileges"
                      placeholder="No Editing Privileges"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="col-start-2 col-span-3">
                    {form.formState.errors.privileges?.message}
                  </FormMessage>
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <div className="grid grid-cols-4 items-center gap-2">
                  <FormLabel htmlFor="tags">General Tags</FormLabel>
                  <FormControl>
                    <LabelsInput
                      maxLabels={10}
                      labels={form.getValues("tags")}
                      setLabels={(labels) => form.setValue("tags", labels)}
                      className="col-span-3"
                      id="tags"
                      placeholder="(e.g. '2020', 'photo-editor')"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          const label = e.currentTarget.value;
                          if (label.trim() !== "") {
                            form.setValue("tags", [
                              ...form.getValues("tags"),
                              label,
                            ]);
                            e.currentTarget.value = "";
                          }
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage className="col-start-2 col-span-3">
                    {form.formState.errors.tags?.message}
                  </FormMessage>
                </div>
              )}
            />
            <div className="flex justify-end items-center gap-2">
              <Button variant="default" type="submit">
                Save changes
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

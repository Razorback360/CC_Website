import * as React from 'react';
import { useState, useEffect, FunctionComponent, ReactNode } from 'react';
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
import { api } from "@/utils/api";
import { UserRole } from "@prisma/client";
import { Switch } from "@/components/ui/switch";

export const addMemberFormSchema = z.object({
  studentId: z.string().min(2).max(10),
  major: z.string().min(2).max(50),
  position: z.string().min(2).max(20),
  enabled: z.boolean().default(true),
  role: z.nativeEnum(UserRole),
  tags: z.array(z.string().min(2).max(15)),
});

type AddNewMemberFormDialogProps = {
  children: React.ReactNode;
} & React.ComponentProps<typeof Dialog>;





export default (): ReactNode => {
    const form = useForm<z.infer<typeof addMemberFormSchema>>({
        resolver: zodResolver(addMemberFormSchema),
        defaultValues: {
          studentId: "",
          major: "",
          position: "",
          enabled: true,
          role: "MEMBER",
          // TODO @SauceX22 add default privilege setting
          tags: [],
        },
      });
    
      const { mutateAsync: addMember } = api.user.addMember.useMutation({
        onSuccess: () => {
          toast({
            title: "Member Added",
            description: `The member "${form.getValues(
              "studentId",
            )}" has been added successfully.`,
          });
        },
      });
    
      async function onSubmit(data: z.infer<typeof addMemberFormSchema>) {
        // Do something with the form values.
        await addMember({
          studentId: data.studentId,
          enabled: data.enabled,
          role: data.role,
          tags: [...data.tags, `${data.major} Major`, `${data.position} Position`],
        });
    
        toast({
          title: "You submitted the following values:",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{JSON.stringify(data, null, 2)}</code>
            </pre>
          ),
        });
      }
       return (<Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                      placeholder="s20xxxxxxx"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="col-start-2 col-span-3">
                    {form.formState.errors.studentId?.message}
                  </FormMessage>
                </div>
              )}
            />
            {/* form field with a tooltip for the enabled flag */}
            <FormField
              control={form.control}
              name="enabled"
              render={({ field }) => (
                <div className="grid grid-cols-4 items-center gap-2">
                  <FormLabel htmlFor="enabled">User Enabled</FormLabel>
                  <FormControl>
                    <Switch
                      id="enabled"
                      ref={field.ref}
                      name={field.name}
                      disabled={field.disabled}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      onBlur={field.onBlur}
                    />
                  </FormControl>
                  <FormDescription className="col-start-2 col-span-3">
                    Whether the member is allowed to login or not
                  </FormDescription>
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
                      placeholder="Media Manager"
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
                      placeholder='(e.g. "2020", "photo editor")'
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          const label = e.currentTarget.value;
                          if (label && label.trim() !== "") {
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
                  <FormDescription className="col-start-2 col-span-3">
                    Press <b>↵ &quot;Enter&quot;</b> after each tag to add it
                  </FormDescription>
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
        </Form>)
}
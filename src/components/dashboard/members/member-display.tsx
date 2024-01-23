import React, { useEffect } from "react";
import { CalendarIcon } from "lucide-react";
import { format, isSameDay } from "date-fns";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api } from "@/utils/api";
import { useSelectedMember } from "@/utils/hooks/use-selected-member";
import { Icons } from "@/components/icons";
import { useSystemUpdates } from "@/utils/hooks/use-system-updates";
import { addMemberFormSchema } from "@/components/popups/add-member-dialog";
import { UserRole } from "@prisma/client";
import { Switch } from "@/components/ui/switch";

const MemberDisplay = () => {
  const { selectedMember, selectMember } = useSelectedMember();
  const form = useForm<z.infer<typeof addMemberFormSchema>>({
    resolver: zodResolver(addMemberFormSchema),
    defaultValues: {
      studentId: "",
      position: "",
      enabled: false,
      role: "MEMBER",
      // TODO @SauceX22 add default privilege setting
      tags: [],
    },
  });

  const { mutateAsync: updateMember } = api.user.update.useMutation({
    onSuccess: () => {
      toast({
        title: "Member Updated",
        description: "Member has been updated successfully",
      });
    },
  });

  async function onSubmit(data: z.infer<typeof addMemberFormSchema>) {
    if (selectedMember) {
      await updateMember({ ...data, id: selectedMember.id });
    }
  }

  const { data: semesters } = api.semester.getAll.useQuery();

  const apiUtils = api.useUtils();

  const { createSystemUpdateAsync } = useSystemUpdates();

  useEffect(() => {
    if (selectedMember) {
      form.reset({
        studentId: selectedMember.studentId,
        enabled: selectedMember.enabled,
        role: selectedMember.role,
        tags: [...selectedMember.tags],
      });
    } else {
      form.reset({
        studentId: "",
        enabled: false,
        role: "MEMBER",
        tags: [],
      });
    }
  }, [selectedMember]);

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-2 justify-between"
        >
          <FormField
            control={form.control}
            name="studentId"
            render={({ field }) => (
              <div className="mt-2 flex flex-col gap-2">
                <FormLabel htmlFor="studentId">Student ID</FormLabel>
                <FormControl>
                  <Input id="studentId" {...field} />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.studentId?.message}
                </FormMessage>
              </div>
            )}
          />
          <div className="grid grid-cols-2 gap-2">
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <div className="mt-2 flex flex-col gap-2">
                  <FormLabel htmlFor="role">Role</FormLabel>
                  <FormControl>
                    <Select {...field}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a User Role" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(UserRole).map((role) => (
                          <SelectItem key={role} value={role}>
                            {role}
                          </SelectItem>
                        ))}{" "}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    The role of the user in the club
                  </FormDescription>
                  <FormMessage>
                    {form.formState.errors.role?.message}
                  </FormMessage>
                </div>
              )}
            />
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
                  <FormDescription className=" col-span-3">
                    Whether the member is allowed to login or not
                  </FormDescription>
                </div>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <div className="mt-2 flex flex-col gap-2">
                <FormLabel htmlFor="tags">Tags</FormLabel>
                <FormControl>
                  <Input id="tags" {...field} />
                </FormControl>
                <FormMessage>{form.formState.errors.tags?.message}</FormMessage>
              </div>
            )}
          />
          <Button type="submit">Update Member</Button>
        </form>
      </Form>
    </>
  );
};

export default MemberDisplay;

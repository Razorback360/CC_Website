import { useEffect } from "react";

import { addMemberFormSchema } from "@/components/popups/add-member-dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import { api } from "@/utils/api";
import { useSelectedMember } from "@/utils/hooks/use-selected-member";
import { useSystemUpdates } from "@/utils/hooks/use-system-updates";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserRole } from "@prisma/client";
import { useForm } from "react-hook-form";
import { type z } from "zod";

const MemberDisplay = () => {
  const { selectedMember, selectMember } = useSelectedMember();
  const form = useForm<z.infer<typeof addMemberFormSchema>>({
    resolver: zodResolver(addMemberFormSchema),
    defaultValues: {
      studentId: "",
      position: "",
      enabled: true,
      role: "MEMBER",
      tags: [],
    },
  });

  const { data: semesters } = api.semester.getAll.useQuery();

  const apiUtils = api.useUtils();

  const { createSystemUpdateAsync } = useSystemUpdates();

  const { mutateAsync: updateMember } = api.user.update.useMutation({
    onSettled: async (data, error, variables, context) => {
      if (error) {
        toast({
          title: "Failed to update member!",
          description: error.message,
          variant: "destructive",
        });
      }
      if (data && selectedMember) {
        // filter out the old member from the selected member
        const oldData = selectedMember;

        // Determine which fields were updated by comparing with the existing member
        const updatedFields = [];

        if (data.studentId !== oldData.studentId)
          updatedFields.push("studentId");

        if (data.enabled !== oldData.enabled) updatedFields.push("enabled");

        if (data.role !== oldData.role) updatedFields.push("role");

        if (data.tags.join(",") !== oldData.tags.join(","))
          updatedFields.push("tags");

        if (updatedFields.length > 0) {
          // Construct a descriptive message based on the updated fields
          // use the updatedFields array to construct the message (mention from and to values)
          // e.g. "Title changed from 'Old Title' to 'New Title'"
          // separate each field with a comma
          // for semester and category, use the number of semester, and name of the category instead of the id
          const updateDescription = `Updated member ${
            data.studentId
          } Updated fields: ${updatedFields
            .map((field) => {
              return `"${field.charAt(0).toUpperCase()}${field.slice(
                1,
              )}" from "${
                (oldData as Record<string, unknown>)[field] as string
              }" to "${(data as Record<string, unknown>)[field] as string}"`;
            })
            .join(", ")}`;

          // Create a system update with the specific type and description
          await createSystemUpdateAsync({
            referenceId: data.id,
            description: updateDescription,
            type: "MEMBER_UPDATE",
          });
        }

        selectMember(data);
        await apiUtils.user.getAll.invalidate();
        toast({
          title: "Member Updated!",
          description: `Member "${data.studentId}" has been updated successfully.`,
        });
      }
    },
  });

  async function onSubmit(data: z.infer<typeof addMemberFormSchema>) {
    if (selectedMember) {
      await updateMember({
        ...data,
        id: selectedMember.id,
        // tags: [...data.tags, `${data.position} Position`],
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
  }

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
                        ))}
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

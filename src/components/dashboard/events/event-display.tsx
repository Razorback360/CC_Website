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
import { useSelectedEvent } from "@/utils/hooks/use-selected-event";
import { Icons } from "@/components/icons";
import { useSystemUpdates } from "@/utils/hooks/use-selected-event copy";

const addEventFormSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().min(2).max(500),
  date: z.date(), // You can use a specific date format validation here
  semesterId: z.string(), // Add validation if needed
  categoryId: z.string(), // Add validation if needed
  link: z.string().url(),
});

type EventDisplayProps = {
  isCreatingNewEvent: boolean;
};

const EventDisplay = ({ isCreatingNewEvent }: EventDisplayProps) => {
  const { selectedEvent, selectEvent } = useSelectedEvent();
  const form = useForm<z.infer<typeof addEventFormSchema>>({
    resolver: zodResolver(addEventFormSchema),
    defaultValues: {
      title: "",
      description: "",
      date: undefined,
      semesterId: "",
      categoryId: "",
      link: "",
    },
  });

  async function onSubmit(data: z.infer<typeof addEventFormSchema>) {
    if (selectedEvent && !isCreatingNewEvent) {
      await updateEvent({ ...data, id: selectedEvent.id });
    }
    if (isCreatingNewEvent) {
      await createEvent(data);
    }
  }

  const { data: semesters } = api.semester.getAll.useQuery();

  const { data: categories } = api.event.getAllCategories.useQuery();

  const apiUtils = api.useUtils();

  const { createSystemUpdateAsync } = useSystemUpdates();

  const { mutateAsync: createEvent, isLoading: loadingCreate } =
    api.event.create.useMutation({
      onSuccess: async (data) => {
        selectEvent(data);
        await apiUtils.event.getAll.invalidate();
        await createSystemUpdateAsync({
          referenceId: data.id,
          description: `Created a new event: ${data.title}`,
          type: "EVENT_CREATE",
        });
        toast({
          title: "Event Created!",
          description: "Your event has been created successfully.",
        });
      },
    });

  const { mutateAsync: updateEvent, isLoading: loadingUpdate } =
    api.event.update.useMutation({
      onSettled: async (data, error, variables, context) => {
        if (error) {
          toast({
            title: "Failed to update event!",
            description: error.message,
            variant: "destructive",
          });
        }
        if (data && selectedEvent) {
          // filter out the old event from the selected event
          const oldData = selectedEvent;

          // Determine which fields were updated by comparing with the existing event
          const updatedFields = [];

          if (data.title !== oldData.title) updatedFields.push("title");

          if (data.description !== oldData.description)
            updatedFields.push("description");

          if (!isSameDay(data.date, oldData.date)) updatedFields.push("date");

          if (data.semesterId !== oldData.semesterId)
            updatedFields.push("semesterId");

          if (data.categoryId !== oldData.categoryId)
            updatedFields.push("categoryId");

          if (data.link !== oldData.link) updatedFields.push("link");

          // TODO @SauceX22 poster changes system update
          // if (data.organizers !== oldData.organizers) {
          //    updatedFields.push("organizers");
          // }
          // TODO @SauceX22 organizer changes system update
          // if (data.organizers !== oldData.organizers) {
          //    updatedFields.push("organizers");
          // }
          // TODO @SauceX22 images changes system update
          // if (data.images !== oldData.images) {
          //    updatedFields.push("images");
          // }

          if (updatedFields.length > 0) {
            // Construct a descriptive message based on the updated fields
            // use the updatedFields array to construct the message (mention from and to values)
            // e.g. "Title changed from 'Old Title' to 'New Title'"
            // separate each field with a comma
            // for semester and category, use the number of semester, and name of the category instead of the id
            const updateDescription = `Updated event ${
              data.title
            } Updated fields: ${updatedFields
              .map((field) => {
                if (field === "semesterId") {
                  return `"Semester" from "${semesters?.find(
                    (semester) => semester.id === oldData.semesterId,
                  )?.number}" to "${semesters?.find(
                    (semester) => semester.id === data.semesterId,
                  )?.number}"`;
                }
                if (field === "categoryId") {
                  return `"Category" from "${categories?.find(
                    (category) => category.id === oldData.categoryId,
                  )?.name}" to "${categories?.find(
                    (category) => category.id === data.categoryId,
                  )?.name}"`;
                }
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
              type: "EVENT_UPDATE",
            });
          }
          selectEvent(data);
          await apiUtils.event.getAll.invalidate();
          toast({
            title: "Event Updated!",
            description: "Your event has been updated successfully.",
          });
        }
      },
    });

  useEffect(() => {
    if (selectedEvent) {
      form.reset({
        title: selectedEvent.title,
        description: selectedEvent.description,
        date: selectedEvent.date,
        semesterId: selectedEvent.semesterId,
        categoryId: selectedEvent.categoryId,
        link: selectedEvent.link,
      });
    } else {
      form.reset({
        title: "",
        description: "",
        date: undefined,
        semesterId: "",
        categoryId: "",
        link: "",
      });
    }
  }, [selectedEvent]);

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-2 justify-between"
        >
          <div>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <div className="mt-2 flex flex-col gap-2">
                  <FormLabel htmlFor="title">Title</FormLabel>
                  <FormControl className="">
                    <Input id="title" placeholder="Event Title" {...field} />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.title?.message}
                  </FormMessage>
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <div className="mt-2 flex flex-col gap-2">
                  <FormLabel htmlFor="description">Description</FormLabel>
                  <FormControl className="">
                    <Textarea
                      className="max-h-72"
                      id="description"
                      placeholder="Event Description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.description?.message}
                  </FormMessage>
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <div className="mt-2 flex flex-col gap-2">
                  <FormLabel htmlFor="link">Link</FormLabel>
                  <FormControl className="">
                    <Textarea
                      className="max-h-72"
                      id="link"
                      placeholder="Event Link"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.link?.message}
                  </FormMessage>
                </div>
              )}
            />
            <div className="w-full flex flex-row items-center gap-2 justify-between mt-2">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <div className="w-full flex flex-col">
                    <FormLabel htmlFor="date" className="m-1">
                      Event Date
                    </FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "font-normal mt-2 mr-2",
                              !form.getValues("date") &&
                                "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {form.getValues("date") ? (
                              format(form.getValues("date"), "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={form.getValues("date")}
                            onSelect={(date: Date | undefined) => {
                              if (date) form.setValue("date", date);
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage className="col-start-2 col-span-3">
                      {form.formState.errors.date?.message}
                    </FormMessage>
                  </div>
                )}
              />
              <div className="w-full">
                <Label htmlFor="picture" className="m-1">
                  Event Poster
                </Label>
                <Input id="picture" type="file" className="p-0 mt-2" />
              </div>
            </div>
            <div className="w-full flex flex-row items-center gap-2 justify-between">
              <FormField
                control={form.control}
                name="semesterId"
                render={({ field }) => (
                  <div className="w-full">
                    <FormLabel htmlFor="semesterId" className="m-1">
                      Semester
                    </FormLabel>
                    <FormControl>
                      {/* Custom Combobox for Semester */}
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger className="mt-2 mr-2">
                            <SelectValue placeholder="Select a Semester" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {semesters?.map((semester, index) => (
                            <SelectItem value={semester.id} key={index}>
                              Term {semester.number}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className="col-start-2 col-span-3">
                      {form.formState.errors.semesterId?.message}
                    </FormMessage>
                  </div>
                )}
              />
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <div className="w-full">
                    <FormLabel htmlFor="categoryId" className="m-1">
                      Category
                    </FormLabel>
                    <FormControl>
                      {/* Custom Combobox for Semester */}
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger className="mt-2 ">
                            <SelectValue placeholder="Select a Category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories?.map((category, index) => (
                            <SelectItem value={category.id} key={index}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className="col-start-2 col-span-3">
                      {form.formState.errors.categoryId?.message}
                    </FormMessage>
                  </div>
                )}
              />
            </div>
          </div>
          <Button
            variant="default"
            type="submit"
            className="w-full text-white mt-4"
            disabled={loadingCreate || loadingUpdate}
          >
            {loadingCreate || loadingUpdate ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : selectedEvent ? (
              <Icons.edit className="mr-2 h-4 w-4" />
            ) : (
              <Icons.add className="mr-2 h-4 w-4" />
            )}
            {selectedEvent ? "Save Changes" : "Create New Event"}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default EventDisplay;

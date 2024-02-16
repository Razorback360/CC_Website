import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { cn, rtlSafetyProps } from "@/lib/utils";
import { api } from "@/utils/api";
import { useSelectedEvent } from "@/utils/hooks/use-selected-event";
import { useSystemUpdates } from "@/utils/hooks/use-system-updates";
import { supabase } from "@/utils/supabase";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, isSameDay } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const addEventFormSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().min(2).max(500),
  date: z.date(), // You can use a specific date format validation here
  semesterId: z.string().min(1), // Add validation if needed
  categoryId: z.string().min(1), // Add validation if needed
  link: z.string().url().min(0),
  public: z.boolean(),
  poster: z
    .custom<FileList>()
    .optional()
    .refine((files) => files?.length === 1 || files?.length === 0, {
      message: "File is required.",
    })
    .refine(
      (files) => {
        if (files && files.length > 0) {
          const file = files.item(0);
          return file ? ACCEPTED_IMAGE_TYPES.includes(file.type) : false;
        }
        return true; // If no file is provided, validation passes
      },
      { message: "Must be a PNG, JPG, JPEG, or WEBP." },
    )
    .refine(
      (files) => {
        if (files && files.length > 0) {
          const file = files.item(0);
          return file ? file.size <= MAX_FILE_SIZE : true;
        }
        return true; // If no file is provided, validation passes
      },
      { message: "Max file size is 5MB." },
    ),
  src: z.string().optional(),
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
      public: false,
      poster: undefined,
      src: "",
    },
  });

  const posterRef = form.register("poster", { required: false });

  async function onSubmit(data: z.infer<typeof addEventFormSchema>) {
    if (
      (isCreatingNewEvent || selectedEvent) &&
      !(selectedEvent && isCreatingNewEvent)
    ) {
      if (data.poster) {
        const posterImageFile = data.poster.item(0);
        if (posterImageFile) {
          const imagePath = `${
            data.title
          }/poster/poster.${posterImageFile.name.slice(
            ((posterImageFile.name.lastIndexOf(".") - 1) >>> 0) + 2,
          )}`;
          await supabase.storage
            .from("images")
            .upload(imagePath, posterImageFile, { upsert: true });
          data.src = `https://nfjirfbkulkxtgkdqmtn.supabase.co/storage/v1/object/public/images/${imagePath}`;
        }
      }
    }
    if (selectedEvent) {
      await updateEvent({ ...data, id: selectedEvent.id });
    } else if (isCreatingNewEvent) {
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

          if (data.public !== oldData.public) updatedFields.push("public");

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
        public: selectedEvent.public,
        poster: undefined,
        src: selectedEvent.src,
      });
    } else {
      form.reset({
        title: "",
        description: "",
        date: undefined,
        semesterId: "",
        categoryId: "",
        link: "",
        public: false,
        poster: undefined,
      });
    }
  }, [selectedEvent]);

  return (
    <>
      <ScrollArea className="h-[89vh]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-2 justify-between mr-5"
          >
            <div>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="mt-2 flex flex-col gap-2">
                    <FormLabel htmlFor="title">Title</FormLabel>
                    <FormControl id="title">
                    <Input
                      id="title"
                      placeholder="Event Title"
                      {...rtlSafetyProps(field.value)}
                      {...field}
                    />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.title?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="mt-2 flex flex-col gap-2">
                    <FormLabel htmlFor="description">Description</FormLabel>
                      {...rtlSafetyProps(field.value)}
                    <FormControl id="description">
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
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="link"
                render={({ field }) => (
                  <FormItem className="mt-2 flex flex-col gap-2">
                    <FormLabel htmlFor="link">Form Link</FormLabel>
                    <FormControl id="link">
                      <Input
                        type="text"
                        id="link"
                        placeholder="https://docs.google.com/forms/..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.link?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <div className="w-full flex flex-row items-center gap-2 justify-between mt-2">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="w-full flex flex-col">
                      <FormLabel htmlFor="date" className="m-1">
                        Event Date
                      </FormLabel>
                      <FormControl id="date">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              id="date"
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
                                <>Pick a date</>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              id="date"
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
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="poster"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel htmlFor="picture" className="m-1">
                        Event Poster
                      </FormLabel>
                      <FormControl id="picture">
                        <Input
                          {...posterRef}
                          id="picture"
                          type="file"
                          className="p-0 mt-2"
                          value={
                            selectedEvent?.src?.split("/").pop() ?? undefined
                          }
                        />
                      </FormControl>
                      <FormMessage>
                        {form.formState.errors.poster?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full flex flex-row items-center gap-2 justify-between">
                <FormField
                  control={form.control}
                  name="semesterId"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel htmlFor="semesterId" className="m-1">
                        Semester
                      </FormLabel>
                      <FormControl>
                        {/* Custom Combobox for Semester */}
                        <Select onValueChange={field.onChange}>
                          <FormControl id="semesterId">
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
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel htmlFor="categoryId" className="m-1">
                        Category
                      </FormLabel>
                      <FormControl>
                        {/* Custom Combobox for Semester */}
                        <Select onValueChange={field.onChange}>
                          <FormControl id="categoryId">
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
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="public"
                render={({ field }) => (
                  <FormItem className="mt-2 w-full flex flex-col">
                    <FormLabel id="public-status" className="m-1">
                      Public Status
                    </FormLabel>
                    <div className="flex flex-row gap-2 mt-2 m-1">
                      <FormControl id="public-status">
                        <Switch
                          id="public-status"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormDescription>
                        Set event as public or private.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
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
        {selectedEvent && selectedEvent.Attachments ? (
          <div className="h-1/2 w-2/5">
            <label>Current Poster</label>
            <img
              src={
                selectedEvent.Attachments.length > 0
                  ? selectedEvent.Attachments[0]?.src
                  : ""
              }
            />
          </div>
        ) : (
          ""
        )}
      </ScrollArea>
    </>
  );
};

export default EventDisplay;

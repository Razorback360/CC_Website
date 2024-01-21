import React, { useEffect, useState } from "react";
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
import { Combobox, ComboboxItem } from "@/components/ui/combobox"; // Import Combobox components
import { api } from "@/utils/api";

const addEventFormSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().min(2).max(500),
  date: z.string(), // You can use a specific date format validation here
  semesterId: z.string(), // Add validation if needed
  categoryId: z.string(), // Add validation if needed
  url: z.string().url().optional(),
});

type AddNewEventFormDialogProps = {
  children: React.ReactNode;
} & React.ComponentProps<typeof Dialog>;

export default function AddNewEventFormDialog({
  children,
  ...props
}: AddNewEventFormDialogProps) {
  const form = useForm<z.infer<typeof addEventFormSchema>>({
    resolver: zodResolver(addEventFormSchema),
    defaultValues: {
      title: "",
      description: "",
      date: "",
      semesterId: "",
      categoryId: "",
      url: "",
    },
  });

  // State variables for search
  const [semesterSearch, setSemesterSearch] = useState("");
  const [categorySearch, setCategorySearch] = useState("");

  // using trpc api fetch semesters and categories
  const { data: semesters } = api.semester.getAll.useQuery(undefined, {
    select: (data) =>
      data.map((semester) => ({
        id: semester.id,
        name: `Term ${semester.number}`,
      })),
  });

  // Sample categories data
  const { data: categories } = api.event.getAllCategories.useQuery(undefined, {
    select: (data) =>
      data.map((category) => ({
        id: category.id,
        name: category.name,
      })),
  });

  function onSubmit(data: z.infer<typeof addEventFormSchema>) {
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
    <Dialog {...props} onOpenChange={(open) => !open && form.reset()}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Create Event</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <div className="grid grid-cols-4 items-center gap-2">
                  <FormLabel htmlFor="title">Event Title</FormLabel>
                  <FormControl>
                    <Input
                      className="col-span-3"
                      id="title"
                      placeholder="Event Title"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="col-start-2 col-span-3">
                    {form.formState.errors.title?.message}
                  </FormMessage>
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <div className="grid grid-cols-4 items-center gap-2">
                  <FormLabel htmlFor="description">Description</FormLabel>
                  <FormControl>
                    <Input
                      className="col-span-3"
                      id="description"
                      placeholder="Event Description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="col-start-2 col-span-3">
                    {form.formState.errors.description?.message}
                  </FormMessage>
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <div className="grid grid-cols-4 items-center gap-2">
                  <FormLabel htmlFor="date">Date</FormLabel>
                  <FormControl>
                    <Input
                      className="col-span-3"
                      id="date"
                      placeholder="Event Date"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="col-start-2 col-span-3">
                    {form.formState.errors.date?.message}
                  </FormMessage>
                </div>
              )}
            />
            <div className="grid grid-cols-4 items-center gap-2">
              <FormLabel htmlFor="semesterId">Semester</FormLabel>
              <FormControl>
                {/* Custom Combobox for Semester */}
                <Combobox
                  placeholder="Select a Semester"
                  value={form.watch("semesterId")}
                  onValueChange={(value) =>
                    value && form.setValue("semesterId", value)
                  }
                  search={semesterSearch} // Use the search state
                  onSearchChange={setSemesterSearch} // Update search state
                  emptyState="No semesters found." // Placeholder for empty state
                >
                  {semesters?.map((semester) => (
                    <ComboboxItem key={semester.id} value={semester.id}>
                      {semester.name}
                    </ComboboxItem>
                  ))}
                </Combobox>
              </FormControl>
              <FormMessage className="col-start-2 col-span-3">
                {form.formState.errors.semesterId?.message}
              </FormMessage>
            </div>
            <div className="grid grid-cols-4 items-center gap-2">
              <FormLabel htmlFor="categoryId">Category</FormLabel>
              <FormControl>
                {/* Custom Combobox for Category */}
                <Combobox
                  placeholder="Select a Category"
                  value={form.watch("categoryId")}
                  onValueChange={(value) =>
                    value && form.setValue("categoryId", value)
                  }
                  search={categorySearch} // Use the search state
                  onSearchChange={setCategorySearch} // Update search state
                  emptyState="No categories found." // Placeholder for empty state
                >
                  {categories?.map((category) => (
                    <ComboboxItem key={category.id} value={category.id}>
                      {category.name}
                    </ComboboxItem>
                  ))}
                </Combobox>
              </FormControl>
              <FormMessage className="col-start-2 col-span-3">
                {form.formState.errors.categoryId?.message}
              </FormMessage>
            </div>
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <div className="grid grid-cols-4 items-center gap-2">
                  <FormLabel htmlFor="url">Event URL</FormLabel>
                  <FormControl>
                    <Input
                      className="col-span-3"
                      id="url"
                      placeholder="Event URL"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="col-start-2 col-span-3">
                    {form.formState.errors.url?.message}
                  </FormMessage>
                </div>
              )}
            />
            <div className="flex justify-end items-center gap-2">
              <Button variant="default" type="submit">
                Save Event
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

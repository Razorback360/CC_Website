import React, { useState } from "react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Icons } from "@/components/icons";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import UserProfile from "@/pages/dashboard/components/user-profile";
import Nav from "@/pages/dashboard/components/nav";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { api } from "@/utils/api";

const addEventFormSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().min(2).max(500),
  date: z.date(), // You can use a specific date format validation here
  semesterId: z.string(), // Add validation if needed
  categoryId: z.string(), // Add validation if needed
});

interface DashboardEventsProps {
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
}

export default function DashboardEvents({
  defaultLayout = [265, 600, 600],
  defaultCollapsed = false,
  navCollapsedSize,
}: DashboardEventsProps) {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  const form = useForm<z.infer<typeof addEventFormSchema>>({
    resolver: zodResolver(addEventFormSchema),
    defaultValues: {
      title: "",
      description: "",
      date: undefined,
      semesterId: "",
      categoryId: "",
    },
  });

  const { data: semesters } = api.semester.getAll.useQuery();

  const { data: categories } = api.event.getAllCategories.useQuery();

  const { data: events } = api.event.getAll.useQuery();

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
    <div className="h-screen w-screen">
      <TooltipProvider delayDuration={0}>
        <ResizablePanelGroup
          direction="horizontal"
          onLayout={(sizes: number[]) => {
            document.cookie = `react-resizable-panels:layout=${JSON.stringify(
              sizes,
            )}`;
          }}
          className="h-full items-stretch"
        >
          <ResizablePanel
            defaultSize={defaultLayout[0]}
            collapsedSize={navCollapsedSize}
            collapsible={true}
            minSize={15}
            maxSize={20}
            onCollapse={() => {
              setIsCollapsed(true);
              document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
                true,
              )}`;
            }}
            onExpand={() => {
              setIsCollapsed(false);
              document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
                false,
              )}`;
            }}
            className={cn(
              isCollapsed &&
                "min-w-[50px] transition-all duration-300 ease-in-out",
            )}
          >
            <div
              className={cn(
                "flex h-[52px] items-center justify-center",
                isCollapsed ? "h-[52px]" : "px-2",
              )}
            >
              <UserProfile />
            </div>
            <Separator />
            <Nav
              isCollapsed={isCollapsed}
              links={[
                {
                  title: "Overview",
                  label: "128",
                  icon: Icons.chart,
                  variant: "ghost",
                  href: "/dashboard/test",
                },
                {
                  title: "Events",
                  label: "9",
                  icon: Icons.events,
                  variant: "default",
                  href: "/dashboard/events",
                },
                {
                  title: "Members",
                  label: "",
                  icon: Icons.users,
                  variant: "ghost",
                  href: "#",
                },
                {
                  title: "Privileges",
                  label: "23",
                  icon: Icons.dCheck,
                  variant: "ghost",
                  href: "#",
                },
              ]}
            />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
            <div className="flex items-center px-4 py-3">
              <h1 className="text-xl font-bold">Events Management</h1>
            </div>
            <Separator />
            <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <h1 className="font-semibold text-lg mb-2">Create an Event</h1>
              <ScrollArea className="h-screen mt-5 mb-5">
                <div className="flex flex-col gap-2 p-4 pt-0">
                  {events?.map((event, index) => {
                    return (
                      <button
                        key={index}
                        className={cn(
                          "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
                        )}
                      >
                        <div className="flex w-full flex-col gap-1">
                          <div className="flex items-center">
                            <div className="flex items-center gap-2">
                              <div className="font-semibold">{event.title}</div>
                            </div>
                            <div
                              className={cn("ml-auto text-xs text-foreground")}
                            >
                              {event.date.toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        <div className="line-clamp-2 text-xs text-muted-foreground">
                          {event.description.substring(0, 300)}
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">
                            {event.Category.name}
                          </Badge>
                          <Badge variant="secondary">
                            Term {event.Semester.number}
                          </Badge>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </ScrollArea>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={defaultLayout[2]}>
            <div className="flex items-center px-4 py-3">
              <h1 className="text-xl font-bold">
                <br />
              </h1>
            </div>
            <Separator />
            <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <h1 className="font-semibold text-lg mb-2">Create an Event</h1>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <div className="relative border p-2 rounded-lg">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <>
                          <FormLabel htmlFor="title" className="m-1">
                            Title
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="pl-3 mb-3 mt-2"
                              id="title"
                              placeholder="Event Title"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="col-start-2 col-span-3">
                            {form.formState.errors.title?.message}
                          </FormMessage>
                        </>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <>
                          <FormLabel htmlFor="description" className="m-1">
                            Description
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              className="pl-3 mb-3 mt-2"
                              id="description"
                              placeholder="Event Description"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="col-start-2 col-span-3">
                            {form.formState.errors.description?.message}
                          </FormMessage>
                        </>
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
                                <PopoverContent
                                  className="w-auto p-0"
                                  align="start"
                                >
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
                    <Button
                      variant="default"
                      type="submit"
                      className="w-full text-white mt-5"
                    >
                      Create
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </TooltipProvider>
    </div>
  );
}

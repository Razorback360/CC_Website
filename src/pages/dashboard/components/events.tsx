import React, { useState } from "react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Icons } from "@/components/icons";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UserProfile } from "@/pages/dashboard/components/user-profile";
import { RecentActivityDisplay } from "@/pages/dashboard/components/recent-activity";
import { Nav } from "@/pages/dashboard/components/nav";
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
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
const addEventFormSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().min(2).max(500),
  date: z.date(), // You can use a specific date format validation here
  semesterId: z.string(), // Add validation if needed
  categoryId: z.string(), // Add validation if needed
});

interface MailProps {
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
}

export function DashboardEvents({
  defaultLayout = [265, 440, 655],
  defaultCollapsed = false,
  navCollapsedSize,
}: MailProps) {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  const [date, setDate] = useState<Date>()
  const form = useForm<z.infer<typeof addEventFormSchema>>({
    resolver: zodResolver(addEventFormSchema),
    defaultValues: {
      title: "",
      description: "",
      date: new Date(),
      semesterId: "",
      categoryId: "",
    },
  });

  // using trpc api fetch semesters and categories
  // const { data: semesters } = api.semester.getAll.useQuery(undefined, {
  //   select: (data) =>
  //     data.map((semester) => ({
  //       id: semester.id,
  //       name: `Term ${semester.number}`,
  //     })),
  // });

  // // Sample categories data
  // const { data: categories } = api.event.getAllCategories.useQuery(undefined, {
  //   select: (data) =>
  //     data.map((category) => ({
  //       id: category.id,
  //       name: category.name,
  //     })),
  // });

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
                  href: "/dashboard/test"
                },
                {
                  title: "Events",
                  label: "9",
                  icon: Icons.events,
                  variant: "default",
                  href: "/dashboard/events"
                },
                {
                  title: "Members",
                  label: "",
                  icon: Icons.users,
                  variant: "ghost",
                  href: "#"
                },
                {
                  title: "Privileges",
                  label: "23",
                  icon: Icons.dCheck,
                  variant: "ghost",
                  href: "#"
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
                  {[{ id: "#21321", title: "Test Event", category: "Workshop", date: "2024/06/02", semester: "232", description: "Lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet" }].map((event, index) => {
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
                              className={cn(
                                "ml-auto text-xs text-foreground"
                              )}
                            >
                              {event.date}
                            </div>
                          </div>
                        </div>
                        <div className="line-clamp-2 text-xs text-muted-foreground">
                          {event.description.substring(0, 300)}
                        </div>
                        <div className="flex items-center gap-2">

                          <Badge variant="secondary">
                            {event.category}
                          </Badge>
                          <Badge variant="secondary">
                            {event.semester}
                          </Badge>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </ScrollArea>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={defaultLayout[2]}>
            <div className="flex items-center px-4 py-3">
              <h1 className="text-xl font-bold"><br /></h1>
            </div>
            <Separator />
            <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <h1 className="font-semibold text-lg mb-2">Create an Event</h1>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="relative border p-2 rounded-lg">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <>
                          <FormLabel htmlFor="title" className="m-1">Title</FormLabel>
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
                          <FormLabel htmlFor="description" className="m-1">Description</FormLabel>
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
                    <div className="flex flex-row justify-between mb-3 mt-2">
                      <div className="flex flex-col">
                        <FormLabel className="m-1">Event Date</FormLabel>
                        <FormControl>
                          <Popover >
                            <PopoverTrigger asChild>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-[240px] justify-start text-left font-normal mt-2 mr-2",
                                  !date && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? format(date, "PPP") : <span>Pick a date</span>}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={date}
                                onSelect={(date: Date | undefined) => {
                                  if (date) form.setValue("date", date)
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
                      <div className="flex flex-col">
                        <Label htmlFor="picture" className="m-1">Event Poster</Label>
                        <Input id="picture" type="file" className="p-0 mt-2 w-[275px]" />
                      </div>
                    </div>
                    <div className="flex flex-row justify-between ">
                      <div className="flex flex-col">
                        <FormField
                          control={form.control}
                          name="semesterId"
                          render={({ field }) => (
                            <>
                              <FormLabel htmlFor="semesterId" className="m-1">Semester</FormLabel>
                              <FormControl>
                                {/* Custom Combobox for Semester */}
                                <Select onValueChange={field.onChange}>
                                  <FormControl>
                                    <SelectTrigger className="w-[240px] mt-2 mr-2">
                                      <SelectValue placeholder="Select a Semester" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {[{ id: "test", name: "test" }].map((semester, index) => (
                                      <SelectItem value={semester.id} key={index}>{semester.name}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </FormControl>
                              <FormMessage className="col-start-2 col-span-3">
                                {form.formState.errors.semesterId?.message}
                              </FormMessage>
                            </>
                          )}
                        />
                      </div>
                      <div className="flex flex-col">
                        <FormField
                          control={form.control}
                          name="categoryId"
                          render={({ field }) => (
                            <>
                              <FormLabel htmlFor="categoryId" className="m-1">Category</FormLabel>
                              <FormControl>
                                {/* Custom Combobox for Semester */}
                                <Select onValueChange={field.onChange}>
                                  <FormControl>
                                    <SelectTrigger className="w-[275px] mt-2 ">
                                      <SelectValue placeholder="Select a Category" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {[{ id: "test", name: "test" }].map((category, index) => (
                                      <SelectItem value={category.id} key={index}>{category.name}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </FormControl>
                              <FormMessage className="col-start-2 col-span-3">
                                {form.formState.errors.categoryId?.message}
                              </FormMessage>
                            </>
                          )}
                        />
                      </div>
                    </div>
                    <Button variant="default" type="submit" className="w-full text-white mt-5">Create</Button>
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

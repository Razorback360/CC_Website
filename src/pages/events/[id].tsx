import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LayoutGrid } from "@/components/ui/layout-grid";
import { Separator } from "@/components/ui/separator";
import { api } from "@/utils/api";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Event() {
  const router = useRouter();
  const { id: eventId } = router.query as { id: string };
  const event = api.event.get.useQuery({ id: eventId });

  return (
    <>
      <Head>
        <title>Computer Club - KFUPM</title>
        <meta name="description" content="Home of KFUPM's Computer Club" />
      </Head>
      <div className="w-[99vw]">
        <section className="flex flex-row mt-5 justify-center">
          <div className="flex-col flex w-1/6">
            <img
              src="https://pbs.twimg.com/media/GFAwUcbWkAAVbkg?format=jpg&name=900x900"
              className="rounded-xl border-4 border-foreground"
            />
          </div>
          <div className="flex flex-col justify-center items-center w-auto">
            <h1 className="text-2xl">Lorem Ipsum Dolor</h1>
            <p className="text-md text-muted-foreground w-1/2 mb-1">
              {event.data?.date.toDateString()} • Organized by Name 1, Name 2,
              Name 3
            </p>
            <div className="flex flex-row mb-2 space-x-2">
              <Badge variant="secondary">{event.data?.Category.name}</Badge>
              <Badge variant="secondary">
                Term {event.data?.Semester.number}
              </Badge>
            </div>
            <p className="text-md text-muted-foreground w-1/2">
              Lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum
              dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit
              amet
            </p>
            <Button className="w-1/2 my-2" asChild variant="default" size="sm">
              <Link href="...">Register</Link>
            </Button>
          </div>
        </section>
        <Separator className="my-5" />
        <div className="h-screen py-5 w-full flex flex-col justify-center items-center">
          <h1 className="text-2xl">Image Gallery</h1>
          <LayoutGrid cards={cards} />
        </div>
      </div>
    </>
  );
}
const Skeleton = () => {
  return <div></div>;
};

const cards = [
  {
    id: 1,
    content: <Skeleton />,
    className: "md:col-span-2",
    thumbnail:
      "https://images.unsplash.com/photo-1476231682828-37e571bc172f?q=80&w=3474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    content: <Skeleton />,
    className: "col-span-1",
    thumbnail:
      "https://images.unsplash.com/photo-1464457312035-3d7d0e0c058e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    content: <Skeleton />,
    className: "col-span-1",
    thumbnail:
      "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    content: <Skeleton />,
    className: "md:col-span-2",
    thumbnail:
      "https://images.unsplash.com/photo-1475070929565-c985b496cb9f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

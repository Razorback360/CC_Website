import MemberCard from "../../components/dashboard/MemberCard";
import Sidebar from "../../components/dashboard/Sidebar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const members = () => {
  return (
    <div className="w-full container py-5">
      <section className="ml-auto w-2/3 flex flex-col gap-4 border-solid border-2 border-primary rounded-sm px-5 pt-5 border-b-0">
        <div className="flex items-center justify-start gap-4">
          <form className="relative">
            <button className="bg-secondary text-center p-2 rounded-l">
              Filters
            </button>
            <input type="text" className="rounded-r bg-primary border-none" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6 absolute right-2 top-2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </form>
          <Button variant="default">
            <Link href="...">Add</Link>
          </Button>
          <Button variant="secondary">
            <Link href="...">Edit</Link>
          </Button>
        </div>
        <div className="flex flex-col gap-4">
          <MemberCard />
          <MemberCard />
          <MemberCard />
          <MemberCard />
        </div>
      </section>
    </div>
  );
};

export default members;

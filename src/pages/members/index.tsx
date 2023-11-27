import MemberCard from "../../components/dashboard/MemberCard";
import Sidebar from "../../components/dashboard/Sidebar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const membersList = [
  {
    id: 83030,
    name: "Moaz Abdelaziz",
    img: "/profilePic.png",
    position: "Leader",
    major: "COE",
    team: "Tech Web",
    status: true,
  },
  {
    id: 83030,
    name: "Moaz Abdelaziz",
    img: "/profilePic.png",
    position: "Leader",
    major: "COE",
    team: "Tech Web",
    status: true,
  },
  {
    id: 83030,
    name: "Moaz Abdelaziz",
    img: "/profilePic.png",
    position: "Leader",
    major: "COE",
    team: "Tech Web",
    status: true,
  },
  {
    id: 83030,
    name: "Moaz Abdelaziz",
    img: "/profilePic.png",
    position: "Leader",
    major: "COE",
    team: "Tech Web",
    status: true,
  },
  {
    id: 83030,
    name: "Moaz Abdelaziz",
    img: "/profilePic.png",
    position: "Leader",
    major: "COE",
    team: "Tech Web",
    status: false,
  },
  {
    id: 83030,
    name: "Moaz Abdelaziz",
    img: "/profilePic.png",
    position: "Leader",
    major: "COE",
    team: "Tech Web",
    status: true,
  },
  {
    id: 83030,
    name: "Moaz Abdelaziz",
    img: "/profilePic.png",
    position: "Leader",
    major: "COE",
    team: "Tech Web",
    status: true,
  },
];

const members = () => {
  return (
    <div className="w-full container py-5">
      <section className="ml-auto w-2/3 flex flex-col gap-4 px-5 pt-5">
        <div className="flex items-center justify-end gap-4">
          <Button variant="default">
            <Link href="...">Add</Link>
          </Button>
          <Button variant="secondary">
            <Link href="...">Edit</Link>
          </Button>
          <form className="relative">
            <input type="text" className="rounded-l bg-primary border-none" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6 absolute left-2 top-2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
            <button className="bg-secondary text-center p-2 rounded-r">
              Filters
            </button>
          </form>
        </div>
        <div className="flex flex-col gap-4">
          {membersList.map((member) => (
            <MemberCard key={member.id} info={member} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default members;

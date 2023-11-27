import { Search } from "lucide-react";
import MemberCard from "../../components/dashboard/MemberCard";
import Sidebar from "../../components/dashboard/Sidebar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Member } from "types";

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
    id: 83031,
    name: "Moaz Abdelaziz",
    img: "/profilePic.png",
    position: "Leader",
    major: "COE",
    team: "Tech Web",
    status: true,
  },
  {
    id: 83032,
    name: "Moaz Abdelaziz",
    img: "/profilePic.png",
    position: "Leader",
    major: "COE",
    team: "Tech Web",
    status: true,
  },
  {
    id: 83033,
    name: "Moaz Abdelaziz",
    img: "/profilePic.png",
    position: "Leader",
    major: "COE",
    team: "Tech Web",
    status: true,
  },
  {
    id: 83034,
    name: "Moaz Abdelaziz",
    img: "/profilePic.png",
    position: "Leader",
    major: "COE",
    team: "Tech Web",
    status: false,
  },
  {
    id: 83035,
    name: "Moaz Abdelaziz",
    img: "/profilePic.png",
    position: "Leader",
    major: "COE",
    team: "Tech Web",
    status: true,
  },
  {
    id: 83036,
    name: "Moaz Abdelaziz",
    img: "/profilePic.png",
    position: "Leader",
    major: "COE",
    team: "Tech Web",
    status: true,
  },
];

const Members = () => {
  return (
    <div className="w-full lg:container lg:py-5 relative">
      <Sidebar />
      <section className="ml-auto lg:w-2/3 flex flex-col gap-4 px-5 pt-5">
        <div className="flex items-center justify-end gap-4">
          <Button variant="default">
            <Link href="...">Add</Link>
          </Button>
          <Button variant="secondary">
            <Link href="...">Edit</Link>
          </Button>
          <Search />
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

export default Members;

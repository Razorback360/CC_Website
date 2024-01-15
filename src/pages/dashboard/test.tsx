import React from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import { Icons } from "@/components/icons";
import EventCard from "@/components/dashboard/EventCard";
import { DashboardOverview } from "./components/overview";

const evnets = [
  {
    id: 1,
    name: "Evetn 1",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex cumque doloremque porro corrupti vel et molestiae. Dolorem, repellendus exercitationem odio vitae deserunt, tempore animi eveniet veniam, dolor culpa temporibus deleniti.",
    link: "/aosipfhapidfj",
  },
  {
    id: 2,
    name: "Evetn 1",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex cumque doloremque porro corrupti vel et molestiae. Dolorem, repellendus exercitationem odio vitae deserunt, tempore animi eveniet veniam, dolor culpa temporibus deleniti.",
    link: "/aosipfhapidfj",
  },
  {
    id: 3,
    name: "Evetn 1",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex cumque doloremque porro corrupti vel et molestiae. Dolorem, repellendus exercitationem odio vitae deserunt, tempore animi eveniet veniam, dolor culpa temporibus deleniti.",
    link: "/aosipfhapidfj",
  },
  {
    id: 4,
    name: "Evetn 1",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex cumque doloremque porro corrupti vel et molestiae. Dolorem, repellendus exercitationem odio vitae deserunt, tempore animi eveniet veniam, dolor culpa temporibus deleniti.",
    link: "/aosipfhapidfj",
  },
];

const updates = [
  {
    id: 1,
    category: "New Member",
    member: "Moaz Abdelaziz",
    info: "Moaz added new member to the tech team recently.",
  },
  {
    id: 2,
    category: "New Member",
    member: "Moaz Abdelaziz",
    info: "Moaz added new member to the tech team recently.",
  },
  {
    id: 3,
    category: "New Member",
    member: "Moaz Abdelaziz",
    info: "Moaz added new member to the tech team recently.",
  },
];

const Dashboard = () => {
  return (
    <div className="w-full h-full">
      <DashboardOverview
        mails={[]}
        defaultLayout={undefined}
        navCollapsedSize={0}
      />
    </div>
  );
};

export default Dashboard;

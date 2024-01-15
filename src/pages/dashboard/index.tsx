import React from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import { Icons } from "@/components/icons";
import EventCard from "@/components/dashboard/EventCard";

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
    <div className="w-full lg:container lg:py-5 relative">
      <Sidebar />
      <section className="ml-auto lg:w-3/4 flex flex-col gap-4">
        {/* Quick view bar */}
        <div className="hidden md:flex gap-4 w-full justify-between">
          <div className="w-1/3 flex gap-2 border-white border-2 py-4 items-center">
            <Icons.person className="w-1/3 text-3xl border-r-2 border-white" />
            <div>
              <span>28</span> Active Members
            </div>
          </div>
          <div className="w-1/3 flex gap-2 border-white border-2 py-4 items-center">
            <Icons.eventsDone className="w-1/3 text-3xl border-r-2 border-white" />
            <div>
              <span>28</span> Done Events
            </div>
          </div>
          <div className="w-1/3 flex gap-2 border-white border-2 py-4 items-center">
            <Icons.eventsRemain className="w-1/3 text-3xl border-r-2 border-white" />
            <div>
              <span>28</span> Remaining Events
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          {/* Upcoming events field */}
          <div className="w-2/3">
            <div className="border-white border-2 p-4">
              <h2 className="text-4xl font-bold">Upcoming Events</h2>
              {evnets.map((event) => (
                <EventCard key={event.id} info={event} />
              ))}
            </div>
            <div></div>
          </div>
          {/* Recent Updates */}
          <div className="w-1/3 h-full overflow-scroll">
            <div className="border-white border-2 py-4">
              <h2 className="text-4xl font-bold mb-4 text-center">
                Recent Updates
              </h2>
              {updates.map((update) => (
                <div key={update.id} className="border-white border-2 p-4">
                  <p className="rounded-sm text-center text-white px-5 bg-primary w-fit my-2">
                    {update.category}
                  </p>
                  <h4 className="text-lg font-bold">{update.member}</h4>
                  <p>{update.info}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;

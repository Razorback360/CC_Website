import React from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import { Icons } from "@/components/icons";

const Dashboard = () => {
  return (
    <div className="w-full lg:container lg:py-5 relative">
      <Sidebar />
      <section className="ml-auto lg:w-2/3 flex flex-col gap-4">
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
      </section>
    </div>
  );
};

export default Dashboard;

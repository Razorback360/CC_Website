import React from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import { Icons } from "@/components/icons";
import EventCard from "@/components/dashboard/EventCard";
import DashboardOverview  from "./components/overview";

const Dashboard = () => {
  return (
    <div className="w-full h-full">
      <DashboardOverview
        defaultLayout={undefined}
        navCollapsedSize={0}
      />
    </div>
  );
};

export default Dashboard;

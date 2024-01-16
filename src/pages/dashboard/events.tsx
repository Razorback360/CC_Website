import React from "react";
import { DashboardEvents } from "@/pages/dashboard/components/events";

const Dashboard = () => {
  return (
    <div className="w-full h-full">
      <DashboardEvents
        defaultLayout={undefined}
        navCollapsedSize={0}
      />
    </div>
  );
};

export default Dashboard;

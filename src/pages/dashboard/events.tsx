import React from "react";
import DashboardEvents from "@/components/dashboard/events/events-dashboard";

const Dashboard = () => {
  return (
    <div className="w-screen h-screen">
      <DashboardEvents defaultLayout={undefined} navCollapsedSize={0} />
    </div>
  );
};

export default Dashboard;

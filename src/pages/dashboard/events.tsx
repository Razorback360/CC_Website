import React from "react";
import DashboardEvents from "@/components/dashboard/events/dashboard-events";
import DashboardLayout from "@/components/dashboard/dashboard-layout";

const Events = () => {
  return (
    <DashboardLayout
      pageTitle="Dashboard Events"
      description="Manage your club's events."
      defaultLayout={[265, 600, 600]}
      navCollapsedSize={0}
    >
      <DashboardEvents defaultLayout={[265, 600, 600]} />
    </DashboardLayout>
  );
};

export default Events;

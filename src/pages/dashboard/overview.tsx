import React from "react";
import DashboardOverview from "@/components/dashboard/overview/dashboard-overview";
import DashboardLayout from "@/components/dashboard/dashboard-layout";

const Overview = () => {
  return (
    <DashboardLayout defaultLayout={[265, 440, 655]} navCollapsedSize={0}>
      <DashboardOverview defaultLayout={[265, 440, 655]} />
    </DashboardLayout>
  );
};

export default Overview;

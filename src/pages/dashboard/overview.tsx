import React from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import { Icons } from "@/components/icons";
import EventCard from "@/components/dashboard/EventCard";
import DashboardOverview from "../../components/dashboard/overview/dashboard-overview";
import DashboardLayout from "@/components/dashboard/layout";

const Dashboard = () => {
  return (
    <DashboardLayout defaultLayout={undefined} navCollapsedSize={0}>
      <DashboardOverview defaultLayout={undefined} />
    </DashboardLayout>
  );
};

export default Dashboard;

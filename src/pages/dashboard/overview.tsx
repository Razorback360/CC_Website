import React from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import { Icons } from "@/components/icons";
import EventCard from "@/components/dashboard/EventCard";
import DashboardOverview from "../../components/dashboard/overview/dashboard-overview";
import DashboardLayout from "@/components/dashboard/layout";

const Dashboard = () => {
  return (
    <DashboardLayout defaultLayout={[265, 440, 655]} navCollapsedSize={0}>
      <DashboardOverview />
    </DashboardLayout>
  );
};

export default Dashboard;

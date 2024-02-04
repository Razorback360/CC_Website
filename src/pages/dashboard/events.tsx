import DashboardLayout from "@/components/dashboard/dashboard-layout";
import DashboardEvents from "@/components/dashboard/events/dashboard-events";

const Events = () => {
  return (
    <DashboardLayout
      pageTitle="Events Dashboard"
      description="Manage your club's events."
      defaultLayout={[265, 600, 600]}
      navCollapsedSize={0}
    >
      <DashboardEvents defaultLayout={[265, 600, 600]} />
    </DashboardLayout>
  );
};

export default Events;

import DashboardLayout from "@/components/dashboard/dashboard-layout";
import DashboardMembers from "@/components/dashboard/members/dashboard-members";

const Members = () => {
  return (
    <DashboardLayout
      pageTitle="Members Dashboard"
      description="General overview of your club."
      defaultLayout={[265, 440, 655]}
      navCollapsedSize={0}
    >
      <DashboardMembers defaultLayout={[265, 440, 655]} />
    </DashboardLayout>
  );
};

export default Members;

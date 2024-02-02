import DashboardLayout from "@/components/dashboard/dashboard-layout";
import DashboardMembers from "@/components/dashboard/members/dashboard-members";

const membersList = [
  {
    id: 83030,
    name: "Moaz Abdelaziz",
    img: "/profilePic.png",
    position: "Leader",
    major: "COE",
    team: "Tech Web",
    status: true,
  },
  {
    id: 83031,
    name: "Moaz Abdelaziz",
    img: "/profilePic.png",
    position: "Leader",
    major: "COE",
    team: "Tech Web",
    status: true,
  },
  {
    id: 83032,
    name: "Moaz Abdelaziz",
    img: "/profilePic.png",
    position: "Leader",
    major: "COE",
    team: "Tech Web",
    status: true,
  },
  {
    id: 83033,
    name: "Moaz Abdelaziz",
    img: "/profilePic.png",
    position: "Leader",
    major: "COE",
    team: "Tech Web",
    status: true,
  },
  {
    id: 83034,
    name: "Moaz Abdelaziz",
    img: "/profilePic.png",
    position: "Leader",
    major: "COE",
    team: "Tech Web",
    status: false,
  },
  {
    id: 83035,
    name: "Moaz Abdelaziz",
    img: "/profilePic.png",
    position: "Leader",
    major: "COE",
    team: "Tech Web",
    status: true,
  },
  {
    id: 83036,
    name: "Moaz Abdelaziz",
    img: "/profilePic.png",
    position: "Leader",
    major: "COE",
    team: "Tech Web",
    status: true,
  },
];

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

{
  /* <Sidebar />
  <section className="ms-auto lg:w-3/4 flex flex-col gap-4 px-5 pt-5">
    <div className="flex items-center justify-end gap-4">
      <Button variant="default">
        <Link href="...">Add</Link>
      </Button>
      <Button variant="secondary">
        <Link href="...">Edit</Link>
      </Button>
      <Icons.search />
    </div>
    <div className="flex flex-col gap-4">
      {membersList.map((member) => (
        <MemberCard key={member.id} info={member} />
      ))}
    </div>
  </section>
</DashboardLayout> */
}

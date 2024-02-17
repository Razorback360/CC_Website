import EventsGrid from "@/components/landing-page/events-grid";
import HeroSection from "@/components/landing-page/hero-section";
import VisionSection from "@/components/landing-page/vision-section";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from "@/utils/api";
import { AttachmentType } from "@prisma/client";
import Head from "next/head";

// the data is for rendering the events and members cards
const data = {
  events: [
    {
      name: "ICS 108 Help Session",
      term: "T231",
      image: "/1-1.jpg",
      content: "Help session for ICS 108 students",
    },
    {
      name: "ICS 253 Help Session",
      term: "T231",
      image: "/1-1.jpg",
      content: "Help session for ICS 253 students",
    },
    {
      name: "Hack Me",
      term: "T231",
      image: "/1-1.jpg",
      content: "Learn how Cybersecurity works",
    },
    {
      name: "Git And Github Workshop",
      term: "T231",
      image: "/1-1.jpg",
      content: "Learn how to use git and github",
    },
  ],
  members: [
    {
      name: "Member Name",
      term: "T231",
      image: "/1-1.jpg",
      role: "Leader",
    },
    {
      name: "Member Name",
      term: "T231",
      image: "/1-1.jpg",
      role: "Leader",
    },
    {
      name: "Member Name",
      term: "T231",
      image: "/1-1.jpg",
      role: "Leader",
    },
    {
      name: "Member Name",
      term: "T231",
      image: "/1-1.jpg",
      role: "Leader",
    },
  ],
};

export default function Home() {
  const { data: upcomingdEvents } = api.event.getAllUpcomingPublic.useQuery();
  const { data: pastEvents } = api.event.getAllPastPublic.useQuery();

  const upcomingEvents = [
    {
      id: "cls7t2owp0000li08gllsdqud",
      title: "Git & Github",
      description:
        "ايم تسمع عن Git & Github وعن ايش هي مهارة مهمة جدًا لك كمبرمج 👨🏻‍💻\n\nوعشان كذا حابين نعلن عن ورشة عمل بعنوان:\n🔺Git & GitHub\n\n🗓️: الأربعاء 29 نوفمبر \n🕖: 7:00 - 9:00  مساءً",
      date: new Date("2023-11-28T21:00:00.000Z"),
      public: true,
      semesterId: "cls6hh0yd0001lkr8uy6diljz",
      categoryId: "cls6hhxdc0004lkr8mwvqt2wo",
      link: "https://google.com/",
      Semester: {
        id: "cls6hh0yd0001lkr8uy6diljz",
        number: 231,
      },
      Category: {
        id: "cls6hhxdc0004lkr8mwvqt2wo",
        name: "Workshop",
      },
      Attachments: [
        {
          id: "cls7t2owp0001li0871pmdrh5",
          src: "https://nfjirfbkulkxtgkdqmtn.supabase.co/storage/v1/object/public/images/Git & Github/poster/poster.jpg",
          type: "EVENT_POSTER" as AttachmentType,
          eventId: "cls7t2owp0000li08gllsdqud",
          uploaderId: "cls7rqxkt0000vojsc9em1ims",
        },
      ],
    },
    {
      id: "cls7rd9gq0000jq082b7im5hm",
      title: "Flutter Weekend",
      description:
        "يعلن \n@GDSC_KFUPM\n وبالتعاون مع نادي الحاسب وقسم الحاسب وتقنية المعلومات \n\nعن اطلاق هاكاثون:\n💙🐦 Flutter Weekend\n\nثلاث ايام من الاجواء الحماسية والتنافسية للفوز على مجموع جوائز 6000 ريال، والحصول على فرص تدريبية ووظائف دوام جزئي📝💰✨\n\n- التسجيل مفتوح للجنسين👨🏻‍💻👩🏻‍💻\n#KFUPM\n#KFUPM_CC",
      date: new Date("2023-11-29T21:00:00.000Z"),
      public: true,
      semesterId: "cls6hh0yd0001lkr8uy6diljz",
      categoryId: "cls6hhxdc0003lkr8608d9ymk",
      link: "https://t.co/fBqkuSKfru",
      Semester: {
        id: "cls6hh0yd0001lkr8uy6diljz",
        number: 231,
      },
      Category: {
        id: "cls6hhxdc0003lkr8608d9ymk",
        name: "Bootcamp",
      },
      Attachments: [
        {
          id: "cls7rd9gq0001jq08rowhppnx",
          src: "https://nfjirfbkulkxtgkdqmtn.supabase.co/storage/v1/object/public/images/Flutter Weekend/poster/F_3mtdEWMAAwiNH.jpg",
          type: "EVENT_POSTER" as AttachmentType,
          eventId: "cls7rd9gq0000jq082b7im5hm",
          uploaderId: "cls6hdbw40000lkr8eid41c02",
        },
      ],
    },
    {
      id: "cls7t0xwr0000l308ptv770yy",
      title: "Can you Hack me?",
      description:
        "تدعوكم لجنة الأمن السيبراني في نادي الحاسب للحضور والمشاركة في تحدي:\n?Can you Hack me\n\nلمدة اسبوع كامل، كل يوم بعد الظهر بنكون متواجدين في مبنى 22، وبنتحداكم في بعض انواع التهكير في مجال الامن السيبراني 👨🏻‍💻\n\nالدعوة مفتوحه للجميع حياكم الله 💙\n",
      date: new Date("2024-01-20T21:00:00.000Z"),
      public: true,
      semesterId: "cls6hh6rw0002lkr83v4tmuy5",
      categoryId: "cls6hhxdc0004lkr8mwvqt2wo",
      link: "https://google.com/",
      Semester: {
        id: "cls6hh6rw0002lkr83v4tmuy5",
        number: 232,
      },
      Category: {
        id: "cls6hhxdc0004lkr8mwvqt2wo",
        name: "Workshop",
      },
      Attachments: [
        {
          id: "cls7t0xwr0001l308h0097i8n",
          src: "https://nfjirfbkulkxtgkdqmtn.supabase.co/storage/v1/object/public/images/Can you Hack me?/poster/poster.jpg",
          type: "EVENT_POSTER" as AttachmentType,
          eventId: "cls7t0xwr0000l308ptv770yy",
          uploaderId: "cls7rqxkt0000vojsc9em1ims",
        },
      ],
    },
    {
      id: "cls6j09uj0000lf088strgfbb",
      title: "Full Web Development Bootcamp",
      description:
        "\nزي ما وعدناكم السنة ذي غير 🔥\n\nنعلن وبالتعاون مع \n@GDSC_KFUPM\n عن اقامة اول معسكراتنا بعنوان:\n\n👨🏻‍💻⚡️Web development Bootcamp\n\nبناخذكم لمدة 3 ايام وبنتعلم فيها اساسيات تطوير الويب واهم التقنيات المستعمله⚡️\n",
      date: new Date("2024-02-04T21:00:00.000Z"),
      public: true,
      semesterId: "cls6hh6rw0002lkr83v4tmuy5",
      categoryId: "cls6hhxdc0003lkr8608d9ymk",
      link: " https://forms.gle/yVXmQQWfDM9r57ci9",
      Semester: {
        id: "cls6hh6rw0002lkr83v4tmuy5",
        number: 232,
      },
      Category: {
        id: "cls6hhxdc0003lkr8608d9ymk",
        name: "Bootcamp",
      },
      Attachments: [
        {
          id: "cls6j09uj0001lf082pps7fbw",
          src: "https://nfjirfbkulkxtgkdqmtn.supabase.co/storage/v1/object/public/images/Web%20Development%20Bootcamp/poster/GFAwUcbWkAAVbkg.jpg",
          type: "EVENT_POSTER" as AttachmentType,
          eventId: "cls6j09uj0000lf088strgfbb",
          uploaderId: "cls6hdbw40000lkr8eid41c02",
        },
      ],
    },
  ];

  return (
    <>
      <Head>
        <title>Computer Club - KFUPM</title>
        <meta name="description" content="Home of KFUPM's Computer Club" />
        {/* import pacifico and dancing script, and inter fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="w-full transition-all">
        <HeroSection />
        <VisionSection />
        <Tabs
          defaultValue="upcoming"
          id="events"
          className="justify-center items-center mx-auto flex flex-col w-full 2xl:w-[75%] 2xl:px-16 lg:px-8 px-4"
        >
          <h1 className="lg:text-7xl text-4xl font-extrabold my-12">
            Featured Events
          </h1>
          <TabsList className="mx-auto h-fit rounded-lg gap-2 w-full md:w-auto">
            <TabsTrigger
              value="upcoming"
              className="rounded-lg w-full py-4 text-xl"
            >
              Upcoming Events
            </TabsTrigger>
            <TabsTrigger
              value="past"
              className="rounded-lg w-full py-4 text-xl"
            >
              Past Events
            </TabsTrigger>
          </TabsList>
          <TabsContent value="upcoming" className="w-full h-fit">
            <EventsGrid events={upcomingEvents} />
          </TabsContent>
          <TabsContent value="past" className="w-full h-fit">
            <EventsGrid events={pastEvents} />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

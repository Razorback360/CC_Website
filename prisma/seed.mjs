import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const events = [
  {
    id: "d836d227-ddb1-5883-ac73-253cca656ee1",
    title: "Event 1",
    description: "Description for Event 1",
    date: new Date("2023-12-01T14:00:00Z"),
    Semester: {
      id: "c0e7363d-ec04-5ce6-afc7-bbb41b9fd259",
      number: 232,
    },
    semesterId: "c0e7363d-ec04-5ce6-afc7-bbb41b9fd259",
    Category: {
      id: "f8d2616e-a205-53ce-b655-5dcf29c3d1b4",
      name: "Category A",
    },
    categoryId: "f8d2616e-a205-53ce-b655-5dcf29c3d1b4",
    link: "https://example.com/event1",
  },
  {
    id: "61364583-48b6-514a-8979-7e1bd9e60f02",
    title: "Event 2",
    description: "Description for Event 2",
    date: new Date("2023-12-15T18:30:00Z"),
    Semester: {
      id: "c0e7363d-ec04-5ce6-afc7-bbb41b9fd259",
      number: 232,
    },
    semesterId: "c0e7363d-ec04-5ce6-afc7-bbb41b9fd259",
    Category: {
      id: "f6131c80-ed66-529e-a7c6-96721de3c4f3",
      name: "Category B",
    },
    categoryId: "f6131c80-ed66-529e-a7c6-96721de3c4f3",
    link: "https://example.com/event2",
  },
  {
    id: "8b561485-ef66-5d53-a004-95b0ba33998e",
    title: "Event 3",
    description: "Description for Event 3",
    date: new Date("2024-01-10T12:00:00Z"),
    Semester: {
      id: "c0e7363d-ec04-5ce6-afc7-bbb41b9fd259",
      number: 232,
    },
    semesterId: "c0e7363d-ec04-5ce6-afc7-bbb41b9fd259",
    Category: {
      id: "47040a3e-6ed3-585a-8074-e06c097ce5a1",
      name: "Category A",
    },
    categoryId: "47040a3e-6ed3-585a-8074-e06c097ce5a1",
    link: "https://example.com/event3",
  },
  {
    id: "0182ec1d-0159-51a1-898a-60958e1139b9",
    title: "Event 4",
    description: "Description for Event 4",
    date: new Date("2024-02-20T15:45:00Z"),
    Semester: {
      id: "c0e7363d-ec04-5ce6-afc7-bbb41b9fd259",
      number: 232,
    },
    semesterId: "c0e7363d-ec04-5ce6-afc7-bbb41b9fd259",
    Category: {
      id: "d892adf0-4259-5376-afe1-3cf601233d9f",
      name: "Category C",
    },
    categoryId: "d892adf0-4259-5376-afe1-3cf601233d9f",
    link: "https://example.com/event4",
  },
  {
    id: "b32f6aae-0e01-5409-9a97-956d8ada6bba",
    title: "Event 5",
    description: "Description for Event 5",
    date: new Date("2024-03-05T09:15:00Z"),
    Semester: {
      id: "c0e7363d-ec04-5ce6-afc7-bbb41b9fd259",
      number: 232,
    },
    semesterId: "c0e7363d-ec04-5ce6-afc7-bbb41b9fd259",
    Category: {
      id: "ec95a3ab-8b5d-5cc5-92d6-62c9945f1ad3",
      name: "Category B",
    },
    categoryId: "ec95a3ab-8b5d-5cc5-92d6-62c9945f1ad3",
    link: "https://example.com/event5",
  },
];
async function main() {
  await prisma.event.deleteMany();
  await prisma.eventCategory.deleteMany();
  await prisma.semester.deleteMany();

  await prisma.semester.createMany({
    data: [
      {
        id: "c0e7363d-ec04-5ce6-afc7-bbb41b9fd259",
        number: 232,
      },
    ],
    skipDuplicates: true,
  });

  await prisma.eventCategory.createMany({
    data: [
      {
        id: "f8d2616e-a205-53ce-b655-5dcf29c3d1b4",
        name: "Category A",
      },
      {
        id: "f6131c80-ed66-529e-a7c6-96721de3c4f3",
        name: "Category B",
      },
      {
        id: "47040a3e-6ed3-585a-8074-e06c097ce5a1",
        name: "Category A",
      },
      {
        id: "d892adf0-4259-5376-afe1-3cf601233d9f",
        name: "Category C",
      },
      {
        id: "ec95a3ab-8b5d-5cc5-92d6-62c9945f1ad3",
        name: "Category B",
      },
    ],
    skipDuplicates: true,
  });

  await prisma.event.createMany({
    data: events.map((event) => ({
      id: event.id,
      title: event.title,
      description: event.description,
      date: event.date,
      semesterId: event.semesterId,
      categoryId: event.categoryId,
      link: event.link,
    })),
    skipDuplicates: true,
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

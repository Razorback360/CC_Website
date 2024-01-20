import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { subMonths, startOfDay, startOfToday, isSameMonth } from "date-fns";

export const utilsRouter = createTRPCRouter({
  getSemesterStats: protectedProcedure.query(async ({ ctx }) => {
    // members:
    // ps: "this semester" is defined as the semester with the largest number property

    const currentSemester = await ctx.db.semester.findFirst({
      orderBy: {
        number: "desc",
      },
    });

    // events
    // count all events done/planned for this month and last month
    const eventsThisSemesterThisAndLastMonths = await ctx.db.event.findMany({
      where: {
        // take all events that are in the month and last month
        Semester: {
          number: currentSemester?.number,
        },
        AND: [
          {
            date: {
              // start of not this month, but the month before
              gte: subMonths(new Date(), 2),
            },
          },
          {
            date: {
              lte: startOfToday(),
            },
          },
        ],
      },
      include: {
        Semester: true,
      },
    });

    // calculate the percentage change from last month (locally)
    const totalEventsThisMonth = eventsThisSemesterThisAndLastMonths.filter(
      (event) =>
        isSameMonth(event.date, startOfDay(new Date())) &&
        event.Semester.number === currentSemester?.number,
    ).length;
    const totalEventsLastMonth = eventsThisSemesterThisAndLastMonths.filter(
      (event) =>
        isSameMonth(event.date, subMonths(startOfDay(new Date()), 1)) &&
        event.Semester.number === currentSemester?.number,
    ).length;
    const percentageChange = Math.round(
      ((totalEventsThisMonth - totalEventsLastMonth) / totalEventsLastMonth) *
        100,
    );

    // documentations
    // TODO: count the number of documentations uploaded this semester (no idea how to do this)

    // images
    // TODO @Razorback360: count the number of images uploaded this semester

    // members
    // count the active users in user allowed list
    const totalMembersThisSemester = await ctx.db.user.count({
      where: {
        Semesters: {
          some: {
            number: currentSemester?.number,
          },
        },
      },
    });

    return {
      events: {
        totalEventsThisMonth,
        percentageChange,
      },
      // documentations: totalDocumentationsThisSemester,
      // images: totalImagesThisSemester,
      totalMembersThisSemester,
    };
  }),
});

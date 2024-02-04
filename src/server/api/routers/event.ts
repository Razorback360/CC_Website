import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const eventRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.event.findMany({
      include: {
        Semester: true,
        Category: true,
        Attachments: {
          where: {
            type: "EVENT_POSTER",
          },
        },
      },
      orderBy: {
        date: "asc",
      },
    });
  }),
  getAllPublic: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.event.findMany({
      where: {
        public: true,
      },
      include: {
        Semester: true,
        Category: true,
        Attachments: {
          where: {
            type: "EVENT_POSTER",
          },
        },
      },
      orderBy: {
        date: "asc",
      },
    });
  }),
  getAllUpcomingPublic: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.event.findMany({
      where: {
        public: true,
        date: {
          gte: new Date(),
        },
      },
      include: {
        Semester: true,
        Category: true,
        Attachments: {
          where: {
            type: "EVENT_POSTER",
          },
        },
      },
      orderBy: {
        date: "asc",
      },
    });
  }),
  getAllPastPublic: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.event.findMany({
      where: {
        public: true,
        date: {
          lt: new Date(),
        },
      },
      include: {
        Semester: true,
        Category: true,
        Attachments: {
          where: {
            type: "EVENT_POSTER",
          },
        },
      },
      orderBy: {
        date: "asc",
      },
    });
  }),
  getAllCategories: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.eventCategory.findMany({});
  }),

  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1),
        description: z.string().min(1),
        date: z.date(),
        link: z.string().min(0),
        semesterId: z.string().min(1),
        categoryId: z.string().min(1),
        public: z.boolean(),
        src: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.event.create({
        data: {
          title: input.title,
          description: input.description,
          date: input.date,
          link: input.link,
          public: input.public,
          Category: {
            connect: {
              id: input.categoryId,
            },
          },
          Semester: {
            connect: {
              id: input.semesterId,
            },
          },
          Attachments: {
            create: {
              // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
              src: input.src as string,
              type: "EVENT_POSTER",
              Uploader: {
                connect: {
                  id: ctx.session.user.id,
                },
              },
            },
          },
        },
      });
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1),
        title: z.string().min(1).optional(),
        description: z.string().min(1).optional(),
        date: z.date().optional(),
        link: z.string().min(1).optional(),
        categoryId: z.string().min(1).optional(),
        semesterId: z.string().min(1).optional(),
        public: z.boolean().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.event.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
          description: input.description,
          date: input.date,
          link: input.link,
          public: input.public,
          Category: {
            connect: {
              id: input.categoryId,
            },
          },
          Semester: {
            connect: {
              id: input.semesterId,
            },
          },
        },
      });
    }),
  delete: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.event.delete({
        where: {
          id: input.id,
        },
      });
    }),
  get: publicProcedure
    .input(
      z.object({
        id: z.string().min(1),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.db.event.findUnique({
        where: {
          id: input.id,
        },
        include: {
          Organizers: true,
          Attachments: {
            where: {
              OR: [
                { type: "EVENT_POSTER" },
                { type: "EVENT_IMAGE" },
                { type: "EVENT_VIDEO" },
              ],
            },
          },
          Category: true,
          Semester: true,
        },
      });
    }),
});

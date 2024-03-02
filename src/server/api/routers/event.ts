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
        },
        include: {
          Category: true,
          Semester: true,
          Attachments: true,
        },
      });
    }),
  updatePublicStatus: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1),
        public: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.event.update({
        where: {
          id: input.id,
        },
        data: {
          public: input.public,
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
        include: {
          Category: true,
          Semester: true,
          Attachments: true,
        },
      });
    }),
  updatePoster: protectedProcedure
    .input(
      z.object({
        eventId: z.string().min(1),
        src: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const eventPoster = await ctx.db.attachment.findFirst({
        where: {
          eventId: input.eventId,
          type: "EVENT_POSTER",
        },
      });
      if (eventPoster) {
        await ctx.db.attachment.update({
          where: {
            id: eventPoster.id,
          },
          data: {
            src: input.src,
          },
        });
      } else {
        await ctx.db.attachment.create({
          data: {
            src: input.src,
            type: "EVENT_POSTER",
            Event: {
              connect: {
                id: input.eventId,
              },
            },
            Uploader: {
              connect: {
                id: ctx.session.user.id,
              },
            },
          },
        });
      }
      return await ctx.db.event.findUnique({
        where: {
          id: input.eventId,
        },
        include: {
          Attachments: {
            where: {
              type: "EVENT_POSTER",
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

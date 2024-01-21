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
        src: z.string()
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
              src: input.src,
              type: "EVENT_POSTER",
              Uploader: {
                connect: {
                  id: ctx.session.user.id
                }
              }
            }
          }
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
        public: z.boolean().optional()
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
});

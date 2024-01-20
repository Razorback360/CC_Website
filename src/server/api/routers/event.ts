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
        link: z.string().min(1),
        semesterId: z.string().min(1),
        categoryId: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.event.create({
        data: {
          title: input.title,
          description: input.description,
          date: input.date,
          link: input.link,
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

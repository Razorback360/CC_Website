import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { UserRole } from "@prisma/client";

export const userRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.user.findMany();
  }),
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.user.findUnique({
        where: { id: input.id },
      });
    }),
  addMember: protectedProcedure
    .input(
      z.object({
        studentId: z
          .string({
            invalid_type_error: "Invalid: StudentId is not of valid type",
          })
          .regex(/^s20\d{7}$/i, {
            message: "Invalid: StudentId is not of valid format",
          }),
        enabled: z.boolean(),
        tags: z.array(z.string()),
        role: z.nativeEnum(UserRole),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.user.create({
        data: {
          studentId: input.studentId,
          enabled: input.enabled,
          tags: input.tags,
          role: input.role,
        },
      });
    }),
  updateStatus: protectedProcedure
    .input(z.object({ id: z.string(), enabled: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.user.update({
        where: { id: input.id },
        data: { enabled: input.enabled },
      });
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        enabled: z.boolean().optional(),
        tags: z.array(z.string()).optional(),
        role: z.nativeEnum(UserRole).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.user.update({
        where: { id: input.id },
        data: {
          enabled: input.enabled,
          tags: input.tags,
          role: input.role,
        },
      });
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.user.delete({
        where: { id: input.id },
      });
    }),
});

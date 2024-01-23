import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const semesterRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ input, ctx }) => {
    return await ctx.db.semester.findMany({});
  }),
});

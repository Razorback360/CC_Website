import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const eventRouter = createTRPCRouter({
  getAllCategories: protectedProcedure.query(async ({ input, ctx }) => {
    return await ctx.db.eventCategory.findMany({});
  }),
});

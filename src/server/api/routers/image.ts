import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
} from "@/server/api/trpc";

export const imageRouter = createTRPCRouter({
  getImage: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const image = await ctx.db.image.findUnique({
        where: {
          id: input.id,
        },
        include: {
          Uploader: true,
          Event: true,
        },
      });

      return {
        ...image,
      };
    }),
  getImagesByUploader: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const images = await ctx.db.user.findUnique({
        where: {
          id: input.id,
        },
        select: {
          Image: {
            include: {
              Event: true,
              Uploader: true,
            },
          },
        },
      });

      return {
        images,
      };
    }),
  getImagesByEvent: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const images = await ctx.db.event.findUnique({
        where: {
          id: input.id,
        },
        select: {
          Images: {
            include: {
              Event: true,
              Uploader: true,
            },
          },
        },
      });

      return {
        images,
      };
    }),
});

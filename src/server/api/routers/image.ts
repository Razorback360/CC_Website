/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { env } from "@/env.mjs";
import { supabase } from "@/utils/supabase";

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
  create: protectedProcedure
    .input(z.object({ src: z.string(), eventId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.image.create({
        data: {
          src: input.src,
          eventId: input.eventId,
          uploaderId: ctx.session.user.id,
        },
      });
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const image = await ctx.db.image.findUnique({
        where: {
          id: input.id,
        },
      });

      await supabase.storage
        .from(env.SUPABASE_IMAGE_BUCKET)
        .remove([image?.src.split(`${env.SUPABASE_IMAGE_BUCKET}/`)[1]!]);

      await ctx.db.image.delete({
        where: {
          id: input.id,
        },
      });
    }),
});

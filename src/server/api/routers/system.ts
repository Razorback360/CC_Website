import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { SystemUpdateType } from "@prisma/client";

// following is the schema for the system update model
// enum SystemUpdateType {
//     EVENT_CREATE
//     EVENT_UPDATE // title/description/date/category/semester
//     EVENT_DELETE
//     EVENT_IMAGES_ADD
//     EVENT_IMAGES_DELETE
//     EVENT_DOCUMENTATION_ADD
//     EVENT_DOCUMENTATION_DELETE
//     MEMBER_ADD
//     MEMBER_UPDATE // enable/disable/role/tags
//     MEMBER_DELETE
// }

// model SystemUpdate {
//     id          String           @id @default(cuid())
//     type        SystemUpdateType
//     description String           @db.Text
//     date        DateTime         @default(now())

//     // Relation to the user who made the update
//     author   User   @relation(fields: [authorId], references: [id])
//     authorId String
// }

export const systemRouter = createTRPCRouter({
  getSystemUpdates: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.systemUpdate.findMany({
      orderBy: {
        date: "desc",
      },
    });
  }),
  createSystemUpdate: protectedProcedure
    .input(
      z.object({
        referenceId: z.string().min(1),
        description: z.string().min(1),
        type: z.nativeEnum(SystemUpdateType),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.systemUpdate.create({
        data: {
          referenceId: input.referenceId,
          description: input.description,
          type: input.type,
          Author: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
      });
    }),
});

import { eventRouter } from "@/server/api/routers/event";
import { semesterRouter } from "@/server/api/routers/semester";
import { userRouter } from "@/server/api/routers/user";
import { utilsRouter } from "@/server/api/routers/utils";
import { attachmentRouter } from "@/server/api/routers/attachament";
import { systemRouter } from "@/server/api/routers/system";
import { createTRPCRouter } from "@/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  event: eventRouter,
  semester: semesterRouter,
  user: userRouter,
  utils: utilsRouter,
  attachment: attachmentRouter,
  system: systemRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

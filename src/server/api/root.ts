import { createTRPCRouter } from "~/server/api/trpc";
import { registrationRouter } from "./routers/registration";
import { fileRouter } from "./routers/file";
import { jobsRouter } from "./routers/jobs";

export const config = {
  api: {
      bodyParser: {
          sizeLimit: '4mb'
      }
  }
}

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  registration: registrationRouter,
  file: fileRouter,
  jobs: jobsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

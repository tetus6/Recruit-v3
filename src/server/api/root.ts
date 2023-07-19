import { createTRPCRouter } from "~/server/api/trpc";
import { registrationRouter } from "./routers/registration";
import { fileRouter } from "./routers/file";

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
  file: fileRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;

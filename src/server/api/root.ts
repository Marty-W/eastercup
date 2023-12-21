import { createTRPCRouter } from "@/server/api/trpc";
import { registrationRouter } from "./routers/registration";
import { commonRouter } from "./routers/common";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  common: commonRouter,
  registration: registrationRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

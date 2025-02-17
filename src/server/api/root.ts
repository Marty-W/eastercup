import { createTRPCRouter } from "@/server/api/trpc";
import { commonRouter } from "./routers/common";
import { matchRouter } from "./routers/matches";
import { registrationRouter } from "./routers/registration";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  common: commonRouter,
  match: matchRouter,
  registration: registrationRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

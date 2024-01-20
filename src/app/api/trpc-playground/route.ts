import { appRouter } from "@/server/api/root";
import { fetchHandler } from "trpc-playground/handlers/fetch";

const handler = await fetchHandler({
  router: appRouter,
  trpcApiEndpoint: "/api/trpc",
  playgroundEndpoint: "/api/trpc-playground",
  // uncomment this if you're using superjson
  request: {
    superjson: true,
  },
});

export { handler as GET, handler as POST };

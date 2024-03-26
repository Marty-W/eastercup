import { type Config } from "drizzle-kit";

import { env } from "./src/env.mjs";

const connectionString = env.DATABASE_URL;

export default {
  schema: "./src/server/db/schema.ts",
  driver: "pg",
  dbCredentials: {
    connectionString: connectionString,
  },
  out: "drizzle",
} satisfies Config;

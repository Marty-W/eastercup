import { type Config } from "drizzle-kit";

import { env } from "@/env.mjs";

const connectionString =
  env.NODE_ENV === "development"
    ? "postgresql://postgres:postgres@127.0.0.1:54322/postgres"
    : env.DATABASE_URL;

export default {
  schema: "./src/server/db/schema.ts",
  driver: "pg",
  dbCredentials: {
    connectionString: connectionString,
  },
  out: "./drizzle/",
} satisfies Config;

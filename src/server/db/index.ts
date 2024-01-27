import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { env } from "@/env.mjs";
import * as schema from "./schema";

const connectionString =
  env.NODE_ENV === "development"
    ? "postgresql://postgres:postgres@127.0.0.1:54322/postgres"
    : env.DATABASE_URL;

export const client = postgres(connectionString, { prepare: false });

export const db = drizzle(client, {
  schema,
});

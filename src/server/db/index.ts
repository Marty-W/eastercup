import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

import { env } from "@/env.mjs";
import * as schema from "./schema";

const connectionString = env.DATABASE_URL;

const client = postgres(connectionString, { prepare: false });

export const db = drizzle(client, {
  schema,
});

await migrate(db, { migrationsFolder: "drizzle" });

await client.end();

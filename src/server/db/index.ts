import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { Redis } from "@upstash/redis";

import { env } from "@/env.mjs";
import * as schema from "./schema";

export const redis = new Redis({
  url: env.REDIS_URL,
  token: env.REDIS_TOKEN,
});

export const sql = neon(env.DATABASE_URL);

export const db = drizzle(sql, {
  schema,
});

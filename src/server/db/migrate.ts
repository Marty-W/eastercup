import { env } from "@/env.mjs";
import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { migrate } from "drizzle-orm/neon-http/migrator";

const main = async () => {
  neonConfig.fetchConnectionCache = true;

  const sql = neon(env.DATABASE_URL);
  const db = drizzle(sql);

  await migrate(db, { migrationsFolder: "./drizzle" });

  console.log("Done");
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

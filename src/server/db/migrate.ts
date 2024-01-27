import { migrate } from "drizzle-orm/postgres-js/migrator";
import { db } from ".";

await migrate(db, { migrationsFolder: "drizzle" });

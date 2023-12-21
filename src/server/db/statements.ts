import { db } from ".";
import { count, countDistinct } from "drizzle-orm";
import { TeamsTable } from "@/server/db/schema";

export const getTeamCount = db
  .select({ value: count() })
  .from(TeamsTable)
  .prepare();

export const getCountryCount = db
  .select({ value: countDistinct(TeamsTable.country) })
  .from(TeamsTable)
  .prepare();

export const getPresentCountries = db
  .selectDistinct({
    country: TeamsTable.country,
  })
  .from(TeamsTable)
  .prepare();

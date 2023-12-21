import { db } from ".";
import { count, countDistinct } from "drizzle-orm";
import { teams } from "@/server/db/schema";

export const getTeamCount = db.select({ value: count() }).from(teams).prepare();

export const getCountryCount = db
  .select({ value: countDistinct(teams.country) })
  .from(teams)
  .prepare();

export const getPresentCountries = db
  .selectDistinct({
    country: teams.country,
  })
  .from(teams)
  .prepare();

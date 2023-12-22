import { createTRPCRouter, publicProcedure } from "../trpc";
import { count, countDistinct } from "drizzle-orm";
import { teams } from "@/server/db/schema";
export const commonRouter = createTRPCRouter({
  getTeamsCountInfo: publicProcedure.query(async ({ ctx }) => {
    const teamCount = await ctx.db.select({ value: count() }).from(teams);

    const countryCount = await ctx.db
      .select({ value: countDistinct(teams.country) })
      .from(teams);

    const presentCountries = await ctx.db
      .selectDistinct({
        country: teams.country,
      })
      .from(teams);
    return {
      teamCount: teamCount[0]?.value ?? 0,
      countryCount: countryCount[0]?.value ?? 0,
      countries: presentCountries.map((row) => row.country),
    };
  }),
});

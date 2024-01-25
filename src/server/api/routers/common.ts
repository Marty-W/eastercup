import { createTRPCRouter, publicProcedure } from "../trpc";
import { count, countDistinct } from "drizzle-orm";
import { teams } from "@/server/db/schema";
import { type TeamsByCategory } from "@/lib/types";

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
  getRegisteredTeams: publicProcedure.query(async ({ ctx }) => {
    const registeredTeams = await ctx.db.query.teams.findMany({
      columns: {
        name: true,
        country: true,
        category: true,
      },
    });

    const teamsByCategory = registeredTeams.reduce<TeamsByCategory>(
      (acc, team) => {
        acc[team.category]?.push({
          name: team.name.replace(/ \| [^|]+$/, ""),
          country: team.country,
        });

        return acc;
      },
      {
        "U11 MIX": [],
        U12B: [],
        U12G: [],
        U14B: [],
        U14G: [],
        U16B: [],
        U16G: [],
      },
    );

    return teamsByCategory;
  }),
});

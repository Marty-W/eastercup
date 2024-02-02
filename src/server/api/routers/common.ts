import { createTRPCRouter, publicProcedure } from "../trpc";
import { type TeamsByCategory } from "@/lib/types";

export const commonRouter = createTRPCRouter({
  getTeamsCountInfo: publicProcedure.query(async ({ ctx }) => {
    const { redis } = ctx;

    const teamCount = await redis.get("teamCount");
    const countries = await redis.smembers("teamCountries");
    const countryCount = countries.length;
    return {
      teamCount: (teamCount as number) ?? 0,
      countryCount: countryCount ?? 0,
      countries,
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

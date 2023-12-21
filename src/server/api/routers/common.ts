import { createTRPCRouter, publicProcedure } from "../trpc";
import {
  getCountryCount,
  getPresentCountries,
  getTeamCount,
} from "@/server/db/statements";
export const commonRouter = createTRPCRouter({
  getTeamsCountInfo: publicProcedure.query(async () => {
    const teamCount = await getTeamCount.execute();
    const countryCount = await getCountryCount.execute();
    const presentCountries = await getPresentCountries.execute();
    return {
      teamCount: teamCount[0]?.value ?? 0,
      countryCount: countryCount[0]?.value ?? 0,
      countries: presentCountries.map((row) => row.country),
    };
  }),
});

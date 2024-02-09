import { createTRPCRouter, publicProcedure } from "../trpc";
import {
  CATEGORY_CAPACITIES,
  TEAM_CATEGORIRES,
  registrationInputSchema,
} from "@/lib/conts";
import {
  addTeamBillingInfo,
  addTeamTransportInfo,
  createTeam,
  generateAccomodationOrder,
  generateCateringOrder,
  generateRegistrationInvoice,
  generateTshirtOrder,
} from "@/server/api/helpers";
import { client } from "@/trigger";

export const registrationRouter = createTRPCRouter({
  team: publicProcedure
    .input(registrationInputSchema)
    .mutation(async (opts) => {
      const { input, ctx } = opts;
      const { info, services, billing } = input;

      const timer = new Date();

      const newTeamId = await createTeam(info);

      const parallelTasks = [
        addTeamTransportInfo(info, newTeamId),
        addTeamBillingInfo(billing, newTeamId),
        generateRegistrationInvoice(newTeamId, info.country),
        generateTshirtOrder(newTeamId, services.tshirtOrder),
        generateCateringOrder(newTeamId, services.cateringOrder),
        generateAccomodationOrder(
          newTeamId,
          services.accomodationCategory,
          services.accomodationRoom,
        ),
      ];

      await Promise.all(parallelTasks);

      await ctx.redis.incr("teamCount");
      await ctx.redis.sadd("teamCountries", info.country);

      await client.sendEvent({
        name: "postreg.email",
        payload: {
          recipientEmail: info.email,
          recipientCountry: info.country,
          teamId: newTeamId,
        },
      });

      const diff = new Date().getTime() - timer.getTime();

      console.log(`Registration took ${diff}ms`);

      return {
        success: true,
      };
    }),
  getRegistrationCapacities: publicProcedure.query(async (opts) => {
    const {
      ctx: { db },
    } = opts;
    const presentCategories = await db.query.teams.findMany({
      columns: {
        category: true,
      },
    });

    const categoriesCount = presentCategories.reduce(
      (acc, curr) => {
        if (acc[curr.category]) {
          acc[curr.category]++;
        } else {
          acc[curr.category] = 1;
        }
        return acc;
      },
      {
        "U11 MIX": 0,
        U12B: 0,
        U12G: 0,
        U14B: 0,
        U14G: 0,
        U16B: 0,
        U16G: 0,
      },
    );

    return TEAM_CATEGORIRES.map((category) => {
      return {
        category: category,
        count: categoriesCount[category],
        full: CATEGORY_CAPACITIES[category] <= categoriesCount[category],
      };
    });
  }),
});

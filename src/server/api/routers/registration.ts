import { createTRPCRouter, publicProcedure } from "../trpc";
import { registrationInputSchema } from "@/lib/conts";
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
});

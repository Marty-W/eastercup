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
  getInvoiceVarSymbol,
} from "@/server/api/helpers";
import { client } from "@/trigger";

export const registrationRouter = createTRPCRouter({
  team: publicProcedure
    .input(registrationInputSchema)
    .mutation(async (opts) => {
      const { input } = opts;
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

      const registrationInvoiceVarSymbol = getInvoiceVarSymbol(newTeamId);

      await client.sendEvent({
        name: "postreg.email",
        payload: {
          recipientEmail: info.email,
          recipientCountry: info.country,
        },
      });

      const diff = new Date().getTime() - timer.getTime();

      console.log(`Registration took ${diff}ms`);

      return {
        registrationInvoiceVarSymbol,
      };
    }),
});

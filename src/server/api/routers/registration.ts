import { createTRPCRouter, publicProcedure } from "../trpc";
import { registrationInputSchema } from "@/lib/conts";
import {
  addTeamBillingInfo,
  addTeamTransportInfo,
  createTeam,
  generateCateringOrder,
  generateRegistrationInvoice,
  generateTshirtOrder,
  getInvoiceVarSymbol,
  sendPostRegistrationEmail,
} from "@/server/api/helpers";

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
      ];

      await Promise.all(parallelTasks);

      const registrationInvoiceVarSymbol = getInvoiceVarSymbol(newTeamId);

      if (process.env.VERCEL_ENV === "production") {
        await sendPostRegistrationEmail(info.email, info.country);
      }

      const diff = new Date().getTime() - timer.getTime();

      console.log(`Registration took ${diff}ms`);

      return {
        registrationInvoiceVarSymbol,
      };
    }),
});

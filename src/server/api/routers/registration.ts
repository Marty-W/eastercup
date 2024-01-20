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

      await addTeamTransportInfo(info, newTeamId);
      await addTeamBillingInfo(billing, newTeamId);
      await generateRegistrationInvoice(newTeamId, info.country);
      await generateTshirtOrder(newTeamId, services.tshirtOrder);

      const registrationInvoiceVarSymbol = getInvoiceVarSymbol(newTeamId);

      if (services.interestInCatering) {
        await generateCateringOrder(newTeamId, services.cateringOrder);
      }

      // NOTE: I don't want to rely on this to success in order to register the team and also this fn should be fast
      if (process.env.VERCEL_ENV === "production") {
        sendPostRegistrationEmail(info.email, info.country);
      }

      const diff = new Date().getTime() - timer.getTime();
      console.log(`Registration took ${diff}ms`);

      return {
        registrationInvoiceVarSymbol,
      };
    }),
});

import {
  invoice,
  teamBillingInfo,
  teamServicesInfo,
  teamTransportInfo,
  teams,
  tshirtOrders,
} from "@/server/db/schema";
import { createTRPCRouter, publicProcedure } from "../trpc";
import {
  REGISTRATION_FEE_CZK,
  REGISTRATION_FEE_EUR,
  registrationInputSchema,
} from "@/lib/conts";
export const registrationRouter = createTRPCRouter({
  team: publicProcedure
    .input(registrationInputSchema)
    .mutation(async (opts) => {
      const { input, ctx } = opts;
      const currYear = String(new Date().getFullYear());
      const { info, services, billing } = input;

      const newTeam = await ctx.db
        .insert(teams)
        .values({
          ...info,
          phoneNumber: `+${info.countryCode}${info.phoneNumber}`,
          name: `${info.teamName} | ${info.category}`,
        })
        .returning();

      const teamID = newTeam[0]?.id;

      await ctx.db.insert(teamTransportInfo).values({
        ...info,
        arrivalDate: info.arrivalDate.toISOString(),
        teamId: teamID,
      });

      await ctx.db.insert(teamBillingInfo).values({
        ...billing,
        teamId: teamID,
      });

      await ctx.db.insert(teamServicesInfo).values({
        ...services,
        teamId: teamID,
      });

      const registrationInvoiceVarSymbol = `${currYear}${String(
        teamID,
      ).padStart(4, "0")}`;
      const registrationFee =
        info.country === "CZ"
          ? `${REGISTRATION_FEE_CZK} czk`
          : `${REGISTRATION_FEE_EUR} eur`;

      await ctx.db.insert(invoice).values({
        teamId: teamID,
        varSymbol: registrationInvoiceVarSymbol,
        type: "registration",
        amount: registrationFee,
      });

      await ctx.db.insert(tshirtOrders).values({
        noXsShirts: services.noXsShirts,
        noSShirts: services.noSShirts,
        noMShirts: services.noMShirts,
        noLShirts: services.noLShirts,
        noXLShirts: services.noXLShirts,
        noXXLShirts: services.noXXLShirts,
        teamId: teamID,
      });

      return {
        registrationInvoiceVarSymbol,
      };
    }),
});

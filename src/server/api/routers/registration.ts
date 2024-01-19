import {
  cateringOrder,
  invoice,
  teamAccomodationInfo,
  teamBillingInfo,
  teamRoomInfo,
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
import { env } from "@/env.mjs";

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

      const tshirtOrderOnly = {
        noXsShirts: services.noXsShirts ?? 0,
        noSShirts: services.noSShirts ?? 0,
        noMShirts: services.noMShirts ?? 0,
        noLShirts: services.noLShirts ?? 0,
        noXLShirts: services.noXLShirts ?? 0,
        noXXLShirts: services.noXXLShirts ?? 0,
      };

      const hasTshirtOrder = Object.values(tshirtOrderOnly).some(
        (count) => count > 0,
      );

      if (hasTshirtOrder) {
        await ctx.db.insert(tshirtOrders).values({
          ...tshirtOrderOnly,
          teamId: teamID,
        });
      }

      await ctx.db.insert(cateringOrder).values({
        teamId: teamID,
        thuBreakfast: services.thuBreakfast,
        thuLunch: services.thuLunch,
        thuDinner: services.thuDinner,
        friBreakfast: services.friBreakfast,
        friLunch: services.friLunch,
        friDinner: services.friDinner,
        satBreakfast: services.satBreakfast,
        satLunch: services.satLunch,
        satDinner: services.satDinner,
        sunBreakfast: services.sunBreakfast,
        sunLunch: services.sunLunch,
        sunDinner: services.sunDinner,
        halalCount: services.halalCount,
        vegetarianCount: services.vegetarianCount,
        lactoseFreeCount: services.lactoseFreeCount,
        glutenFreeCount: services.glutenFreeCount,
        otherAllergyCount: services.otherAllergyCount,
        otherAllergyNote: services.otherAllergyNote,
      });

      const accomodationCategoryValues = services.accomodationCategory
        ? Object.entries(services.accomodationCategory).flatMap(
            ([day, roles]) =>
              roles
                ? Object.entries(roles).flatMap(([role, accomodations]) =>
                    accomodations
                      ? Object.entries(accomodations)
                          .filter(([_, count]) => count > 0)
                          .map(([accomodation, count]) => ({
                            teamId: teamID,
                            day,
                            role: role.replace("-", "_"),
                            accomodation,
                            count,
                          }))
                      : [],
                  )
                : [],
          )
        : [];

      if (accomodationCategoryValues.length > 0) {
        await ctx.db
          .insert(teamAccomodationInfo)
          .values(accomodationCategoryValues);
      }

      const accomodationRoomValues = services.accomodationRoom
        ? Object.entries(services.accomodationRoom).flatMap(([day, roles]) =>
            roles
              ? Object.entries(roles).flatMap(([role, roomTypes]) =>
                  roomTypes
                    ? Object.entries(roomTypes)
                        .filter(([_, count]) => count > 0)
                        .map(([roomType, count]) => ({
                          teamId: teamID,
                          day,
                          role,
                          roomType,
                          count,
                        }))
                    : [],
                )
              : [],
          )
        : [];

      if (accomodationRoomValues.length > 0) {
        await ctx.db.insert(teamRoomInfo).values(accomodationRoomValues);
      }

      // NOTE: I don't want to rely on this to success in order to register the team and also this fn should be fast
      if (process.env.VERCEL_ENV === "production") {
        const { email, country } = info;
        const emailLang = country === "CZ" || country === "SK" ? "cs" : "en";

        fetch(`https://eastercup.vercel.app/api/sendEmail`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            EMAIL_SECRET: env.EMAIL_SECRET,
          },
          body: JSON.stringify({ email, lang: emailLang }),
        })
          .then((response) => {
            if (!response.ok) {
              console.error(
                "Response status",
                response.status,
                "Response",
                response,
              );
              throw new Error("Failed to request email sending");
            }
          })
          .catch((err) => console.error(err));
      }
      return {
        registrationInvoiceVarSymbol,
      };
    }),
});

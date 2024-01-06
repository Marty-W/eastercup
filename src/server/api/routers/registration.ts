import { teams } from "@/server/db/schema";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { teamFormSchemaServer } from "@/lib/conts";
import { eq } from "drizzle-orm";
export const registrationRouter = createTRPCRouter({
  team: publicProcedure.input(teamFormSchemaServer).mutation(async (opts) => {
    const { input, ctx } = opts;
    const currYear = String(new Date().getFullYear());
    const { countryCode, phoneNumber } = input;
    const newTeam = await ctx.db.insert(teams).values({
      ...input,
      phoneNumber: `+${countryCode}${phoneNumber}`,
      name: input.teamName,
    });

    const invoiceId = `${currYear}${newTeam.insertId.padStart(4, "0")}`;

    await ctx.db
      .update(teams)
      .set({
        invoiceId,
      })
      .where(eq(teams.id, Number(newTeam.insertId)));

    return await ctx.db
      .select()
      .from(teams)
      .where(eq(teams.id, Number(newTeam.insertId)));
  }),
});

import { teams } from "@/server/db/schema";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { teamFormSchemaServer } from "@/lib/conts";
export const registrationRouter = createTRPCRouter({
  team: publicProcedure.input(teamFormSchemaServer).mutation(async (opts) => {
    const { input, ctx } = opts;
    const newTeam = await ctx.db.insert(teams).values({
      ...input,
      name: input.teamName,
    });

    return newTeam;
  }),
});

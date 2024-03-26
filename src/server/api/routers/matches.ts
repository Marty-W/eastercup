import { removeCategoryFromTeamName } from "@/lib/utils";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { getISODay, isBefore } from "date-fns";

export const matchRouter = createTRPCRouter({
  getAllMatches: publicProcedure.query(async ({ ctx }) => {
    const matches = await ctx.db.query.match.findMany({
      with: {
        teamA: {
          columns: {
            id: true,
            name: true,
            country: true,
            category: true,
          },
        },
        teamB: {
          columns: {
            id: true,
            name: true,
            country: true,
            category: true,
          },
        },
      },
    });

    return matches
      .map((match) => {
        const category =
          match.teamA.category === match.teamB.category
            ? match.teamA.category
            : "Mixed";

        const winner =
          match.teamAScore > match.teamBScore
            ? match.teamA.name
            : match.teamB.name;

        return {
          id: match.id,
          dayIdx: getISODay(new Date(match.date)),
          time: match.time,
          category,
          winner: removeCategoryFromTeamName(winner),
          teamA: {
            name: removeCategoryFromTeamName(match.teamA.name),
            country: match.teamA.country,
            score: match.teamAScore,
          },
          teamB: {
            name: removeCategoryFromTeamName(match.teamB.name),
            country: match.teamB.country,
            score: match.teamBScore,
          },
        };
      })
      .sort((a, b) => {
        const [hoursA, minutesA] = a.time.split(":");
        const [hoursB, minutesB] = b.time.split(":");
        const today = new Date();

        const dateA = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
        );

        dateA.setHours(+hoursA!, +minutesA!);
        const dateB = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
        );
        dateB.setHours(+hoursB!, +minutesB!);

        return isBefore(dateA, dateB) ? -1 : 1;
      });
  }),
});

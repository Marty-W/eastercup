import { removeCategoryFromTeamName } from "@/lib/utils";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { getISODay, isBefore } from "date-fns";
import { eq } from "drizzle-orm";

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
          isPlayoff: match.isPlayoff,
          extraText: match.extraText,
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
  getGroupStandings: publicProcedure.query(async ({ ctx }) => {
    const allMatches = await ctx.db.query.match.findMany({
      columns: {
        id: true,
        teamAId: true,
        teamAScore: true,
        teamBId: true,
        teamBScore: true,
        isPlayoff: true,
      },
      where: (matches, { eq }) => eq(matches.isPlayoff, false),
      with: {
        teamA: {
          columns: {
            name: true,
            country: true,
          },
        },
        teamB: {
          columns: {
            name: true,
            country: true,
          },
        },
      },
    });
    const allTeams = await ctx.db.query.teams.findMany({
      columns: {
        id: true,
        name: true,
        country: true,
        subCategory: true,
        category: true,
      },
      where: (teams, { isNotNull }) => isNotNull(teams.subCategory),
    });

    const teamScores = allTeams.map(
      ({ name, id, country, category, subCategory }) => {
        const teamNumbers = {
          numOfWins: 0,
          numOfLosses: 0,
          ownScore: 0,
          opponentScore: 0,
          points: 0,
          teamName: name,
          teamId: id,
          category,
          subCategory,
          country,
        };
        const teamMatches = allMatches.filter(
          (match) => match.teamAId === id || match.teamBId === id,
        );

        teamMatches.forEach((match) => {
          if (match.teamAId === id) {
            teamNumbers.ownScore += match.teamAScore;
            teamNumbers.opponentScore += match.teamBScore;
            if (match.teamAScore > match.teamBScore) {
              teamNumbers.numOfWins += 1;
              teamNumbers.points += 2;
            } else {
              teamNumbers.numOfLosses += 1;
              teamNumbers.points += 1;
            }
          } else {
            teamNumbers.ownScore += match.teamBScore;
            teamNumbers.opponentScore += match.teamAScore;
            if (match.teamBScore > match.teamAScore) {
              teamNumbers.numOfWins += 1;
              teamNumbers.points += 2;
            } else {
              teamNumbers.numOfLosses += 1;
              teamNumbers.points += 1;
            }
          }
        });

        return teamNumbers;
      },
    );

    type TeamNumbers = (typeof teamScores)[0];
    type ExtendedTeamNumbers = TeamNumbers & { subCategory: string };
    type OrganizedData = {
      [category in TeamNumbers["category"]]?: Record<
        string,
        ExtendedTeamNumbers[]
      >;
    };

    const organizedData = teamScores.reduce(
      (accumulator: OrganizedData, team) => {
        const subCategory = team.subCategory ?? "Unspecified"; // Defaulting to "Unspecified"

        if (!accumulator[team.category]) {
          accumulator[team.category] = {};
        }

        if (!accumulator[team.category]![subCategory]) {
          accumulator[team.category]![subCategory] = [];
        }

        // @ts-expect-error - We know that the category and subCategory exist
        accumulator[team.category]![subCategory].push(team);
        return accumulator;
      },
      {} as OrganizedData,
    );

    // Sort the teams within each subCategory based on points and mutual matches
    Object.values(organizedData).forEach((categoryData) => {
      Object.values(categoryData).forEach((subCategoryTeams) => {
        subCategoryTeams.sort((teamA, teamB) => {
          // Sort by points first
          if (teamA.points !== teamB.points) {
            return teamB.points - teamA.points;
          }

          // If points are the same, check the mutual match
          const mutualMatch = allMatches.find(
            (match) =>
              (match.teamAId === teamA.teamId &&
                match.teamBId === teamB.teamId) ||
              (match.teamAId === teamB.teamId &&
                match.teamBId === teamA.teamId),
          );

          if (mutualMatch) {
            if (
              (mutualMatch.teamAId === teamA.teamId &&
                mutualMatch.teamAScore > mutualMatch.teamBScore) ||
              (mutualMatch.teamBId === teamA.teamId &&
                mutualMatch.teamBScore > mutualMatch.teamAScore)
            ) {
              return -1; // Team A wins the mutual match
            } else {
              return 1; // Team B wins the mutual match
            }
          }

          return 0; // If no mutual match, maintain the order
        });
      });
    });

    return organizedData;
  }),
});

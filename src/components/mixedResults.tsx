import { type TeamCategory, type Matches } from "@/lib/types";
import { MatchResult } from "./matchResult";
import { DayPicker } from "@/components/dayPicker";
import { useScopedI18n } from "locales/client";
import { TEAM_CATEGORIRES } from "@/lib/conts";
import { useMemo } from "react";
import Spinner from "./ui/spinner";

type CategorizedMatches = Record<string, Matches>;

interface Props {
  matches: Matches;
  matchesLoading: boolean;
  category: string;
  selectedDayIdx: 4 | 5 | 6 | 7;
  onDayChange: (dayIdx: 4 | 5 | 6 | 7) => void;
}

export const MixedResults = ({
  matches,
  selectedDayIdx,
  onDayChange,
  matchesLoading,
}: Props) => {
  const t = useScopedI18n("results");
  const categorizedMatches = useMemo(() => {
    const categoriesWithMatches: CategorizedMatches = {};

    matches.forEach((match) => {
      const { category } = match;

      if (!categoriesWithMatches[category]) {
        categoriesWithMatches[category] = [match];
      } else {
        categoriesWithMatches[category].push(match);
      }
    });

    const result = Object.entries(categoriesWithMatches)
      .map(([category, matches]) => ({ category, matches }))
      .sort((a, b) => {
        return (
          TEAM_CATEGORIRES.indexOf(a.category as TeamCategory) -
          TEAM_CATEGORIRES.indexOf(b.category as TeamCategory)
        );
      });

    return result;
  }, [matches]);

  if (!matches.length && !matchesLoading) {
    return (
      <div>
        <div className="flex justify-center py-4">
          <DayPicker
            selectedDayIdx={selectedDayIdx}
            onDayChange={onDayChange}
          />
        </div>
        <div className="flex justify-center py-4 text-center">
          <h1>{t("emptyState")}</h1>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-center py-4">
        <DayPicker selectedDayIdx={selectedDayIdx} onDayChange={onDayChange} />
      </div>
      <div className="flex flex-col space-y-2 md:space-y-3">
        <div className="mx-auto flex w-full max-w-[500px] flex-col space-y-5">
          {!matchesLoading ? (
            categorizedMatches.map(({ category, matches }) => {
              return (
                <div key={category}>
                  <h1 className="text-xs md:text-base">{category}</h1>
                  <div className="space-y-1 rounded-md border-2 border-black shadow-md">
                    {matches.map(
                      ({
                        id,
                        time,
                        teamA,
                        teamB,
                        winner,
                        isPlayoff,
                        extraText,
                      }) => (
                        <MatchResult
                          key={id}
                          time={time}
                          teamA={teamA}
                          teamB={teamB}
                          winner={winner}
                          extraText={extraText}
                          isPlayoff={isPlayoff}
                        />
                      ),
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <Spinner className="mx-auto h-16 w-16 text-brand-blue" />
          )}
        </div>
      </div>
    </div>
  );
};

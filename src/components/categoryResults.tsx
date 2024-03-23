import { type Matches } from "@/lib/types";
import { MatchResult } from "./matchResult";
import { DayPicker } from "@/components/dayPicker";
import { useScopedI18n } from "locales/client";

interface Props {
  matches: Matches;
  category: string;
  selectedDayIdx: 3 | 4 | 5 | 6 | 7;
  onDayChange: (dayIdx: 3 | 4 | 5 | 6 | 7) => void;
}

export const CategoryResults = ({
  matches,
  category,
  selectedDayIdx,
  onDayChange,
}: Props) => {
  const t = useScopedI18n("results");
  if (!matches.length) {
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
      <div className="flex flex-col space-y-1 rounded-md border-2 border-black">
        {matches.map(({ id, time, teamA, teamB, winner }) => (
          <MatchResult
            key={id}
            time={time}
            teamA={teamA}
            teamB={teamB}
            winner={winner}
          />
        ))}
      </div>
    </div>
  );
};

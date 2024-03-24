import "/node_modules/flag-icons/css/flag-icons.min.css";
import { cn } from "@/lib/utils";

interface Team {
  name: string;
  score: number;
  country: string;
}

interface Props {
  time: string;
  teamA: Team;
  teamB: Team;
  winner: string;
}

export const MatchResult = ({ time, teamA, teamB, winner }: Props) => {
  return (
    <div className="flex items-center justify-between border-b-[1px] border-b-slate-800 px-1 py-3 text-xs first:border-t-0 last:border-b-0">
      <div className="flex items-center justify-between space-x-1">
        <span className="w-16 pl-1 pr-2">{time}</span>
        <div className="flex flex-col space-y-2">
          <div className="flex items-start space-x-1">
            <span className={`fi fi-${teamA.country.toLowerCase()}`}></span>
            <span className={cn(teamA.name === winner && "font-semibold")}>
              {teamA.name}
            </span>
          </div>
          <div className="flex items-start space-x-1">
            <span className={`fi fi-${teamB.country.toLowerCase()}`}></span>
            <span className={cn(teamB.name === winner && "font-semibold")}>
              {teamB.name}
            </span>
          </div>
        </div>
      </div>
      <div className="line-clamp-1 flex flex-col space-y-2 text-right">
        <span className={cn(teamA.name === winner && "font-semibold")}>
          {teamA.score}
        </span>
        <span className={cn(teamB.name === winner && "font-semibold")}>
          {teamB.score}
        </span>
      </div>
    </div>
  );
};

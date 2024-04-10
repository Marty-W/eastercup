import { type FINAL_STANDINGS } from "@/lib/conts";
import { type TeamCategory } from "@/lib/types";

interface Props {
  categoryResult: (typeof FINAL_STANDINGS)[TeamCategory];
}

export const FinalStandingsWrapper = ({ categoryResult }: Props) => {
  const { standings, allstars, mvp } = categoryResult;

  return (
    <div className="mx-auto flex max-w-md flex-col space-y-4">
      <div>
        <h2 className="py-3 text-center font-semibold lg:text-lg">
          Final Standings
        </h2>
        <ol className="list-inside list-decimal space-y-3 text-sm">
          {standings.map((team, index) => (
            <li key={index}>{team}</li>
          ))}
        </ol>
      </div>
      <div>
        <p className="py-3 text-center font-semibold lg:text-lg">All Stars</p>
        <ul className="space-y-3 text-sm">
          {allstars.map((member, index) => (
            <li key={index}>{member}</li>
          ))}
        </ul>
      </div>
      <div className="">
        <p className="py-3 text-center font-semibold lg:text-lg">MVP</p>
        <p className="text-sm">{mvp}</p>
      </div>
    </div>
  );
};

import "/node_modules/flag-icons/css/flag-icons.min.css";

interface Props {
  teamName: string;
  wins: number;
  losses: number;
  score: string;
  points: number;
  country: string;
}

export const TeamNumbers = ({
  teamName,
  wins,
  losses,
  score,
  points,
  country,
}: Props) => {
  return (
    <div className="grid grid-cols-4 grid-rows-2 items-center gap-x-4 gap-y-2 px-2 py-1 odd:bg-subtle-white even:bg-bright-white">
      <div className="col-span-4 flex space-x-2">
        <span className={`fi text-xs fi-${country.toLowerCase()}`}></span>
        <p className="line-clamp-1 truncate text-xs">{teamName}</p>
      </div>
      <span className="col-start-1 col-end-2 row-start-2 text-center text-xs text-green-500">
        {wins}
      </span>
      <span className="col-start-2 col-end-3 row-start-2 text-center text-xs text-brand-red">
        {losses}
      </span>
      <span className="col-start-3 col-end-4 row-start-2 text-center text-[10px]">
        {score}
      </span>
      <span className="col-start-4 row-start-2 text-center text-xs text-brand-blue">
        {points}
      </span>
    </div>
  );
};

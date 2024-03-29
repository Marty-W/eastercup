import { useScopedI18n } from "locales/client";
import { TeamNumbers } from "./teamNumbers";

interface TeamNumbers {
  numOfWins: number;
  numOfLosses: number;
  ownScore: number;
  opponentScore: number;
  points: number;
  teamName: string;
  teamId: number;
  category: "U11 MIX" | "U12B" | "U12G" | "U14B" | "U14G" | "U16B" | "U16G";
  subCategory: string | null;
  country: string;
}

interface Props {
  categories: TeamNumbers[];
  subCategory: string;
}
export const GroupStanding = ({ categories, subCategory }: Props) => {
  const t = useScopedI18n("standings");
  return (
    <div className="mx-auto flex min-w-[100px] max-w-sm grow flex-col space-y-1 py-4 md:mx-0">
      <p>group: {subCategory}</p>
      <div className="min-w-full divide-y divide-gray-200 overflow-hidden rounded-lg border-[1.5px] border-brand-black px-1">
        <div className="grid grid-cols-4 gap-4 bg-subtle-white px-2 py-1 text-center">
          <span className="text-green-500">{t("win")}</span>
          <span className="text-brand-red">{t("loss")}</span>
          <span className="">{t("score")}</span>
          <span className="text-brand-blue">{t("points")}</span>
        </div>
        {categories?.map((teamNumbers, index) => {
          return (
            <TeamNumbers
              key={index}
              teamName={
                teamNumbers.teamName.split("|")[0] ?? teamNumbers.teamName
              }
              wins={teamNumbers.numOfWins}
              losses={teamNumbers.numOfLosses}
              score={`${teamNumbers.ownScore}-${teamNumbers.opponentScore}`}
              points={teamNumbers.points}
              country={teamNumbers.country}
            />
          );
        })}
      </div>
    </div>
  );
};

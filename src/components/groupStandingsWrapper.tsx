import { type TeamCategory } from "@/lib/types";
import { api } from "@/trpc/react";
import { GroupStanding } from "./groupStanding";
import Spinner from "./ui/spinner";

interface Props {
  selectedCategory: TeamCategory;
}

export const GroupStandingsWrapper = ({ selectedCategory }: Props) => {
  const groupStandings = api.match.getGroupStandings.useQuery();

  if (!groupStandings.isSuccess) {
    return <Spinner className="mx-auto my-20 h-16 w-16 text-brand-blue" />;
  }

  const selectedGroupStandings = groupStandings.data[selectedCategory]!;

  const arrOfGroupStandings = Object.values(selectedGroupStandings).sort(
    (a, b) => a[0]!.subCategory.localeCompare(b[0]!.subCategory),
  );

  return (
    <div className="md:flex md:flex-wrap md:justify-center md:space-x-3">
      {arrOfGroupStandings.map((group, index) => {
        const category = group[0]?.subCategory ?? "";
        return (
          <GroupStanding
            key={index}
            categories={group}
            subCategory={category}
          />
        );
      })}
    </div>
  );
};

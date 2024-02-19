import "/node_modules/flag-icons/css/flag-icons.min.css";
import { type TeamCategory, type Team } from "@/lib/types";
import { Separator } from "./ui/separator";
import { getScopedI18n } from "locales/server";
import RegisteredTeam from "./registeredTeam";
import { CATEGORY_CAPACITIES } from "@/lib/conts";
import { cn } from "@/lib/utils";

interface Props {
  category: TeamCategory;
  team: Team[];
}
export default async function RegisteredTeamsTable({ category, team }: Props) {
  const t = await getScopedI18n("registeredTeams");
  if (!team.length) {
    return (
      <Wrapper category={category} teamCount={team.length}>
        <p className="text-sm">{t("emptyState")}</p>
      </Wrapper>
    );
  }
  // TODO: get rid of duplicates?
  return (
    <Wrapper category={category} teamCount={team.length}>
      {team.map((team, index) => (
        <RegisteredTeam
          key={`${team.name}-${index}`}
          teamName={team.name}
          teamCountry={team.country}
          paidInvoice={team.paidInvoice}
        />
      ))}
    </Wrapper>
  );
}

function Wrapper({
  children,
  category,
  teamCount,
}: {
  children: React.ReactNode;
  category: TeamCategory;
  teamCount: number;
}) {
  const isFull = teamCount >= CATEGORY_CAPACITIES[category];
  return (
    <div className="flex flex-col rounded-sm border">
      <div className="flex items-center justify-between bg-muted p-2 text-muted-foreground">
        <h2 className="text-lg">{category}</h2>
        {teamCount > 0 && (
          <span className={cn("text-sm", isFull && "text-brand-red")}>
            {teamCount}/{CATEGORY_CAPACITIES[category]}
          </span>
        )}
      </div>
      <Separator />
      <div className="relative flex flex-1 flex-col justify-between">
        <div className="space-y-2 p-2">{children}</div>
      </div>
    </div>
  );
}

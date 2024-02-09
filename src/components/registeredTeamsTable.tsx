import "/node_modules/flag-icons/css/flag-icons.min.css";
import { type TeamCategory, type Team } from "@/lib/types";
import { Separator } from "./ui/separator";
import { getScopedI18n } from "locales/server";
import RegisteredTeam from "./registeredTeam";

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
  category: string;
  teamCount: number;
}) {
  return (
    <div className="rounded-sm border">
      <div className="flex items-center justify-between bg-muted p-2 text-muted-foreground">
        <h2 className="text-lg">{category}</h2>
        {teamCount > 0 && <span className="text-sm">{teamCount}</span>}
      </div>
      <Separator />
      <div className="space-y-2 p-2">{children}</div>
    </div>
  );
}

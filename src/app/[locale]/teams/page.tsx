import { api } from "@/trpc/server";
import RegisteredTeamsTable from "@/components/registeredTeamsTable";
import { getScopedI18n } from "locales/server";

export default async function RegisteredTeams() {
  const registeredTeams = await api.common.getRegisteredTeams.query();
  const t = await getScopedI18n("registeredTeams");
  return (
    <div className="container pb-12 pt-8 font-display">
      <div className="text-center">
        <h1 className="pb-4 text-xl md:text-2xl lg:pb-9 lg:text-3xl">
          {t("header")}
        </h1>
      </div>
      <div className="flex flex-col space-y-6 md:grid md:grid-cols-2 md:justify-items-stretch md:gap-x-4 md:gap-y-4 md:space-y-0">
        <RegisteredTeamsTable category="U12G" team={registeredTeams.U12G} />
        <RegisteredTeamsTable category="U12B" team={registeredTeams.U12B} />
        <RegisteredTeamsTable category="U14G" team={registeredTeams.U14G} />
        <RegisteredTeamsTable category="U14B" team={registeredTeams.U14B} />
        <RegisteredTeamsTable category="U16G" team={registeredTeams.U16G} />
        <RegisteredTeamsTable category="U16B" team={registeredTeams.U16B} />
        <RegisteredTeamsTable
          category="U11 MIX"
          team={registeredTeams["U11 MIX"]}
        />
      </div>
    </div>
  );
}

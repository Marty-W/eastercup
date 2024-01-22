import { getCurrentLocale, getI18n } from "locales/server";

interface Props {
  teamCount: number;
  countryCount: number;
}

const getPluralCZ = (count: number) => {
  switch (count) {
    case 1:
      return {
        registered: "Registrován",
        team: "tým",
        country: "země",
        from: "z",
      };
    case 2:
    case 3:
    case 4:
      return {
        registered: "Registrovány",
        team: "týmy",
        country: "zemí",
        from: "ze",
      };
    default:
      return {
        registered: "Registrováno",
        team: "týmů",
        country: "zemí",
        from: "z",
      };
  }
};

const getPluralEN = (count: number) => {
  return {
    registered: "Registered",
    teams: count === 1 ? "team" : "teams",
    countries: count === 1 ? "country" : "countries",
  };
};

export default async function TeamCountryCount({
  teamCount,
  countryCount,
}: Props) {
  const locale = getCurrentLocale();
  const t = await getI18n();

  if (teamCount === 0 || countryCount === 0) {
    return null;
  }

  if (locale === "en") {
    return (
      <div className="space-x-2">
        <span>{getPluralEN(teamCount)?.registered}</span>
        <span>{teamCount}</span>
        <span>{getPluralEN(teamCount)?.teams}</span>
        <span>{t("hero.from")} </span>
        <span>{countryCount}</span>
        <span>{getPluralEN(countryCount)?.countries}</span>
      </div>
    );
  }
  return (
    <div className="space-x-2">
      <span>{getPluralCZ(teamCount)?.registered}</span>
      <span>{teamCount}</span>
      <span>{getPluralCZ(teamCount)?.team}</span>
      <span>{getPluralCZ(countryCount).from}</span>
      <span>{countryCount}</span>
      <span>{getPluralCZ(countryCount)?.country}</span>
    </div>
  );
}

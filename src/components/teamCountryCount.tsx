import { getCurrentLocale } from "locales/server";

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
  const locale = await getCurrentLocale();

  if (teamCount === 0 || countryCount === 0) {
    return null;
  }
  const messageEN = `${getPluralEN(teamCount)
    ?.registered} ${teamCount} ${getPluralEN(teamCount)
    ?.teams} from ${countryCount} ${getPluralEN(countryCount)?.countries}`;
  const messageCZ = `${getPluralCZ(teamCount)
    ?.registered} ${teamCount} ${getPluralCZ(teamCount)?.team} ${
    getPluralCZ(countryCount).from
  } ${countryCount} ${getPluralCZ(countryCount)?.country}`;

  return (
    <div className="text-base">
      <p>{locale === "en" ? messageEN : messageCZ}</p>
    </div>
  );
}

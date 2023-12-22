import { getCurrentLocale, getI18n } from "locales/server";

interface Props {
  teamCount: number;
  countryCount: number;
}

// TODO add pluralization

export default async function TeamCountryCount({
  teamCount,
  countryCount,
}: Props) {
  const locale = getCurrentLocale();
  const t = await getI18n();

  if (locale === "en") {
    <span>{`${t("hero.registered")} ${teamCount} ${t("hero.teams")} ${t(
      "hero.from",
    )} ${countryCount} ${t("hero.countries")}`}</span>;
  }
  return (
    <span>{`${t("hero.registered")} ${teamCount} ${t("hero.teams")} ${t(
      "hero.from",
    )} ${countryCount} ${t("hero.countries")}`}</span>
  );
}

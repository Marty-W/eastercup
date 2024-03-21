import { getScopedI18n } from "locales/server";

export default async function Halls() {
  const t = await getScopedI18n("info");
  return (
    <ol className="list-inside list-decimal space-y-3 leading-6">
      <li>{t("place.place1")}</li>
      <li>{t("place.place2")}</li>
      <li>{t("place.place3")}</li>
      <li>{t("place.place4")}</li>
      <li>{t("place.place5")}</li>
      <li>{t("place.place6")}</li>
      <li>{t("place.place7")}</li>
      <li>{t("place.place8")}</li>
    </ol>
  );
}

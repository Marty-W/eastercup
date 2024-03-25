import { getScopedI18n } from "locales/server";

export default async function Catering() {
  const t = await getScopedI18n("info.catering");
  return (
    <div className="space-y-4 text-xs md:text-base">
      <p>{t("text")}</p>
      <p>{t("unlimitedDrinks")}</p>
      <p>{t("allergies")}</p>
      <p>{t("breakfastPrice")}</p>
      <ul className="list-disc space-y-2">
        <h3 className="font-bold uppercase text-brand-blue">
          {t("subHeader1")}
        </h3>
        <li>{t("breakfast")}</li>
        <li>{t("lunch")}</li>
        <li>{t("dinner")}</li>
      </ul>
      <div className="space-y-2">
        <h3 className="font-bold uppercase text-brand-blue">
          {t("subHeader2")}
        </h3>
        <div className="space-y-2 lg:flex lg:justify-between lg:space-x-8 lg:space-y-0">
          <div className="flex flex-col">
            <p className="font-bold">{t("place1.header")}</p>
            <p className="max-w-sm">{t("place1.text")}</p>
          </div>
          <div className="flex flex-col">
            <p className="font-bold">{t("place2.header")}</p>
            <p className="max-w-sm">{t("place2.text")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

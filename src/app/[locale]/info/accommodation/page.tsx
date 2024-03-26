import { getScopedI18n } from "locales/server";

export default async function Accommodation() {
  const t = await getScopedI18n("info.accomodation");
  return (
    <div className="text-xs md:text-base">
      <div className="space-y-2 lg:grid lg:grid-cols-2 lg:grid-rows-2 lg:space-y-0">
        <div>
          <h4 className="font-bold">{t("hotel.header")}</h4>
          <p>{t("hotel.text")}</p>
        </div>
        <div>
          <h4 className="font-bold">{t("pension.header")}</h4>
          <p>{t("pension.text")}</p>
        </div>
        <div>
          <h4 className="font-bold">{t("hostel.header")}</h4>
          <p>{t("hostel.text")}</p>
        </div>
        <div>
          <h4 className="font-bold">{t("school.header")}</h4>
          <>
            <p>{t("school.text")}</p>
            <p>{t("school.text2")}</p>
          </>
        </div>
      </div>
      <div className="space-y-2 py-8">
        <p>{t("text")}</p>
        <p>{t("text2")}</p>
      </div>
      <ul className="list-disc space-y-1 lg:leading-5">
        <p className="font-bold">{t("storno.header")}</p>
        <li>{t("storno.text1")}</li>
        <li>{t("storno.text2")}</li>
        <li>{t("storno.text3")}</li>
      </ul>
    </div>
  );
}

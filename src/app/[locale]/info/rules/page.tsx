import { getCurrentLocale, getScopedI18n } from "locales/server";

const RulesSubsection = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="space-y-1 pl-6 pt-1 md:space-y-2 md:pl-14 md:pt-2">
      {children}
    </div>
  );
};

export default async function Rules() {
  const t = await getScopedI18n("info");
  const currentLocale = await getCurrentLocale();
  return (
    <div className="text-xs md:text-base">
      <ol className="list-inside list-decimal space-y-3 md:space-y-5">
        <li>
          {t("rules.1.h1")}
          <RulesSubsection>
            <p>{t("rules.1.p1")}</p>
            <p>{t("rules.1.p2")}</p>
            <p>{t("rules.1.p3")}</p>
            <p>{t("rules.1.p4")}</p>
          </RulesSubsection>
        </li>
        <li>{t("rules.2")}</li>
        <li>{t("rules.3")}</li>
        <li>{t("rules.4")}</li>
        <li>{t("rules.5")}</li>
        <li>
          {t("rules.6.p1")}
          <RulesSubsection>
            <p className="font-bold">{t("rules.6.h2")}</p>
            <p>{t("rules.6.h2.p1")}</p>
            <p>{t("rules.6.h2.p2")}</p>
            <p>{t("rules.6.h2.p3")}</p>
            <p>{t("rules.6.h2.p4")}</p>
            <p>{t("rules.6.h2.p5")}</p>
            <p>{t("rules.6.h2.p6")}</p>
          </RulesSubsection>
          <RulesSubsection>
            <p className="font-bold">{t("rules.6.h3")}</p>
            <p>{t("rules.6.h3.p1")}</p>
            <p>{t("rules.6.h3.p2")}</p>
            <p>{t("rules.6.h3.p3")}</p>
          </RulesSubsection>
          <RulesSubsection>
            <p className="font-bold">{t("rules.6.h4")}</p>
            <p>{t("rules.6.h4.p1")}</p>
            <p>{t("rules.6.h4.p2")}</p>
            <p>{t("rules.6.h4.p3")}</p>
            <p>{t("rules.6.h4.p4")}</p>
            <p>{t("rules.6.h4.p5")}</p>
            <p>{t("rules.6.h4.p6")}</p>
            {currentLocale === "cs" && <p>{t("rules.6.h4.p7")}</p>}
            <p>{t("rules.6.h4.p8")}</p>
            <div className="pl-8">
              <p>{t("rules.6.h4.p8.s1")}</p>
              <p>{t("rules.6.h4.p8.s2")}</p>
              <p>{t("rules.6.h4.p8.s3")}</p>
              <p>{t("rules.6.h4.p8.s4")}</p>
              <p>{t("rules.6.h4.p8.s5")}</p>
              <p>{t("rules.6.h4.p8.s5.p1")}</p>
              <p>{t("rules.6.h4.p8.s5.p2")}</p>
            </div>
          </RulesSubsection>
        </li>
        <li>{t("rules.7")}</li>
        <li>{t("rules.8")}</li>
        <li>{t("rules.9")}</li>
        <li>{t("rules.10")}</li>
      </ol>
    </div>
  );
}

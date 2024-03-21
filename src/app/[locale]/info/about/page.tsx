import { InfoSection, InfoSubsection } from "@/components/ui/infoSection";
import { getScopedI18n } from "locales/server";
import Link from "next/link";

export default async function About() {
  const t = await getScopedI18n("info");
  return (
    <div className="space-y-2">
      <InfoSection header={t("categories.header")}>
        <div className="space-y-3 lg:flex lg:justify-between lg:space-y-0 lg:pr-4">
          <InfoSubsection>
            <p className="font-bold">{t("categories.subheader1")}</p>
            <p>{t("categories.mini.category1")}</p>
            <p>{t("categories.mini.category2")}</p>
            <p>{t("categories.mini.category3")}</p>
            <p>{t("categories.mini.category4")}</p>
          </InfoSubsection>
          <InfoSubsection>
            <p className="font-bold">{t("categories.subheader2")}</p>
            <p>{t("categories.normal.category1")}</p>
            <p>{t("categories.normal.category2")}</p>
            <p>{t("categories.normal.category3")}</p>
            <p>{t("categories.normal.category4")}</p>
          </InfoSubsection>
        </div>
      </InfoSection>
      <InfoSection
        header={t("term.header")}
        className="flex items-center space-x-3 space-y-0 lg:space-x-0"
      >
        <p className="font-bold">{t("term.date")}</p>
      </InfoSection>
      <InfoSection header={t("fee.header")}>
        <p className="lg:leading-5">{t("fee.text")}</p>
      </InfoSection>
      <InfoSection header={t("prizes.header")}>
        <p className="lg:leading-5">{t("prizes.text")}</p>
      </InfoSection>
      <InfoSection header={t("contact.header")}>
        <div className="mb-4 space-y-1">
          <p>
            <span className="mr-1 font-bold">email:</span>
            info@eastercupklatovy.cz
          </p>
          <p>
            <span className="mr-1 font-bold">web:</span>
            <Link href="https://eastercupklatovy.cz" target="_blank">
              eastercupklatovy.cz
            </Link>
          </p>
          <div>
            <span className="mr-1 block font-bold md:inline-block">
              facebook:
            </span>
            <Link href="https://facebook.com/EasterCupKlatovy" target="_blank">
              facebook.com/EasterCupKlatovy
            </Link>
          </div>
        </div>
        <p className="lg:leading-5">{t("contact.text")}</p>
      </InfoSection>
    </div>
  );
}

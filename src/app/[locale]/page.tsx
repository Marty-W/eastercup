import Footer from "@/components/footer";
import TimeCounter from "@/components/timeCounter";
import { getI18n } from "locales/server";
import { type TCountryCode, getEmojiFlag } from "countries-list";
import Link from "next/link";
import Image from "next/image";
import { api } from "@/trpc/server";

export default async function Landing() {
  const t = await getI18n();
  const teamCount = await api.common.getTeamsCountInfo.query();

  return (
    <>
      <div className="flex h-[calc(100svh-160px)] flex-col justify-between">
        <div className="flex flex-1 flex-col justify-between px-5 pt-7 text-center text-lg">
          <div>
            <div className="mb-6">
              <h2 className="font-bold">28.-31.3.2023</h2>
              <span>{`Klatovy, ${t("common.cz")}`}</span>
            </div>
            <div className="font-bold">
              <h1>{t("hero.title")}</h1>
            </div>
          </div>
          <Link href="/form/info" className="mx-16 bg-brand-yellow px-2 py-2">
            {t("hero.button")}
          </Link>
          <div className="flex flex-col justify-between space-y-2 pb-8 text-sm">
            <TimeCounter />
            <span>{`${t("hero.registered")} ${teamCount.teamCount} ${t(
              "hero.teams",
            )} ${t("hero.from")} ${teamCount.countryCount} ${t(
              "hero.countries",
            )}`}</span>
            <div>
              {teamCount.countries.map((countryCode) => {
                return (
                  <span key={countryCode} className="p-1 text-lg">
                    {getEmojiFlag(countryCode as TCountryCode)}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div>
        {/* TODO remove this, only a thumbnail */}
        <Image
          src="/landing_thumbnail.png"
          alt="group"
          width={258}
          height={183}
          className="mx-auto pb-8"
        />
      </div>
      <Footer />
    </>
  );
}

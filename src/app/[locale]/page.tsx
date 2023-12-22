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
      <div className="h-[calc(100svh-30vh)]">
        <div className="flex h-full flex-col justify-between text-center font-display text-lg">
          <div className="flex flex-1 flex-col space-y-10">
            <div>
              <div className="mb-6 text-base">
                <h2 className="font-bold">28.-31.3.2023</h2>
                <span>{`Klatovy, ${t("common.cz")}`}</span>
              </div>
              <div className="text-xl font-bold">
                <h1>{t("hero.title")}</h1>
              </div>
            </div>
            <Link href="/form/info" className="mx-16 bg-brand-yellow px-2 py-2">
              {t("hero.button")}
            </Link>
          </div>
          <div className="flex flex-col space-y-2 pb-2 text-sm">
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
      <div className="flex justify-center py-10">
        {/* TODO remove this, only a thumbnail */}
        <Image
          src="/landing_thumbnail.png"
          alt="group"
          width={258}
          height={183}
          className="mx-auto pb-8"
        />
      </div>
    </>
  );
}

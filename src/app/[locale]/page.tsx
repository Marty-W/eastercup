import TimeCounter from "@/components/timeCounter";
import { getCurrentLocale, getI18n } from "locales/server";
import { type TCountryCode, getEmojiFlag } from "countries-list";
import Link from "next/link";
import Image from "next/image";
import { api } from "@/trpc/server";
import TeamCountryCount from "@/components/teamCountryCount";

export default async function Landing() {
  const t = await getI18n();
  const teamCount = await api.common.getTeamsCountInfo.query();

  return (
    <>
      <div className="h-[calc(100svh-30vh)]">
        <div className="flex h-full flex-col justify-between text-center font-display text-lg md:pt-8">
          <div className="mx-auto flex max-w-screen-md flex-col space-y-10 md:space-y-10">
            <div>
              <div className="text-base md:mb-20 md:text-2xl">
                <div className="mb-6 text-xl font-bold md:mb-10 md:text-2xl">
                  <h1>{t("hero.title")}</h1>
                </div>
                <h2 className="font-bold">28. - 31. 3. 2023</h2>
                <span>{`Klatovy, ${t("common.cz")}`}</span>
              </div>
            </div>
            <Link
              href="/form/info"
              className="mx-auto max-w-[200px] rounded-md bg-brand-yellow px-4 py-2 active:translate-y-1 md:max-w-[300px] md:px-8 md:py-4"
            >
              <span>{t("hero.button")}</span>
            </Link>
          </div>
          <div className="flex flex-col space-y-2 pb-2 text-sm md:space-y-6 md:text-base">
            <TimeCounter />
            <TeamCountryCount
              countryCount={teamCount.countryCount}
              teamCount={teamCount.teamCount}
            />
            <div>
              {teamCount.countries.map((countryCode) => {
                return (
                  <span key={countryCode} className="p-1 text-lg md:text-5xl">
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

import TimeCounter from "@/components/timeCounter";
import { getI18n } from "locales/server";
import Link from "next/link";
import { api } from "@/trpc/server";
import TeamCountryCount from "@/components/teamCountryCount";
import CountryFlags from "@/components/countryFlags";
import { BentoCard } from "@/components/bentoCard";
import { AnimatedHeroStripe, HeroStripe } from "@/components/svgs/heroStripe";

export default async function Landing() {
  const t = await getI18n();
  const { teamCount, countryCount, countries } =
    await api.common.getTeamsCountInfo.query();

  return (
    <>
      <div className="flex h-full flex-col justify-between space-y-4 py-8 text-center font-display text-lg sm:px-4 md:px-8">
        <div className="space-y-4 lg:grid lg:grid-cols-[2fr_1fr] lg:grid-rows-2 lg:gap-x-4 lg:gap-y-4 lg:space-y-0">
          <BentoCard className="relative row-span-2 overflow-clip bg-brand-black">
            <div className="relative flex min-h-[200px] flex-col text-left text-white">
              <div className="w-4/5">
                <h1 className="pb-3 text-xl font-bold md:text-2xl lg:text-4xl">
                  {t("hero.title")}
                </h1>
                <h2 className="text-md lg:text-2xl">28. — 31. 3. 2024</h2>
              </div>
            </div>
            <AnimatedHeroStripe />
          </BentoCard>
          <BentoCard className="bg-brand-blue text-white">
            <TimeCounter />
          </BentoCard>
          <BentoCard>
            <div className="flex flex-col justify-evenly space-y-2 px-4 text-sm md:space-y-6 md:text-base">
              <TeamCountryCount
                countryCount={countryCount}
                teamCount={teamCount}
              />
              <CountryFlags countries={countries} />
            </div>
          </BentoCard>
        </div>
        <div className="grid grid-cols-2 gap-x-4">
          <BentoCard className="flex h-[150px] flex-col justify-center bg-brand-red text-2xl text-white">
            <Link href="#">Live stream</Link>
          </BentoCard>
          <BentoCard className="flex h-[150px] flex-col justify-center bg-brand-yellow text-2xl text-black">
            <Link href="#">{t("landingPage.matchSchedule")}</Link>
          </BentoCard>
        </div>
        <BentoCard className="flex h-[150px] flex-col justify-center bg-brand-blue text-2xl text-white">
          <Link href="#">{t("registeredTeams.header")}</Link>
        </BentoCard>
        <iframe
          className="aspect-video h-full w-full rounded-xl border-2 border-black"
          src="https://www.youtube.com/embed/9hkAsNXRFP4?si=qP5xtRzzukx7mKlV"
          title="Eastern Cup 2023 Aftermovie"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
          allowFullScreen
        ></iframe>
      </div>
    </>
  );
}

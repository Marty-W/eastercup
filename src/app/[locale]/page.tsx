import TimeCounter from "@/components/timeCounter";
import { getI18n } from "locales/server";
import Link from "next/link";
import { api } from "@/trpc/server";
import TeamCountryCount from "@/components/teamCountryCount";
import CountryFlags from "@/components/countryFlags";
import { BentoCard } from "@/components/bentoCard";
import { AnimatedHeroStripe } from "@/components/svgs/heroStripe";
import { HEADER_HEIGHT } from "@/lib/conts";

export default async function Landing() {
  const t = await getI18n();
  const { teamCount, countryCount, countries } =
    await api.common.getTeamsCountInfo.query();

  return (
    <div>
      <div
        className={`flex h-full flex-col justify-between space-y-4 py-8 text-center font-display text-lg sm:px-4 md:px-8 lg:h-[calc(100svh-${HEADER_HEIGHT}svh)] lg:pb-8`}
      >
        <div className="space-y-2  lg:grid  lg:h-full lg:gap-y-6 lg:py-2">
          <div className="space-y-4 lg:grid lg:grid-cols-3 lg:grid-rows-2 lg:gap-6 lg:space-y-0">
            <BentoCard className="relative col-span-2 row-span-2 overflow-clip bg-brand-black">
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
              <div className="flex h-full flex-col justify-evenly space-y-2 px-4 text-sm md:space-y-6 md:text-base">
                <TeamCountryCount
                  countryCount={countryCount}
                  teamCount={teamCount}
                />
                <CountryFlags countries={countries} />
              </div>
            </BentoCard>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 lg:justify-stretch lg:gap-6 lg:justify-self-stretch">
            <BentoCard
              className="flex h-[150px] flex-col justify-center bg-brand-red text-base text-white md:text-2xl lg:h-full"
              href="#"
            >
              Live stream
            </BentoCard>
            <BentoCard
              className="col-start-2 flex h-[150px] flex-col justify-center bg-brand-yellow text-base text-black md:text-2xl lg:h-full"
              href="#"
            >
              {t("landingPage.matchSchedule")}
            </BentoCard>
            <BentoCard
              className="col-span-2 flex h-[150px] flex-col justify-center bg-brand-blue text-2xl text-white lg:col-span-1 lg:h-full"
              href="#"
            >
              {t("registeredTeams.header")}
            </BentoCard>
          </div>
        </div>
      </div>
      <iframe
        className="aspect-video h-full w-full rounded-xl border-2 border-black"
        src="https://www.youtube.com/embed/9hkAsNXRFP4?si=qP5xtRzzukx7mKlV"
        title="Eastern Cup 2023 Aftermovie"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
        allowFullScreen
      ></iframe>
    </div>
  );
}

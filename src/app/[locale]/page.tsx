import TimeCounter from "@/components/timeCounter";
import { getI18n } from "locales/server";
import { api } from "@/trpc/server";
import TeamCountryCount from "@/components/teamCountryCount";
import CountryFlags from "@/components/countryFlags";
import { BentoCard } from "@/components/bentoCard";
import { AnimatedWelcomeBento } from "@/components/animatedWelcomeBento";

export default async function Landing() {
  const t = await getI18n();
  const { teamCount, countryCount, countries } =
    await api.common.getTeamsCountInfo.query();

  return (
    <div className="flex h-full flex-col">
      <div
        className={`flex h-full flex-col justify-between space-y-4 py-8 text-center font-display text-lg sm:px-4 md:px-8 lg:pb-8`}
      >
        <div className="space-y-2  lg:grid  lg:h-full lg:gap-y-6 lg:py-2">
          <div className="space-y-4 lg:grid lg:min-h-[400px] lg:grid-cols-3 lg:grid-rows-2 lg:gap-6 lg:space-y-0 2xl:min-h-[600px]">
            <AnimatedWelcomeBento />
            <BentoCard
              className="flex min-h-[90px] items-center justify-center border-dark-red bg-brand-red text-white shadow-brand-red lg:text-2xl"
              href="/finalStandings"
            >
              {t("link.finalStandings")}
            </BentoCard>
            <div className="flex h-full flex-col self-stretch text-sm shadow-white md:space-y-6 md:text-base">
              <BentoCard
                className="flex h-full flex-col justify-center gap-4 shadow-slate-400"
                href="/teams"
              >
                <TeamCountryCount
                  countryCount={countryCount}
                  teamCount={teamCount}
                />
                <CountryFlags countries={countries} />
              </BentoCard>
            </div>
          </div>
          <div className="lg:min-h-[200px] lg:grid-cols-2 lg:justify-stretch lg:gap-6 lg:justify-self-stretch">
            <BentoCard
              className="flex h-[150px] flex-col justify-center bg-brand-blue text-2xl text-white shadow-brand-blue lg:h-full"
              href="/form/info"
            >
              {t("link.registration")}
            </BentoCard>
          </div>
        </div>
      </div>
      <div className="py-8 sm:px-4 md:px-8">
        <iframe
          className="aspect-video h-full w-full rounded-xl border-2 border-black shadow-md shadow-brand-black"
          src="https://www.youtube.com/embed/qSGw5u0ADNw?si=SYPd-vMs-2u-YL0T"
          title="Easter Cup 2024 Aftermovie"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}

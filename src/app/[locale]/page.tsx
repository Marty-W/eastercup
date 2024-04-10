import TimeCounter from "@/components/timeCounter";
import { getI18n } from "locales/server";
import { api } from "@/trpc/server";
import TeamCountryCount from "@/components/teamCountryCount";
import CountryFlags from "@/components/countryFlags";
import { BentoCard } from "@/components/bentoCard";
import { AnimatedWelcomeBento } from "@/components/animatedWelcomeBento";

export default async function Landing() {
  const t = await getI18n();
  // NOTE: I am hitting redis free tier limits and registration is over, so I am hardcoding the values for now
  // const { teamCount, countryCount, countries } =
  //   await api.common.getTeamsCountInfo.query();
  //

  const teamCount = 71;
  const countryCount = 4;
  const countries = ["CZ", "DE", "SK", "IT"];

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
            <BentoCard className="shadow-slate-400">
              <div className="flex h-full flex-col justify-evenly space-y-2 px-4 text-sm shadow-white md:space-y-6 md:text-base">
                <TeamCountryCount
                  countryCount={countryCount}
                  teamCount={teamCount}
                />
                <CountryFlags countries={countries} />
              </div>
            </BentoCard>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:min-h-[200px] lg:grid-cols-3 lg:justify-stretch lg:gap-6 lg:justify-self-stretch">
            <BentoCard
              className="flex h-[150px] flex-col justify-center border-dark-red bg-brand-red text-base text-white shadow-brand-red md:text-2xl lg:h-full"
              href="https://app.staylive.io/eastercupklatovy"
              newTab
            >
              Live stream
            </BentoCard>
            <BentoCard
              className="col-start-2 flex h-[150px] flex-col justify-center border-dark-yellow bg-brand-yellow text-base text-black shadow-brand-yellow md:text-2xl lg:h-full"
              href="/results"
            >
              {t("info.home.results")}
            </BentoCard>
            <BentoCard
              className="col-span-2 flex h-[150px] flex-col justify-center bg-brand-blue text-2xl text-white shadow-brand-blue lg:col-span-1 lg:h-full"
              href="/groupStandings"
            >
              {t("link.standings")}
            </BentoCard>
            <BentoCard
              className="col-span-2 flex h-[150px] flex-col justify-center border-dark-yellow bg-brand-yellow text-2xl text-brand-black shadow-brand-yellow lg:col-span-1 lg:hidden lg:h-full"
              href="https://www.flickr.com/photos/eastercupklatovy/"
              newTab
            >
              {t("link.gallery")}
            </BentoCard>
          </div>
        </div>
      </div>
      <div className="py-8 sm:px-4 md:px-8">
        <iframe
          className="aspect-video h-full w-full rounded-xl border-2 border-black shadow-md shadow-brand-black"
          src="https://www.youtube.com/embed/9hkAsNXRFP4?si=qP5xtRzzukx7mKlV"
          title="Eastern Cup 2023 Aftermovie"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}

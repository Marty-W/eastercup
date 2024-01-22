import TimeCounter from "@/components/timeCounter";
import { getI18n } from "locales/server";
import Link from "next/link";
import { api } from "@/trpc/server";
import TeamCountryCount from "@/components/teamCountryCount";
import CountryFlags from "@/components/countryFlags";

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
          <div className="flex flex-col space-y-2 pb-6 text-sm md:space-y-6 md:text-base">
            <TimeCounter />
            <TeamCountryCount
              countryCount={teamCount.countryCount}
              teamCount={teamCount.teamCount}
            />
            <CountryFlags countries={teamCount.countries} />
          </div>
        </div>
      </div>
      <div className="flex justify-center px-5 py-32">
        <iframe
          className="aspect-video w-full max-w-screen-lg border-[12px] border-brand-red"
          src="https://www.youtube.com/embed/9hkAsNXRFP4?si=qP5xtRzzukx7mKlV"
          title="Eastern Cup 2023 Aftermovie"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
          allowFullScreen
        ></iframe>
      </div>
    </>
  );
}

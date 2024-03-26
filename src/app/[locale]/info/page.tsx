import { BentoCard } from "@/components/bentoCard";
import { BouncingArrowText } from "@/components/bouncingArrowText";
import { AnimatedHeroStripe } from "@/components/svgs/heroStripe";
import { getScopedI18n } from "locales/server";

export default async function InformationPage() {
  const t = await getScopedI18n("info.home");
  return (
    <div className="lg:2xl grid flex-1 grid-cols-2 gap-2 font-display md:gap-4 md:text-xl lg:grid-cols-6 lg:gap-y-6">
      <BentoCard
        className="group col-span-2 flex items-center justify-center shadow-slate-400 lg:col-span-3"
        href="/results"
      >
        <BouncingArrowText text={t("results")} />
      </BentoCard>
      <BentoCard
        className="group col-span-2 flex items-center justify-center bg-brand-black text-white shadow-slate-400 lg:col-span-3"
        href="/EC2024_game_schedule.pdf"
        newTab
      >
        <BouncingArrowText text={t("matchesSchedule")} />
      </BentoCard>
      <BentoCard
        className="flex h-32 items-center justify-center border-dark-red bg-brand-red text-white shadow-brand-red lg:col-span-2 lg:row-span-2 lg:h-full"
        href="/info/halls"
      >
        {t("halls")}
      </BentoCard>
      <BentoCard
        className="flex h-32 items-center justify-center border-dark-yellow bg-brand-yellow shadow-brand-yellow lg:col-span-2 lg:row-span-2 lg:h-full"
        href="/info/rules"
      >
        {t("rules")}
      </BentoCard>
      <BentoCard
        className="relative flex min-h-36 items-center justify-center overflow-clip bg-brand-black text-white shadow-brand-black lg:col-span-4 lg:h-72"
        href="/info/about"
      >
        {t("about")}
        <AnimatedHeroStripe disableAnimation />
      </BentoCard>
      <BentoCard
        className="flex min-h-[180px] items-center justify-center border-dark-red bg-brand-red text-white shadow-brand-red lg:col-span-2 lg:h-72"
        href="/info/klatovy"
      >
        {t("klatovy")}
      </BentoCard>
      <BentoCard
        className="col-span-2 flex h-24 items-center justify-center bg-brand-blue text-white shadow-brand-blue lg:col-start-5 lg:row-start-3 lg:h-full"
        href="/info/accommodation"
      >
        {t("accommodation")}
      </BentoCard>
      <BentoCard
        className="col-span-2 flex h-24 items-center justify-center shadow-slate-400 lg:col-start-5 lg:row-start-2 lg:h-full"
        href="/info/catering"
      >
        {t("catering")}
      </BentoCard>
    </div>
  );
}

import { BentoCard } from "@/components/bentoCard";
import { BouncingArrowText } from "@/components/bouncingArrowText";
import { AnimatedHeroStripe } from "@/components/svgs/heroStripe";
import { getScopedI18n } from "locales/server";

export default async function InformationPage() {
  const t = await getScopedI18n("info.home");
  return (
    <div className="lg:2xl grid grid-cols-2 gap-2 font-display md:gap-4 md:text-xl lg:grid-cols-6 lg:gap-y-6">
      <BentoCard
        className="group col-span-2 flex items-center justify-center lg:col-span-3"
        href="#"
      >
        <BouncingArrowText text={t("results")} />
      </BentoCard>
      <BentoCard
        className="group col-span-2 flex items-center justify-center bg-brand-black text-white lg:col-span-3"
        href="#"
      >
        <BouncingArrowText text={t("matchesSchedule")} />
      </BentoCard>
      <BentoCard
        className="flex h-32 items-center justify-center bg-brand-red text-white lg:col-span-2 lg:row-span-2 lg:h-full"
        href="/info/halls"
      >
        {t("halls")}
      </BentoCard>
      <BentoCard
        className="flex h-32 items-center justify-center bg-brand-yellow lg:col-span-2 lg:row-span-2 lg:h-full"
        href="/info/rules"
      >
        {t("rules")}
      </BentoCard>
      <BentoCard
        className="flex h-24 items-center justify-center bg-brand-blue text-white lg:col-span-2 lg:col-start-5"
        href="/info/accommodation"
      >
        {t("accommodation")}
      </BentoCard>
      <BentoCard
        className="flex h-24 items-center justify-center lg:col-span-2 lg:col-start-5 lg:row-start-2"
        href="/info/catering"
      >
        {t("catering")}
      </BentoCard>
      <BentoCard
        className="relative flex h-36 items-center justify-center overflow-clip bg-brand-black text-white lg:col-span-4 lg:h-64"
        href="/info/about"
      >
        {t("about")}
        <AnimatedHeroStripe disableAnimation />
      </BentoCard>
      <BentoCard
        className="flex items-center justify-center bg-brand-red text-white lg:col-span-2"
        href="/info/klatovy"
      >
        {t("klatovy")}
      </BentoCard>
    </div>
  );
}

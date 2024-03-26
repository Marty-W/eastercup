"use client";
import { useState } from "react";
import { AnimatedHeroStripe } from "./svgs/heroStripe";
import { useI18n } from "locales/client";

export const AnimatedWelcomeBento = () => {
  const t = useI18n();
  const [animationSpeed, setAnimationSpeed] = useState(0.4);

  return (
    <div
      className="relative col-span-2 row-span-2 overflow-clip rounded-xl border-2 border-black bg-brand-black px-4 py-5 shadow-lg shadow-brand-black xl:px-5 xl:py-6 2xl:px-7 2xl:py-8"
      onMouseEnter={() => setAnimationSpeed(0.8)}
      onMouseLeave={() => setAnimationSpeed(0.4)}
    >
      <div className="relative flex min-h-[200px] flex-col text-left text-white">
        <div className="w-4/5">
          <h1 className="pb-3 text-xl font-bold md:text-2xl lg:text-4xl 2xl:text-6xl">
            {t("hero.title")}
          </h1>
          <h2 className="text-md lg:text-2xl 2xl:text-4xl">
            28. — 31. 3. 2024
          </h2>
        </div>
      </div>
      <AnimatedHeroStripe animationSpeed={animationSpeed} />
    </div>
  );
};

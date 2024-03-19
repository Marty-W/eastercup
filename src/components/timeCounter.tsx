"use client";
import { TOURNAMENT_START } from "@/lib/conts";
import { intervalToDuration } from "date-fns";
import { useI18n } from "locales/client";
import { useEffect, useState } from "react";

const TimeCounter = () => {
  const today = new Date();
  const [diff, setDiff] = useState(() =>
    intervalToDuration({ start: today, end: TOURNAMENT_START }),
  );
  const t = useI18n();

  useEffect(() => {
    const interval = window.setInterval(() => {
      const today = new Date();
      const diff = intervalToDuration({ start: today, end: TOURNAMENT_START });
      setDiff(diff);
    }, 1000);
    return () => window.clearInterval(interval);
  });

  return (
    <div>
      <p className="text-sm font-semibold">{t("hero.tillStart")}</p>
      <span
        suppressHydrationWarning
        className="text-xs"
      >{`${diff.months}m : ${diff.days}d : ${diff.hours}h : ${diff.minutes}m : ${diff.seconds} s`}</span>
    </div>
  );
};

export default TimeCounter;

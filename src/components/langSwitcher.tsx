"use client";
import { cn } from "@/lib/utils";
// TODO consider using only the buttons as client components

import { useChangeLocale, useCurrentLocale } from "locales/client";

export default function LangSwitcher() {
  const locale = useCurrentLocale();
  const changeLocale = useChangeLocale();

  const handleLocaleChange = (locale: "en" | "cs") => {
    changeLocale(locale);
  };

  return (
    <div className="text-md flex gap-x-1">
      <button
        className={cn(locale === "cs" && "font-bold")}
        onClick={() => handleLocaleChange("cs")}
      >
        cz
      </button>
      <span>|</span>
      <button
        className={cn(locale === "en" && "font-bold")}
        onClick={() => handleLocaleChange("en")}
      >
        en
      </button>
    </div>
  );
}

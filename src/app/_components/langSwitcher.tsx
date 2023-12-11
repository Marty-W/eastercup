"use client";
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
        className={locale === "cs" ? "font-bold" : undefined}
        onClick={() => handleLocaleChange("cs")}
      >
        cz
      </button>
      <span>|</span>
      <button
        className={locale === "en" ? "font-bold" : undefined}
        onClick={() => handleLocaleChange("en")}
      >
        en
      </button>
    </div>
  );
}

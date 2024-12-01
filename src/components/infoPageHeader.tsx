"use client";
import { type LocaleKey } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useI18n } from "locales/client";
import { ArrowLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const HEADERS: Record<string, LocaleKey> = {
  "/info/map": "info.home.map",
  "/info/rules": "info.home.rules",
  "/info/accommodation": "info.home.accommodation",
  "/info/catering": "info.home.catering",
  "/info/about": "info.home.about",
  "/info/klatovy": "info.home.klatovy",
  "/info/contacts": "info.home.contact",
};

const HEADER_COLORS: Record<string, string> = {
  "/info/halls": "red",
  "/info/rules": "yellow",
  "/info/accommodation": "blue",
  "/info/catering": "black",
  "/info/about": "blue",
  "/info/klatovy": "red",
  "/info/contacts": "yellow",
};

interface Props {
  className?: string;
}

export const InfoPageHeader = ({ className }: Props) => {
  const router = useRouter();
  const currentPathname = usePathname();
  const t = useI18n();

  if (!HEADERS[currentPathname]) {
    return null;
  }

  const borderColor = (color?: string) => {
    switch (color) {
      case "blue":
        return "#213a8f";
      case "red":
        return "#FF0000";
      case "yellow":
        return "#ffed03";
      case "black":
      default:
        return "#121212";
    }
  };

  return (
    <div
      className={cn(
        "flex grid-cols-3 flex-col items-center rounded-lg border-0 md:grid md:border-2 md:px-6",
        className,
      )}
      // style={{ borderColor: borderColor(HEADER_COLORS[currentPathname]) }}
    >
      <h2 className="mx-auto w-fit px-6 py-4 text-center text-2xl font-bold leading-8 text-brand-black md:col-start-2 lg:text-4xl">
        {t(HEADERS[currentPathname])}
      </h2>
      {currentPathname !== "/info/contacts" && (
        <div className="flex items-center space-x-2 md:col-start-1 md:row-start-1">
          <button
            className="text-brand-black active:translate-y-0.5 md:col-start-1 md:row-start-1"
            onClick={() => router.back()}
          >
            <ArrowLeft size={32} />
          </button>
          <span className="hidden md:inline-block">
            {t("info.home.goBack")}
          </span>
        </div>
      )}
    </div>
  );
};

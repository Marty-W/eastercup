"use client";
import { type LocaleKey } from "@/lib/types";
import { useI18n } from "locales/client";
import { ArrowLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const HEADERS: Record<string, LocaleKey> = {
  "/info/halls": "info.home.halls",
  "/info/rules": "info.home.rules",
  "/info/accommodation": "info.home.accommodation",
  "/info/catering": "info.home.catering",
  "/info/about": "info.home.about",
  "/info/klatovy": "info.home.klatovy",
  "/info/contacts": "info.home.contact",
};

export const InfoPageHeader = () => {
  const router = useRouter();
  const currentPathname = usePathname();
  const t = useI18n();

  if (!HEADERS[currentPathname]) {
    return null;
  }

  return (
    <div className="flex grid-cols-3 flex-col items-center space-y-3 md:grid">
      <h2 className="mx-auto w-fit border-2 border-brand-blue px-6 py-4 text-center text-2xl font-bold uppercase leading-8 text-brand-blue md:col-start-2 lg:text-4xl">
        {t(HEADERS[currentPathname]!)}
      </h2>
      {currentPathname !== "/info/contacts" && (
        <button
          className="text-brand-blue active:translate-y-0.5 md:col-start-1 md:row-start-1"
          onClick={() => router.back()}
        >
          <ArrowLeft size={32} />
        </button>
      )}
    </div>
  );
};

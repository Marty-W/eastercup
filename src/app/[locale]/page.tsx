import Footer from "@/components/footer";
import TimeCounter from "@/components/timeCounter";
import { getI18n } from "locales/server";
import Link from "next/link";
import Image from "next/image";

export default async function Landing() {
  const t = await getI18n();
  return (
    <>
      <div className="flex h-[calc(100svh-160px)] flex-col justify-between">
        <div className="flex flex-1 flex-col justify-between px-5 pt-7 text-center text-lg">
          <div>
            <div className="mb-6">
              <h2 className="font-bold">28.-31.3.2023</h2>
              <span>{`Klatovy, ${t("common.cz")}`}</span>
            </div>
            <div className="font-bold">
              <h1>{t("hero.title")}</h1>
            </div>
          </div>
          <Link href="/form" className="mx-16 bg-brand-yellow px-2 py-2">
            {t("hero.button")}
          </Link>
          <div className="flex flex-col justify-between space-y-2 pb-8 text-sm">
            <TimeCounter />
            <span>{t("hero.teamcount")}</span>
          </div>
        </div>
      </div>
      <div>
        {/* TODO remove this, only a thumbnail */}
        <Image
          src="/landing_thumbnail.png"
          alt="group"
          width={258}
          height={183}
          className="mx-auto pb-8"
        />
      </div>
      <Footer />
    </>
  );
}

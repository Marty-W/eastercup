import Image from "next/image";
import HeroStripe from "../../../public/header_stripe.svg";
import LogoBig from "../../../public/logo_big.svg";
import TimeCounter from "../_components/timeCounter";
import { getI18n } from "locales/server";
import LangSwitcher from "../_components/langSwitcher";

export default async function Landing() {
  const t = await getI18n();
  return (
    <main className="flex flex-col">
      <div className="flex h-[100svh] flex-col justify-between">
        <header className="px-4 pt-4">
          <div className="flex h-16 items-center justify-between">
            <LogoBig height="auto" />
            <nav>
              <LangSwitcher />
              {/* TODO add hamburger menu */}
            </nav>
          </div>
        </header>
        <HeroStripe viewBox="0 0 1000 300" />
        <div className="flex flex-1 flex-col justify-between px-5 pt-7 text-center text-lg">
          <div>
            <div className="mb-6">
              <h2 className="font-bold">28.-31.3.2023</h2>
              <span>Klatovy, Czech Republic</span>
            </div>
            <div className="font-bold">
              <h1>{t("hero.title")}</h1>
            </div>
          </div>
          <button className="mx-16 bg-brand-yellow px-2 py-2">
            registrace do turnaje
          </button>
          <div className="flex flex-col justify-between space-y-2 pb-8 text-sm">
            <TimeCounter />
            <span>prihlaseno x tymu z x zemi</span>
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
      <footer className="mt-auto">
        <div className="h-2 w-full bg-brand-blue" />
        <div className="flex flex-col p-6 text-sm">
          <div className="mb-2 flex flex-col">
            <span className="font-bold">BK Klatovy</span>
            <span>Voriskova 715, Klatovy III.</span>
            <span>33901</span>
            <span>IČ:22850490</span>
            <span>c.u: 241338205/0300 ČSOB Klatovy</span>
          </div>
          <div className="mb-4">
            <a href="https://basketbal-klatovy.cz" target="_blank">
              www.basketbal-klatovy.cz
            </a>
            {/* TODO format as email */}
            <p>bk.klatovy@seznam.cz</p>
            <p>All rights reserved</p>
          </div>
          <div className="my-auto grid grid-cols-3 grid-rows-2 place-items-center pb-6">
            {/* TODO get logos in higher res / svg */}

            <Image
              src="/brand_logos/czbasketball.png"
              width={50}
              height={50}
              alt="Czech basketball federation logo"
            />
            <Image
              src="/brand_logos/dragonpress.png"
              width={50}
              height={50}
              alt="Czech basketball federation logo"
            />
            <Image
              src="/brand_logos/fiba.png"
              width={50}
              height={50}
              alt="Czech basketball federation logo"
            />
            <Image
              src="/brand_logos/klatovy.png"
              width={50}
              height={50}
              alt="Czech basketball federation logo"
            />
            <Image
              src="/brand_logos/meks.png"
              width={50}
              height={50}
              alt="Czech basketball federation logo"
            />
            <Image
              src="/brand_logos/peak.png"
              width={50}
              height={50}
              alt="Czech basketball federation logo"
            />
            <Image
              src="/brand_logos/plzenskykraj.png"
              width={50}
              height={50}
              alt="Czech basketball federation logo"
            />
            <Image
              src="/brand_logos/smucler.png"
              width={50}
              height={50}
              alt="Czech basketball federation logo"
            />
          </div>
        </div>
      </footer>
    </main>
  );
}

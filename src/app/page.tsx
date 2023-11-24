import Image from "next/image";

export default function Landing() {
  return (
    <main className="flex h-screen flex-col">
      <header className="pr-5">
        <div className="flex items-center justify-between">
          <Image
            src="/logo_big.svg"
            // TODO make the logo responsive
            //TODO left padding is off
            width={83}
            height={67}
            alt="EasterCup logo"
          />
          <nav>
            <div className="flex gap-x-1 text-[10px]">
              <button>cz</button>
              <span>|</span>
              <button>en</button>
            </div>
            {/* TODO add hamburger menu */}
          </nav>
        </div>
      </header>
      <Image
        src="/header_stripe.svg"
        className="w-full"
        height={33}
        width={1000}
        alt="Decorative stripe"
      />
      <div className="flex flex-col justify-around gap-y-4 px-5 pt-7 text-center text-[10px]">
        <div className="">
          <h2 className="font-bold">28.-31.3.2023</h2>
          <span>Klatovy, Czech Republic</span>
        </div>
        <div className="font-bold">
          <h1>mezinarodni basketbalovy turnaj</h1>
          <h1>mladeze</h1>
        </div>
        <button className="mx-16 bg-brand-yellow px-2 py-2">
          registrace do turnaje
        </button>
        <div className="flex justify-between text-[9px]">
          {/* TODO add timedown counter */}
          <span>xxx:xx:xx:xx</span>
          <span>prihlaseno x tymu z x zemi</span>
        </div>
      </div>
      <div>
        {/* TODO remove this, only a thumbnail */}
        <Image
          src="/landing_thumbnail.png"
          alt="group"
          width={258}
          height={183}
          className="mx-auto pt-28"
        />
      </div>
      <footer className="mt-auto">
        <div className="h-2 w-full bg-brand-blue" />
        <div className="grid grid-cols-2 grid-rows-2 place-content-center px-5 py-5 text-[6px]">
          <div className="flex flex-col">
            <span className="font-bold">BK Klatovy</span>
            <span>Voriskova 715, Klatovy III.</span>
            <span>33901</span>
            <span>IČ:22850490</span>
            <span>c.u: 241338205/0300 ČSOB Klatovy</span>
          </div>
          <div className="row-start-2 self-center">
            <a href="https://basketbal-klatovy.cz" target="_blank">
              www.basketbal-klatovy.cz
            </a>
            {/* TODO format as email */}
            <p>bk.klatovy@seznam.cz</p>
            <p>All rights reserved</p>
          </div>
          <div className="row-span-2 my-auto grid grid-cols-3 grid-rows-2">
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

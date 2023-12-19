import Image from "next/image";
export default function Footer() {
  return (
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
  );
}

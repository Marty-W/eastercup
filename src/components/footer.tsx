import Socials from "./socials";
import Sponsors from "./sponsors";
export default function Footer() {
  return (
    <footer className="mt-auto">
      <div className="mb-10 h-2 w-full bg-brand-blue" />
      <div className="md:hidden">
        <Socials />
      </div>
      <div className="flex flex-col p-6 text-center text-sm md:text-base">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col">
            <span className="font-bold">BK Klatovy</span>
            <span>Voriskova 715, Klatovy III.</span>
            <span>33901</span>
            <span>IČ:22850490</span>
            <span>c.u: 241338205/0300 ČSOB Klatovy</span>
          </div>
          <div className="">
            <a href="https://basketbal-klatovy.cz" target="_blank">
              www.basketbal-klatovy.cz
            </a>
            {/* TODO format as email */}
            <p>bk.klatovy@seznam.cz</p>
            <p>All rights reserved</p>
          </div>
          <Sponsors />
        </div>
      </div>
    </footer>
  );
}

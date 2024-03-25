import Link from "next/link";
import Image from "next/image";
import Socials from "./socials";
import { getScopedI18n } from "locales/server";
// TODO: add translations
export default async function Footer() {
  const t = await getScopedI18n("footer");
  return (
    <footer
      className="mx-3 flex flex-col rounded-tl-lg rounded-tr-lg border-[3px] border-b-0 border-brand-red px-3 font-display text-[9px] sm:px-8 sm:text-[12px] md:px-20 md:pt-12 lg:mx-5 lg:grid lg:grid-cols-3"
      id="footer"
    >
      <div className="mx-auto w-[60%] py-4 md:hidden">
        <Socials iconSize={40} />
      </div>
      <div className="grid grid-cols-[1fr_140px] grid-rows-[auto_auto] gap-y-2 pb-6 lg:col-span-2 lg:grid-cols-2">
        <div className="flex flex-col space-y-[1px]">
          <span className="my-2 font-semibold">{t("contact")}</span>
          <Link
            href="https://basketbal-klatovy.cz"
            target="_blank"
            className="cursor-pointer"
          >
            www.basketbal-klatovy.cz
          </Link>
          <p>
            <a href="mailto:bk.klatovy@seznam.cz" className="cursor-pointer">
              bk.klatovy@seznam.cz
            </a>
          </p>
          <p>
            <a
              href="mailto:info@eastercupklatovy.cz"
              className="cursor-pointer"
            >
              info@eastercupklatovy.cz
            </a>
          </p>
        </div>
        <div className="row-start-2 flex flex-col">
          <span className="my-2 font-semibold">{t("address")}</span>
          <div className="flex flex-col space-y-[1px]">
            <span>BK Klatovy</span>
            <span>Voříškova 715, Klatovy III.</span>
            <span>33901</span>
            <span>IČ:22850490</span>
            <span>č.ú.: 241338205/0300 ČSOB Klatovy</span>{" "}
          </div>
        </div>
        <div className="relative col-start-2 row-span-2">
          <Image alt="decoration" src="/guy_illustration.svg" fill />
        </div>
      </div>
      <div className="grid grid-rows-[auto_200px]">
        <p className="pb-2 text-center text-xs font-semibold sm:mb-3 sm:text-base">
          {t("thankYou")}
        </p>
        <div className="relative">
          <Image alt="sponsors" src="/sponsors.svg" fill />
        </div>
      </div>
    </footer>
  );
}

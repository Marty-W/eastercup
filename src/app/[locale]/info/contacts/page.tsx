import Link from "next/link";

export default function Contacts() {
  return (
    <div className="space-y-4 py-8 text-center">
      <div className="space-y-1">
        <Link
          href="https://basketbal-klatovy.cz"
          target="_blank"
          className="cursor-pointer hover:text-brand-blue"
        >
          www.basketbal-klatovy.cz
        </Link>
        <p>
          <a
            href="mailto:info@eastercupklatovy.cz"
            className="cursor-pointer hover:text-brand-blue"
          >
            info@eastercupklatovy.cz
          </a>
        </p>
        <p>Hotline: +420 731 596 119</p>
      </div>
      <div className="flex flex-col">
        <span className="font-bold">BK Klatovy</span>
        <span>Voriškova 715, Klatovy III.</span>
        <span>33901</span>
        <span>IČ:22850490</span>
        <span>č.ú.: 241338205/0300 ČSOB Klatovy</span>{" "}
      </div>
    </div>
  );
}

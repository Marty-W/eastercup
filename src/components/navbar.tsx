import Link from "next/link";
import LangSwitcher from "./langSwitcher";
import Image from "next/image";
import LogoBig from "public/logo-big.svg";

export default function Navbar() {
  return (
    <header className="relative grid h-[30vh] grid-cols-2 grid-rows-[1fr_1.5fr] space-y-2 px-4 pt-4">
      <div className="flex justify-self-start">
        <Link href="/" className="h-full w-full">
          <Image
            src={LogoBig as string}
            alt="Logo"
            className="h-full max-h-28 w-fit"
          />
        </Link>
      </div>
      <nav className="flex items-center justify-end">
        <LangSwitcher />
        {/* TODO add hamburger menu */}
      </nav>
      <div
        className={`col-span-2 bg-[url('../images/header-stripe.svg')] bg-cover bg-clip-padding bg-repeat-x`}
      />
    </header>
  );
}

import Link from "next/link";
import LangSwitcher from "./langSwitcher";
import Image from "next/image";
import LogoBig from "public/logo-big.svg";
import Socials from "./socials";

export default function Navbar() {
  return (
    <header className="md:grid-rows[1fr_3fr] grid h-[30vh] grid-cols-2 grid-rows-[1fr_3fr] px-4 pt-4">
      <div className="col-span-2 flex items-center justify-between md:px-6">
        <Link href="/" className="flex w-1/4 max-w-[150px] items-center">
          <Image src={LogoBig as string} alt="Logo" objectFit="cover" />
        </Link>
        <nav className="flex flex-1 items-center justify-end space-x-8">
          <div className="hidden md:block">
            <Socials />
          </div>
          <LangSwitcher />
        </nav>
      </div>
      <div
        className={`col-span-2 bg-[url('../images/header-stripe.svg')] bg-cover bg-clip-padding bg-repeat-x`}
      />
    </header>
  );
}

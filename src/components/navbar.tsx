import Link from "next/link";
import LangSwitcher from "./langSwitcher";
import Image from "next/image";
import Socials from "./socials";
import HamburgerMenu from "./hamburger";
import NavLinks from "./navLinks";
import { HEADER_HEIGHT } from "@/lib/conts";

export default function Navbar() {
  return (
    <header className={`px-4 pt-4 lg:h-[${HEADER_HEIGHT}vh]`}>
      <div className="col-span-2 flex items-center justify-between md:px-6">
        <Link href="/" className="flex w-1/4 max-w-[150px] items-center">
          <Image width={500} height={500} src="/logo-big.svg" alt="Logo" />
        </Link>
        <nav className="flex flex-1 items-center justify-end space-x-8">
          <div className="hidden lg:block">
            <NavLinks />
          </div>
          <div className="hidden md:block">
            <Socials />
          </div>
          <LangSwitcher />
          <div className="lg:hidden">
            <HamburgerMenu />
          </div>
        </nav>
      </div>
    </header>
  );
}

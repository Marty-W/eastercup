import Link from "next/link";
import LangSwitcher from "./langSwitcher";
import Image from "next/image";
import Socials from "./socials";
import HamburgerMenu from "./hamburger";
import NavLinks from "./navLinks";

export default function Navbar() {
  return (
    <header className="px-4 pt-4 md:px-8">
      <nav className="grid h-[10vh] grid-cols-3 lg:min-h-[12vh]">
        <div className="relative flex h-full w-full items-center justify-self-start">
          <Link href="/" className="h-full w-full">
            <Image
              src="/logo-big.svg"
              alt="Logo"
              layout="fill"
              objectFit="contain"
            />
          </Link>
        </div>
        <div className="hidden self-center justify-self-center lg:block">
          <NavLinks />
        </div>
        <div className="col-span-2 col-start-2 flex items-center space-x-4 justify-self-end lg:col-span-1 lg:col-start-3">
          <div className="hidden md:block">
            <Socials />
          </div>
          <LangSwitcher />
          <div className="h-[30px] lg:hidden">
            <HamburgerMenu />
          </div>
        </div>
      </nav>
    </header>
  );
}

import Link from "next/link";
import LangSwitcher from "./langSwitcher";
import Image from "next/image";
import Socials from "./socials";
import HamburgerMenu from "./hamburger";
import NavLinks from "./navLinks";

export default function Navbar() {
  return (
    <header className="px-4 pt-4 md:px-8 lg:px-14 lg:pt-8">
      <nav className="grid h-[10vh] grid-cols-[1fr_2fr_1fr] lg:min-h-[12vh]">
        <div className="flex h-full w-full items-center justify-self-start">
          <Link href="/" className="relative h-full w-full">
            <Image
              src="/logo-big.svg"
              alt="Logo"
              layout="fill"
              objectFit="contain"
              objectPosition="left"
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

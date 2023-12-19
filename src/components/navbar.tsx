import LangSwitcher from "./langSwitcher";
import LogoBig from "public/logo_big.svg";
import HeroStripe from "public/header_stripe.svg";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="h-[160px] px-4 pt-4">
      <div className="flex h-16 items-center justify-between">
        <Link href="/">
          <LogoBig height={60} width="auto" />
        </Link>
        <nav>
          <LangSwitcher />
          {/* TODO add hamburger menu */}
        </nav>
      </div>
      <HeroStripe viewBox="0 0 1000 300" />
    </header>
  );
}

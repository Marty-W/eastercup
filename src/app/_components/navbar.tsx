import LangSwitcher from "./langSwitcher";
import LogoBig from "../../../public/logo_big.svg";
import HeroStripe from "../../../public/header_stripe.svg";

export default function Navbar() {
  return (
    <header className="px-4 pt-4">
      <div className="flex h-16 items-center justify-between">
        <LogoBig height="auto" />
        <nav>
          <LangSwitcher />
          {/* TODO add hamburger menu */}
        </nav>
      </div>
      <HeroStripe viewBox="0 0 1000 300" />
    </header>
  );
}

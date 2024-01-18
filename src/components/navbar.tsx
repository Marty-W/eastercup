import Link from "next/link";
import LangSwitcher from "./langSwitcher";
import Image from "next/image";
import Socials from "./socials";
import { getI18n } from "locales/server";

export default async function Navbar() {
  const t = await getI18n();
  return (
    <header className="md:grid-rows[1fr_3fr] grid h-[30vh] grid-cols-2 grid-rows-[1fr_3fr] px-4 pt-4">
      <div className="col-span-2 flex items-center justify-between md:px-6">
        <Link href="/" className="flex w-1/4 max-w-[150px] items-center">
          <Image width={500} height={500} src="/logo-big.svg" alt="Logo" />
        </Link>
        <nav className="flex flex-1 items-center justify-end space-x-8">
          <Link
            href="/info"
            className="font-display font-bold decoration-2 hover:underline hover:underline-offset-4"
          >
            {t("navbar.info")}
          </Link>
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

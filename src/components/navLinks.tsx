"use client";
import { type NavLink } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useI18n } from "locales/client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS: NavLink[] = [
  {
    href: "/info",
    text: "navbar.info",
  },
  {
    href: "/teams",
    text: "navbar.teams",
  },
];

export default function NavLinks() {
  const pathname = usePathname();
  const t = useI18n();
  return (
    <div className="space-x-4 font-display decoration-2 ">
      {LINKS.map(({ href, text }) => (
        <Link
          href={href}
          className={cn(
            pathname === href && "font-bold",
            "text-lg hover:underline hover:underline-offset-4",
          )}
          key={href}
        >
          {t(text)}
        </Link>
      ))}
    </div>
  );
}
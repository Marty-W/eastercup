"use client";
import Link from "next/link";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Popover } from "./ui/popover";
import { PopoverContent, PopoverTrigger } from "./ui/popover";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { type NavLink } from "@/lib/types";
import { useI18n } from "locales/client";

const LINKS: NavLink[] = [
  {
    href: "/info",
    text: "hamburger.info",
  },
  {
    href: "/teams",
    text: "hamburger.teams",
  },
];

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const t = useI18n();
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger className="cursor-pointer">
        <Menu size={30} />
      </PopoverTrigger>
      <PopoverContent
        className="w-[120px]"
        align="end"
        alignOffset={10}
        sideOffset={10}
      >
        <div className="flex flex-col space-y-2 font-display">
          {LINKS.map(({ href, text }) => (
            <Link
              href={href}
              className={cn(pathname === href && "font-bold")}
              onClick={() => setIsOpen(false)}
              key={href}
            >
              {t(text)}
            </Link>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

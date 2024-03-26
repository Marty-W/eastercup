import { cn } from "@/lib/utils";
import Link from "next/link";

interface Props {
  children: React.ReactNode;
  className?: string;
  disablePadding?: boolean;
  disableBorder?: boolean;
  href?: string;
  newTab?: boolean;
}
export const BentoCard = ({
  children,
  className,
  disablePadding = false,
  disableBorder = false,
  href,
  newTab = false,
}: Props) => {
  if (href) {
    return (
      <Link
        href={href}
        target={newTab ? "_blank" : "_self"}
        className={cn(
          "border-black",
          className,
          !disablePadding && "px-4 py-5",
          !disableBorder && "border-2",
          "rounded-xl text-center shadow-md",
        )}
      >
        {children}
      </Link>
    );
  }

  return (
    <div
      className={cn(
        className,
        !disablePadding && "px-4 py-5",
        !disableBorder && "border-2 border-black",
        "rounded-xl shadow-md xl:px-5 xl:py-6 2xl:px-7 2xl:py-8",
      )}
    >
      {children}
    </div>
  );
};

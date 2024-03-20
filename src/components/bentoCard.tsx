import { cn } from "@/lib/utils";
import Link from "next/link";

interface Props {
  children: React.ReactNode;
  className?: string;
  disablePadding?: boolean;
  disableBorder?: boolean;
  href?: string;
}
export const BentoCard = ({
  children,
  className,
  disablePadding = false,
  disableBorder = false,
  href,
}: Props) => {
  if (href) {
    return (
      <Link
        href={href}
        className={cn(
          className,
          !disablePadding && "px-4 py-5",
          !disableBorder && "border-2 border-black",
          "rounded-xl",
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
        "rounded-xl xl:px-5 xl:py-6 2xl:px-7 2xl:py-8",
      )}
    >
      {children}
    </div>
  );
};

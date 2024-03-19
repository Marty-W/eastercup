import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
  disablePadding?: boolean;
  disableBorder?: boolean;
}
export const BentoCard = ({
  children,
  className,
  disablePadding = false,
  disableBorder = false,
}: Props) => {
  return (
    <div
      className={cn(
        className,
        !disablePadding && "px-4 py-5",
        !disableBorder && "border-2 border-black",
        "rounded-xl",
      )}
    >
      {children}
    </div>
  );
};

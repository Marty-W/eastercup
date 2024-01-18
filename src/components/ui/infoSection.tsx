import { cn } from "@/lib/utils";

interface InfoSectionProps {
  header?: string;
  children: React.ReactNode;
  className?: string;
  subSectionClassName?: string;
}
export function InfoSection({
  header,
  children,
  className,
  subSectionClassName,
}: InfoSectionProps) {
  return (
    <div
      className={cn(
        "space-y-2 lg:grid lg:grid-cols-[0.6fr_2fr] lg:gap-x-1 lg:space-y-0",
        className,
      )}
    >
      {header && (
        <h3 className="text-sm font-bold uppercase text-brand-blue">
          {header}
        </h3>
      )}
      <div className={cn("text-xs", subSectionClassName)}>{children}</div>
    </div>
  );
}

interface InfoSubsectionProps {
  className?: string;
  children: React.ReactNode;
}

export function InfoSubsection({ className, children }: InfoSubsectionProps) {
  return (
    <div className={cn("space-y-1 lg:space-y-2", className)}>{children}</div>
  );
}

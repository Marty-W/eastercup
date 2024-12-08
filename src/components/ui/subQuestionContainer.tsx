import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  children: React.ReactNode;
}

export default function SubQuestionContainer({ className, children }: Props) {
  return (
    <div
      className={cn(
        "flex flex-col items-start space-x-3 space-y-0 rounded-md border p-4 shadow",
        className,
      )}
    >
      {children}
    </div>
  );
}

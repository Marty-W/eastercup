import { type FormSegment } from "@/lib/types";
import { cn } from "@/lib/utils";

interface Props {
  finishedSegments: Record<FormSegment, boolean>;
  activeSegment: FormSegment;
  sectionSegment: FormSegment;
  segmentText: string;
}

export default function FormStepperSegment({
  activeSegment,
  sectionSegment,
  segmentText,
  finishedSegments,
}: Props) {
  const isActive = activeSegment === sectionSegment;
  return (
    <div className="flex w-1/4 flex-col space-y-1">
      <span className={cn(isActive && "text-foreground")}>{segmentText}</span>
      <div
        className={cn(
          "h-2 rounded-md bg-muted text-center",
          isActive && "bg-slate-300",
          finishedSegments[sectionSegment] && "bg-green-400",
        )}
      />
    </div>
  );
}

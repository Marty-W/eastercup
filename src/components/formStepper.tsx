import { finishedFormStepsAtom } from "@/lib/atoms";
import { isFormFinalSegment, type FormSegment } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useAtomValue } from "jotai";

interface Props {
  activeSegment: FormSegment;
}
export default function FormStepper({ activeSegment }: Props) {
  const finishedSteps = useAtomValue(finishedFormStepsAtom);
  if (isFormFinalSegment(activeSegment)) {
    return null;
  }

  return (
    <div className="flex justify-around pb-6 text-center text-sm text-foreground/30">
      <div className="flex w-1/4 flex-col space-y-1">
        <span className={cn(activeSegment === "info" && "text-foreground")}>
          team info
        </span>
        <div
          className={cn(
            "h-2 rounded-md bg-muted text-center transition-colors duration-500",
            activeSegment === "info" && "bg-slate-300",
            finishedSteps.info && "bg-green-400",
          )}
        />
      </div>
      <div className="flex w-1/4 flex-col space-y-1">
        <span className={cn(activeSegment === "billing" && "text-foreground")}>
          billing
        </span>
        <div
          className={cn(
            "h-2 rounded-md bg-muted text-center transition-colors duration-500",
            activeSegment === "billing" && "bg-slate-400",
            finishedSteps.billing && "bg-green-400",
          )}
        />
      </div>
      <div className="flex w-1/4 flex-col space-y-1">
        <span className={cn(activeSegment === "services" && "text-foreground")}>
          services
        </span>
        <div
          className={cn(
            "h-2 rounded-md bg-slate-100 text-center transition-colors duration-500",
            activeSegment === "services" && "bg-slate-400",
            // finishedSteps.services && "bg-green-400",
          )}
        />
      </div>
    </div>
  );
}

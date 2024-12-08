import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "./tooltip";
import { Info } from "lucide-react";

interface Props {
  children: React.ReactNode;
}

export default function InfoTooltip({ children }: Props) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={50}>
        <TooltipTrigger asChild className="cursor-pointer">
          <Info className="text-secondary-foreground/50" size={20} />
        </TooltipTrigger>
        <TooltipContent className="p-5">{children}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

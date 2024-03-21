import { cn } from "@/lib/utils";
import { ArrowRight, ArrowLeft } from "lucide-react";

interface Props {
  text: string;
  className?: string;
  textPadding?: number;
}

export function BouncingArrowText({ text, className, textPadding = 5 }: Props) {
  return (
    <div className={cn(className, "flex")}>
      <ArrowRight size={24} className="group-hover:animate-bounce-left" />
      <span className={`px-${textPadding}`}>{text}</span>
      <ArrowLeft size={24} className="group-hover:animate-bounce-right" />
    </div>
  );
}

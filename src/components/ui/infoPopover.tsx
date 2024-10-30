import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Info } from "lucide-react";

interface Props {
  children: React.ReactNode;
}

export default function InfoPopover({ children }: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild className="cursor-pointer">
        <Info className="text-secondary-foreground/50" size={20} />
      </PopoverTrigger>
      <PopoverContent className="p-5">{children}</PopoverContent>
    </Popover>
  );
}

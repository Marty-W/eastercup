import { cn } from "@/lib/utils";
import { MoveLeft } from "lucide-react";
import { Button } from "../ui/button";

interface Props {
  className?: string;
  children: React.ReactNode;
  header: string;
  headerAction?: () => void;
  infoPopover?: React.ReactNode;
}

export default function SubQuestionContainerWithReturn({
  className,
  children,
  header,
  headerAction,
  infoPopover,
}: Props) {
  return (
    <div className={cn(className)}>
      <div className="grid grid-cols-3 items-center">
        <Button
          variant="ghost"
          onClick={headerAction}
          className="justify-self-start text-muted-foreground"
        >
          <MoveLeft className="" />
        </Button>
        <h3 className="text-md col-start-2 justify-self-center">{header}</h3>
        {infoPopover && <div className="justify-self-end">{infoPopover}</div>}
      </div>
      <div className="rounded-md border p-1 lg:p-6">{children}</div>
    </div>
  );
}

import { cn } from "@/lib/utils";
import { MoveLeft } from "lucide-react";
import { Button } from "../ui/button";

interface Props {
  className?: string;
  children: React.ReactNode;
  header: string;
  headerAction?: () => void;
  tooltip?: React.ReactNode;
}

export default function SubQuestionContainerWithReturn({
  className,
  children,
  header,
  headerAction,
  tooltip,
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
        {tooltip && <div className="justify-self-end">{tooltip}</div>}
      </div>
      <div className="rounded-md border p-2">{children}</div>
    </div>
  );
}
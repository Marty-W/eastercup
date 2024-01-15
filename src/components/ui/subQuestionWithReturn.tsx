import { cn } from "@/lib/utils";
import { MoveLeft } from "lucide-react";
import { Button } from "../ui/button";

interface Props {
  className?: string;
  children: React.ReactNode;
  header: string;
  headerAction?: () => void;
}

export default function SubQuestionContainerWithReturn({
  className,
  children,
  header,
  headerAction,
}: Props) {
  return (
    <div className={cn(className)}>
      <div className="flex items-center space-x-4 text-muted-foreground">
        <Button variant="ghost" onClick={headerAction}>
          <MoveLeft className="" />
        </Button>
        <h3 className="text-sm">{header}</h3>
      </div>
      {children}
    </div>
  );
}

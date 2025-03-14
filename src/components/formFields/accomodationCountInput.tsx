import { type Control, type FieldValues, type Path } from "react-hook-form";
import { FormField, FormItem, FormControl } from "../ui/form";
import { Input } from "../ui/input";
import { type LocaleKey } from "@/lib/types";
import { cn } from "@/lib/utils";

interface Props<T extends FieldValues> {
  fieldName: string;
  fieldLabel?: LocaleKey;
  control: Control<T>;
  className?: string;
}

export default function AccomodationCountInput<T extends FieldValues>({
  fieldName,
  control,
  className,
}: Props<T>) {
  return (
    <FormField
      control={control}
      name={fieldName as Path<T>}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input
              {...field}
              className={cn("min-w-max", className)}
              type="number"
              max={99}
              min={0}
              onChange={(e) => field.onChange(Number(e.target.value))}
              value={field.value}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}

import { type Control, type FieldValues, type Path } from "react-hook-form";
import { FormField, FormItem, FormControl } from "../ui/form";
import { Input } from "../ui/input";
import { type LocaleKey } from "@/lib/types";

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
            {/* TODO: get actual max number */}
            <Input
              {...field}
              className={className}
              type="number"
              max={50}
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

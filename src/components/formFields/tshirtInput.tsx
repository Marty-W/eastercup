import { type Control, type FieldValues, type Path } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl } from "../ui/form";
import { Input } from "../ui/input";

interface Props<T extends FieldValues> {
  fieldName: Path<T>;
  control: Control<T>;
  fieldLabel: string;
}

export default function TshirtInput<T extends FieldValues>({
  fieldName,
  fieldLabel,
  control,
}: Props<T>) {
  return (
    <FormField
      control={control}
      name={fieldName}
      render={({ field }) => (
        <FormItem className="flex items-center space-x-2 place-self-center">
          <FormLabel className="w-6">{fieldLabel}</FormLabel>
          <FormControl>
            <Input
              {...field}
              className="w-16"
              type="number"
              max={50}
              min={0}
              onChange={(e) => field.onChange(Number(e.target.value))}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}

import { type Control, type FieldValues, type Path } from "react-hook-form";
import { FormField, FormItem, FormControl } from "../ui/form";
import { Input } from "../ui/input";

interface Props<T extends FieldValues> {
  fieldName: Path<T>;
  control: Control<T>;
}

export default function FoodInput<T extends FieldValues>({
  fieldName,
  control,
}: Props<T>) {
  return (
    <FormField
      control={control}
      name={fieldName}
      render={({ field }) => (
        <FormItem className="">
          <FormControl>
            <Input
              {...field}
              className="max-w-[60px]"
              type="number"
              max={99}
              min={0}
              onChange={(e) => field.onChange(Number(e.target.value))}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}

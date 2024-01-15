import { type LocaleKey } from "@/lib/types";
import { useI18n } from "locales/client";
import {
  useWatch,
  type Control,
  type FieldValues,
  type Path,
  useFormContext,
} from "react-hook-form";
import { Checkbox } from "../ui/checkbox";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";

interface Props<T extends FieldValues> {
  checkBoxFieldName: Path<T>;
  numberFieldName: Path<T>;
  control: Control<T>;
  fieldLabel: LocaleKey;
}

export default function AllergyCheckbox<T extends FieldValues>({
  checkBoxFieldName,
  numberFieldName,
  control,
  fieldLabel,
}: Props<T>) {
  const t = useI18n();
  const form = useFormContext<T>();
  const isCheckboxChecked = useWatch({
    control: control,
    name: checkBoxFieldName,
  });

  return (
    <div className="flex flex-col items-center space-y-3 rounded-md border p-4">
      <FormField
        control={control}
        name={checkBoxFieldName}
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={(value) => {
                  if (value === false) {
                    form.resetField(numberFieldName);
                  }
                  field.onChange(value);
                }}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>{t(fieldLabel)}</FormLabel>
            </div>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={numberFieldName}
        disabled={!isCheckboxChecked}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
                className="w-[60px]"
                type="number"
                max={50}
                min={0}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
}

import { type Control, type FieldValues, type Path } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "../ui/form";
import { Input } from "../ui/input";
import { useI18n } from "locales/client";
import { type LocaleKey } from "@/lib/types";

interface Props<T extends FieldValues> {
  fieldName: Path<T>;
  fieldLabel?: LocaleKey;
  control: Control<T>;
  className?: string;
  description?: LocaleKey;
  type?: "text" | "email" | "password" | "number";
}

export default function TextInput<T extends FieldValues>({
  fieldName,
  fieldLabel,
  control,
  className,
  description,
  type = "text",
}: Props<T>) {
  const t = useI18n();

  return (
    <FormField
      control={control}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          {fieldLabel && <FormLabel>{t(fieldLabel)}</FormLabel>}
          <FormControl>
            <Input {...field} className={className} type={type} />
          </FormControl>
          {description && <FormDescription>{t(description)}</FormDescription>}
          <FormMessage isTranslated />
        </FormItem>
      )}
    />
  );
}

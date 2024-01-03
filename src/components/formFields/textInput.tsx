import {
  type teamFormBillingSchema,
  type teamFormInfoSchema,
} from "@/lib/conts";
import { useFormContext } from "react-hook-form";
import { type z } from "zod";
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
import { type LocaleKey, type FormFieldTextInputName } from "@/lib/types";

interface Props {
  fieldName: FormFieldTextInputName;
  fieldLabel: LocaleKey;
  description?: LocaleKey;
}

export default function TextInput({
  fieldName,
  fieldLabel,
  description,
}: Props) {
  const form =
    useFormContext<
      z.infer<typeof teamFormInfoSchema | typeof teamFormBillingSchema>
    >();
  const t = useI18n();

  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t(fieldLabel)}</FormLabel>
          <FormControl>
            {/* FIXME: types */}
            {/* @ts-expect-error dont have time to fix this, form context is not properly typed, might get to this later */}
            <Input {...field} />
          </FormControl>
          {description && <FormDescription>{t(description)}</FormDescription>}
          <FormMessage isTranslated />
        </FormItem>
      )}
    />
  );
}

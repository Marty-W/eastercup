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
} from "../ui/form";
import { Input } from "../ui/input";
import { useI18n } from "locales/client";
import { type LocaleKey, type FormFieldTextInputName } from "@/lib/types";

interface Props {
  fieldName: FormFieldTextInputName;
  fieldLabel: LocaleKey;
}

export default function TextInput({ fieldName, fieldLabel }: Props) {
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
            <Input {...field} />
          </FormControl>
          <FormMessage isTranslated />
        </FormItem>
      )}
    />
  );
}

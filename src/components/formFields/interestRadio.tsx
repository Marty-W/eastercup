import { type teamFormSchema } from "@/lib/conts";
import { useFormContext } from "react-hook-form";
import { type z } from "zod";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useI18n } from "locales/client";
import { type FormFieldName, type LocaleKey } from "@/lib/types";

interface Props {
  fieldName: FormFieldName;
  fieldLabel: LocaleKey;
}

export default function InterestRadio({ fieldName, fieldLabel }: Props) {
  const form = useFormContext<z.infer<typeof teamFormSchema>>();
  const t = useI18n();

  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel>{t(fieldLabel)}</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value as string}
              className="flex flex-col space-y-1"
            >
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="yes" />
                </FormControl>
                <FormLabel className="font-normal">{t("common.yes")}</FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="no" />
                </FormControl>
                <FormLabel className="font-normal">{t("common.no")}</FormLabel>
              </FormItem>
            </RadioGroup>
          </FormControl>
          <FormMessage isTranslated />
        </FormItem>
      )}
    />
  );
}

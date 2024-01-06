import { type teamFormInfoSchema } from "@/lib/conts";
import { useFormContext, useWatch } from "react-hook-form";
import { type z } from "zod";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
} from "../ui/form";
import { useI18n } from "locales/client";
import { Input } from "../ui/input";
import { type LocaleKey } from "@/lib/types";
import { cn } from "@/lib/utils";

export default function PhoneNumberInput() {
  const form = useFormContext<z.infer<typeof teamFormInfoSchema>>();
  const t = useI18n();

  useWatch({
    control: form.control,
    name: "phoneNumber",
  });
  useWatch({
    control: form.control,
    name: "countryCode",
  });

  const phoneError = form.formState.errors.phoneNumber;
  const countryCodeError = form.formState.errors.countryCode;

  return (
    <div className="flex flex-col space-y-2">
      <FormLabel
        className={cn((phoneError ?? countryCodeError) && "text-destructive")}
      >
        {t("form.phoneNumber")}
      </FormLabel>
      <div className="flex items-center space-x-2">
        <span className="text-xs">+</span>
        <FormField
          control={form.control}
          name="countryCode"
          render={({ field }) => (
            <FormItem className="w-[80px]">
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
      {phoneError && (
        <p className="text-sm font-medium text-destructive">
          {t(phoneError.message as LocaleKey)}
        </p>
      )}
      {countryCodeError && (
        <p className="text-sm font-medium text-destructive">
          {t(countryCodeError.message as LocaleKey)}
        </p>
      )}
      <FormDescription>{t("form.phoneNumber.description")}</FormDescription>
    </div>
  );
}

import { useFormContext } from "react-hook-form";
import type * as z from "zod";
import { countries } from "countries-list";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "./ui/form";
import {
  TEAM_CATEGORIRES,
  TIME_BY_30_MINUTES,
  type teamFormInfoSchema,
} from "@/lib/conts";
import { SelectItem } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { useScopedI18n } from "locales/client";
import TextInput from "./formFields/textInput";
import FormSelect from "./formFields/formSelect";
import { ArrivalDateInput } from "./formFields/dateInput";
import PhoneNumberInput from "./formFields/phoneNumber";
import Transport from "./formFields/transport";

export default function TeamRegistrationForm() {
  const t = useScopedI18n("form");
  const form = useFormContext<z.infer<typeof teamFormInfoSchema>>();

  return (
    <Form {...form}>
      <div className="space-y-6 font-sans">
        <TextInput
          fieldName="teamName"
          fieldLabel="form.teamName"
          control={form.control}
        />
        <FormSelect
          control={form.control}
          fieldName="category"
          fieldLabel="form.teamCategory"
          placeholderLabel="form.selectCategory"
          tooltipContent={
            <div className="flex flex-col space-y-2">
              <p className="text-sm">{t("category.U11MIX")}</p>
              <p className="text-sm">{t("category.U12B")}</p>
              <p className="text-sm">{t("category.U12G")}</p>
              <p className="text-sm">{t("category.U14B")}</p>
              <p className="text-sm">{t("category.U14G")}</p>
              <p className="text-sm">{t("category.U16B")}</p>
              <p className="text-sm">{t("category.U16G")}</p>
            </div>
          }
        >
          {TEAM_CATEGORIRES.map((value, key) => (
            <SelectItem className="font-sans" key={key} value={value}>
              {value}
            </SelectItem>
          ))}
        </FormSelect>
        <FormSelect
          control={form.control}
          fieldName="country"
          fieldLabel="form.country"
          placeholderLabel="form.selectCountry"
        >
          <SelectItem
            className="font-sans"
            key={crypto.randomUUID()}
            value={"CZ"}
          >
            {countries.CZ.name}
          </SelectItem>
          {Object.entries(countries).map(([key, value]) => {
            if (value.name === countries.CZ.name) return;
            return (
              <SelectItem className="font-sans" key={key} value={key}>
                {value.name}
              </SelectItem>
            );
          })}
        </FormSelect>
        <TextInput
          fieldName="contactPerson"
          fieldLabel="form.contactPerson"
          control={form.control}
        />
        <PhoneNumberInput />
        <TextInput
          fieldName="email"
          fieldLabel="form.email"
          control={form.control}
        />
        <FormSelect
          control={form.control}
          fieldName="arrivalTime"
          fieldLabel="form.arrivalTime"
          placeholderLabel="form.selectArrivalTime"
          tooltipContent={<p className="">{t("arrivalTimeTooltip")}</p>}
        >
          {Object.entries(TIME_BY_30_MINUTES).map(([key, value]) => (
            <SelectItem className="font-sans" key={key} value={value}>
              {value}
            </SelectItem>
          ))}
        </FormSelect>
        <ArrivalDateInput />
        <Transport />
        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mr-2">{`${t("note")} ${t(
                "optional",
              )}`}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t("notePlaceholder")}
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage isTranslated />
            </FormItem>
          )}
        />
      </div>
    </Form>
  );
}

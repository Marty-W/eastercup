import { type UseFormReturn } from "react-hook-form";
import type * as z from "zod";
import { Button } from "./ui/button";
import { countries } from "countries-list";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { TEAM_CATEGORIRES, TIMES_BY_30_MINUTES } from "@/lib/conts";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import InfoTooltip from "./ui/infoTooltip";
import { Textarea } from "./ui/textarea";
import { useScopedI18n } from "locales/client";
import { type RegistrationStep } from "./teamRegistrationController";
import { type teamFormSchema } from "@/lib/conts";

interface Props {
  form: UseFormReturn<z.infer<typeof teamFormSchema>>;
  handleStepChange: (step: RegistrationStep) => void;
}

export default function TeamRegistrationForm({
  form,
  handleStepChange,
}: Props) {
  const t = useScopedI18n("form");

  return (
    <Form {...form}>
      <div className="space-y-4 font-sans">
        <FormField
          control={form.control}
          name="teamName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("teamName")}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage isTranslated />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("country")}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={t("selectCountry")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="z-50">
                  <SelectGroup>
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
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage isTranslated />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center">
                <FormLabel className="mr-2">{t("teamCategory")}</FormLabel>
                <InfoTooltip>
                  <div className="flex flex-col space-y-2">
                    <p className="text-sm">{t("category.U11MIX")}</p>
                    <p className="text-sm">{t("category.U12B")}</p>
                    <p className="text-sm">{t("category.U12G")}</p>
                    <p className="text-sm">{t("category.U14B")}</p>
                    <p className="text-sm">{t("category.U14G")}</p>
                    <p className="text-sm">{t("category.U16B")}</p>
                    <p className="text-sm">{t("category.U16G")}</p>
                  </div>
                </InfoTooltip>
              </div>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="mr-2 w-[180px]">
                    <SelectValue placeholder={t("selectCategory")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="z-50">
                  <SelectGroup>
                    {TEAM_CATEGORIRES.map((value, key) => (
                      <SelectItem className="font-sans" key={key} value={value}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage isTranslated />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contactPerson"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("contactPerson")}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage isTranslated />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("phoneNumber")}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage isTranslated />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("email")}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage isTranslated />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="arrivalTime"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center">
                <FormLabel className="mr-2">{t("arrivalTime")}</FormLabel>
                <InfoTooltip>
                  {/* TODO add info */}
                  <p className="">{t("arrivalTimeTooltip")}</p>
                </InfoTooltip>
              </div>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={t("selectArrivalTime")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="z-50">
                  <SelectGroup>
                    {Object.entries(TIMES_BY_30_MINUTES).map(([key, value]) => (
                      <SelectItem className="font-sans" key={key} value={value}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage isTranslated />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="meansOfTransport"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center">
                <FormLabel className="mr-2">{`${t("meansOfTransport")} ${t(
                  "optional",
                )}`}</FormLabel>
                <InfoTooltip>
                  {/* TODO add info */}
                  <p className="">{t("meansOfTransportTooltip")}</p>
                </InfoTooltip>
              </div>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage isTranslated />
            </FormItem>
          )}
        />
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
        <Button
          className="mx-auto font-sans"
          onClick={() => handleStepChange("services")}
        >
          {t("nextStep")}
        </Button>
      </div>
    </Form>
  );
}

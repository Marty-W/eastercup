"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "./ui/button";
import { countries, type ICountry } from "countries-list";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import {
  TEAM_CATEGORIRES,
  TEAM_CATEGORY_ENUM,
  TIME_BY_30_MINUTES_ENUM,
  TIMES_BY_30_MINUTES,
} from "@/lib/conts";
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

export const formSchema = z.object({
  teamName: z.string().min(1).max(50),
  country: z.custom<ICountry>(),
  category: TEAM_CATEGORY_ENUM,
  contactPerson: z.string().min(1).max(50),
  phoneNumber: z.string().min(1).max(50).startsWith("+"),
  email: z.string().email(),
  arrivalTime: TIME_BY_30_MINUTES_ENUM,
  meansOfTransport: z.string().min(1).max(50),
  note: z.string().min(1).max(200),
});

export default function TeamRegistrationForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phoneNumber: "+",
      email: "@",
    },
  });

  const t = useScopedI18n("form");

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 font-sans"
      >
        <FormField
          control={form.control}
          name="teamName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("teamName")}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-between">
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("country")}</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder={t("selectCountry")} />
                    </SelectTrigger>
                    <SelectContent className="z-50">
                      <SelectGroup>
                        <SelectItem
                          className="font-sans"
                          key={crypto.randomUUID()}
                          value={countries.CZ.name}
                        >
                          {countries.CZ.name}
                        </SelectItem>
                        {Object.entries(countries).map(([key, value]) => {
                          if (value.name === countries.CZ.name) return;
                          return (
                            <SelectItem
                              className="font-sans"
                              key={key}
                              value={value.name}
                            >
                              {value.name}
                            </SelectItem>
                          );
                        })}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
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
                <FormControl>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger className="mr-2 w-[180px]">
                      <SelectValue placeholder={t("teamCategory")} />
                    </SelectTrigger>
                    <SelectContent className="z-50">
                      <SelectGroup>
                        {TEAM_CATEGORIRES.map((value, key) => (
                          <SelectItem
                            className="font-sans"
                            key={key}
                            value={value}
                          >
                            {value}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="contactPerson"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("contactPerson")}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
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
              <FormMessage />
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
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="arrivalTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("arrivalTime")}</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={t("arrivalTimePlaceholder")} />
                  </SelectTrigger>
                  <SelectContent className="z-50">
                    <SelectGroup>
                      {Object.entries(TIMES_BY_30_MINUTES).map(
                        ([key, value]) => (
                          <SelectItem
                            className="font-sans"
                            key={key}
                            value={value}
                          >
                            {value}
                          </SelectItem>
                        ),
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="meansOfTransport"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center">
                <FormLabel className="mr-2">{t("meansOfTransport")}</FormLabel>
                <InfoTooltip>
                  {/* TODO add info */}
                  <p className="">{t("meansOfTransportTooltip")}</p>
                </InfoTooltip>
              </div>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mr-2">{t("note")}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t("notePlaceholder")}
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="z-0 font-sans">
          Submit
        </Button>
      </form>
    </Form>
  );
}

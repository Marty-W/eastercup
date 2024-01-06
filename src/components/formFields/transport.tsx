import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "../ui/select";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "../ui/form";
import { type teamFormInfoSchema } from "@/lib/conts";
import { useFormContext, useWatch } from "react-hook-form";
import { type z } from "zod";
import { type LocaleKey } from "@/lib/types";
import { useI18n } from "locales/client";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import PlaneOptions from "./planeOptions";
import { Checkbox } from "../ui/checkbox";
import { Link } from "lucide-react";

const TRANSPORT_OPTIONS = ["train", "car", "bus", "plane"];

const COULD_STAY_THROUGHOUT_TOURNAMENT = ["bus", "car"];

export default function Transport() {
  const form = useFormContext<z.infer<typeof teamFormInfoSchema>>();
  const t = useI18n();
  const transport = useWatch({
    control: form.control,
    name: "meansOfTransport",
  });
  const willTransportStayOver = useWatch({
    control: form.control,
    name: "willTransportStayOver",
  });

  console.log(willTransportStayOver);

  return (
    <div className="flex flex-col space-y-4">
      <FormField
        control={form.control}
        name="meansOfTransport"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("form.meansOfTransport")}</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="z-50">
                <SelectGroup>
                  {TRANSPORT_OPTIONS.map((value, key) => (
                    <SelectItem className="font-sans" key={key} value={value}>
                      {t(`form.meansOfTransport.${value}` as LocaleKey)}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <FormMessage isTranslated />
          </FormItem>
        )}
      />
      {transport && COULD_STAY_THROUGHOUT_TOURNAMENT.includes(transport) && (
        <FormField
          control={form.control}
          name="willTransportStayOver"
          render={({ field }) => (
            <FormField
              control={form.control}
              name="willTransportStayOver"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      {t("form.meansOfTransport.willStayOver")}
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
          )}
        />
      )}
      {transport === "plane" && <PlaneOptions />}
    </div>
  );
}

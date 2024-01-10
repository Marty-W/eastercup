import { FormField, FormItem, FormLabel, FormControl } from "../ui/form";
import { type teamFormInfoSchema } from "@/lib/conts";
import { useI18n } from "locales/client";
import { useFormContext } from "react-hook-form";
import { type z } from "zod";
import TextInput from "./textInput";
import SubQuestionContainer from "../ui/subQuestionContainer";
import { Checkbox } from "../ui/checkbox";

export default function PlaneOptions() {
  const form = useFormContext<z.infer<typeof teamFormInfoSchema>>();
  const t = useI18n();
  // TODO: fix untrontrolled to controlled error
  return (
    <SubQuestionContainer>
      <FormField
        control={form.control}
        name="willNeedTransportFromAirport"
        render={({ field }) => (
          <FormField
            control={form.control}
            name="willNeedTransportFromAirport"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    {t(
                      "form.meansOfTransport.plane.willNeedTransportFromAirport",
                    )}
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
        )}
      />
      <TextInput
        fieldName="flightNumber"
        fieldLabel="form.meansOfTransport.plane.flightNumber"
        className="w-[180px]"
        control={form.control}
      />
      <TextInput
        fieldName="placeOfLanding"
        fieldLabel="form.meansOfTransport.plane.placeOfLanding"
        className="w-[180px]"
        control={form.control}
      />
    </SubQuestionContainer>
  );
}

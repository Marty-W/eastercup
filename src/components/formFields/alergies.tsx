import { type teamFormServicesSchema } from "@/lib/conts";
import { useFormContext, useWatch } from "react-hook-form";
import type * as z from "zod";
import { Checkbox } from "../ui/checkbox";
import { FormField, FormItem, FormControl, FormLabel } from "../ui/form";
import AllergyCheckbox from "./allergyCheckbox";
import { useI18n } from "locales/client";
import { Textarea } from "../ui/textarea";
import { useEffect } from "react";

export default function Allergies() {
  const form = useFormContext<z.infer<typeof teamFormServicesSchema>>();
  const t = useI18n();

  const isOtherAllergyChecked = useWatch({
    control: form.control,
    name: "hasOtherAllergy",
  });

  const isHasAllergyCheckboxChecked = useWatch({
    control: form.control,
    name: "hasAllergies",
  });

  useEffect(() => {
    if (isHasAllergyCheckboxChecked) {
      form.resetField("hasVegetarian");
      form.resetField("hasLactoseFree");
      form.resetField("hasGlutenFree");
      form.resetField("hasHalal");
      form.resetField("hasOtherAllergy");
      form.resetField("vegetarianCount");
      form.resetField("lactoseFreeCount");
      form.resetField("glutenFreeCount");
      form.resetField("halalCount");
      form.resetField("otherAllergyCount");
      form.resetField("otherAllergyNote");
    }
  }, [isHasAllergyCheckboxChecked]);

  return (
    <div className="flex flex-col justify-center space-y-4 pt-4">
      <div className="flex w-full items-center justify-center space-x-2">
        <FormField
          control={form.control}
          name="hasAllergies"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div>
          <FormLabel>{t("allergies.question")}</FormLabel>
        </div>
      </div>
      {isHasAllergyCheckboxChecked && (
        <div className="mx-auto flex w-full justify-between">
          <AllergyCheckbox
            control={form.control}
            checkBoxFieldName="hasVegetarian"
            fieldLabel="allergies.vegetarian"
            numberFieldName="vegetarianCount"
          />
          <AllergyCheckbox
            control={form.control}
            checkBoxFieldName="hasGlutenFree"
            fieldLabel="allergies.glutenFree"
            numberFieldName="glutenFreeCount"
          />
          <AllergyCheckbox
            control={form.control}
            checkBoxFieldName="hasLactoseFree"
            fieldLabel="allergies.lactoseFree"
            numberFieldName="lactoseFreeCount"
          />
          <AllergyCheckbox
            control={form.control}
            checkBoxFieldName="hasHalal"
            fieldLabel="allergies.halal"
            numberFieldName="halalCount"
          />
          <AllergyCheckbox
            control={form.control}
            checkBoxFieldName="hasOtherAllergy"
            fieldLabel="allergies.others"
            numberFieldName="otherAllergyCount"
          />
        </div>
      )}
      {isOtherAllergyChecked && (
        <FormField
          control={form.control}
          name="otherAllergyNote"
          render={({ field }) => (
            <FormItem className="mx-auto">
              <FormControl>
                <Textarea
                  {...field}
                  className="w-[300px]"
                  placeholder={t("allergies.specifyPlaceholder")}
                />
              </FormControl>
            </FormItem>
          )}
        />
      )}
    </div>
  );
}

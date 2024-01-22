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
    name: "cateringOrder.allergies.hasOtherAllergy",
  });

  const isHasAllergyCheckboxChecked = useWatch({
    control: form.control,
    name: "cateringOrder.allergies.hasAllergies",
  });

  useEffect(() => {
    if (isHasAllergyCheckboxChecked) {
      form.resetField("cateringOrder.allergies.hasVegetarian");
      form.resetField("cateringOrder.allergies.hasLactoseFree");
      form.resetField("cateringOrder.allergies.hasGlutenFree");
      form.resetField("cateringOrder.allergies.hasHalal");
      form.resetField("cateringOrder.allergies.hasOtherAllergy");
      form.resetField("cateringOrder.allergies.vegetarianCount");
      form.resetField("cateringOrder.allergies.lactoseFreeCount");
      form.resetField("cateringOrder.allergies.glutenFreeCount");
      form.resetField("cateringOrder.allergies.halalCount");
      form.resetField("cateringOrder.allergies.otherAllergyCount");
      form.resetField("cateringOrder.allergies.otherAllergyNote");
    }
  }, [isHasAllergyCheckboxChecked]);

  return (
    <div className="flex flex-col justify-center space-y-4 pt-4">
      <div className="flex w-full items-center justify-center space-x-2">
        <FormField
          control={form.control}
          name="cateringOrder.allergies.hasAllergies"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4">
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
        <div className="grid grid-cols-2 items-center justify-center md:px-16">
          <AllergyCheckbox
            control={form.control}
            checkBoxFieldName="cateringOrder.allergies.hasVegetarian"
            fieldLabel="allergies.vegetarian"
            numberFieldName="cateringOrder.allergies.vegetarianCount"
          />
          <AllergyCheckbox
            control={form.control}
            checkBoxFieldName="cateringOrder.allergies.hasGlutenFree"
            fieldLabel="allergies.glutenFree"
            numberFieldName="cateringOrder.allergies.glutenFreeCount"
          />
          <AllergyCheckbox
            control={form.control}
            checkBoxFieldName="cateringOrder.allergies.hasLactoseFree"
            fieldLabel="allergies.lactoseFree"
            numberFieldName="cateringOrder.allergies.lactoseFreeCount"
          />
          <AllergyCheckbox
            control={form.control}
            checkBoxFieldName="cateringOrder.allergies.hasHalal"
            fieldLabel="allergies.halal"
            numberFieldName="cateringOrder.allergies.halalCount"
          />
          <AllergyCheckbox
            control={form.control}
            checkBoxFieldName="cateringOrder.allergies.hasOtherAllergy"
            fieldLabel="allergies.others"
            numberFieldName="cateringOrder.allergies.otherAllergyCount"
          />
          {isOtherAllergyChecked && (
            <FormField
              control={form.control}
              name="cateringOrder.allergies.otherAllergyNote"
              render={({ field }) => (
                <FormItem className="row-start-4 mx-auto self-center md:col-start-2 md:row-start-3">
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
      )}
    </div>
  );
}

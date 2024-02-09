"use client";
import { type teamFormInfoSchema } from "@/lib/conts";
import { SelectItem } from "@/components/ui/select";
import FormSelect from "./formSelect";
import { useFormContext } from "react-hook-form";
import { useScopedI18n } from "locales/client";
import { type z } from "zod";
import { api } from "@/trpc/react";
import { Info } from "lucide-react";

export default function TeamCategorySelect() {
  const form = useFormContext<z.infer<typeof teamFormInfoSchema>>();
  const registrationCapacities =
    api.registration.getRegistrationCapacities.useQuery();

  const fullCategories = registrationCapacities?.data?.filter(
    (category) => category.full,
  );

  const t = useScopedI18n("form");
  return (
    <div className="space-y-1">
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
        {registrationCapacities &&
          registrationCapacities?.data?.map((value, key) => {
            if (value.full) return;
            return (
              <SelectItem
                className="font-sans"
                key={key}
                value={value.category}
              >
                {value.category}
              </SelectItem>
            );
          })}
      </FormSelect>
      <div className="flex items-center space-x-1">
        <Info size={12} />
        <p className="text-sm">
          These categories are already full:
          <span className="pl-1">
            {fullCategories?.map((category) => category.category).join(", ")}
          </span>
        </p>
      </div>
    </div>
  );
}

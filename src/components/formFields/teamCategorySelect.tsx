"use client";
import { TEAM_CATEGORIRES, type teamFormInfoSchema } from "@/lib/conts";
import { SelectItem } from "@/components/ui/select";
import FormSelect from "./formSelect";
import { useFormContext } from "react-hook-form";
import { useScopedI18n } from "locales/client";
import { type z } from "zod";

export default function TeamCategorySelect() {
  const form = useFormContext<z.infer<typeof teamFormInfoSchema>>();

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
        {TEAM_CATEGORIRES.map((cat, index) => {
          return (
            <SelectItem
              className="font-sans"
              key={`${cat}-${index}`}
              value={cat}
            >
              {cat}
            </SelectItem>
          );
        })}
      </FormSelect>
    </div>
  );
}

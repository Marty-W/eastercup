import { useFormContext, useWatch } from "react-hook-form";
import { Form } from "./ui/form";
import { type teamFormServicesSchema } from "@/lib/conts";
import { type z } from "zod";
import InterestRadio from "./formFields/interestRadio";
import React from "react";
import TshirtInput from "./formFields/tshirtInput";
import InfoTooltip from "./ui/infoTooltip";
import { useI18n } from "locales/client";

export default function TeamServiceForm() {
  const form = useFormContext<z.infer<typeof teamFormServicesSchema>>();
  const interestedInTshirts = useWatch({
    control: form.control,
    name: "interestInTshirts",
  });
  const t = useI18n();

  return (
    <Form {...form}>
      <div className="space-y-6 font-sans">
        <InterestRadio
          fieldName="interestInCatering"
          fieldLabel="form.interestInCatering"
          control={form.control}
          infoTooltip={
            <InfoTooltip>
              <div className="flex flex-col space-y-1 text-center">
                <h4 className="text-md font-semibold">
                  {t("catering.tooltip.headline")}
                </h4>
                <div className="text-center">
                  <p className="text-sm">
                    {t("catering.tooltip.breakfastPrice")}
                  </p>
                  <p className="text-sm">{t("catering.tooltip.lunchPrice")}</p>
                  <p className="text-sm">{t("catering.tooltip.dinnerPrice")}</p>
                </div>
                <p className="mx-auto max-w-[200px] text-sm">
                  {t("catering.tooltip.note")}
                </p>
              </div>
            </InfoTooltip>
          }
        />
        <InterestRadio
          control={form.control}
          fieldName="interestInAccomodation"
          fieldLabel="form.interestInAccomodation"
        />
        <InterestRadio
          control={form.control}
          fieldName="interestInTshirts"
          fieldLabel="form.interestInTshirts"
        />
        {interestedInTshirts ? (
          <div className="grid h-20 grid-cols-3 grid-rows-2 gap-y-2">
            <TshirtInput fieldName="noXsShirts" fieldLabel="XS" />
            <TshirtInput fieldName="noSShirts" fieldLabel="S" />
            <TshirtInput fieldName="noMShirts" fieldLabel="M" />
            <TshirtInput fieldName="noLShirts" fieldLabel="L" />
            <TshirtInput fieldName="noXLShirts" fieldLabel="XL" />
            <TshirtInput fieldName="noXXLShirts" fieldLabel="XXL" />
          </div>
        ) : (
          <div className="h-20" />
        )}
      </div>
    </Form>
  );
}

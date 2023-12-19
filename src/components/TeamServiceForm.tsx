import { useFormContext, useWatch } from "react-hook-form";
import { Form } from "./ui/form";
import { type teamFormSchema } from "@/lib/conts";
import { type z } from "zod";
import InterestRadio from "./formFields/interestRadio";
import React from "react";
import TshirtInput from "./formFields/tshirtInput";

export default function TeamServiceForm() {
  const form = useFormContext<z.infer<typeof teamFormSchema>>();
  const interestedInTshirts = useWatch({
    control: form.control,
    name: "interestInTshirts",
  });

  return (
    <Form {...form}>
      <div className="space-y-6 font-sans">
        <InterestRadio
          fieldName="interestInCatering"
          fieldLabel="form.interestInCatering"
        />
        <InterestRadio
          fieldName="interestInAccomodation"
          fieldLabel="form.interestInAccomodation"
        />
        <InterestRadio
          fieldName="interestInTshirts"
          fieldLabel="form.interestInTshirts"
        />
        {/* @ts-expect-error: due to zod transform, I need to check the literal, not the boolean */}
        {interestedInTshirts === "yes" ? (
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

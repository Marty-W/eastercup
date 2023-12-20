"use client";
import TeamBillingForm from "@/components/teamBillingForm";
import { Button } from "@/components/ui/button";
import { teamBillingAtom } from "@/lib/atoms";
import {
  teamFormBillingSchema,
  teamFormBillingDefaultValues,
} from "@/lib/conts";
import { type TeamBillingFormValues } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSetAtom } from "jotai";
import { useCurrentLocale, useI18n } from "locales/client";
import { useRouter } from "next/navigation";
import { type SyntheticEvent } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { type z } from "zod";

export default function TeamBilling() {
  const form = useForm<z.infer<typeof teamFormBillingSchema>>({
    resolver: zodResolver(teamFormBillingSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: teamFormBillingDefaultValues,
  });
  const t = useI18n();
  const router = useRouter();
  const locale = useCurrentLocale();
  const setTeamBillingFormValues = useSetAtom(teamBillingAtom);

  const onSubmit = (values: TeamBillingFormValues) => {
    setTeamBillingFormValues(values);
    router.push(`/${locale}/form/services`);
  };

  // TODO: delete this function
  const fillForm = (e: SyntheticEvent) => {
    e.preventDefault();
    form.setValue("companyName", "John Doe Company");
    form.setValue("address", "John Doe Street 123");
    form.setValue("city", "John Doe City");
    form.setValue("zipCode", "123 45");
    form.setValue("ic", "12345678");
    form.setValue("dic", "CZ12345678");
  };

  return (
    <div>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto flex flex-col font-sans"
        >
          <TeamBillingForm />
          <Button className="mx-auto mt-8 w-32 font-sans" type="submit">
            {t("form.nextStep")}
          </Button>
          {/* // TODO: delete this button */}
          <Button
            className="mx-auto mt-8 w-32 font-sans"
            onClick={(e) => fillForm(e)}
          >
            DEV: Fill form
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}

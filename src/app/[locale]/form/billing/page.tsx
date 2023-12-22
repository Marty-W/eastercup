"use client";
import TeamBillingForm from "@/components/teamBillingForm";
import { Button } from "@/components/ui/button";
import { finishedFormStepsAtom, teamBillingAtom } from "@/lib/atoms";
import {
  teamFormBillingSchema,
  teamFormBillingDefaultValues,
} from "@/lib/conts";
import { type TeamBillingFormValues } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSetAtom } from "jotai";
import { useCurrentLocale, useI18n } from "locales/client";
import { useRouter } from "next/navigation";
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
  const setFinishedFormStepsAtom = useSetAtom(finishedFormStepsAtom);

  const onSubmit = (values: TeamBillingFormValues) => {
    setTeamBillingFormValues(values);
    setFinishedFormStepsAtom((prev) => ({
      ...prev,
      billing: true,
    }));
    router.push(`/${locale}/form/services#top`);
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
        </form>
      </FormProvider>
    </div>
  );
}

"use client";
import TeamRegistrationForm from "@/components/teamRegistrationForm";
import { Button } from "@/components/ui/button";
import { finishedFormStepsAtom, teamInfoAtom } from "@/lib/atoms";
import { teamFormInfoSchema, teamFormInfoDefaultValues } from "@/lib/conts";
import { type TeamInfoFormValues } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSetAtom } from "jotai";
import { useCurrentLocale, useI18n } from "locales/client";
import { useRouter } from "next/navigation";
import { type SyntheticEvent } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { type z } from "zod";

export default function TeamInfo() {
  const form = useForm<z.infer<typeof teamFormInfoSchema>>({
    resolver: zodResolver(teamFormInfoSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: teamFormInfoDefaultValues,
  });
  const t = useI18n();
  const router = useRouter();
  const locale = useCurrentLocale();
  const setTeamInfoFormValues = useSetAtom(teamInfoAtom);
  const setFinishedFormStepsAtom = useSetAtom(finishedFormStepsAtom);

  const onSubmit = (values: TeamInfoFormValues) => {
    setTeamInfoFormValues(values);
    setFinishedFormStepsAtom({
      info: true,
    });
    router.push(`/${locale}/form/billing`);
  };

  // TODO: delete this function
  const fillForm = (e: SyntheticEvent) => {
    e.preventDefault();
    form.setValue("teamName", "Test Team");
    form.setValue("country", "CZ");
    form.setValue("category", "U14B");
    form.setValue("contactPerson", "John Doe");
    form.setValue("email", "john.doe@gmail.com");
    form.setValue("phoneNumber", "+420 123 456 789");
    form.setValue("arrivalTime", "11:00");
  };

  return (
    <div>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto flex flex-col font-sans"
        >
          <h3 className="text-center text-lg font-semibold">Tymove udaje</h3>
          <TeamRegistrationForm />
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

"use client";

import TeamRegistrationForm from "./teamRegistrationForm";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import TeamServiceForm from "./TeamServiceForm";
import { teamFormDefaultValues, teamFormSchema } from "@/lib/conts";
import type * as z from "zod";
import { useI18n } from "locales/client";
import { Button } from "./ui/button";

export type RegistrationStep = "credentials" | "services";

export default function TeamRegistrationController() {
  const t = useI18n();
  const [step, setStep] = useState<RegistrationStep>("credentials");
  const form = useForm<z.infer<typeof teamFormSchema>>({
    resolver: zodResolver(teamFormSchema),
    mode: "onBlur",
    defaultValues: teamFormDefaultValues,
  });

  const onSubmit = (values: z.infer<typeof teamFormSchema>) => {
    console.log(values);
  };

  const handleStepChange = (step: RegistrationStep) => {
    const isFirstStepValid =
      Object.keys(form.formState.errors).filter((fieldName) => {
        !fieldName.includes("interest");
      }).length === 0;
    if (isFirstStepValid) {
      setStep(step);
    }
  };

  return (
    <div>
      <h1 className="text-center font-display">
        {step === "credentials"
          ? t("form.credentialsHeader")
          : t("form.servicesHeader")}
      </h1>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto flex flex-col"
        >
          {step === "credentials" && (
            <>
              <TeamRegistrationForm />
              <Button
                className="mx-auto mt-8 w-32 font-sans"
                onClick={() => handleStepChange("services")}
              >
                {t("form.nextStep")}
              </Button>
            </>
          )}
          {step === "services" && (
            <>
              <TeamServiceForm />
              <div className="mt-8 flex flex-col space-y-4">
                <Button
                  className="mx-auto w-32 font-sans"
                  onClick={() => handleStepChange("credentials")}
                  variant="secondary"
                >
                  {t("form.previousStep")}
                </Button>
                <Button type="submit" className="mx-auto w-32 font-sans">
                  {t("form.submit")}
                </Button>
              </div>
            </>
          )}
        </form>
      </FormProvider>
    </div>
  );
}

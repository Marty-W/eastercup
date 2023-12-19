"use client";

import TeamRegistrationForm from "./teamRegistrationForm";
import { type SyntheticEvent, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import TeamServiceForm from "./TeamServiceForm";
import { teamFormDefaultValues, teamFormSchema } from "@/lib/conts";
import type * as z from "zod";
import { useI18n } from "locales/client";
import { Button } from "./ui/button";
import { api } from "@/trpc/react";
import { type Form } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useSetAtom } from "jotai";
import { formSubmissionAtom, formSubmissionError } from "@/lib/atoms";
import FormLoadingSkeleton from "./formSkeleton";

// TODO refactor this mess

export type RegistrationStep = "credentials" | "services";

export default function TeamRegistrationController() {
  const t = useI18n();
  const [step, setStep] = useState<RegistrationStep>("credentials");
  const form = useForm<z.infer<typeof teamFormSchema>>({
    resolver: zodResolver(teamFormSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: teamFormDefaultValues,
  });
  const setFormSubmissionResult = useSetAtom(formSubmissionAtom);
  const setFormSubmissionError = useSetAtom(formSubmissionError);
  const router = useRouter();
  const { mutate, status: formSubmissionStatus } =
    api.registration.team.useMutation({
      onSuccess: (data, variables) => {
        // NOTE: this is a hack to get the form data to the success page, I can't get the data back otherwise... should be fine though, bcs its onSuccess.. might look into it later
        setFormSubmissionResult(variables);
        router.push("/form/success");
      },
      onError: (error) => {
        setFormSubmissionError(error.message);
        router.push("/form/failure");
      },
    });

  const onSubmit = (values: Form) => {
    mutate(values);
  };

  const handleStepChange = (
    e: React.SyntheticEvent,
    step: RegistrationStep,
  ) => {
    e.preventDefault();
    const firstStepValid =
      Object.keys(form.formState.errors).filter(
        (fieldName) => !fieldName.includes("interest"),
      ).length === 0;
    console.log(form.formState.errors);
    if (firstStepValid) {
      form.clearErrors();
      setStep(step);
    }
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
    form.setValue("interestInTshirts", false);
    form.setValue("interestInCatering", true);
    form.setValue("interestInCatering", true);
  };

  if (formSubmissionStatus === "loading") {
    return <FormLoadingSkeleton />;
  }

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
          className="mx-auto flex flex-col font-sans"
        >
          {step === "credentials" && (
            <>
              <TeamRegistrationForm />
              <Button
                className="mx-auto mt-8 w-32 font-sans"
                onClick={(e) => handleStepChange(e, "services")}
              >
                {t("form.nextStep")}
              </Button>
              {/* // TODO: delete this button */}
              <Button
                className="mx-auto mt-8 w-32 font-sans"
                onClick={(e) => fillForm(e)}
              >
                DEV: Fill form
              </Button>
            </>
          )}
          {step === "services" && (
            <>
              <TeamServiceForm />
              <div className="mt-8 flex flex-col space-y-4">
                <Button
                  className="mx-auto w-32 font-sans"
                  onClick={(e) => handleStepChange(e, "credentials")}
                  variant="secondary"
                >
                  {t("form.previousStep")}
                </Button>
                <Button className="mx-auto w-32 font-sans" type="submit">
                  {t("form.submit")}
                </Button>
                {/* TODO: consider adding check on width and displaying it on wider screens */}
                {/* <FormSubmitDialog /> */}
              </div>
            </>
          )}
        </form>
      </FormProvider>
    </div>
  );
}

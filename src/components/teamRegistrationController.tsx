"use client";

import { Progress } from "@/components/ui/progress";
import TeamRegistrationForm from "./teamRegistrationForm";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import TeamServiceForm from "./teamServicesForm";
import { teamFormDefaultValues, teamFormSchema } from "@/lib/conts";
import { useToast } from "@/components/ui/use-toast";
import type * as z from "zod";

export type RegistrationStep = "credentials" | "services";

export default function TeamRegistrationController() {
  const [step, setStep] = useState<RegistrationStep>("credentials");
  const form = useForm<z.infer<typeof teamFormSchema>>({
    resolver: zodResolver(teamFormSchema),
    mode: "onBlur",
    defaultValues: teamFormDefaultValues,
  });

  const toast = useToast();

  const onSubmit = (values: z.infer<typeof teamFormSchema>) => {
    console.log(values);
  };

  const handleStepChange = (step: RegistrationStep) => {
    if (!form.formState.errors) {
      setStep(step);
    } else {
      // toast({
      //   variant: "destructive",
      //   title: "Please fill all required fields",
      // });
    }
  };

  return (
    <div>
      <Progress className="w-full" value={33} />
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {step === "credentials" && (
          <TeamRegistrationForm
            form={form}
            handleStepChange={handleStepChange}
          />
        )}
        {step === "services" && (
          <TeamServiceForm form={form} handleStepChange={handleStepChange} />
        )}
      </form>
    </div>
  );
}

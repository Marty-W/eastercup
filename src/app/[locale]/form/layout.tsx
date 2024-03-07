"use client";

import FormStepper from "@/components/formStepper";
import { type FormSegment } from "@/lib/types";
import { getIsRegistrationClosed } from "@/lib/utils";
import { useSelectedLayoutSegment } from "next/navigation";
import { useState } from "react";

export type FormStep = "info" | "billing" | "services";

export default function FormLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeStep, setActiveStep] = useState<FormStep>("info");
  const segment = useSelectedLayoutSegment() as FormSegment;
  const isRegistrationClosed = getIsRegistrationClosed();

  if (isRegistrationClosed) {
    <main className="container min-h-[60vh] max-w-screen-md pb-8">
      <p>Registration is closed</p>
    </main>;
    return;
  }
  return (
    <main className="container min-h-[60vh] max-w-screen-md pb-8">
      <FormStepper activeSegment={segment} formStep={activeStep} />
      {children}
    </main>
  );
}

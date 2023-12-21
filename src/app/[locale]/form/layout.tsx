"use client";

import FormStepper from "@/components/formStepper";
import { type FormSegment } from "@/lib/types";
import { useSelectedLayoutSegment } from "next/navigation";

export default function FormLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const segment = useSelectedLayoutSegment() as FormSegment;
  return (
    <main className="container pt-8 font-sans">
      <FormStepper activeSegment={segment} />
      {children}
    </main>
  );
}

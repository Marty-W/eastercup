"use client";
import FormWrongStateButtons from "@/components/formWrongStateButtons";
import { formSubmissionError } from "@/lib/atoms";
import { useAtomValue } from "jotai";
import FailureSVG from "public/icons8-cancel-500.svg";

export default function FormFailure() {
  const formErrorMessage = useAtomValue(formSubmissionError);

  return (
    <div>
      <FailureSVG className="mx-auto h-24 w-24" />
      <div className="space-y-5 pt-8">
        <h1 className="text-center font-display text-xl">Oops...</h1>
        <p className="text-center text-red-500">{formErrorMessage}</p>
      </div>
      <FormWrongStateButtons />
    </div>
  );
}

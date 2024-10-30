"use client";
import FormWrongStateButtons from "@/components/formWrongStateButtons";
import { formSubmissionError } from "@/lib/atoms";
import { useAtomValue } from "jotai";
import Image from "next/image";

export default function FormFailure() {
  const formErrorMessage = useAtomValue(formSubmissionError);

  return (
    <div>
      <div className="flex">
        <Image
          src="/icons8-cancel-500.svg"
          alt="Failure"
          width={100}
          height={100}
          className="mx-auto"
        />
      </div>
      <div className="space-y-5 pt-8">
        <h1 className="text-center font-display text-xl">Oops...</h1>
        <p className="text-center text-red-500">Something went wrong</p>
        <p className="text-center text-red-500">{formErrorMessage}</p>
      </div>
      <FormWrongStateButtons />
    </div>
  );
}

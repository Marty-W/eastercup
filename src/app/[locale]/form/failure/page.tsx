"use client";
import { Button } from "@/components/ui/button";
import { formSubmissionError } from "@/lib/atoms";
import { useAtomValue } from "jotai";
import { useCurrentLocale } from "locales/client";
import Link from "next/link";
import FailureSVG from "public/icons8-cancel-500.svg";

// TODO: add translations
//
export default function FormSuccess() {
  const formErrorMessage = useAtomValue(formSubmissionError);
  const locale = useCurrentLocale();

  return (
    <div>
      <FailureSVG className="mx-auto h-24 w-24" />
      <div className="space-y-5 pt-8">
        <h1 className="text-center font-display text-xl">Oops...</h1>
        <p className="text-center text-red-500">{formErrorMessage}</p>
      </div>
      <div className="flex flex-col space-y-3 pt-5">
        <Button asChild>
          <Link href={`/${locale}/form/info`}>Try again</Link>
        </Button>
        <Button asChild variant="secondary">
          <Link href={`/`}>Go home</Link>
        </Button>
      </div>
    </div>
  );
}

"use client";
import { Button } from "@/components/ui/button";
import WrongStateRedirect from "@/components/wrongStateRedirect";
import { teamFormAtom } from "@/lib/atoms";
import { useAtomValue } from "jotai";
import Link from "next/link";
import SuccessSVG from "public/icons8-ok-480.svg";

// TODO: add translations
// TODO: add check if user just posted a form, otherwise redirect him to the form
// TODO add pdf generation

export default function FormSuccess() {
  const formValues = useAtomValue(teamFormAtom);

  if (!formValues) {
    return <WrongStateRedirect />;
  }

  return (
    <div>
      <SuccessSVG className="mx-auto h-24 w-24" />
      <div className="pt-8">
        <h1 className="mb-5 text-center font-display text-xl">Thank you!</h1>
        <p className="text-center">
          Your team <span className="font-bold">{formValues?.teamName}</span>{" "}
          was successfully registered.
        </p>
      </div>
      <div className="flex flex-col space-y-3 pt-4">
        <Button>Generate PDF</Button>
        <Button asChild variant="secondary">
          <Link href="/">Go home</Link>
        </Button>
      </div>
    </div>
  );
}

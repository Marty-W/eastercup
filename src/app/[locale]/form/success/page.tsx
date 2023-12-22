"use client";

import InvoiceTemplateCS from "@/components/invoiceTemplateCS";
import InvoiceTemplateEN from "@/components/invoiceTemplateEN";
import { Button } from "@/components/ui/button";
import WrongStateRedirect from "@/components/wrongStateRedirect";
import { finishedFormStepsAtom, teamFormAtom } from "@/lib/atoms";
import { useAtomValue, useSetAtom } from "jotai";
import { useCurrentLocale } from "locales/client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SuccessSVG from "public/icons8-ok-480.svg";
import { useEffect } from "react";
import { usePDF } from "react-to-pdf";

// TODO: add translations
// TODO: add check if user just posted a form, otherwise redirect him to the form
// TODO add pdf generation

export default function FormSuccess() {
  const formValues = useAtomValue(teamFormAtom);
  const pathname = usePathname();
  const locale = useCurrentLocale();
  const setFinishedFormStepsAction = useSetAtom(finishedFormStepsAtom);
  const { toPDF, targetRef } = usePDF({
    method: "open",
  });

  useEffect(() => {
    setFinishedFormStepsAction({
      info: false,
      billing: false,
    });
  }, [pathname]);

  if (!formValues) {
    return <WrongStateRedirect />;
  }

  return (
    <>
      <div className="flex flex-col">
        <Image
          src={SuccessSVG as string}
          alt="Success icon"
          className="mx-auto h-24 w-24"
        />
        <div className="pt-8">
          <h1 className="mb-5 text-center font-display text-xl">Thank you!</h1>
          <p className="text-center">
            Your team <span className="font-bold">{formValues?.teamName}</span>{" "}
            was successfully registered.
          </p>
        </div>
        <div className="flex flex-col space-y-3 pt-4">
          <Button onClick={() => toPDF()}>Generate PDF</Button>
          <Button asChild variant="secondary">
            <Link href="/">Go home</Link>
          </Button>
        </div>
      </div>
      <div ref={targetRef} className="fixed left-[-1000rem]">
        {locale === "cs" ? <InvoiceTemplateCS /> : <InvoiceTemplateEN />}
      </div>
    </>
  );
}

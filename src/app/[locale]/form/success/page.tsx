"use client";

import { Button } from "@/components/ui/button";
import WrongStateRedirect from "@/components/wrongStateRedirect";
import { finishedFormStepsAtom, teamFormAtom } from "@/lib/atoms";
import { useAtomValue, useSetAtom } from "jotai";
import { useI18n } from "locales/client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function FormSuccess() {
  const formValues = useAtomValue(teamFormAtom);
  const pathname = usePathname();
  const t = useI18n();
  const setFinishedFormStepsAction = useSetAtom(finishedFormStepsAtom);

  useEffect(() => {
    setFinishedFormStepsAction({
      info: false,
      billing: false,
    });
  }, [pathname, setFinishedFormStepsAction]);

  if (!formValues) {
    return <WrongStateRedirect />;
  }

  return (
    <div className="flex flex-col space-y-4 md:pt-8">
      <Image
        src="/icons8-ok-480.svg"
        width={480}
        height={480}
        alt="Success icon"
        className="mx-auto h-24 w-24"
      />
      <div className="pt-8">
        <h1 className="mb-5 text-center font-display text-xl">Thank you!</h1>
        <div className="space-y-1 text-center">
          <p>
            <span>{t("form.success.one")}</span>
            <span className="font-bold">{formValues?.teamName}</span>
            <span>{t("form.success.two")}</span>
          </p>
          <p>{t("form.success.invoiceSent")}</p>
        </div>
      </div>
      <div className="mx-auto flex max-w-sm flex-col space-y-3 pt-4">
        <Button asChild>
          <Link href="/">{t("form.success.goHome")}</Link>
        </Button>
      </div>
    </div>
  );
}

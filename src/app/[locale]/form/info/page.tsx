"use client";
import TeamRegistrationForm from "@/components/teamRegistrationForm";
import { Button } from "@/components/ui/button";
import { finishedFormStepsAtom, teamInfoAtom } from "@/lib/atoms";
import { teamFormInfoSchema, teamFormInfoDefaultValues } from "@/lib/conts";
import { type TeamInfoFormValues } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSetAtom } from "jotai";
import { useCurrentLocale, useI18n } from "locales/client";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { type z } from "zod";

export default function TeamInfo() {
  const form = useForm<z.infer<typeof teamFormInfoSchema>>({
    resolver: zodResolver(teamFormInfoSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: teamFormInfoDefaultValues,
  });
  const t = useI18n();
  const router = useRouter();
  const locale = useCurrentLocale();
  const setTeamInfoFormValues = useSetAtom(teamInfoAtom);
  const setFinishedFormStepsAtom = useSetAtom(finishedFormStepsAtom);

  const onSubmit = (values: TeamInfoFormValues) => {
    setTeamInfoFormValues(values);
    setFinishedFormStepsAtom((prev) => ({ ...prev, info: true }));
    router.push(`/${locale}/form/billing#top`);
  };

  return (
    <div>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto flex flex-col font-sans"
        >
          <h3 className="text-center text-lg font-semibold">
            {t("form.infoHeader")}
          </h3>
          <TeamRegistrationForm />
          <Button className="mx-auto mt-8 w-32 font-sans" type="submit">
            {t("form.nextStep")}
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}

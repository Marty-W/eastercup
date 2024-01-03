"use client";
import TeamServiceForm from "@/components/TeamServiceForm";
import { Button } from "@/components/ui/button";
import {
  formSubmissionError,
  teamBillingAtom,
  teamInfoAtom,
  teamServicesAtom,
} from "@/lib/atoms";
import {
  teamFormServicesSchema,
  teamFormServicesDefaultValues,
  type teamFormSchemaServer,
} from "@/lib/conts";
import { type TeamServicesFormValues } from "@/lib/types";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtomValue, useSetAtom } from "jotai";
import { useI18n } from "locales/client";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { type z } from "zod";

export default function TeamServices() {
  const form = useForm<z.infer<typeof teamFormServicesSchema>>({
    resolver: zodResolver(teamFormServicesSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: teamFormServicesDefaultValues,
  });
  const t = useI18n();
  const router = useRouter();
  const setTeamServicesFormValues = useSetAtom(teamServicesAtom);
  const teamFormInfoValues = useAtomValue(teamInfoAtom);
  const teamFormBillingValues = useAtomValue(teamBillingAtom);
  const setFormSubmissionError = useSetAtom(formSubmissionError);
  const registerMutation = api.registration.team.useMutation({
    onSuccess: () => {
      router.push("/form/success");
    },
    onError: (error) => {
      if (error.message.includes("teams_name_unique")) {
        setFormSubmissionError(
          "Team name already exists. Please choose another one.",
        );
      } else {
        setFormSubmissionError(error.message);
      }
      router.push("/form/failure#top");
    },
  });

  const onSubmit = (values: TeamServicesFormValues) => {
    setTeamServicesFormValues(values);
    const finalFormValues = {
      ...teamFormInfoValues,
      ...teamFormBillingValues,
      ...values,
    };
    // NOTE: i dont like this hack, but now i need to move on
    registerMutation.mutate(
      finalFormValues as z.infer<typeof teamFormSchemaServer>,
    );
  };

  return (
    <div>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto flex flex-col font-sans"
        >
          <TeamServiceForm />
          <Button className="mx-auto mt-8 w-32 font-sans" type="submit">
            {t("form.submit")}
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}

import { type z } from "zod";
import type locale from "../../locales/cs";
import {
  type teamFormServicesSchema,
  type teamFormBillingSchema,
  type teamFormInfoSchema,
  type teamFormSchemaServer,
} from "./conts";

export type LocaleKey = keyof typeof locale;

export type Form = z.infer<typeof teamFormSchemaServer>;

export type FormFieldName = keyof Form;

type FormWithTextInputs = z.infer<typeof teamFormInfoSchema> &
  z.infer<typeof teamFormBillingSchema>;
export type FormFieldTextInputName = keyof FormWithTextInputs;

export type FormFieldCategoryName = Extract<
  "category" | "country" | "arrivalTime",
  FormFieldName
>;

export type TeamInfoFormValues = z.infer<typeof teamFormInfoSchema>;

export type TeamBillingFormValues = z.infer<typeof teamFormBillingSchema>;

export type TeamServicesFormValues = z.infer<typeof teamFormServicesSchema>;

export type FormSegment =
  | "info"
  | "billing"
  | "services"
  | "success"
  | "failure";

export type FormFinalSegment = Extract<FormSegment, "success" | "failure">;

export const isFormFinalSegment = (
  segment: FormSegment,
): segment is FormFinalSegment => {
  return segment === "success" || segment === "failure";
};

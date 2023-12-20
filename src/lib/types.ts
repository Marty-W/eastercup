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

export type TeamInfoFormValues = z.infer<typeof teamFormInfoSchema>;

export type TeamBillingFormValues = z.infer<typeof teamFormBillingSchema>;

export type TeamServicesFormValues = z.infer<typeof teamFormServicesSchema>;

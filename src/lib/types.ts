import { type z } from "zod";
import type locale from "../../locales/cs";
import { type teamFormSchema } from "./conts";

export type LocaleKey = keyof typeof locale;

export type Form = z.infer<typeof teamFormSchema>;

export type FormFieldName = keyof Form;

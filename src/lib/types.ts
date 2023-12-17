import { type z } from "zod";
import type locale from "../../locales/cs";
import { type teamFormSchema } from "./conts";

export type LocaleKey = keyof typeof locale;

export type FormFieldName = keyof z.infer<typeof teamFormSchema>;

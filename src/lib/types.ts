import { type z } from "zod";
import type locale from "../../locales/cs";
import {
  type teamFormServicesSchema,
  type teamFormBillingSchema,
  type teamFormInfoSchema,
  type fullFormSchema,
  type TEAM_CATEGORIRES,
  type AccountItemSchema,
} from "./conts";
import { type InferSelectModel } from "drizzle-orm";
import { type match } from "@/server/db/schema";
import { type RouterOutputs } from "@/trpc/shared";

export type LocaleKey = keyof typeof locale;

export type Form = z.infer<typeof fullFormSchema>;

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

export type TeamCategory = (typeof TEAM_CATEGORIRES)[number];

export interface Team {
  name: string;
  country: string;
  paidInvoice: boolean;
}

export type TeamsByCategory = Record<TeamCategory, Team[]>;

export type NavLink = {
  href: string;
  text: LocaleKey;
};

export type AccountItem = z.infer<typeof AccountItemSchema>;

export type AccountItems = AccountItem[];

export type Matches = RouterOutputs["match"]["getAllMatches"];

export type Match = Matches[number];

export type DBMatch = InferSelectModel<typeof match>;

import { atom } from "jotai";
import {
  type TeamInfoFormValues,
  type TeamBillingFormValues,
  type TeamServicesFormValues,
} from "./types";

export const formSubmissionError = atom<string | null>(null);

export const teamInfoAtom = atom<TeamInfoFormValues | null>(null);

export const teamBillingAtom = atom<TeamBillingFormValues | null>(null);

export const teamServicesAtom = atom<TeamServicesFormValues | null>(null);

export const teamFormAtom = atom((get) => {
  const teamInfo = get(teamInfoAtom);
  const teamBilling = get(teamBillingAtom);
  const teamServices = get(teamServicesAtom);

  if (!teamInfo || !teamBilling || !teamServices) {
    return null;
  }

  return {
    ...teamInfo,
    ...teamBilling,
    ...teamServices,
  };
});

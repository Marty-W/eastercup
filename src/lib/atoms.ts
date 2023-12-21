import { atom } from "jotai";
import { createJSONStorage } from "jotai/utils";
import {
  type TeamInfoFormValues,
  type TeamBillingFormValues,
  type TeamServicesFormValues,
} from "./types";

// FIXME: doesnt work, saves only to localstorage
export const sessionStorage = createJSONStorage(() => window.sessionStorage);

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

export const finishedFormStepsAtom = atom({
  info: false,
  billing: false,
});

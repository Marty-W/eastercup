import { atom } from "jotai";
import { createJSONStorage } from "jotai/utils";
import {
  type TeamInfoFormValues,
  type TeamBillingFormValues,
  type TeamServicesFormValues,
} from "./types";
import {
  teamFormBillingDefaultValues,
  teamFormInfoDefaultValues,
  teamFormServicesDefaultValues,
} from "./conts";

// FIXME: doesnt work, saves only to localstorage
export const sessionStorage = createJSONStorage(() => window.sessionStorage);

export const formSubmissionError = atom<string | null>(null);

export const teamInfoAtom = atom<TeamInfoFormValues>(teamFormInfoDefaultValues);

export const teamBillingAtom = atom<TeamBillingFormValues>(
  teamFormBillingDefaultValues,
);

export const teamServicesAtom = atom<TeamServicesFormValues>(
  teamFormServicesDefaultValues,
);

export const teamDbDataAtom = atom<null | {
  invoiceId: string;
}>(null);

export const teamFormAtom = atom((get) => {
  const teamInfo = get(teamInfoAtom);
  const teamBilling = get(teamBillingAtom);
  const teamServices = get(teamServicesAtom);
  const teamDbData = get(teamDbDataAtom);

  if (!teamInfo || !teamBilling || !teamServices || !teamDbData) {
    return null;
  }

  return {
    ...teamInfo,
    ...teamBilling,
    ...teamServices,
    ...teamDbData,
  };
});

export const finishedFormStepsAtom = atom({
  info: false,
  billing: false,
});

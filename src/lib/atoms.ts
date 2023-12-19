import { atom } from "jotai";
import { type Form } from "./types";

export const formSubmissionAtom = atom<Form | null>(null);

export const formSubmissionError = atom<string | null>(null);

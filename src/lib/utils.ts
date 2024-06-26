import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { REGISTRATION_CUTOFF } from "./conts";
import { zonedTimeToUtc } from "date-fns-tz";
import { isAfter } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sanitizeTeamNameForFilename(teamName: string): string {
  // Define a regex pattern for invalid filename characters (including special Czech characters) and spaces
  // These characters are commonly disallowed in filenames: \ / : * ? " < > |
  const invalidFilenameChars = /[\\/:*?"<>| ]+/g;

  // Replace special Czech characters with their Latin base (if needed)
  const accentsMap: Record<string, string> = {
    á: "a",
    č: "c",
    ď: "d",
    é: "e",
    ě: "e",
    í: "i",
    ň: "n",
    ó: "o",
    ř: "r",
    š: "s",
    ť: "t",
    ú: "u",
    ů: "u",
    ý: "y",
    ž: "z",
  };

  // Normalize the string to remove accents/diacritics
  teamName = teamName.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // Replace Czech special characters
  teamName = teamName
    .split("")
    .map((char) => accentsMap[char] ?? char)
    .join("");

  // Replace invalid characters and spaces with underscores
  teamName = teamName.replace(invalidFilenameChars, "_");

  // Remove any leading or trailing underscores (which may have been special characters before)
  teamName = teamName.replace(/^_+|_+$/g, "");

  // Convert to lower case for consistency
  teamName = teamName.toLowerCase();

  return teamName;
}

export function getIsRegistrationClosed(): boolean {
  const pragueTimezone = "Europe/Prague";
  const cutoffDateInPrague = zonedTimeToUtc(
    REGISTRATION_CUTOFF,
    pragueTimezone,
  );

  const now = new Date();

  return isAfter(now, cutoffDateInPrague);
}

export const removeCategoryFromTeamName = (teamName: string): string => {
  const parts = teamName.split("|").map((part) => part.trim());

  const teamNamePart = parts[0];

  if (!teamNamePart) {
    throw new Error(`Invalid team name: ${teamName}`);
  }

  return teamNamePart;
};

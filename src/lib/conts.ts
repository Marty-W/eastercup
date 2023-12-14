import * as zod from "zod";

// U11 MIX (narozeni 2014 a mladší)
// U12B (narozeni 2013 a mladší)
// U12G (narozené 2013 a mladší)
// U14B (narození 2011 a mladší)
// U14G (narozené 2011 a mladší)
// U16B (narození 2009 a mladší)
// U16G (narozené 2009 a mladší)
//
export const TEAM_CATEGORIRES = [
  "U11 MIX",
  "U12B",
  "U12G",
  "U14B",
  "U14G",
  "U16B",
  "U16G",
] as const;

export const TEAM_CATEGORY_ENUM = zod.enum(TEAM_CATEGORIRES);

export const TIMES_BY_30_MINUTES = [
  "07:00",
  "07:30",
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
] as const;

export const TIME_BY_30_MINUTES_ENUM = zod.enum(TIMES_BY_30_MINUTES);

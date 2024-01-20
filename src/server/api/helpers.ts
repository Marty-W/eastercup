import { env } from "@/env.mjs";
import { type z } from "zod";
import {
  type BillingFormValues,
  REGISTRATION_FEE_CZK,
  REGISTRATION_FEE_EUR,
  type tshirtOrderSchema,
  type cateringOrderSchema,
  type accomodationCategoryDaySchema,
  type accomodationRoomDaySchema,
  type InfoServerValues,
} from "@/lib/conts";
import * as postmark from "postmark";
import { db } from "../db";
import {
  invoice,
  teamBillingInfo,
  teamTransportInfo,
  teams,
  tshirtOrders,
  cateringOrder as cateringOrderDb,
  teamAccomodationInfo,
  teamRoomInfo,
} from "../db/schema";

const WELCOME_TEMPLATE_ID_CS = 34509365;
const WELCOME_TEMPLATE_ID_EN = 34509317;

interface WelcomeEmailInput {
  lang: "cs" | "en";
  recipientEmail: string;
}

export async function sendPostRegEmail({
  lang,
  recipientEmail,
}: WelcomeEmailInput) {
  const client = new postmark.ServerClient(env.POSTMARK_API_TOKEN);

  await client.sendEmailWithTemplate({
    // TODO: add some customization, maybe team name?
    TemplateModel: {},
    TemplateId: lang === "cs" ? WELCOME_TEMPLATE_ID_CS : WELCOME_TEMPLATE_ID_EN,
    From: "info@eastercupklatovy.cz",
    To: recipientEmail,
  });
}

export async function createTeam(teamInfo: InfoServerValues) {
  const newTeam = await db
    .insert(teams)
    .values({
      ...teamInfo,
      phoneNumber: `+${teamInfo.countryCode}${teamInfo.phoneNumber}`,
      name: `${teamInfo.teamName} | ${teamInfo.category}`,
    })
    .returning();

  const teamID = newTeam[0]?.id;

  if (!teamID) {
    throw new Error("Failed to create team");
  }

  return teamID;
}

export async function addTeamTransportInfo(
  teamInfo: InfoServerValues,
  teamID: number,
) {
  await db.insert(teamTransportInfo).values({
    ...teamInfo,
    arrivalDate: teamInfo.arrivalDate,
    teamId: teamID,
  });
}

export async function addTeamBillingInfo(
  billingInfo: BillingFormValues,
  teamID: number,
) {
  await db.insert(teamBillingInfo).values({
    ...billingInfo,
    teamId: teamID,
  });
}

export async function generateRegistrationInvoice(
  teamID: number,
  teamCountry: string,
) {
  const registrationInvoiceVarSymbol = getInvoiceVarSymbol(teamID);
  const registrationFee = getRegistrationFee(teamCountry);

  await db.insert(invoice).values({
    teamId: teamID,
    varSymbol: registrationInvoiceVarSymbol,
    type: "registration",
    amount: registrationFee,
  });
}

export function getInvoiceVarSymbol(teamID: number) {
  const currYear = String(new Date().getFullYear());
  return `${currYear}${String(teamID).padStart(4, "0")}`;
}

export function getRegistrationFee(teamCountry: string) {
  return teamCountry === "CZ"
    ? `${REGISTRATION_FEE_CZK} czk`
    : `${REGISTRATION_FEE_EUR} eur`;
}

export async function generateTshirtOrder(
  teamID: number,
  tshirtOrder: z.infer<typeof tshirtOrderSchema>,
) {
  const hasTshirtOrder = Object.values(tshirtOrder).some((count) => count > 0);

  if (hasTshirtOrder) {
    await db.insert(tshirtOrders).values({
      ...tshirtOrder,
      teamId: teamID,
    });
  }
}

export async function generateCateringOrder(
  teamID: number,
  cateringOrder: z.infer<typeof cateringOrderSchema>,
) {
  const totalMeals = sumCateringOrder(cateringOrder);
  if (totalMeals === 0) {
    return;
  }
  const {
    vegetarianCount,
    halalCount,
    lactoseFreeCount,
    glutenFreeCount,
    otherAllergyCount,
    otherAllergyNote,
  } = cateringOrder.allergies;
  await db.insert(cateringOrderDb).values({
    ...cateringOrder,
    teamId: teamID,
    halalCount,
    vegetarianCount,
    lactoseFreeCount,
    glutenFreeCount,
    otherAllergyCount,
    otherAllergyNote,
  });
}

function sumCateringOrder(cateringOrder: z.infer<typeof cateringOrderSchema>) {
  let totalMeals = 0;
  let totalAllergyCounts = 0;

  // Sum meal numbers
  for (const [key, value] of Object.entries(cateringOrder)) {
    if (key !== "allergies" && typeof value === "number") {
      totalMeals += value;
    }
  }

  // Check if allergies object exists and sum allergy counts
  if (cateringOrder.allergies) {
    for (const [key, value] of Object.entries(cateringOrder.allergies)) {
      if (key.includes("Count") && typeof value === "number") {
        totalAllergyCounts += value;
      }
    }
  }

  return totalMeals + totalAllergyCounts;
}

export async function generateAccomodationOrder(
  teamID: number,
  accomodationCategories: z.infer<typeof accomodationCategoryDaySchema>,
  accomodationRooms: z.infer<typeof accomodationRoomDaySchema>,
) {
  const accomodationCategoryValues = flattenAccomodationCategories(
    accomodationCategories,
    teamID,
  );

  if (accomodationCategoryValues.length > 0) {
    await db.insert(teamAccomodationInfo).values(accomodationCategoryValues);
  }

  const accomodationRoomValues = flattenAccomodationRooms(
    accomodationRooms,
    teamID,
  );

  if (accomodationRoomValues.length > 0) {
    await db.insert(teamRoomInfo).values(accomodationRoomValues);
  }
}

function flattenAccomodationCategories(
  accomodationCategories: z.infer<typeof accomodationCategoryDaySchema>,
  teamID: number,
) {
  return accomodationCategories
    ? Object.entries(accomodationCategories).flatMap(([day, roles]) =>
        roles
          ? Object.entries(roles).flatMap(([role, accomodations]) =>
              accomodations
                ? Object.entries(accomodations)
                    .filter(([_, count]) => count > 0)
                    .map(([accomodation, count]) => ({
                      teamId: teamID,
                      day,
                      role: role.replace("-", "_"),
                      accomodation,
                      count,
                    }))
                : [],
            )
          : [],
      )
    : [];
}

function flattenAccomodationRooms(
  accomodationRooms: z.infer<typeof accomodationRoomDaySchema>,
  teamID: number,
) {
  return accomodationRooms
    ? Object.entries(accomodationRooms).flatMap(([day, roles]) =>
        roles
          ? Object.entries(roles).flatMap(([role, roomTypes]) =>
              roomTypes
                ? Object.entries(roomTypes)
                    .filter(([_, count]) => count > 0)
                    .map(([roomType, count]) => ({
                      teamId: teamID,
                      day,
                      role,
                      roomType,
                      count,
                    }))
                : [],
            )
          : [],
      )
    : [];
}

export function sendPostRegistrationEmail(
  recipientEmail: string,
  recipientCountry: string,
) {
  const emailLang =
    recipientCountry === "CZ" || recipientCountry === "SK" ? "cs" : "en";

  fetch(`https://eastercup.vercel.app/api/sendEmail`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      EMAIL_SECRET: env.EMAIL_SECRET,
    },
    body: JSON.stringify({ email: recipientEmail, lang: emailLang }),
  })
    .then((response) => {
      if (!response.ok) {
        console.error("Response status", response.status, "Response", response);
        throw new Error("Failed to request email sending");
      }
    })
    .catch((err) => console.error(err));
}

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
import { TRPCError } from "@trpc/server";
import { asc, desc } from "drizzle-orm";
import { type AccountItem } from "@/lib/types";

export async function createTeam(teamInfo: InfoServerValues) {
  let newTeam;
  try {
    newTeam = await db
      .insert(teams)
      .values({
        ...teamInfo,
        phoneNumber: `+${teamInfo.countryCode}${teamInfo.phoneNumber}`,
        name: `${teamInfo.teamName} | ${teamInfo.category}`,
      })
      .returning();
  } catch (e) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Database error occurred while creating the team",
      cause: e,
    });
  }

  if (Array.isArray(newTeam) && newTeam.length === 0) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to create team, no records returned",
    });
  }

  const teamID = newTeam[0]?.id;

  if (typeof teamID !== "number" || teamID <= 0) {
    throw new TRPCError({
      code: "PRECONDITION_FAILED",
      message: "Failed to get team ID",
    });
  }

  return teamID;
}

export async function addTeamTransportInfo(
  teamInfo: InfoServerValues,
  teamID: number,
) {
  try {
    await db.insert(teamTransportInfo).values({
      ...teamInfo,
      arrivalDate: teamInfo.arrivalDate,
      teamId: teamID,
    });
  } catch (e) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Database error occurred while creating the team transport info",
      cause: e,
    });
  }
}

export async function addTeamBillingInfo(
  billingInfo: BillingFormValues,
  teamID: number,
) {
  try {
    await db.insert(teamBillingInfo).values({
      ...billingInfo,
      teamId: teamID,
    });
  } catch (e) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Database error occurred while creating the team billing info",
      cause: e,
    });
  }
}

export async function generateRegistrationInvoice(
  teamID: number,
  teamCountry: string,
) {
  const registrationInvoiceVarSymbol = getInvoiceVarSymbol(
    teamID,
    "registration",
  );
  const registrationFee = getRegistrationFee(teamCountry);

  try {
    await db.insert(invoice).values({
      teamId: teamID,
      varSymbol: registrationInvoiceVarSymbol,
      type: "registration",
      amount: registrationFee,
    });
  } catch (e) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message:
        "Database error occurred while creating the registration invoice",
      cause: e,
    });
  }
}

export async function generateAndSaveServiceInvoice(
  teamID: number,
  amount: string,
  currency: string,
) {
  const registrationInvoiceVarSymbol = getInvoiceVarSymbol(teamID, "service");

  try {
    return await db
      .insert(invoice)
      .values({
        teamId: teamID,
        varSymbol: registrationInvoiceVarSymbol,
        type: "services",
        amount: `${amount} ${currency}`,
      })
      .returning();
  } catch (e) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message:
        "Database error occurred while creating the registration invoice",
      cause: e,
    });
  }
}

export function getInvoiceVarSymbol(
  teamID: number,
  type: "registration" | "service" = "registration",
) {
  const currYear = String(new Date().getFullYear());
  const fillString = type === "registration" ? "0" : "1";
  return `${currYear}${String(teamID).padStart(4, fillString)}`;
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
    try {
      await db.insert(tshirtOrders).values({
        ...tshirtOrder,
        teamId: teamID,
      });
    } catch (e) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Database error occurred while creating the tshirt order",
        cause: e,
      });
    }
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

  try {
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
  } catch (e) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Database error occurred while creating the catering order",
      cause: e,
    });
  }
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
  accomodationCategories?: z.infer<typeof accomodationCategoryDaySchema>,
  accomodationRooms?: z.infer<typeof accomodationRoomDaySchema>,
) {
  if (accomodationCategories) {
    const accomodationCategoryValues = flattenAccomodationCategories(
      accomodationCategories,
      teamID,
    );

    if (accomodationCategoryValues.length > 0) {
      await db.insert(teamAccomodationInfo).values(accomodationCategoryValues);
    }
  }

  if (accomodationRooms) {
    const accomodationRoomValues = flattenAccomodationRooms(
      accomodationRooms,
      teamID,
    );

    if (accomodationRoomValues.length > 0) {
      await db.insert(teamRoomInfo).values(accomodationRoomValues);
    }
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

export async function generateAndSaveFinalInvoice(
  teamID: number,
  amount: string,
  currency: string,
  accountedItems: AccountItem[],
) {
  const lastIssuedInvoice = await db.query.invoice.findFirst({
    orderBy: (invoice, { desc }) => [desc(invoice.id)],
  });

  const lastVarSymbol = lastIssuedInvoice?.varSymbol;
  const newVarSymbol = lastVarSymbol
    ? `${parseInt(lastVarSymbol) + 1}`
    : "20240001";

  try {
    return await db
      .insert(invoice)
      .values({
        teamId: teamID,
        varSymbol: newVarSymbol,
        type: "final",
        amount: `${amount} ${currency}`,
        price: parseInt(amount),
        currency: currency,
        accountedItems: accountedItems,
      })
      .returning();
  } catch (e) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message:
        "Database error occurred while creating the registration invoice",
      cause: e,
    });
  }
}

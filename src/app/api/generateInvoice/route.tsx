import { AccountBedSchema, AccountItemSchema } from "@/lib/conts";
import { sanitizeTeamNameForFilename } from "@/lib/utils";
import {
  generateAndSaveFinalInvoice,
  tallyNonFinalInvoices,
} from "@/server/api/helpers";
import { db } from "@/server/db";
import { teams, teamBillingInfo, invoice } from "@/server/db/schema";
import { renderToStream } from "@react-pdf/renderer";
import { put } from "@vercel/blob";
import { eq, and } from "drizzle-orm";
import { type Readable } from "stream";
import { z } from "zod";
import { env } from "@/env.mjs";
import FinalInvoiceTemplateCS from "@/components/finalInvoiceTemplateCS";
import FinalInvoiceTemplateEN from "@/components/finalInvoiceTemplateEN";

const requestSchema = z.object({
  teamID: z.number(),
  totalPrice: z.string(),
  currency: z.string(),
  accountedItems: z.array(AccountItemSchema),
  accountedBeds: z.array(AccountBedSchema).optional(),
});

export async function POST(request: Request) {
  const authHeader = request.headers.get("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const apiKey = authHeader.split(" ")[1];

  if (apiKey !== env.BAKERY_API_TOKEN) {
    return new Response(JSON.stringify({ error: "Invalid API key" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    const body = await request.json();
    const validatedBody = requestSchema.parse(body);

    const { teamID, totalPrice, currency, accountedItems, accountedBeds } =
      validatedBody;

    const dbInvoice = await generateAndSaveFinalInvoice(
      teamID,
      totalPrice,
      currency,
      accountedItems,
      accountedBeds,
    );

    const dbTeam = await db
      .select({
        id: teams.id,
        teamName: teams.name,
        country: teams.country,
        contactPerson: teams.contactPerson,
        email: teams.email,
        phoneNumber: teams.phoneNumber,
        billing: {
          companyName: teamBillingInfo.companyName,
          address: teamBillingInfo.address,
          city: teamBillingInfo.city,
          zip: teamBillingInfo.zipCode,
          ic: teamBillingInfo.ic,
          dic: teamBillingInfo.dic,
        },
      })
      .from(teams)
      .where(eq(teams.id, teamID))
      .innerJoin(teamBillingInfo, eq(teams.id, teamBillingInfo.teamId));

    const newInvoice = dbInvoice[0];
    const foundTeam = dbTeam[0];

    if (!foundTeam) {
      return new Response(JSON.stringify({ error: "Team not found." }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    if (!newInvoice) {
      return new Response(
        JSON.stringify({ error: "Error when creating invoice." }),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }

    const totalTeamTally = await tallyNonFinalInvoices(teamID);

    let stream;

    if (foundTeam.country === "CZ") {
      stream = await renderToStream(
        <FinalInvoiceTemplateCS
          {...foundTeam}
          invoiceVarSymbol={newInvoice.varSymbol}
          accountItems={accountedItems}
          currency={currency}
          totalInvoicePrice={totalPrice}
          paidInAdvance={totalTeamTally}
        />,
      );
    } else {
      stream = await renderToStream(
        <FinalInvoiceTemplateEN
          {...foundTeam}
          invoiceVarSymbol={newInvoice.varSymbol}
          accountItems={accountedItems}
          currency={currency}
          totalInvoicePrice={totalPrice}
          paidInAdvance={totalTeamTally}
        />,
      );
    }

    // TODO: rename the path to the correct one before we deploy
    const blob = await put(
      `invoices/final-test/${sanitizeTeamNameForFilename(
        foundTeam.teamName,
      )}.pdf`,
      stream as Readable,
      {
        contentType: "application/pdf",
        access: "public",
      },
    );

    await db
      .update(invoice)
      .set({
        url: blob.url,
      })
      .where(and(eq(invoice.teamId, teamID), eq(invoice.id, newInvoice.id)));

    return new Response(
      JSON.stringify({
        message: "Data is valid!",
        invoiceUrl: blob.url,
        ivoiceId: newInvoice.id,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    // If validation fails, Zod throws an error
    // Return an error response
    console.error(error);
    return new Response(
      JSON.stringify({
        error: "Invalid data provided.",
        message: error,
      }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
}

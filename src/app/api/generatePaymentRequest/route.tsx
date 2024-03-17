import ServicesPaymentRequestTemplateCS from "@/components/servicesPaymentRequestTemplateCS";

import ServicesPaymentRequestTemplateEN from "@/components/servicesPaymentRequestTemplateEN";
import { AccountItemSchema } from "@/lib/conts";
import { sanitizeTeamNameForFilename } from "@/lib/utils";
import { generateAndSaveServiceInvoice } from "@/server/api/helpers";
import { db } from "@/server/db";
import { teams, teamBillingInfo, invoice } from "@/server/db/schema";
import { renderToStream } from "@react-pdf/renderer";
import { put } from "@vercel/blob";
import { eq } from "drizzle-orm";
import { type Readable } from "stream";
import { z } from "zod";
import { env } from "@/env.mjs";

const requestSchema = z.object({
  teamID: z.number(),
  totalPrice: z.string(),
  currency: z.string(),
  accountItems: z.array(AccountItemSchema),
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

    const { teamID, totalPrice, currency, accountItems } = validatedBody;

    const dbInvoice = await generateAndSaveServiceInvoice(
      teamID,
      totalPrice,
      currency,
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

    let stream;

    if (foundTeam.country === "CZ") {
      stream = await renderToStream(
        <ServicesPaymentRequestTemplateCS
          {...foundTeam}
          invoiceVarSymbol={newInvoice.varSymbol}
          accountItems={accountItems}
          currency={currency}
          totalInvoicePrice={totalPrice}
        />,
      );
    } else {
      stream = await renderToStream(
        <ServicesPaymentRequestTemplateEN
          {...foundTeam}
          invoiceVarSymbol={newInvoice.varSymbol}
          accountItems={accountItems}
          currency={currency}
          totalInvoicePrice={totalPrice}
        />,
      );
    }

    const blob = await put(
      `invoices/services/${sanitizeTeamNameForFilename(foundTeam.teamName)}`,
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
      .where(eq(invoice.teamId, teamID));

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

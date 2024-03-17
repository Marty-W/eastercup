import { sanitizeTeamNameForFilename } from "@/lib/utils";
import { db } from "@/server/db";
import { teams, teamBillingInfo, invoice } from "@/server/db/schema";
import { renderToStream } from "@react-pdf/renderer";
import { put } from "@vercel/blob";
import { eq, and } from "drizzle-orm";
import { type Readable } from "stream";
import { z } from "zod";
import { env } from "@/env.mjs";
import ServerInvoiceTemplateCS from "@/components/serverInvoiceTemplateCS";
import ServerInvoiceTemplateEN from "@/components/serverInvoiceTemplateEN";
import { REGISTRATION_INVOICE_DUE_DAYS } from "@/lib/conts";
import { addDays } from "date-fns";

const requestSchema = z.object({
  teamID: z.number(),
});

export async function PATCH(request: Request) {
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

    const { teamID } = validatedBody;

    const dbTeam = await db
      .select({
        id: teams.id,
        teamName: teams.name,
        country: teams.country,
        contactPerson: teams.contactPerson,
        email: teams.email,
        phoneNumber: teams.phoneNumber,
        category: teams.category,
        billing: {
          companyName: teamBillingInfo.companyName,
          address: teamBillingInfo.address,
          city: teamBillingInfo.city,
          zip: teamBillingInfo.zipCode,
          ic: teamBillingInfo.ic,
          dic: teamBillingInfo.dic,
        },
        currentInvoice: {
          url: invoice.url,
          invoiceVarSymbol: invoice.varSymbol,
          issueDate: invoice.issueDate,
        },
      })
      .from(teams)
      .where(eq(teams.id, teamID))
      .innerJoin(teamBillingInfo, eq(teams.id, teamBillingInfo.teamId))
      .innerJoin(
        invoice,
        and(eq(teams.id, invoice.teamId), eq(invoice.type, "registration")),
      );

    const foundTeam = dbTeam[0];

    if (!foundTeam) {
      return new Response(JSON.stringify({ error: "Team not found." }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    let stream;

    if (foundTeam.country === "CZ") {
      stream = await renderToStream(
        // NOTE: ugh, this is so fckin ugly, I'm sorry
        <ServerInvoiceTemplateCS
          {...foundTeam}
          invoiceVarSymbol={foundTeam.currentInvoice.invoiceVarSymbol}
          serverIssueDate={foundTeam.currentInvoice.issueDate!}
          serverDueDate={addDays(
            new Date(foundTeam.currentInvoice.issueDate!),
            REGISTRATION_INVOICE_DUE_DAYS,
          ).toString()}
        />,
      );
    } else {
      stream = await renderToStream(
        <ServerInvoiceTemplateEN
          {...foundTeam}
          invoiceVarSymbol={foundTeam.currentInvoice.invoiceVarSymbol}
          serverIssueDate={foundTeam.currentInvoice.issueDate!}
          serverDueDate={addDays(
            new Date(foundTeam.currentInvoice.issueDate!),
            REGISTRATION_INVOICE_DUE_DAYS,
          ).toString()}
        />,
      );
    }

    const blob = await put(
      `invoices/postreg/${sanitizeTeamNameForFilename(
        foundTeam.teamName,
      )}-test`,
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
      .where(eq(invoice.teamId, foundTeam.id));

    return new Response(
      JSON.stringify({
        message: "Invoice regenerated successfully.",
        invoiceUrl: blob.url,
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

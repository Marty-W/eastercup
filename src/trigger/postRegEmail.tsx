import { task } from "@trigger.dev/sdk/v3";
import { put } from "@vercel/blob";
import { z } from "zod";
import { Font, renderToStream } from "@react-pdf/renderer";
import { db } from "@/server/db";
import { invoice, teamBillingInfo, teams } from "@/server/db/schema";
import { and, eq } from "drizzle-orm";
import ServerInvoiceTemplateCS from "@/components/serverInvoiceTemplateCS";
import ServerInvoiceTemplateEN from "@/components/serverInvoiceTemplateEN";
import { type Readable } from "stream";
import * as postmark from "postmark";
import { env } from "@/env.mjs";
import {
  EMAIL_WELCOME_TEMPLATE_ID_CS,
  EMAIL_WELCOME_TEMPLATE_ID_EN,
} from "@/lib/conts";
import { sanitizeTeamNameForFilename } from "@/lib/utils";

type PostRegEmailPayload = {
  recipientEmail: string;
  recipientCountry: string;
  teamId: number;
};

export const postRegEmail = task({
  id: "postreg-email",
  run: async (payload: PostRegEmailPayload) => {
    const { recipientEmail, recipientCountry, teamId } = payload;

    // No need to wrap in io.runTask anymore
    const dbTeam = await db
      .select({
        id: teams.id,
        teamName: teams.name,
        country: teams.country,
        category: teams.category,
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
        invoiceVarSymbol: invoice.varSymbol,
      })
      .from(teams)
      .where(eq(teams.id, teamId))
      .innerJoin(teamBillingInfo, eq(teams.id, teamBillingInfo.teamId))
      .innerJoin(
        invoice,
        and(eq(teams.id, invoice.teamId), eq(invoice.type, "registration")),
      );

    // Use logger instead of io.logger
    // logger.info(JSON.stringify(dbTeam, null, 2));

    const team = dbTeam[0];
    if (!team) {
      throw new Error("No team found");
    }

    // Generate invoice
    let stream;
    if (recipientCountry === "CZ") {
      stream = await renderToStream(<ServerInvoiceTemplateCS {...team} />);
    } else {
      stream = await renderToStream(<ServerInvoiceTemplateEN {...team} />);
    }

    const blob = await put(
      `invoices/postreg/${sanitizeTeamNameForFilename(team.teamName)}.pdf`,
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
      .where(eq(invoice.teamId, teamId));

    const invoiceUrl = blob.url;

    // Send email
    const emailLang =
      recipientCountry === "CZ" || recipientCountry === "SK" ? "cs" : "en";

    const postmarkClient = new postmark.ServerClient(env.POSTMARK_API_TOKEN);

    await postmarkClient.sendEmailWithTemplate({
      TemplateModel: {
        invoiceUrl,
      },
      TemplateId:
        emailLang === "cs"
          ? EMAIL_WELCOME_TEMPLATE_ID_CS
          : EMAIL_WELCOME_TEMPLATE_ID_EN,
      From: "info@eastercupklatovy.cz",
      To: recipientEmail,
    });
  },
});

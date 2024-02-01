import { client } from "@/trigger";
import { put } from "@vercel/blob";
import { eventTrigger } from "@trigger.dev/sdk";
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

client.defineJob({
  id: "postreg-email",
  name: "Send post-registration email",
  version: "1.0.0",
  trigger: eventTrigger({
    name: "postreg.email",
    schema: z.object({
      recipientEmail: z.string().email(),
      recipientCountry: z.string(),
      teamId: z.number(),
    }),
  }),
  run: async (payload, io) => {
    const { recipientEmail, recipientCountry, teamId } = payload;

    const team = await io.runTask("get-team", async () => {
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

      await io.logger.log(JSON.stringify(dbTeam, null, 2));

      const foundTeam = dbTeam[0];

      if (!foundTeam) {
        throw new Error("No team found");
      }

      return foundTeam;
    });

    const invoiceUrl = await io.runTask("generate-invoice", async () => {
      let stream;

      if (recipientCountry === "CZ") {
        stream = await renderToStream(<ServerInvoiceTemplateCS {...team} />);
      } else {
        stream = await renderToStream(<ServerInvoiceTemplateEN {...team} />);
      }

      const blob = await put(
        `invoices/postreg/${sanitizeTeamNameForFilename(team.teamName)}`,
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

      return blob.url;
    });

    const emailLang =
      recipientCountry === "CZ" || recipientCountry === "SK" ? "cs" : "en";

    await io.runTask("send-mail", async () => {
      const client = new postmark.ServerClient(env.POSTMARK_API_TOKEN);

      await client.sendEmailWithTemplate({
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
    });
  },
});

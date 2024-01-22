import { client } from "@/trigger";
import { eventTrigger } from "@trigger.dev/sdk";
import { z } from "zod";
import * as postmark from "postmark";
import { env } from "@/env.mjs";
import {
  EMAIL_WELCOME_TEMPLATE_ID_CS,
  EMAIL_WELCOME_TEMPLATE_ID_EN,
} from "@/lib/conts";
import { renderToStream } from "@react-pdf/renderer";
import { MyDocument } from "@/components/dummyPdf";

client.defineJob({
  id: "postreg-email",
  name: "Send post-registration email",
  version: "1.0.0",
  trigger: eventTrigger({
    name: "postreg.email",
    schema: z.object({
      recipientEmail: z.string().email(),
      recipientCountry: z.string(),
    }),
  }),
  run: async (payload, io) => {
    const { recipientEmail, recipientCountry } = payload;

    // await io.runTask("generate-invoice", async () => {
    //   // const stream = await renderToStream(<MyDocument />);
    //   const stream = await renderToStream(<MyDocument />);
    // });

    const emailLang =
      recipientCountry === "CZ" || recipientCountry === "SK" ? "cs" : "en";

    await io.runTask("send-mail", async () => {
      const client = new postmark.ServerClient(env.POSTMARK_API_TOKEN);

      await client.sendEmailWithTemplate({
        TemplateModel: {},
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

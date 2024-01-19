import { env } from "@/env.mjs";
import * as postmark from "postmark";

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

import { env } from "@/env.mjs";
import { db } from "@/server/db";
import { emailList, teams } from "@/server/db/schema";
import { eq, or } from "drizzle-orm";
import * as postmark from "postmark";

const bulkSendMails = async () => {
  const czechAndSlovakTeamMails = await db
    .select({
      email: teams.email,
      country: teams.country,
    })
    .from(teams)
    .where(or(eq(teams.country, "CZ"), eq(teams.country, "SK")));

  const otherTeamMails = await db
    .select({
      email: teams.email,
      country: teams.country,
    })
    .from(teams)
    .where(or(eq(teams.country, "DE"), eq(teams.country, "IT")));

  let counter = 0;
  let czechCounter = 0;
  let foreignCounter = 0;
  const client = new postmark.ServerClient(env.POSTMARK_API_TOKEN);

  for (const emailAdress of czechAndSlovakTeamMails) {
    counter++;
    czechCounter++;
    console.log(`Posilam email na ${emailAdress.email}`);
    try {
      await client.sendEmailWithTemplate({
        TemplateModel: {},
        TemplateId: 35267977,
        From: "info@eastercupklatovy.cz",
        To: emailAdress.email,
      });
      console.log(`Email to ${emailAdress.email} sent successfully`);
    } catch (error) {
      console.error(`Error sending mail to ${emailAdress.email}`);
    }
  }

  for (const emailAdress of otherTeamMails) {
    counter++;
    foreignCounter++;
    console.log(`Sending email to ${emailAdress.email}`);
    try {
      await client.sendEmailWithTemplate({
        TemplateModel: {},
        TemplateId: 35268113,
        From: "info@eastercupklatovy.cz",
        To: emailAdress.email,
      });
      console.log(`Email to ${emailAdress.email} sent successfully`);
    } catch (error) {
      console.error(`Error sending mail to ${emailAdress.email}`);
    }
  }

  const isRight = czechCounter + foreignCounter === counter;

  if (!isRight) {
    console.error("Error in counting");
  }
  console.log(`Bulk mail sent to ${counter} users`);
};

bulkSendMails().catch(console.error);

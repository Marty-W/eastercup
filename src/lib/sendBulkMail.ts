import { db } from "@/server/db";
import { emailList } from "@/server/db/schema";
import fs from "fs";
import postmark from "postmark";

const allMails = await db
  .select({
    email: emailList.email,
  })
  .from(emailList);

const postmarkClient = new postmark.Client(process.env.POSTMARK_API_TOKEN!);
const tshirtImage = new postmark.Models.Attachment(
  "tshirt.png",
  fs.readFileSync("public/info/tshirts.png").toString("base64"),
  "image/png",
);
let counter = 0;

for (const mail of allMails) {
  console.log(
    `Sending mail to ${mail.email} (${counter++}/${allMails.length})`,
  );
  try {
    await postmarkClient.sendEmailWithTemplate({
      TemplateModel: {},
      TemplateId: 38821533,
      To: mail.email,
      From: "info@eastercupklatovy.cz",
      Attachments: [tshirtImage],
    });
  } catch (e) {
    console.log(`Error sending mail to ${mail.email}: ${e.message}`);
  }
}

console.log(`Done, sent ${counter} mails`);

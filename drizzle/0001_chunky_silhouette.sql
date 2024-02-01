ALTER TABLE "email_list" ADD COLUMN "invite_mail_sent" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "email_list" DROP COLUMN IF EXISTS "invited";
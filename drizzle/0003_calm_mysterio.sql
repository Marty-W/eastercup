CREATE TABLE IF NOT EXISTS "match" (
	"id" serial PRIMARY KEY NOT NULL,
	"date" date NOT NULL,
	"time" text NOT NULL,
	"team_a_id" integer NOT NULL,
	"team_a_score" integer NOT NULL,
	"team_b_id" integer NOT NULL,
	"team_b_score" integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "team_a_idx" ON "match" ("team_a_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "team_b_idx" ON "match" ("team_b_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "match_idx" ON "match" ("id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "date" ON "match" ("date");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "match" ADD CONSTRAINT "match_team_a_id_teams_id_fk" FOREIGN KEY ("team_a_id") REFERENCES "teams"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "match" ADD CONSTRAINT "match_team_b_id_teams_id_fk" FOREIGN KEY ("team_b_id") REFERENCES "teams"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

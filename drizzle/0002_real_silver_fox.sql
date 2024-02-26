CREATE TABLE IF NOT EXISTS "accomodation_capacity" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"category" varchar NOT NULL,
	"price_per_night" integer,
	"contact_person" text,
	"note" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "room" (
	"id" serial PRIMARY KEY NOT NULL,
	"accomodation_id" integer,
	"bed_count" integer NOT NULL,
	"team_id" integer
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "room" ADD CONSTRAINT "room_accomodation_id_accomodation_capacity_id_fk" FOREIGN KEY ("accomodation_id") REFERENCES "accomodation_capacity"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "room" ADD CONSTRAINT "room_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

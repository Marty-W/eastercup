CREATE TABLE IF NOT EXISTS "accomodation_capacity" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"category" varchar NOT NULL,
	"contact_person" text,
	"note" text,
	"phone_number" text,
	"email" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "room" (
	"id" serial PRIMARY KEY NOT NULL,
	"accomodation_id" integer,
	"bed_capacity" integer NOT NULL,
	"free_beds" integer NOT NULL,
	"full_beds" integer NOT NULL,
	"purchase_price_per_night" integer NOT NULL,
	"purchase_currency" text NOT NULL,
	"sell_price_per_night" integer NOT NULL,
	"sell_currency" text NOT NULL,
	"team_id" integer,
	"occupied_from" date,
	"occupied_to" date
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "team_idx" ON "room" ("team_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "acc_idx" ON "room" ("accomodation_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "catering_order_team_idx" ON "catering_order" ("team_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "acc_order_team_idx" ON "team_accomodation_info" ("team_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "tshirt_order_team_idx" ON "tshirt_orders" ("team_id");--> statement-breakpoint
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

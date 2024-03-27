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
CREATE TABLE IF NOT EXISTS "catering_order" (
	"id" serial PRIMARY KEY NOT NULL,
	"team_id" integer,
	"thu_breakfast" integer DEFAULT 0,
	"thu_lunch" integer DEFAULT 0,
	"thu_dinner" integer DEFAULT 0,
	"fri_breakfast" integer DEFAULT 0,
	"fri_lunch" integer DEFAULT 0,
	"fri_dinner" integer DEFAULT 0,
	"sat_breakfast" integer DEFAULT 0,
	"sat_lunch" integer DEFAULT 0,
	"sat_dinner" integer DEFAULT 0,
	"sun_breakfast" integer DEFAULT 0,
	"sun_lunch" integer DEFAULT 0,
	"sun_dinner" integer DEFAULT 0,
	"halal_count" integer DEFAULT 0,
	"vegetarian_count" integer DEFAULT 0,
	"lactose_free_count" integer DEFAULT 0,
	"gluten_free_count" integer DEFAULT 0,
	"other_allergy_count" integer DEFAULT 0,
	"other_allergy_note" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "email_list" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"invite_mail_sent" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "invoice" (
	"id" serial PRIMARY KEY NOT NULL,
	"team_id" integer,
	"var_symbol" varchar(256) NOT NULL,
	"type" varchar NOT NULL,
	"paid" boolean DEFAULT false,
	"amount" text NOT NULL,
	"currency" text,
	"issue_date" date DEFAULT now(),
	"url" text,
	"accounted_items" jsonb DEFAULT '[]'::jsonb
);
--> statement-breakpoint
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
CREATE TABLE IF NOT EXISTS "team_accomodation_info" (
	"id" serial PRIMARY KEY NOT NULL,
	"team_id" integer,
	"day" text NOT NULL,
	"role" text NOT NULL,
	"accomodation" text,
	"count" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "team_billing_info" (
	"id" serial PRIMARY KEY NOT NULL,
	"team_id" integer,
	"company_name" text NOT NULL,
	"address" text NOT NULL,
	"city" text NOT NULL,
	"zip_code" text NOT NULL,
	"ic" text NOT NULL,
	"dic" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "team_room_info" (
	"id" serial PRIMARY KEY NOT NULL,
	"team_id" integer,
	"day" text NOT NULL,
	"role" text NOT NULL,
	"room_type" text NOT NULL,
	"count" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "team_transport_info" (
	"id" serial PRIMARY KEY NOT NULL,
	"team_id" integer,
	"arrival_time" text,
	"arrival_date" date NOT NULL,
	"means_of_transport" varchar,
	"will_transport_stay_over" boolean,
	"will_need_transport_from_airport" boolean,
	"flight_number" text,
	"place_of_landing" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "teams" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"country" text NOT NULL,
	"category" varchar NOT NULL,
	"contact_person" text NOT NULL,
	"phone_number" text NOT NULL,
	"email" text NOT NULL,
	"note" text,
	"registered_on" date DEFAULT now() NOT NULL,
	"edit_uuid" uuid DEFAULT gen_random_uuid()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tshirt_orders" (
	"id" serial PRIMARY KEY NOT NULL,
	"team_id" integer,
	"no_xs_shirts" integer,
	"no_s_shirts" integer,
	"no_m_shirts" integer,
	"no_l_shirts" integer,
	"no_xl_shirts" integer,
	"no_xxl_shirts" integer
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "catering_order_team_idx" ON "catering_order" ("team_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "team_a_idx" ON "match" ("team_a_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "team_b_idx" ON "match" ("team_b_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "match_idx" ON "match" ("id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "date" ON "match" ("date");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "team_idx" ON "room" ("team_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "acc_idx" ON "room" ("accomodation_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "acc_order_team_idx" ON "team_accomodation_info" ("team_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "tshirt_order_team_idx" ON "tshirt_orders" ("team_id");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "catering_order" ADD CONSTRAINT "catering_order_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "invoice" ADD CONSTRAINT "invoice_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
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
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "team_accomodation_info" ADD CONSTRAINT "team_accomodation_info_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "team_billing_info" ADD CONSTRAINT "team_billing_info_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "team_room_info" ADD CONSTRAINT "team_room_info_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "team_transport_info" ADD CONSTRAINT "team_transport_info_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tshirt_orders" ADD CONSTRAINT "tshirt_orders_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

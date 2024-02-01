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
	"invited" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "invoice" (
	"id" serial PRIMARY KEY NOT NULL,
	"team_id" integer,
	"var_symbol" varchar(256) NOT NULL,
	"type" varchar NOT NULL,
	"paid" boolean DEFAULT false,
	"amount" text NOT NULL,
	"issue_date" date DEFAULT now(),
	"url" text
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

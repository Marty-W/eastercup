
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE SCHEMA IF NOT EXISTS "drizzle";

ALTER SCHEMA "drizzle" OWNER TO "postgres";

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "drizzle"."__drizzle_migrations" (
    "id" integer NOT NULL,
    "hash" text NOT NULL,
    "created_at" bigint
);

ALTER TABLE "drizzle"."__drizzle_migrations" OWNER TO "postgres";

CREATE SEQUENCE IF NOT EXISTS "drizzle"."__drizzle_migrations_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "drizzle"."__drizzle_migrations_id_seq" OWNER TO "postgres";

ALTER SEQUENCE "drizzle"."__drizzle_migrations_id_seq" OWNED BY "drizzle"."__drizzle_migrations"."id";

CREATE TABLE IF NOT EXISTS "public"."catering_order" (
    "id" integer NOT NULL,
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
    "halal_count" integer DEFAULT 0,
    "vegetarian_count" integer DEFAULT 0,
    "other_allergy_count" integer DEFAULT 0,
    "other_allergy_note" text,
    "sun_dinner" integer DEFAULT 0,
    "lactose_free_count" integer DEFAULT 0,
    "gluten_free_count" integer DEFAULT 0
);

ALTER TABLE "public"."catering_order" OWNER TO "postgres";

CREATE SEQUENCE IF NOT EXISTS "public"."catering_order_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "public"."catering_order_id_seq" OWNER TO "postgres";

ALTER SEQUENCE "public"."catering_order_id_seq" OWNED BY "public"."catering_order"."id";

CREATE TABLE IF NOT EXISTS "public"."email_list" (
    "id" integer NOT NULL,
    "email" text NOT NULL
);

ALTER TABLE "public"."email_list" OWNER TO "postgres";

CREATE SEQUENCE IF NOT EXISTS "public"."email_list_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "public"."email_list_id_seq" OWNER TO "postgres";

ALTER SEQUENCE "public"."email_list_id_seq" OWNED BY "public"."email_list"."id";

CREATE TABLE IF NOT EXISTS "public"."invoice" (
    "id" integer NOT NULL,
    "team_id" integer,
    "var_symbol" character varying(256) NOT NULL,
    "type" character varying NOT NULL,
    "paid" boolean DEFAULT false,
    "issue_date" date DEFAULT now(),
    "amount" text NOT NULL
);

ALTER TABLE "public"."invoice" OWNER TO "postgres";

CREATE SEQUENCE IF NOT EXISTS "public"."invoice_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "public"."invoice_id_seq" OWNER TO "postgres";

ALTER SEQUENCE "public"."invoice_id_seq" OWNED BY "public"."invoice"."id";

CREATE TABLE IF NOT EXISTS "public"."team_accomodation_info" (
    "id" integer NOT NULL,
    "team_id" integer,
    "day" text NOT NULL,
    "role" text NOT NULL,
    "accomodation" text,
    "count" integer NOT NULL
);

ALTER TABLE "public"."team_accomodation_info" OWNER TO "postgres";

CREATE SEQUENCE IF NOT EXISTS "public"."team_accommodation_info_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "public"."team_accommodation_info_id_seq" OWNER TO "postgres";

ALTER SEQUENCE "public"."team_accommodation_info_id_seq" OWNED BY "public"."team_accomodation_info"."id";

CREATE TABLE IF NOT EXISTS "public"."team_billing_info" (
    "id" integer NOT NULL,
    "company_name" text NOT NULL,
    "address" text NOT NULL,
    "city" text NOT NULL,
    "zip_code" text NOT NULL,
    "ic" text NOT NULL,
    "dic" text,
    "team_id" integer
);

ALTER TABLE "public"."team_billing_info" OWNER TO "postgres";

CREATE SEQUENCE IF NOT EXISTS "public"."team_billing_info_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "public"."team_billing_info_id_seq" OWNER TO "postgres";

ALTER SEQUENCE "public"."team_billing_info_id_seq" OWNED BY "public"."team_billing_info"."id";

CREATE TABLE IF NOT EXISTS "public"."team_room_info" (
    "id" integer NOT NULL,
    "team_id" integer,
    "day" text NOT NULL,
    "role" text NOT NULL,
    "room_type" text NOT NULL,
    "count" integer NOT NULL
);

ALTER TABLE "public"."team_room_info" OWNER TO "postgres";

CREATE SEQUENCE IF NOT EXISTS "public"."team_room_info_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "public"."team_room_info_id_seq" OWNER TO "postgres";

ALTER SEQUENCE "public"."team_room_info_id_seq" OWNED BY "public"."team_room_info"."id";

CREATE TABLE IF NOT EXISTS "public"."team_transport_info" (
    "id" integer NOT NULL,
    "arrival_time" text,
    "arrival_date" date NOT NULL,
    "means_of_transport" character varying,
    "will_transport_stay_over" boolean,
    "will_need_transport_from_airport" boolean,
    "flight_number" text,
    "place_of_landing" text,
    "team_id" integer
);

ALTER TABLE "public"."team_transport_info" OWNER TO "postgres";

CREATE SEQUENCE IF NOT EXISTS "public"."team_transport_info_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "public"."team_transport_info_id_seq" OWNER TO "postgres";

ALTER SEQUENCE "public"."team_transport_info_id_seq" OWNED BY "public"."team_transport_info"."id";

CREATE TABLE IF NOT EXISTS "public"."teams" (
    "id" integer NOT NULL,
    "name" text NOT NULL,
    "country" text NOT NULL,
    "category" character varying NOT NULL,
    "contact_person" text NOT NULL,
    "phone_number" text NOT NULL,
    "email" text NOT NULL,
    "note" text,
    "registered_on" date DEFAULT now() NOT NULL,
    "edit_uuid" uuid DEFAULT gen_random_uuid()
);

ALTER TABLE "public"."teams" OWNER TO "postgres";

CREATE SEQUENCE IF NOT EXISTS "public"."teams_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "public"."teams_id_seq" OWNER TO "postgres";

ALTER SEQUENCE "public"."teams_id_seq" OWNED BY "public"."teams"."id";

CREATE TABLE IF NOT EXISTS "public"."tshirt_orders" (
    "id" integer NOT NULL,
    "team_id" integer,
    "no_xs_shirts" integer,
    "no_s_shirts" integer,
    "no_m_shirts" integer,
    "no_l_shirts" integer,
    "no_xl_shirts" integer,
    "no_xxl_shirts" integer
);

ALTER TABLE "public"."tshirt_orders" OWNER TO "postgres";

CREATE SEQUENCE IF NOT EXISTS "public"."tshirt_orders_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "public"."tshirt_orders_id_seq" OWNER TO "postgres";

ALTER SEQUENCE "public"."tshirt_orders_id_seq" OWNED BY "public"."tshirt_orders"."id";

ALTER TABLE ONLY "drizzle"."__drizzle_migrations" ALTER COLUMN "id" SET DEFAULT nextval('drizzle.__drizzle_migrations_id_seq'::regclass);

ALTER TABLE ONLY "public"."catering_order" ALTER COLUMN "id" SET DEFAULT nextval('public.catering_order_id_seq'::regclass);

ALTER TABLE ONLY "public"."email_list" ALTER COLUMN "id" SET DEFAULT nextval('public.email_list_id_seq'::regclass);

ALTER TABLE ONLY "public"."invoice" ALTER COLUMN "id" SET DEFAULT nextval('public.invoice_id_seq'::regclass);

ALTER TABLE ONLY "public"."team_accomodation_info" ALTER COLUMN "id" SET DEFAULT nextval('public.team_accommodation_info_id_seq'::regclass);

ALTER TABLE ONLY "public"."team_billing_info" ALTER COLUMN "id" SET DEFAULT nextval('public.team_billing_info_id_seq'::regclass);

ALTER TABLE ONLY "public"."team_room_info" ALTER COLUMN "id" SET DEFAULT nextval('public.team_room_info_id_seq'::regclass);

ALTER TABLE ONLY "public"."team_transport_info" ALTER COLUMN "id" SET DEFAULT nextval('public.team_transport_info_id_seq'::regclass);

ALTER TABLE ONLY "public"."teams" ALTER COLUMN "id" SET DEFAULT nextval('public.teams_id_seq'::regclass);

ALTER TABLE ONLY "public"."tshirt_orders" ALTER COLUMN "id" SET DEFAULT nextval('public.tshirt_orders_id_seq'::regclass);

ALTER TABLE ONLY "drizzle"."__drizzle_migrations"
    ADD CONSTRAINT "__drizzle_migrations_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."catering_order"
    ADD CONSTRAINT "catering_order_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."email_list"
    ADD CONSTRAINT "email_list_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."invoice"
    ADD CONSTRAINT "invoice_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."team_accomodation_info"
    ADD CONSTRAINT "team_accommodation_info_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."team_billing_info"
    ADD CONSTRAINT "team_billing_info_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."team_room_info"
    ADD CONSTRAINT "team_room_info_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."team_transport_info"
    ADD CONSTRAINT "team_transport_info_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."teams"
    ADD CONSTRAINT "teams_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."tshirt_orders"
    ADD CONSTRAINT "tshirt_orders_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."catering_order"
    ADD CONSTRAINT "catering_order_team_id_teams_id_fk" FOREIGN KEY (team_id) REFERENCES public.teams(id);

ALTER TABLE ONLY "public"."invoice"
    ADD CONSTRAINT "invoice_team_id_teams_id_fk" FOREIGN KEY (team_id) REFERENCES public.teams(id);

ALTER TABLE ONLY "public"."team_accomodation_info"
    ADD CONSTRAINT "team_accomodation_info_team_id_teams_id_fk" FOREIGN KEY (team_id) REFERENCES public.teams(id);

ALTER TABLE ONLY "public"."team_billing_info"
    ADD CONSTRAINT "team_billing_info_team_id_teams_id_fk" FOREIGN KEY (team_id) REFERENCES public.teams(id);

ALTER TABLE ONLY "public"."team_room_info"
    ADD CONSTRAINT "team_room_info_team_id_teams_id_fk" FOREIGN KEY (team_id) REFERENCES public.teams(id);

ALTER TABLE ONLY "public"."team_transport_info"
    ADD CONSTRAINT "team_transport_info_team_id_teams_id_fk" FOREIGN KEY (team_id) REFERENCES public.teams(id);

ALTER TABLE ONLY "public"."tshirt_orders"
    ADD CONSTRAINT "tshirt_orders_team_id_teams_id_fk" FOREIGN KEY (team_id) REFERENCES public.teams(id);

GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON TABLE "public"."catering_order" TO "anon";
GRANT ALL ON TABLE "public"."catering_order" TO "authenticated";
GRANT ALL ON TABLE "public"."catering_order" TO "service_role";

GRANT ALL ON SEQUENCE "public"."catering_order_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."catering_order_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."catering_order_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."email_list" TO "anon";
GRANT ALL ON TABLE "public"."email_list" TO "authenticated";
GRANT ALL ON TABLE "public"."email_list" TO "service_role";

GRANT ALL ON SEQUENCE "public"."email_list_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."email_list_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."email_list_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."invoice" TO "anon";
GRANT ALL ON TABLE "public"."invoice" TO "authenticated";
GRANT ALL ON TABLE "public"."invoice" TO "service_role";

GRANT ALL ON SEQUENCE "public"."invoice_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."invoice_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."invoice_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."team_accomodation_info" TO "anon";
GRANT ALL ON TABLE "public"."team_accomodation_info" TO "authenticated";
GRANT ALL ON TABLE "public"."team_accomodation_info" TO "service_role";

GRANT ALL ON SEQUENCE "public"."team_accommodation_info_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."team_accommodation_info_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."team_accommodation_info_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."team_billing_info" TO "anon";
GRANT ALL ON TABLE "public"."team_billing_info" TO "authenticated";
GRANT ALL ON TABLE "public"."team_billing_info" TO "service_role";

GRANT ALL ON SEQUENCE "public"."team_billing_info_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."team_billing_info_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."team_billing_info_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."team_room_info" TO "anon";
GRANT ALL ON TABLE "public"."team_room_info" TO "authenticated";
GRANT ALL ON TABLE "public"."team_room_info" TO "service_role";

GRANT ALL ON SEQUENCE "public"."team_room_info_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."team_room_info_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."team_room_info_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."team_transport_info" TO "anon";
GRANT ALL ON TABLE "public"."team_transport_info" TO "authenticated";
GRANT ALL ON TABLE "public"."team_transport_info" TO "service_role";

GRANT ALL ON SEQUENCE "public"."team_transport_info_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."team_transport_info_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."team_transport_info_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."teams" TO "anon";
GRANT ALL ON TABLE "public"."teams" TO "authenticated";
GRANT ALL ON TABLE "public"."teams" TO "service_role";

GRANT ALL ON SEQUENCE "public"."teams_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."teams_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."teams_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."tshirt_orders" TO "anon";
GRANT ALL ON TABLE "public"."tshirt_orders" TO "authenticated";
GRANT ALL ON TABLE "public"."tshirt_orders" TO "service_role";

GRANT ALL ON SEQUENCE "public"."tshirt_orders_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."tshirt_orders_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."tshirt_orders_id_seq" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";

RESET ALL;

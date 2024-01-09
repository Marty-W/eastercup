import { TEAM_CATEGORIRES, TRANSPORT_OPTIONS } from "@/lib/conts";
import { relations } from "drizzle-orm";
import {
  boolean,
  date,
  integer,
  pgTable,
  serial,
  text,
  varchar,
} from "drizzle-orm/pg-core";

export const teams = pgTable("teams", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  country: text("country").notNull(),
  category: varchar("category", { enum: [...TEAM_CATEGORIRES] }).notNull(),
  contactPerson: text("contact_person").notNull(),
  phoneNumber: text("phone_number").notNull(),
  email: text("email").notNull(),
  note: text("note"),
  registerDate: date("registered_on").notNull().defaultNow(),
});

export const teamRelations = relations(teams, ({ one }) => ({
  transportInfo: one(teamTransportInfo, {
    fields: [teams.id],
    references: [teamTransportInfo.teamId],
  }),
  billingInfo: one(teamBillingInfo, {
    fields: [teams.id],
    references: [teamBillingInfo.teamId],
  }),
  servicesInfo: one(teamServicesInfo, {
    fields: [teams.id],
    references: [teamServicesInfo.teamId],
  }),
  tshirtOrder: one(tshirtOrders, {
    fields: [teams.id],
    references: [tshirtOrders.teamId],
  }),
}));

export const teamTransportInfo = pgTable("team_transport_info", {
  id: serial("id").primaryKey(),
  arrivalTime: text("arrival_time"),
  arrivalDate: date("arrival_date").notNull(),
  meansOfTransport: varchar("means_of_transport", {
    enum: [...TRANSPORT_OPTIONS],
  }),
  willTransportStayOver: boolean("will_transport_stay_over"),
  willNeedTransportFromAirport: boolean("will_need_transport_from_airport"),
  flightNumber: text("flight_number"),
  placeOfLanding: text("place_of_landing"),
  teamId: integer("team_id").references(() => teams.id),
});

export const teamBillingInfo = pgTable("team_billing_info", {
  id: serial("id").primaryKey(),
  companyName: text("company_name").notNull(),
  address: text("address").notNull(),
  city: text("city").notNull(),
  zipCode: text("zip_code").notNull(),
  ic: text("ic").notNull(),
  dic: text("dic"),
  invoiceId: text("invoice_id"),
  teamId: integer("team_id").references(() => teams.id),
});

export const teamServicesInfo = pgTable("team_services_info", {
  id: serial("id").primaryKey(),
  interestInCatering: boolean("interest_in_catering").notNull(),
  interestInAccomodation: boolean("interest_in_accomodation").notNull(),
  interestInTshirts: boolean("interest_in_tshirts").notNull(),
  teamId: integer("team_id").references(() => teams.id),
  tshirtOrderId: integer("tshirt_order_id").references(() => tshirtOrders.id),
});

export const tshirtOrders = pgTable("tshirt_orders", {
  id: serial("id").primaryKey(),
  teamId: integer("team_id").references(() => teams.id),
  noXsShirts: integer("no_xs_shirts"),
  noSShirts: integer("no_s_shirts"),
  noMShirts: integer("no_m_shirts"),
  noLShirts: integer("no_l_shirts"),
  noXLShirts: integer("no_xl_shirts"),
  noXXLShirts: integer("no_xxl_shirts"),
});

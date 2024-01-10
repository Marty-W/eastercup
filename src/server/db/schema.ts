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

export const teamRelations = relations(teams, ({ one, many }) => ({
  transportInfo: one(teamTransportInfo),
  servicesInfo: one(teamServicesInfo),
  tshirtOrder: one(tshirtOrders),
  invoices: many(invoice),
}));

export const teamTransportInfo = pgTable("team_transport_info", {
  id: serial("id").primaryKey(),
  teamId: integer("team_id").references(() => teams.id),
  arrivalTime: text("arrival_time"),
  arrivalDate: date("arrival_date").notNull(),
  meansOfTransport: varchar("means_of_transport", {
    enum: [...TRANSPORT_OPTIONS],
  }),
  willTransportStayOver: boolean("will_transport_stay_over"),
  willNeedTransportFromAirport: boolean("will_need_transport_from_airport"),
  flightNumber: text("flight_number"),
  placeOfLanding: text("place_of_landing"),
});

export const teamTransportInfoRelations = relations(
  teamTransportInfo,
  ({ one }) => ({
    team: one(teams, {
      fields: [teamTransportInfo.teamId],
      references: [teams.id],
    }),
  }),
);

export const teamBillingInfo = pgTable("team_billing_info", {
  id: serial("id").primaryKey(),
  teamId: integer("team_id").references(() => teams.id),
  companyName: text("company_name").notNull(),
  address: text("address").notNull(),
  city: text("city").notNull(),
  zipCode: text("zip_code").notNull(),
  ic: text("ic").notNull(),
  dic: text("dic"),
});

export const teamBillingInfoRelations = relations(
  teamBillingInfo,
  ({ one }) => ({
    team: one(teams, {
      fields: [teamBillingInfo.teamId],
      references: [teams.id],
    }),
  }),
);

export const teamServicesInfo = pgTable("team_services_info", {
  id: serial("id").primaryKey(),
  teamId: integer("team_id").references(() => teams.id),
  interestInCatering: boolean("interest_in_catering").notNull(),
  interestInAccomodation: boolean("interest_in_accomodation").notNull(),
  interestInTshirts: boolean("interest_in_tshirts").notNull(),
  tshirtOrderId: integer("tshirt_order_id").references(() => tshirtOrders.id),
});

export const teamServicesInfoRelations = relations(
  teamServicesInfo,
  ({ one }) => ({
    team: one(teams, {
      fields: [teamServicesInfo.teamId],
      references: [teams.id],
    }),
  }),
);

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

export const tshirtOrdersRelations = relations(tshirtOrders, ({ one }) => ({
  team: one(teams, {
    fields: [tshirtOrders.teamId],
    references: [teams.id],
  }),
}));

export const invoice = pgTable("invoice", {
  id: serial("id").primaryKey(),
  teamId: integer("team_id").references(() => teams.id),
  varSymbol: varchar("var_symbol", { length: 256 }).notNull(),
  type: varchar("type", {
    enum: ["registration", "tshirts", "accomodation", "catering"],
  }).notNull(),
  paid: boolean("paid").default(false),
  amount: text("amount").notNull(),
  issueDate: date("issue_date").defaultNow(),
});

export const invoiceRelations = relations(invoice, ({ one }) => ({
  team: one(teams, {
    fields: [invoice.teamId],
    references: [teams.id],
  }),
}));

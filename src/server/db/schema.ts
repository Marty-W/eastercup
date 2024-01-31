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
  uuid,
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
  editUUID: uuid("edit_uuid").defaultRandom(),
});

export const teamRelations = relations(teams, ({ one, many }) => ({
  transportInfo: one(teamTransportInfo),
  tshirtOrder: one(tshirtOrders),
  invoices: many(invoice),
  cateringOrder: one(cateringOrder),
  accomodationInfo: one(teamAccomodationInfo),
  roomInfo: one(teamRoomInfo),
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
  url: text("url"),
});

export const invoiceRelations = relations(invoice, ({ one }) => ({
  team: one(teams, {
    fields: [invoice.teamId],
    references: [teams.id],
  }),
}));

export const cateringOrder = pgTable("catering_order", {
  id: serial("id").primaryKey(),
  teamId: integer("team_id").references(() => teams.id),
  thuBreakfast: integer("thu_breakfast").default(0),
  thuLunch: integer("thu_lunch").default(0),
  thuDinner: integer("thu_dinner").default(0),
  friBreakfast: integer("fri_breakfast").default(0),
  friLunch: integer("fri_lunch").default(0),
  friDinner: integer("fri_dinner").default(0),
  satBreakfast: integer("sat_breakfast").default(0),
  satLunch: integer("sat_lunch").default(0),
  satDinner: integer("sat_dinner").default(0),
  sunBreakfast: integer("sun_breakfast").default(0),
  sunLunch: integer("sun_lunch").default(0),
  sunDinner: integer("sun_dinner").default(0),
  halalCount: integer("halal_count").default(0),
  vegetarianCount: integer("vegetarian_count").default(0),
  lactoseFreeCount: integer("lactose_free_count").default(0),
  glutenFreeCount: integer("gluten_free_count").default(0),
  otherAllergyCount: integer("other_allergy_count").default(0),
  otherAllergyNote: text("other_allergy_note"),
});

export const cateringOrderRelations = relations(cateringOrder, ({ one }) => ({
  team: one(teams, {
    fields: [cateringOrder.teamId],
    references: [teams.id],
  }),
}));

export const teamAccomodationInfo = pgTable("team_accomodation_info", {
  id: serial("id").primaryKey(),
  teamId: integer("team_id").references(() => teams.id),
  day: text("day").notNull(),
  role: text("role").notNull(),
  accomodation: text("accomodation"),
  count: integer("count").notNull(),
});

export const teamAccomodationInfoRelations = relations(
  teamAccomodationInfo,
  ({ one }) => ({
    team: one(teams, {
      fields: [teamAccomodationInfo.teamId],
      references: [teams.id],
    }),
  }),
);

export const teamRoomInfo = pgTable("team_room_info", {
  id: serial("id").primaryKey(),
  teamId: integer("team_id").references(() => teams.id),
  day: text("day").notNull(),
  role: text("role").notNull(),
  roomType: text("room_type").notNull(),
  count: integer("count").notNull(),
});

export const teamRoomInfoRelations = relations(teamRoomInfo, ({ one }) => ({
  team: one(teams, {
    fields: [teamRoomInfo.teamId],
    references: [teams.id],
  }),
}));

export const emailList = pgTable("email_list", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
});

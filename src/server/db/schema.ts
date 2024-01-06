import { relations, sql } from "drizzle-orm";
import {
  index,
  int,
  mysqlTableCreator,
  primaryKey,
  text,
  timestamp,
  varchar,
  serial,
  boolean,
  date,
} from "drizzle-orm/mysql-core";
import { type AdapterAccount } from "next-auth/adapters";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const mysqlTable = mysqlTableCreator((name) => `eastercup_${name}`);

export const teams = mysqlTable(
  "teams",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    country: varchar("country", { length: 255 }).notNull(),
    category: varchar("category", { length: 255 }).notNull(),
    contactPerson: varchar("contact_person", { length: 255 }).notNull(),
    phoneNumber: varchar("phone_number", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    arrivalTime: varchar("arrival_time", { length: 255 }),
    arrivalDate: date("arrival_date").notNull(),
    meansOfTransport: varchar("means_of_transport", { length: 255 }),
    willTransportStayOver: boolean("will_transport_stay_over"),
    willNeedTransportFromAirport: boolean("will_need_transport_from_airport"),
    flightNumber: varchar("flight_number", { length: 255 }),
    placeOfLanding: varchar("place_of_landing", { length: 255 }),
    note: text("note"),
    companyName: varchar("company_name", { length: 255 }).notNull(),
    address: text("address").notNull(),
    city: varchar("city", { length: 255 }).notNull(),
    zipCode: varchar("zip_code", { length: 255 }).notNull(),
    ic: varchar("ic", { length: 255 }).notNull(),
    dic: varchar("dic", { length: 255 }),
    invoiceId: varchar("invoice_id", { length: 255 }),
    interestInCatering: boolean("interest_in_catering").notNull(),
    interestInAccomodation: boolean("interest_in_accomodation").notNull(),
    interestInTshirts: boolean("interest_in_tshirts").notNull(),
    noXsShirts: int("no_xs_shirts"),
    noSShirts: int("no_s_shirts"),
    noMShirts: int("no_m_shirts"),
    noLShirts: int("no_l_shirts"),
    noXLShirts: int("no_xl_shirts"),
    noXXLShirts: int("no_xxl_shirts"),
  },
  // NOTE: without being unique, this index is useless
  // (teams) => {
  //   return { nameIdx: index("name_idx").on(teams.name) };
  // },
);

export const users = mysqlTable("user", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
    fsp: 3,
  }).default(sql`CURRENT_TIMESTAMP(3)`),
  image: varchar("image", { length: 255 }),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
}));

export const accounts = mysqlTable(
  "account",
  {
    userId: varchar("userId", { length: 255 }).notNull(),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: int("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId),
    userIdIdx: index("userId_idx").on(account.userId),
  }),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = mysqlTable(
  "session",
  {
    sessionToken: varchar("sessionToken", { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar("userId", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (session) => ({
    userIdIdx: index("userId_idx").on(session.userId),
  }),
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = mysqlTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token),
  }),
);

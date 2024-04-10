import * as z from "zod";

export const EMAIL_WELCOME_TEMPLATE_ID_CS = 34639103;
export const EMAIL_WELCOME_TEMPLATE_ID_EN = 34639090;

export const BANK_ACCOUNT_NUMBER_CZK = "241341615/0300";
export const BANK_ACCOUNT_NUMBER_EUR = "278654199/0300";
export const BANK_ACCOUNT_IBAN_CZK = "CZ54 0300 0000 0002 4134 1615";
export const BANK_ACCOUNT_IBAN_EUR = "CZ55 0300 0000 0002 7865 4199";
export const BANK_ACCOUNT_SWIFT = "CEKOCZPP";

export const TRANSPORT_OPTIONS = ["train", "car", "bus", "plane"] as const;

export const REGISTRATION_FEE_EUR = 220;
export const REGISTRATION_FEE_CZK = 5000;
export const REGISTRATION_INVOICE_DUE_DAYS = 10;

export const TOURNAMENT_START = new Date("2024-03-28");

export const TEAM_CATEGORIRES = [
  "U11 MIX",
  "U12B",
  "U12G",
  "U14B",
  "U14G",
  "U16B",
  "U16G",
] as const;

export const TIME_BY_30_MINUTES = [
  "00:00",
  "00:30",
  "01:00",
  "01:30",
  "02:00",
  "02:30",
  "03:00",
  "03:30",
  "04:00",
  "04:30",
  "05:00",
  "05:30",
  "06:00",
  "06:30",
  "07:00",
  "07:30",
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
  "22:30",
  "23:00",
  "23:30",
];

export const teamFormInfoSchema = z.object({
  teamName: z
    .string()
    .min(2, { message: "form.teamName.minError" })
    .max(50, { message: "form.teamName.maxError" }),
  country: z.string().min(2, { message: "form.country.error" }),
  category: z.enum(TEAM_CATEGORIRES),
  contactPerson: z
    .string()
    .min(1, { message: "form.contactPerson.minError" })
    .max(50, {
      message: "form.contactPerson.maxError",
    }),
  phoneNumber: z
    .string()
    .min(6, { message: "form.phoneNumber.minError" })
    .max(50, { message: "form.phoneNumber.maxError" }),
  countryCode: z.string().min(1, { message: "form.countryCode.minError" }),
  email: z.string().email({ message: "form.email.error" }),
  arrivalTime: z.string().optional(),
  arrivalDate: z.date({
    required_error: "form.arrivalDate.error",
  }),
  meansOfTransport: z.enum(TRANSPORT_OPTIONS),
  willTransportStayOver: z
    .boolean({
      required_error: "form.meansOfTransport.stayOver.error",
    })
    .default(false),
  willNeedTransportFromAirport: z
    .boolean({
      required_error: "form.meansOfTransport.stayOver.error",
    })
    .default(false),
  flightNumber: z.string().optional(),
  placeOfLanding: z.string().optional(),
  note: z.string().max(900, { message: "form.note.maxError" }).optional(),
});

export const teamFormInfoDefaultValues = {
  teamName: "",
  phoneNumber: "",
  countryCode: "",
  email: "@",
  contactPerson: "",
  meansOfTransport: TRANSPORT_OPTIONS[0],
  note: "",
  country: "",
  category: TEAM_CATEGORIRES[0],
  arrivalTime: "",
  arrivalDate: TOURNAMENT_START,
  willTransportStayOver: false,
  willNeedTransportFromAirport: false,
};

export const teamFormBillingSchema = z.object({
  companyName: z.string().min(5, { message: "form.required" }),
  address: z.string().min(5, { message: "form.required" }),
  city: z.string().min(3, { message: "form.required" }),
  zipCode: z.string().min(5, { message: "form.required" }),
  ic: z.string().min(5, { message: "form.required" }),
  dic: z.string().optional(),
});

export const teamFormBillingDefaultValues = {
  companyName: "",
  address: "",
  city: "",
  zipCode: "",
  ic: "",
  dic: "",
};

const accomodationCategorySchema = z.object({
  A: z.number().min(0).max(99).optional().default(0),
  B: z.number().min(0).max(99).optional().default(0),
  C: z.number().min(0).max(99).optional().default(0),
  D: z.number().min(0).max(99).optional().default(0),
});

const accomodationWithRoleSchema = z.object({
  player: accomodationCategorySchema,
  "coach-men": accomodationCategorySchema,
  "coach-women": accomodationCategorySchema,
  "support-men": accomodationCategorySchema,
  "support-women": accomodationCategorySchema,
});

const roomSchema = z.object({
  single: z.number().min(0).max(99).optional().default(0),
  double: z.number().min(0).max(99).optional().default(0),
  triple: z.number().min(0).max(99).optional().default(0),
  other: z.number().min(0).max(99).optional().default(0),
});

const roomWithRoleSchema = z.object({
  coaches: roomSchema,
  support: roomSchema,
});

const allergiesSchema = z.object({
  hasHalal: z.boolean().default(false),
  hasGlutenFree: z.boolean().default(false),
  hasLactoseFree: z.boolean().default(false),
  hasVegetarian: z.boolean().default(false),
  hasOtherAllergy: z.boolean().default(false),
  halalCount: z.number().min(0).optional(),
  glutenFreeCount: z.number().min(0).optional(),
  lactoseFreeCount: z.number().min(0).optional(),
  vegetarianCount: z.number().min(0).optional(),
  otherAllergyCount: z.number().min(0).optional(),
  otherAllergyNote: z.string().optional(),
  hasAllergies: z.boolean().default(false),
});

export const tshirtOrderSchema = z.object({
  noXsShirts: z.number().min(0).max(99).optional(),
  noSShirts: z.number().min(0).max(99).optional(),
  noMShirts: z.number().min(0).max(99).optional(),
  noLShirts: z.number().min(0).max(99).optional(),
  noXLShirts: z.number().min(0).max(99).optional(),
  noXXLShirts: z.number().min(0).max(99).optional(),
});

export const cateringOrderSchema = z.object({
  thuBreakfast: z.number().min(0).optional(),
  thuLunch: z.number().min(0).optional(),
  thuDinner: z.number().min(0).optional(),
  friBreakfast: z.number().min(0).optional(),
  friLunch: z.number().min(0).optional(),
  friDinner: z.number().min(0).optional(),
  satBreakfast: z.number().min(0).optional(),
  satLunch: z.number().min(0).optional(),
  satDinner: z.number().min(0).optional(),
  sunBreakfast: z.number().min(0).optional(),
  sunLunch: z.number().min(0).optional(),
  sunDinner: z.number().min(0).optional(),
  allergies: allergiesSchema,
});

export const accomodationCategoryDaySchema = z.object({
  wednesday: accomodationWithRoleSchema.optional(),
  thursday: accomodationWithRoleSchema.optional(),
  friday: accomodationWithRoleSchema.optional(),
  saturday: accomodationWithRoleSchema.optional(),
});

export const accomodationRoomDaySchema = z.object({
  wednesday: roomWithRoleSchema.optional(),
  thursday: roomWithRoleSchema.optional(),
  friday: roomWithRoleSchema.optional(),
  saturday: roomWithRoleSchema.optional(),
});

export const teamFormServicesSchema = z.object({
  interestInCatering: z.boolean().default(false),
  interestInAccomodation: z.boolean().default(false),
  interestInTshirts: z.boolean().default(false),
  tshirtOrder: tshirtOrderSchema,
  cateringOrder: cateringOrderSchema,
  accomodationCategory: accomodationCategoryDaySchema.optional(),
  accomodationRoom: accomodationRoomDaySchema.optional(),
});

export const teamFormServicesDefaultValues = {
  interestInCatering: false,
  interestInAccomodation: false,
  interestInTshirts: false,
  tshirtOrder: {
    noXsShirts: 0,
    noSShirts: 0,
    noMShirts: 0,
    noLShirts: 0,
    noXLShirts: 0,
    noXXLShirts: 0,
  },
  cateringOrder: {
    thuBreakfast: 0,
    thuLunch: 0,
    thuDinner: 0,
    friBreakfast: 0,
    friLunch: 0,
    friDinner: 0,
    satBreakfast: 0,
    satLunch: 0,
    satDinner: 0,
    sunBreakfast: 0,
    sunLunch: 0,
    sunDinner: 0,
    allergies: {
      hasHalal: false,
      hasVegetarian: false,
      hasLactoseFree: false,
      hasGlutenFree: false,
      hasOtherAllergy: false,
      halalCount: 0,
      vegetarianCount: 0,
      lactoseFreeCount: 0,
      glutenFreeCount: 0,
      otherAllergyCount: 0,
      otherAllergyNote: "",
      hasAllergies: false,
    },
  },
  accomodationCategory: {},
  accomodationRoom: {},
};

export const fullFormSchema = teamFormInfoSchema
  .merge(teamFormBillingSchema)
  .merge(teamFormServicesSchema);

export const teamServerInfoSchema = teamFormInfoSchema.extend({
  arrivalDate: z.string(),
});
export const registrationInputSchema = z.object({
  info: teamServerInfoSchema,
  billing: teamFormBillingSchema,
  services: teamFormServicesSchema,
});

export type InfoFormValues = z.infer<typeof teamFormInfoSchema>;
export type BillingFormValues = z.infer<typeof teamFormBillingSchema>;
export type InfoServerValues = z.infer<typeof teamServerInfoSchema>;

export const CATEGORY_CAPACITIES = {
  "U11 MIX": 8,
  U12G: 8,
  U12B: 12,
  U14G: 10,
  U14B: 20,
  U16G: 10,
  U16B: 10,
};

export const REGISTRATION_CUTOFF = new Date("2024-03-07T23:59:59");

export const AccountItemSchema = z.object({
  text: z.string(),
  quantity: z.number(),
  dphRate: z.number(),
  dph: z.number(),
  priceWithoutDPH: z.number(),
  priceWithDPH: z.number(),
  unitPrice: z.union([z.number(), z.literal(false)]),
  type: z.string(),
});

export const AccountBedSchema = z.object({
  bedId: z.string(),
  roomId: z.number(),
  accomodationId: z.number(),
  teamId: z.number(),
  purchasePricePerNight: z.number(),
  purchaseCurrency: z.string(),
  sellPricePerNight: z.number(),
  sellCurrency: z.string(),
  teamName: z.string(),
  accomodationName: z.string(),
  accomodationCategory: z.string(),
  totalPrice: z.number(),
});

export const HALL_LOCATIONS = [
  {
    name: "Office",
    link: "https://maps.app.goo.gl/38AaevS8t35dh3KD8",
    address: "Domažlická 767",
    loc: { lat: 49.39545494519818, lng: 13.288878279728634 },
    tag: "1",
    color: "red",
  },
  {
    name: "Peak shop",
    link: "https://maps.app.goo.gl/38AaevS8t35dh3KD8",
    address: "Domažlická 767",
    loc: { lat: 49.39545494519818, lng: 13.288878279728634 },
    tag: "1",
    color: "yellow",
  },
  {
    name: "Meeting point",
    link: "https://maps.app.goo.gl/38AaevS8t35dh3KD8",
    address: "Domažlická 767",
    loc: { lat: 49.39545494519818, lng: 13.28892253510723 },
    tag: "1",
    color: "black",
  },
  {
    name: "BK Klatovy",
    address: "Voříškova 715",
    link: "https://maps.app.goo.gl/4ifgUjijpJ5QesMC8",
    loc: { lat: 49.3977732905385, lng: 13.286436784298814 },
    tag: "2",
    color: "blue",
  },
  {
    name: "Čapkova",
    link: "https://maps.app.goo.gl/ptNvjTnhzFKgGny57",
    address: "Čapkova 136",
    loc: { lat: 49.39645998164526, lng: 13.307520612566504 },
    tag: "3",
    color: "red",
  },
  {
    name: "Gymnázium",
    link: "https://maps.app.goo.gl/gKbxrqW4Cy4DcVfR9",
    address: "Nár. mučedníků 347",
    loc: { lat: 49.39148991259919, lng: 13.298973629891169 },
    tag: "4",
    color: "yellow",
  },
  {
    name: "Masarykova",
    link: "https://maps.app.goo.gl/TgGR1iFwfCBWRBrg9",
    address: "Nár. mučedníků 185",
    loc: { lat: 49.38973114071045, lng: 13.299839524330558 },
    tag: "5",
    color: "black",
  },
  {
    name: "CMS1",
    link: "https://maps.app.goo.gl/dfE2Hk5dyvEJ6qwm9",
    address: "U Elektrárny 917",
    loc: { lat: 49.38861838985109, lng: 13.27865877957909 },
    tag: "6",
    color: "blue",
  },
  {
    name: "CMS2",
    link: "https://maps.app.goo.gl/dfE2Hk5dyvEJ6qwm9",
    address: "U Elektrárny 917",
    loc: { lat: 49.388448400046094, lng: 13.279258669183347 },
    tag: "7",
    color: "red",
  },
  {
    name: "SPŠ",
    link: "https://maps.app.goo.gl/2HuWi4tfc4CnQQgp8",
    address: "Kpt. Nálepky 362",
    loc: { lat: 49.40134821011473, lng: 13.28506908780864 },
    tag: "8",
    color: "yellow",
  },
  {
    name: "Vodojem",
    link: "https://maps.app.goo.gl/d2aEtrbVwhbVYC7m6",
    address: "Studentská 646",
    loc: { lat: 49.39382377687553, lng: 13.303834850095969 },
    tag: "9",
    color: "black",
  },
];

export const FINAL_STANDINGS = {
  U16B: {
    standings: [
      "BK Lokomotiva Plzeň",
      "BK Klatovy",
      "Science City Jena",
      "Oberpfalz Hunters",
      "Dachau Spurs",
      "Basket Valmez",
      "BA Sparta Praha",
      "SV Oberelchingen",
      "Rockets",
      "Strojár Malacky",
    ],
    allstars: [
      "MRÁZ Martin (BK Klatovy)",
      "ŠTĚPÁNEK Jáchym (Basket Valmez)",
      "LOHMANN Finn (Oberpfalz Hunters)",
      "EFEHAN Karabacak (Dachau Spurs)",
      "LENNY Junker (Science City Jena)",
      "KOZEL David (BK Lokomotiva Plzeň)",
    ],
    mvp: "KOZEL David (BK Lokomotiva Plzeň)",
  },
  U16G: {
    standings: [
      "BK Lvice Litoměřice",
      "Sluneta Ústí nad Labem",
      "BK Medvědice Beroun",
      "BK START Ostrava",
      "BK Klatovy",
      "Vlčice Žďár",
      "BC Říčany",
      "Basketbalový klub mládeže Žilina",
      "Basket Valmez",
      "SKB Rokycany",
    ],
    allstars: [
      "PECHATÁ ADÉLA (BK Lvice Litoměřice)",
      "SALAKOVÁ Vendula (Sluneta Ústí nad Labem)",
      "SUCHÁ Anděla (BK Klatovy)",
      "FILIPPI Francesca (Vlčice Žďár)",
      "PAVLÍKOVÁ Lucie (BK START Ostrava)",
      "MISTERKOVÁ Lucie (BK Medvědice Beroun)",
    ],
    mvp: "PECHATÁ ADÉLA (BK Lvice Litoměřice)",
  },
  U14B: {
    standings: [
      "Válečníci Děčín",
      "Science City Jena 'A'",
      "Vlci Žďár",
      "BK Medvědi Tábor",
      "Oberpfalz Hunters",
      "BK Klatovy",
      "B.S.C Bratislava",
      "Rockets",
      "BK Lokomotiva Plzeň",
      "djk Nieder-Olm",
      "BC Benešov",
      "USK Praha",
      "BA Sparta Praha",
      "Virtus Verbania",
      "Slavoj BK Litoměřice",
      "NINERS Chemnitz",
      "BSD Dresden",
      "Science City Jena 'B'",
      "TJ AŠ Mladá Boleslav",
      "BK Klatovy U13",
    ],
    allstars: [
      "TOMAN Lukáš (BK Klatovy)",
      "DŮRA Jiří (Válečníci Děčín)",
      "SCHULZ Tobiah (Science City Jena 'A')",
      "REINTJES Justus (Oberpfalz Hunters)",
      "KREJČÍ Jiří (Vlci Žďár)",
      "HOCHMAN Jiří (BK Medvědi Tábor)",
    ],
    mvp: "DŮRA Jiří (Válečníci Děčín)",
  },
  U14G: {
    standings: [
      "BK Lvice Litoměřice",
      "Hessen",
      "HB Basket Praha",
      "Válečnice Děčín",
      "BCM Sokolov",
      "BK Sojky Pelhřimov",
      "Basketbalový klub mládeže Žilina",
      "BK Medvědice Beroun",
      "BK Klatovy G",
    ],
    allstars: [
      "BERTZ Antonia (Hessen)",
      "ŠEDIVCOVÁ Lili (HB Basket Praha)",
      "NEVEČEŘALOVÁ Nina (Válečnice Děčín)",
      "GRINDLEROVÁ Johanka (BK Lvice Litoměřice)",
      "BABOROVSKÁ Fanny (BCM Sokolov)",
      "PLEYEROVÁ Kateřina (BK Lvice Litoměřice)",
    ],
    mvp: "GRINDLEROVÁ Johanka (BK Lvice Litoměřice)",
  },
  U12B: {
    standings: [
      "BK Lokomotiva Plzeň",
      "Freak City Academy Bamberg",
      "Sokol Dubeč",
      "SKB Zlín",
      "BK Jiskra Domažlice",
      "BSD Dresden",
      "BC Benešov",
      "Team Oberpfalz",
      "Science City Jena",
      "NINERS Chemnitz",
      "Rockets",
    ],
    allstars: [
      "Bešlič Miloš (Sokol Dubeč)",
      "Munkhjin Gantulga (BK Lokomotiva Plzeň)",
      "Steidl David (BK Jiskra Domažlice)",
      "Neubauer Elia (Freak City Academy Bamberg)",
      "Štěpán Vlk (SKB Zlín)",
      "Maximilian Meyer (BSD Dresden)",
    ],
    mvp: "Munkhjin Gantulga (BK Lokomotiva Plzeň)",
  },
  U12G: {
    standings: ["BK Vlčata Žďár", "BK START Ostrava", "Jižní Supice"],
    allstars: [
      "Klapuchová Simona (BK START Ostrava)",
      "Štembírková Ema (BK START Ostrava)",
      "Holcarová Agáta (Jižní Supice)",
      "Hončlová Viktorie (Jižní Supice)",
      "Karlová Aniela (BK Vlčata Žďár)",
      "Jurašek Andrea (BK Vlčata Žďár)",
    ],
    mvp: "Karlová Aniela (BK Vlčata Žďár)",
  },
  "U11 MIX": {
    standings: [
      "BK Lokomotiva Plzeň",
      "BK Vlčata Žďár",
      "NINNERS Chemnitz",
      "SKB Rokycany",
      "Tus Traunreut",
      "BK Klatovy",
      "Slavoj BK Litoměřice",
    ],
    allstars: [
      "BUDÍN Miloslav (SKB Rokycany)",
      "WEIDEMANN Jiří (BK Vlčata Žďár)",
      "SCHUSTER Patrick (Tus Traunreut)",
      "BLACKÝ Jonáš (BK Lokomotiva Plzeň)",
      "JANOVSKÝ Štěpán (BK Klatovy)",
      "ANTON Lindner (NINNERS Chemnitz)",
      "JANŮ Laura (BK Vlčata Žďár)",
    ],
    mvp: "BLACKÝ Jonáš (BK Lokomotiva Plzeň)",
  },
} as const;

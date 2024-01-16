import * as z from "zod";

export const TRANSPORT_OPTIONS = ["train", "car", "bus", "plane"] as const;

export const REGISTRATION_FEE_EUR = 120;
export const REGISTRATION_FEE_CZK = 5000;

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

export const RoleCategoryTypes = [
  "player",
  "coach-men",
  "coach-women",
  "support-men",
  "support-women",
] as const;

export const RoleRoomTypes = ["coach", "support"] as const;
export const RoomTypes = ["single", "double", "twin", "other"] as const;
export const DayTypes = [
  "wednesday",
  "thursday",
  "friday",
  "saturday",
] as const;
export const AccommodationTypes = ["A", "B", "C", "D"] as const;

const accomodationDaySchema = z.object({
  day: z.enum(DayTypes),
  accommodation: z.enum(AccommodationTypes),
  role: z.enum(RoleCategoryTypes),
  count: z.number().min(0),
});

const roomDaySchema = z.object({
  day: z.enum(DayTypes),
  roomType: z.enum(RoomTypes),
  role: z.enum(RoleRoomTypes),
});

export const teamFormServicesSchema = z.object({
  interestInCatering: z.boolean().default(false),
  interestInAccomodation: z.boolean().default(false),
  interestInTshirts: z.boolean().default(false),
  noXsShirts: z.number().min(0).max(50).optional(),
  noSShirts: z.number().min(0).max(50).optional(),
  noMShirts: z.number().min(0).max(50).optional(),
  noLShirts: z.number().min(0).max(50).optional(),
  noXLShirts: z.number().min(0).max(50).optional(),
  noXXLShirts: z.number().min(0).max(50).optional(),
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
  accomodationSchema: z.array(accomodationDaySchema),
  roomSchema: z.array(roomDaySchema),
});

export const teamFormServicesDefaultValues = {
  interestInCatering: false,
  interestInAccomodation: false,
  interestInTshirts: false,
  noXsShirts: 0,
  noSShirts: 0,
  noMShirts: 0,
  noLShirts: 0,
  noXLShirts: 0,
  noXXLShirts: 0,
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
};

export const fullFormSchema = teamFormInfoSchema
  .merge(teamFormBillingSchema)
  .merge(teamFormServicesSchema);

export const registrationInputSchema = z.object({
  info: teamFormInfoSchema,
  billing: teamFormBillingSchema,
  services: teamFormServicesSchema,
});

import * as z from "zod";
import { teamServicesAtom } from "./atoms";

export const TEAM_CATEGORIRES = [
  "U11 MIX",
  "U12B",
  "U12G",
  "U14B",
  "U14G",
  "U16B",
  "U16G",
] as const;

export const TIMES_BY_30_MINUTES = [
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
] as const;

export const teamFormInfoSchema = z.object({
  teamName: z
    .string()
    .min(5, { message: "form.teamName.minError" })
    .max(50, { message: "form.teamName.maxError" }),
  country: z.string().min(2, { message: "form.country.error" }),
  category: z.string().min(2, { message: "form.category.error" }),
  contactPerson: z
    .string()
    .min(1, { message: "form.contactPerson.minError" })
    .max(50, {
      message: "form.contactPerson.maxError",
    }),
  phoneNumber: z
    .string()
    .min(9, { message: "form.phoneNumber.minError" })
    .max(50, { message: "form.phoneNumber.maxError" })
    .startsWith("+", { message: "form.phoneNumber.startsWithError" }),
  email: z.string().email({ message: "form.email.error" }),
  arrivalTime: z.string().min(4, { message: "form.arrivalTime.error" }),
  meansOfTransport: z
    .string()
    .max(50, {
      message: "form.transport.maxError",
    })
    .optional(),
  note: z.string().max(900, { message: "form.note.maxError" }).optional(),
});

export const teamFormInfoDefaultValues = {
  teamName: "",
  //TODO:would be cool to fetch national phone prefix based on country
  phoneNumber: "+",
  email: "@",
  contactPerson: "",
  meansOfTransport: "",
  note: "",
  country: "",
  category: "",
  arrivalTime: "",
};

export const teamFormBillingSchema = z.object({
  companyName: z.string().min(5, { message: "form.required" }),
  address: z.string().min(5, { message: "form.required" }),
  city: z.string().min(3, { message: "form.required" }),
  zipCode: z.string().min(5, { message: "form.required" }),
  ic: z.string().min(5, { message: "form.required" }),
  dic: z.string().min(5, { message: "form.required" }).optional(),
});

export const teamFormBillingDefaultValues = {
  companyName: "",
  address: "",
  city: "",
  zipCode: "",
  ic: "",
  dic: "",
};

export const teamFormServicesSchema = z.object({
  interestInCatering: z
    .enum(["yes", "no"], {
      required_error: "form.catering.error",
    })
    .transform((value) => (value === "yes" ? true : false)),
  interestInAccomodation: z
    .enum(["yes", "no"], {
      required_error: "form.accomodation.error",
    })
    .transform((value) => (value === "yes" ? true : false)),
  interestInTshirts: z
    .enum(["yes", "no"], {
      required_error: "form.tshirts.error",
    })
    .transform((value) => (value === "yes" ? true : false)),
  noXsShirts: z.coerce.number().min(0).max(50).optional(),
  noSShirts: z.coerce.number().min(0).max(50).optional(),
  noMShirts: z.coerce.number().min(0).max(50).optional(),
  noLShirts: z.coerce.number().min(0).max(50).optional(),
  noXLShirts: z.coerce.number().min(0).max(50).optional(),
  noXXLShirts: z.coerce.number().min(0).max(50).optional(),
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
};

export const teamFormSchemaServer = teamFormInfoSchema
  .merge(teamFormBillingSchema)
  .merge(teamFormServicesSchema)
  .extend({
    interestInCatering: z.boolean(),
    interestInAccomodation: z.boolean(),
    interestInTshirts: z.boolean(),
  });

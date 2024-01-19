import { useI18n } from "locales/client";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
  TableCaption,
} from "../ui/table";
import { type teamFormServicesSchema } from "@/lib/conts";
import { useFormContext } from "react-hook-form";
import { type z } from "zod";
import AccomodationCountInput from "./accomodationCountInput";

const roomTypes = ["coaches", "support"];

interface Props {
  day: "wednesday" | "thursday" | "friday" | "saturday";
}

export default function AccomodationTable({ day }: Props) {
  const t = useI18n();
  const form = useFormContext<z.infer<typeof teamFormServicesSchema>>();

  return (
    <Table>
      <TableCaption>{t("accomodation.captionTwo")}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead>{t("accomodation.coaches")}</TableHead>
          <TableHead>{t("accomodation.support")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>{t("accomodation.oneroom")}</TableCell>
          {roomTypes.map((role) => {
            return (
              <TableCell key={role}>
                <AccomodationCountInput
                  control={form.control}
                  fieldName={`accomodationRoom.${day}.${role}.single`}
                />
              </TableCell>
            );
          })}
        </TableRow>
        <TableRow>
          <TableCell>{t("accomodation.tworoom")}</TableCell>
          {roomTypes.map((role) => {
            return (
              <TableCell key={role}>
                <AccomodationCountInput
                  control={form.control}
                  fieldName={`accomodationRoom.${day}.${role}.double`}
                />
              </TableCell>
            );
          })}
        </TableRow>
        <TableRow>
          <TableCell>{t("accomodation.threeroom")}</TableCell>
          {roomTypes.map((role) => {
            return (
              <TableCell key={role}>
                <AccomodationCountInput
                  control={form.control}
                  fieldName={`accomodationRoom.${day}.${role}.triple`}
                />
              </TableCell>
            );
          })}
        </TableRow>
        <TableRow>
          <TableCell>{t("accomodation.other")}</TableCell>
          {roomTypes.map((role) => {
            return (
              <TableCell key={role}>
                <AccomodationCountInput
                  control={form.control}
                  fieldName={`accomodationRoom.${day}.${role}.other`}
                />
              </TableCell>
            );
          })}
        </TableRow>
      </TableBody>
    </Table>
  );
}

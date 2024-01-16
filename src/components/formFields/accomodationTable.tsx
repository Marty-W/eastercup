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
const roleTypes = [
  "player",
  "coach-men",
  "coach-women",
  "support-men",
  "support-women",
];

const roomTypes = ["coaches", "support"];

interface Props {
  day: "wednesday" | "thursday" | "friday" | "saturday";
}

export default function AccomodationTable({ day }: Props) {
  const t = useI18n();
  const form = useFormContext<z.infer<typeof teamFormServicesSchema>>();

  return (
    <div className="flex flex-col space-y-2">
      <Table>
        <TableCaption>{t("accomodation.captionOne")}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead>{t("accomodation.players")}</TableHead>
            <TableHead>
              {t("common.men")} {t("accomodation.coaches")}
            </TableHead>
            <TableHead>
              {t("common.women")} {t("accomodation.coaches")}
            </TableHead>
            <TableHead>
              {t("common.men")} {t("accomodation.support")}
            </TableHead>
            <TableHead>
              {t("common.women")} {t("accomodation.support")}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>A</TableCell>
            {roleTypes.map((role) => {
              return (
                <TableCell key={role}>
                  <AccomodationCountInput
                    control={form.control}
                    fieldName={`accomodationCategory.${day}.${role}.A`}
                  />
                </TableCell>
              );
            })}
          </TableRow>
          <TableRow>
            <TableCell>B</TableCell>
            {roleTypes.map((role) => {
              return (
                <TableCell key={role}>
                  <AccomodationCountInput
                    control={form.control}
                    fieldName={`accomodationCategory.${day}.${role}.B`}
                  />
                </TableCell>
              );
            })}
          </TableRow>
          <TableRow>
            <TableCell>C</TableCell>
            {roleTypes.map((role) => {
              return (
                <TableCell key={role}>
                  <AccomodationCountInput
                    control={form.control}
                    fieldName={`accomodationCategory.${day}.${role}.C`}
                  />
                </TableCell>
              );
            })}
          </TableRow>
          <TableRow>
            <TableCell>D</TableCell>
            {roleTypes.map((role) => {
              return (
                <TableCell key={role}>
                  <AccomodationCountInput
                    control={form.control}
                    fieldName={`accomodationCategory.${day}.${role}.D`}
                  />
                </TableCell>
              );
            })}
          </TableRow>
        </TableBody>
      </Table>
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
    </div>
  );
}

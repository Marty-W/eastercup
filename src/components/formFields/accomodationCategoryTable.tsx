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
const roleTypes = ["player", "coach-men", "coach-women"];

interface Props {
  day: "wednesday" | "thursday" | "friday" | "saturday";
}

export default function AccomodationCategoryTable({ day }: Props) {
  const t = useI18n();
  const form = useFormContext<z.infer<typeof teamFormServicesSchema>>();

  return (
    <div className="flex flex-col space-y-2">
      <Table>
        <TableCaption className="text-md text-brand-red">
          {t("accomodation.captionOne")}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-20"></TableHead>
            <TableHead className="w-1/3">{t("accomodation.players")}</TableHead>
            <TableHead className="w-1/3">
              {t("common.men")} {t("accomodation.coaches")}
            </TableHead>
            <TableHead className="w-1/3">
              {t("common.women")} {t("accomodation.coaches")}
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
    </div>
  );
}

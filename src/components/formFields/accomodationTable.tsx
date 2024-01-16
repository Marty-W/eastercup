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

interface Props {
  day: "wednesday" | "thursday" | "friday" | "saturday";
}

export default function AccomodationTable({ day }: Props) {
  const t = useI18n();
  return (
    <Table>
      <TableCaption>Please don't forget to fill out all days.</TableCaption>
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
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
        </TableRow>
        <TableRow>
          <TableCell>B</TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
        </TableRow>
        <TableRow>
          <TableCell>C</TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
        </TableRow>
        <TableRow>
          <TableCell>D</TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

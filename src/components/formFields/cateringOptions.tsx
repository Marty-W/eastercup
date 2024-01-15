import { type teamFormServicesSchema } from "@/lib/conts";
import { useFormContext } from "react-hook-form";
import type * as z from "zod";
import { Separator } from "../ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import Allergies from "./alergies";
import FoodInput from "./foodInput";
import { useI18n } from "locales/client";

export default function CateringOptions() {
  const form = useFormContext<z.infer<typeof teamFormServicesSchema>>();
  const t = useI18n();
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead>{t("catering.breakfast")}</TableHead>
            <TableHead>{t("catering.lunch")}</TableHead>
            <TableHead>{t("catering.dinner")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>{t("common.thursday")}</TableCell>
            <TableCell>
              <FoodInput fieldName="thuBreakfast" control={form.control} />
            </TableCell>
            <TableCell>
              <FoodInput fieldName="thuLunch" control={form.control} />
            </TableCell>
            <TableCell>
              <FoodInput fieldName="thuDinner" control={form.control} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>{t("common.friday")}</TableCell>
            <TableCell>
              <FoodInput fieldName="friBreakfast" control={form.control} />
            </TableCell>
            <TableCell>
              <FoodInput fieldName="friLunch" control={form.control} />
            </TableCell>
            <TableCell>
              <FoodInput fieldName="friDinner" control={form.control} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Sobota</TableCell>
            <TableCell>
              <FoodInput fieldName="satBreakfast" control={form.control} />
            </TableCell>
            <TableCell>
              <FoodInput fieldName="satLunch" control={form.control} />
            </TableCell>
            <TableCell>
              <FoodInput fieldName="satDinner" control={form.control} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>{t("common.sunday")}</TableCell>
            <TableCell>
              <FoodInput fieldName="sunBreakfast" control={form.control} />
            </TableCell>
            <TableCell>
              <FoodInput fieldName="sunLunch" control={form.control} />
            </TableCell>
            <TableCell>
              <FoodInput fieldName="sunDinner" control={form.control} />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Separator />
      <Allergies />
    </div>
  );
}

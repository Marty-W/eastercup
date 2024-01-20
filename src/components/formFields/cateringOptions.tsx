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
              <FoodInput
                fieldName="cateringOrder.thuBreakfast"
                control={form.control}
              />
            </TableCell>
            <TableCell>
              <FoodInput
                fieldName="cateringOrder.thuLunch"
                control={form.control}
              />
            </TableCell>
            <TableCell>
              <FoodInput
                fieldName="cateringOrder.thuDinner"
                control={form.control}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>{t("common.friday")}</TableCell>
            <TableCell>
              <FoodInput
                fieldName="cateringOrder.friBreakfast"
                control={form.control}
              />
            </TableCell>
            <TableCell>
              <FoodInput
                fieldName="cateringOrder.friLunch"
                control={form.control}
              />
            </TableCell>
            <TableCell>
              <FoodInput
                fieldName="cateringOrder.friDinner"
                control={form.control}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Sobota</TableCell>
            <TableCell>
              <FoodInput
                fieldName="cateringOrder.satBreakfast"
                control={form.control}
              />
            </TableCell>
            <TableCell>
              <FoodInput
                fieldName="cateringOrder.satLunch"
                control={form.control}
              />
            </TableCell>
            <TableCell>
              <FoodInput
                fieldName="cateringOrder.satDinner"
                control={form.control}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>{t("common.sunday")}</TableCell>
            <TableCell>
              <FoodInput
                fieldName="cateringOrder.sunBreakfast"
                control={form.control}
              />
            </TableCell>
            <TableCell>
              <FoodInput
                fieldName="cateringOrder.sunLunch"
                control={form.control}
              />
            </TableCell>
            <TableCell>
              <FoodInput
                fieldName="cateringOrder.sunDinner"
                control={form.control}
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Separator />
      <Allergies />
    </div>
  );
}

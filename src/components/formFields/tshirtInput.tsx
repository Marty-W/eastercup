import { type teamFormServicesSchema } from "@/lib/conts";
import { useFormContext } from "react-hook-form";
import { type z } from "zod";
import { FormField, FormItem, FormLabel, FormControl } from "../ui/form";
import { Input } from "../ui/input";
import { type FormFieldName } from "@/lib/types";

interface Props {
  fieldName: Extract<
    FormFieldName,
    | "noXsShirts"
    | "noSShirts"
    | "noMShirts"
    | "noLShirts"
    | "noXLShirts"
    | "noXXLShirts"
  >;
  fieldLabel: string;
}

export default function TshirtInput({ fieldName, fieldLabel }: Props) {
  const form = useFormContext<z.infer<typeof teamFormServicesSchema>>();

  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem className="flex items-center space-x-2 place-self-center">
          <FormLabel className="w-6">{fieldLabel}</FormLabel>
          <FormControl>
            <Input {...field} className="w-16" type="number" max={50} min={0} />
          </FormControl>
        </FormItem>
      )}
    />
  );
}

import { type teamFormInfoSchema } from "@/lib/conts";
import { Control, FieldValues, Path, useFormContext } from "react-hook-form";
import { type z } from "zod";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { useI18n } from "locales/client";
import { type LocaleKey, type FormFieldCategoryName } from "@/lib/types";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
} from "../ui/select";
import InfoTooltip from "../ui/infoTooltip";

interface Props<T extends FieldValues> {
  fieldName: Path<T>;
  fieldLabel: LocaleKey;
  control: Control<T>;
  placeholderLabel: LocaleKey;
  children: React.ReactNode;
  tooltipContent?: React.ReactNode;
}

export default function FormSelect<T extends FieldValues>({
  fieldName,
  fieldLabel,
  control,
  placeholderLabel,
  tooltipContent,
  children,
}: Props<T>) {
  const t = useI18n();

  return (
    <FormField
      control={control}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          <div className="flex items-center space-x-2">
            <FormLabel>{t(fieldLabel)}</FormLabel>
            {tooltipContent && <InfoTooltip>{tooltipContent}</InfoTooltip>}
          </div>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={t(placeholderLabel)} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="z-50">
              <SelectGroup>{children}</SelectGroup>
            </SelectContent>
          </Select>
          <FormMessage isTranslated />
        </FormItem>
      )}
    />
  );
}

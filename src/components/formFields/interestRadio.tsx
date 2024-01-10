import { type Control, type FieldValues, type Path } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl } from "../ui/form";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useI18n } from "locales/client";
import { type LocaleKey } from "@/lib/types";

interface Props<T extends FieldValues> {
  fieldName: Path<T>;
  control: Control<T>;
  fieldLabel: LocaleKey;
  infoTooltip?: React.ReactNode;
}

export default function InterestRadio<T extends FieldValues>({
  fieldName,
  fieldLabel,
  infoTooltip,
  control,
}: Props<T>) {
  const t = useI18n();

  return (
    <FormField
      control={control}
      name={fieldName}
      render={({ field }) => (
        <FormItem className="space-y-3">
          {infoTooltip ? (
            <div className="flex items-center space-x-2">
              <FormLabel>{t(fieldLabel)}</FormLabel>
              {infoTooltip}
            </div>
          ) : (
            <FormLabel>{t(fieldLabel)}</FormLabel>
          )}
          <FormControl>
            <RadioGroup
              onValueChange={(val) =>
                field.onChange(val === "yes" ? true : false)
              }
              className="flex flex-col space-y-1"
            >
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="yes" />
                </FormControl>
                <FormLabel className="font-normal">{t("common.yes")}</FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="no" />
                </FormControl>
                <FormLabel className="font-normal">{t("common.no")}</FormLabel>
              </FormItem>
            </RadioGroup>
          </FormControl>
        </FormItem>
      )}
    />
  );
}

import { useI18n } from "locales/client";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogHeader,
  AlertDialogFooter,
} from "./ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import { useFormContext } from "react-hook-form";
import { type LocaleKey, type Form } from "@/lib/types";
import { CheckCircle2, MinusCircle } from "lucide-react";

export default function FormSubmitDialog() {
  const t = useI18n();
  const form = useFormContext<Form>();
  const formValues = form.getValues();
  return (
    <AlertDialog>
      <AlertDialogTrigger disabled={!form.formState.isValid}>
        <Button className="mx-auto w-32 font-sans">{t("form.submit")}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="font-sans">
        <AlertDialogHeader>
          <AlertDialogTitle>
            <Table>
              {/* TODO: add translations */}
              <TableCaption>Hodnoty z formulare</TableCaption>
              <TableBody>
                {Object.keys(formValues).map((key) => {
                  const formKey = key as keyof Form;
                  const value = formValues[formKey];

                  if (!value) return null;

                  return (
                    <TableRow key={key}>
                      <TableCell className="font-medium">
                        {/* @ts-expect-error too much overhead with locales */}
                        {t(`form.${key as LocaleKey}`)}
                      </TableCell>
                      {value === "yes" ? (
                        <TableCell className="flex justify-end">
                          <CheckCircle2 className="text-green-500" />
                        </TableCell>
                      ) : value === "no" ? (
                        <TableCell className="flex justify-end">
                          <MinusCircle />
                        </TableCell>
                      ) : (
                        <TableCell className="text-right">
                          {/* NOTE: this is not a good way to display values, plus it blocks deploy :W */}
                          {/* {value.toString()} */}
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </AlertDialogTitle>
          <AlertDialogDescription>
            tady bude table se vsemi hodnotami z formu
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Submit</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

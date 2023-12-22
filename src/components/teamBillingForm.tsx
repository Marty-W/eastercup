import { useFormContext } from "react-hook-form";
import type * as z from "zod";
import { Form } from "./ui/form";
import { type teamFormBillingSchema } from "@/lib/conts";
import TextInput from "./formFields/textInput";

export default function TeamBillingForm() {
  const form = useFormContext<z.infer<typeof teamFormBillingSchema>>();

  return (
    <Form {...form}>
      <h3 className="text-center text-lg font-semibold">Fakturacni udaje</h3>
      <div className="flex flex-col space-y-6 pt-6">
        <TextInput fieldName="companyName" fieldLabel="form.companyName" />
        <TextInput fieldName="address" fieldLabel="form.address" />
        <TextInput fieldName="city" fieldLabel="form.city" />
        <TextInput fieldName="zipCode" fieldLabel="form.zipCode" />
        <TextInput fieldName="ic" fieldLabel="form.ic" />
        <TextInput fieldName="dic" fieldLabel="form.dic" />
      </div>
    </Form>
  );
}

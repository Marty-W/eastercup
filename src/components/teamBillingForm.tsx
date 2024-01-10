import { useFormContext } from "react-hook-form";
import type * as z from "zod";
import { Form } from "./ui/form";
import { type teamFormBillingSchema } from "@/lib/conts";
import TextInput from "./formFields/textInput";

export default function TeamBillingForm() {
  const form = useFormContext<z.infer<typeof teamFormBillingSchema>>();

  return (
    <Form {...form}>
      {/* TODO add translation */}
      <h3 className="text-center text-lg font-semibold">Fakturacni udaje</h3>
      <div className="flex flex-col space-y-6 pt-6">
        <TextInput
          fieldName="companyName"
          fieldLabel="form.companyName"
          control={form.control}
        />
        <TextInput
          fieldName="address"
          fieldLabel="form.address"
          control={form.control}
        />
        <TextInput
          fieldName="city"
          fieldLabel="form.city"
          control={form.control}
        />
        <TextInput
          fieldName="zipCode"
          fieldLabel="form.zipCode"
          control={form.control}
        />
        <TextInput fieldName="ic" fieldLabel="form.ic" control={form.control} />
        <TextInput
          fieldName="dic"
          fieldLabel="form.dic"
          control={form.control}
        />
      </div>
    </Form>
  );
}

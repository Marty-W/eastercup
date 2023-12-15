import { countries } from "countries-list";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { type UseFormReturn } from "react-hook-form";
import { type formSchema } from "../teamRegistrationForm";
import type * as z from "zod";

interface Props {
  control: UseFormReturn<z.infer<typeof formSchema>>;
}

export default function CountryPicker(form: Props) {
  return (
    <FormField
      control={form.control}
      name="teamName"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Username</FormLabel>
          <FormControl>
            <Input placeholder="shadcn" {...field} />
          </FormControl>
          <FormDescription>This is your public display name.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

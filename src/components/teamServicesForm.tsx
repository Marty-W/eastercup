import { type UseFormReturn } from "react-hook-form";
import { type z } from "zod";
import {
  type RegistrationStep,
  type formSchema,
} from "./teamRegistrationController";
import { Button } from "./ui/button";

interface Props {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  handleStepChange: (step: RegistrationStep) => void;
}

export default function TeamServiceForm({ form, handleStepChange }: Props) {
  return (
    <div>
      <Button
        className="mx-auto font-sans"
        onClick={() => handleStepChange("credentials")}
      >
        Predchozi krok
      </Button>
      <Button type="submit" className="mx-auto font-sans">
        Submit
      </Button>
    </div>
  );
}

import TeamRegistrationController from "@/components/teamRegistrationController";
import { FormErrorProvider } from "@/hooks/useFormError";

export default function Form() {
  return (
    <FormErrorProvider>
      <TeamRegistrationController />
    </FormErrorProvider>
  );
}

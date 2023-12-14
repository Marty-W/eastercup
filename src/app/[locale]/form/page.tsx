import Navbar from "@/components/navbar";
import TeamRegistrationForm from "@/components/teamRegistrationForm";
import { getI18n } from "locales/server";

export default async function Form() {
  const t = await getI18n();
  return (
    <main>
      {/* Consider moving the navbar to a shared layout */}
      <Navbar />
      <div className="container flex flex-col">
        <h1 className="text-center font-display">{t("form.header")}</h1>
        <TeamRegistrationForm />
      </div>
    </main>
  );
}

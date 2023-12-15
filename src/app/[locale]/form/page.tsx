import Navbar from "@/components/navbar";
import TeamRegistrationController from "@/components/teamRegistrationController";
import { getI18n } from "locales/server";

export default async function Form() {
  const t = await getI18n();
  return (
    <main>
      {/* NOTE Consider moving the navbar to a shared layout */}
      <Navbar />
      <div className="container flex flex-col">
        <h1 className="text-center font-display">{t("form.header")}</h1>
        <TeamRegistrationController />
      </div>
    </main>
  );
}

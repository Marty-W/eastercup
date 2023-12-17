import Navbar from "@/components/navbar";
import TeamRegistrationController from "@/components/teamRegistrationController";

export default function Form() {
  return (
    <main>
      {/* NOTE Consider moving the navbar to a shared layout */}
      <Navbar />
      <div className="container flex flex-col">
        <TeamRegistrationController />
      </div>
    </main>
  );
}

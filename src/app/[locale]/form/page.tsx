import Navbar from "@/components/navbar";
import TeamRegistrationForm from "@/components/teamRegistrationForm";

export default function Form() {
  return (
    <main>
      {/* Consider moving the navbar to a shared layout */}
      <Navbar />
      <div className="container flex flex-col">
        <h1 className="text-center font-display">Registrace tymu</h1>
        <TeamRegistrationForm />
      </div>
    </main>
  );
}

import Link from "next/link";
import { Button } from "./ui/button";
import FailureSVG from "public/icons8-cancel-500.svg";

// TODO: add translations
export default function WrongStateRedirect() {
  return (
    <div className="flex flex-col space-y-3 text-center">
      <FailureSVG className="mx-auto h-24 w-24" />
      <h1 className="text-xl font-semibold">Ooops, something went wrong.</h1>
      <Button asChild>
        <Link href="/">Go home</Link>
      </Button>
    </div>
  );
}

import Link from "next/link";
import { Button } from "./ui/button";

export default function FormWrongStateButtons() {
  return (
    <div className="flex flex-col space-y-3 pt-5">
      <Button asChild>
        <Link href={`/form/info`}>Try again</Link>
      </Button>
      <Button asChild variant="secondary">
        <Link href={`/`}>Go home</Link>
      </Button>
    </div>
  );
}

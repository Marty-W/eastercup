import FailureSVG from "public/icons8-cancel-500.svg";
import FormWrongStateButtons from "./formWrongStateButtons";
import Image from "next/image";

// TODO: add translations
export default function WrongStateRedirect() {
  return (
    <>
      <div className="flex flex-col space-y-3 text-center">
        <Image
          src={FailureSVG as string}
          alt="Failure icon"
          className="mx-auto h-24 w-24"
        />
        <h1 className="text-xl font-semibold">Ooops, something went wrong.</h1>
      </div>
      <FormWrongStateButtons />
    </>
  );
}

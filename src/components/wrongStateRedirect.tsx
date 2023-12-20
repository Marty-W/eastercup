import FailureSVG from "public/icons8-cancel-500.svg";
import FormWrongStateButtons from "./formWrongStateButtons";

// TODO: add translations
export default function WrongStateRedirect() {
  return (
    <>
      <div className="flex flex-col space-y-3 text-center">
        <FailureSVG className="mx-auto h-24 w-24" />
        <h1 className="text-xl font-semibold">Ooops, something went wrong.</h1>
      </div>
      <FormWrongStateButtons />
    </>
  );
}

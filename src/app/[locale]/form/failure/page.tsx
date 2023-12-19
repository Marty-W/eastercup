import FailureSVG from "public/icons8-cancel-500.svg";

// TODO: add translations
// TODO: add a button for going to the landing page
// TODO: add a button for going back to the form (maybe recover data and fill the form)
// TODO: add some field to show the error message
//
export default function FormSuccess() {
  return (
    <div>
      <FailureSVG className="mx-auto h-24 w-24" />
      <div className="space-y-5 pt-8">
        <h1 className="text-center font-display text-xl">Oops...</h1>
        <p className="text-center">Something went wrong</p>
      </div>
    </div>
  );
}

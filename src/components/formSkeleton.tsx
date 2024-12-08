export default function FormLoadingSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="round mx-auto h-24 w-24 rounded-full bg-gray-300"></div>
      <div className="flex flex-col items-center pt-8">
        <div className="mb-5 h-8 w-24 rounded-xl bg-gray-300" />
        <div className="mb-5 h-8 w-80 rounded-xl bg-gray-300" />
      </div>
    </div>
  );
}

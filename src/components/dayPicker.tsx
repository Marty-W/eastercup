import { useCurrentLocale } from "locales/client";
import { ChevronLeft, ChevronRight } from "lucide-react";

const DAYS_EN = ["Thursday", "Friday", "Saturday", "Sunday"];
const DAYS_CZ = ["Čtvrtek", "Pátek", "Sobota", "Neděle"];

interface Props {
  selectedDayIdx: 4 | 5 | 6 | 7;
  onDayChange: (dayIdx: 4 | 5 | 6 | 7) => void;
}

export const DayPicker = ({ selectedDayIdx, onDayChange }: Props) => {
  const language = useCurrentLocale();

  // Map the ISO day index to array indices [0, 4]
  const arrayIdx = selectedDayIdx - 4;
  const days = language === "en" ? DAYS_EN : DAYS_CZ;
  const selectedDay = days[arrayIdx];

  const handleChevronLeft = () => {
    const newIdx = selectedDayIdx === 4 ? 7 : selectedDayIdx - 1;
    onDayChange(newIdx as 4 | 5 | 6 | 7);
  };

  const handleChevronRight = () => {
    const newIdx = selectedDayIdx === 7 ? 4 : selectedDayIdx + 1;
    onDayChange(newIdx as 4 | 5 | 6 | 7);
  };

  return (
    <div className="flex items-center justify-center">
      <button onClick={handleChevronLeft} className="p-2">
        <ChevronLeft />
      </button>
      <span className="min-w-[140px] text-center md:text-xl">
        {selectedDay}
      </span>
      <button onClick={handleChevronRight} className="p-2">
        <ChevronRight />
      </button>
    </div>
  );
};

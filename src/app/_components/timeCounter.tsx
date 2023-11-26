"use client";
import { intervalToDuration } from "date-fns";
import { useEffect, useState } from "react";

const CUP_DATE = new Date("2024-03-28");

const TimeCounter = () => {
  const today = new Date();
  const [diff, setDiff] = useState(() =>
    intervalToDuration({ start: today, end: CUP_DATE }),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const today = new Date();
      const diff = intervalToDuration({ start: today, end: CUP_DATE });
      setDiff(diff);
    }, 1000);
    return () => clearInterval(interval);
  });

  return (
    <span>{`${diff.months}m : ${diff.days}d : ${diff.hours}h : ${diff.minutes}m : ${diff.seconds} s`}</span>
  );
};

export default TimeCounter;

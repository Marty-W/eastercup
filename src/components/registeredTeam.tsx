"use client";

import { cn } from "@/lib/utils";

interface Props {
  teamName: string;
  teamCountry: string;
  paidInvoice: boolean;
}
export default function RegisteredTeam({
  teamName,
  paidInvoice,
  teamCountry,
}: Props) {
  return (
    <div className="flex space-x-2">
      <span className={`fi fi-${teamCountry.toLowerCase()}`}></span>
      <p className={cn(!paidInvoice && "text-red-500")}>{teamName}</p>
    </div>
  );
}

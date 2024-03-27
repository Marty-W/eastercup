"use client";

import dynamic from "next/dynamic";

const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  },
);
import TimeCounter from "@/components/timeCounter";
import { getI18n } from "locales/server";
import { api } from "@/trpc/server";
import TeamCountryCount from "@/components/teamCountryCount";
import CountryFlags from "@/components/countryFlags";
import { BentoCard } from "@/components/bentoCard";
import { AnimatedWelcomeBento } from "@/components/animatedWelcomeBento";
import { Document, Page } from "@react-pdf/renderer";
import FinalInvoiceTemplateCS from "@/components/finalInvoiceTemplateCS";
import FinalInvoiceTemplateEN from "@/components/finalInvoiceTemplateEN";

export default function Landing() {
  const billing = {
    id: 180,
    teamName: "BK Klatovy  | U16G",
    country: "CZ",
    contactPerson: "Václav Kubát",
    email: "vaclav.kubat2@gmail.com",
    phoneNumber: "+420775517770",
    companyName: "BK Klatovy",
    address: "Voříškova 715 339 01, Klatovy 3",
    city: "Klatovy",
    zip: "33901",
    ic: "22850490",
    dic: "",
  };
  const accountedItems = [
    {
      text: "Turnajová trička",
      quantity: 8,
      unitPrice: 300,
      priceWithoutDPH: 1896,
      dphRate: 21,
      dph: 504,
      priceWithDPH: 2400,
      type: "tshirt",
    },
    {
      text: "Stravování - snídaně",
      quantity: 43,
      unitPrice: 110,
      priceWithoutDPH: 4162.4,
      dphRate: 12,
      dph: 567.6,
      priceWithDPH: 4730,
      type: "breakfast",
    },
    {
      text: "Stravování - oběd",
      quantity: 32,
      unitPrice: 175,
      priceWithoutDPH: 4928,
      dphRate: 12,
      dph: 672,
      priceWithDPH: 5600,
      type: "lunch",
    },
    {
      text: "Ubytování - kategorie B",
      quantity: 13,
      unitPrice: 1890,
      priceWithoutDPH: 21621.6,
      dphRate: 12,
      dph: 2948.4,
      priceWithDPH: 24570,
      type: "catB",
    },
  ];

  return (
    <div className="h-screen w-screen">
      <PDFViewer className="h-screen w-screen">
        <FinalInvoiceTemplateEN
          billing={billing}
          teamName="sracky"
          contactPerson="pan debil"
          email="kokot@picus.sracka"
          phoneNumber="420775517770"
          invoiceVarSymbol="20240001"
          currency="czk"
          totalInvoicePrice="666"
          accountItems={accountedItems}
          paidInAdvance={5000}
        />
      </PDFViewer>
    </div>
  );
}

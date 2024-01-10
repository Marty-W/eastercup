"use client";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { useAtomValue } from "jotai";
import { teamDbDataAtom, teamFormAtom } from "@/lib/atoms";
import { REGISTRATION_FEE_CZK, TOURNAMENT_START } from "@/lib/conts";

export default function InvoiceTemplate() {
  const formValues = useAtomValue(teamFormAtom);
  const dbData = useAtomValue(teamDbDataAtom);

  return (
    <div className="bg-white px-10 pt-10">
      <div>
        <h1 className="mb-6 text-center text-2xl font-bold">
          Zálohová faktura
        </h1>
        <div className="mb-6 grid grid-cols-3 grid-rows-[1fr_6px_1fr] items-center gap-8">
          <div>
            <h2 className="text-l mb-2 font-bold underline underline-offset-1">
              DODAVATEL:
            </h2>
            <p>BK KLATOVY z.s.</p>
            <p>Voříškova 715</p>
            <p>33901, Klatovy</p>
            <p>IČ: 22850490</p>
            <p>DIČ: CZ22850490</p>
          </div>
          <div className="row-start-3">
            <p>Číslo účtu:</p>
            {/* TODO hide from public code */}
            <p>241341615/0300 ČSOB Klatovy</p>
            <p>IBAN: CZ54 0300 0000 0002 4134 1615</p>
            <p>SWIFT: CEKOCZPP</p>
            {/* TODO: add variable symbol (you gotta generate it and save to db first) */}
            <p>Variabilní symbol: {dbData?.invoiceId}</p>
            {/* TODO add proper date of registration */}
            <p>Datum vystavení: {format(new Date(), "dd.M.yyyy")}</p>
            <p>Datum splatnosti: {format(TOURNAMENT_START, "dd.M.yyyy")}</p>
          </div>
          <Separator className="col-span-3 row-start-2 h-[3px]" />
          <div className="col-start-3">
            <h2 className="text-l mb-2 font-bold underline underline-offset-1">
              ODBĚRATEL:
            </h2>
            <p>{formValues?.companyName}</p>
            <p>{formValues?.address}</p>
            <p>{`${formValues?.zipCode}, ${formValues?.city}`}</p>
            <p>IČ: {formValues?.ic}</p>
            <p>DIČ: {formValues?.dic ?? ""}</p>
          </div>
          <div className="col-start-3 row-start-3">
            <p>Název týmu: {formValues?.teamName}</p>
            <p>Kontaktní osoba: {formValues?.contactPerson}</p>
            <p>Email: {formValues?.email}</p>
            <p>Telefon: {formValues?.phoneNumber}</p>
          </div>
        </div>
        <Separator className="mb-1 h-[3px]" />
        <Separator className="h-[3px]" />
        <div className="mb-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Popis položky</TableHead>
                <TableHead>MJ</TableHead>
                <TableHead>Cena za MJ s DPH</TableHead>
                <TableHead>Celkem bez DPH</TableHead>
                <TableHead>Sazba DPH</TableHead>
                <TableHead>DPH</TableHead>
                <TableHead>Cena celkem včetně DPH</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Startovné: ({formValues?.category})</TableCell>
                <TableCell>1</TableCell>
                <TableCell>{REGISTRATION_FEE_CZK} Kč</TableCell>
                <TableCell>{REGISTRATION_FEE_CZK} Kč</TableCell>
                <TableCell>0%</TableCell>
                <TableCell>0,00 Kč</TableCell>
                <TableCell>{REGISTRATION_FEE_CZK} Kč</TableCell>
              </TableRow>
              <Separator className="" />
            </TableBody>
          </Table>
        </div>
        <div className="mb-6 text-right font-bold">
          <p>Celkem k úhradě: 5 000,00 Kč</p>
        </div>
      </div>
      <div className="mb-[600px] text-center font-bold">
        <p>POZOR !!! TOTO NENÍ DAŇOVÝ DOKLAD, POUZE VÝZVA K ÚHRADĚ !!!</p>
        <p>
          Do 15 dnů po provedení úhrady bude zaslán daňový doklad (faktura).
        </p>
        <p>
          Případné změny ve Vašich požadavcích budou řešené v hotovosti při
          akreditaci na začátku turnaje.
        </p>
      </div>
      <div className="text-center text-sm">
        <p>
          BK Klatovy, Voříškova 715, 339 01 Klatovy | www.basketbal-klatovy.cz |
          www.eastercupklatovy.cz
        </p>
      </div>
    </div>
  );
}

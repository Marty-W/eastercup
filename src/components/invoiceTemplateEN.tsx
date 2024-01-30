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
import { addDays, format } from "date-fns";
import { useAtomValue } from "jotai";
import { teamDbDataAtom, teamFormAtom } from "@/lib/atoms";
import {
  REGISTRATION_FEE_EUR,
  TOURNAMENT_START,
  REGISTRATION_INVOICE_DUE_DAYS,
} from "@/lib/conts";

export default function InvoiceTemplateEN() {
  const formValues = useAtomValue(teamFormAtom);
  const dbData = useAtomValue(teamDbDataAtom);

  const today = new Date();
  const dueDate = addDays(today, REGISTRATION_INVOICE_DUE_DAYS);

  return (
    <div className="bg-white px-10 pt-10">
      <div>
        <h1 className="mb-6 text-center text-2xl font-bold">Payment request</h1>
        <div className="mb-6 grid grid-cols-3 grid-rows-[1fr_6px_1fr] items-center gap-8">
          <div>
            <h2 className="text-l mb-2 font-bold underline underline-offset-1">
              SUPPLIER:
            </h2>
            <p>BK KLATOVY z.s.</p>
            <p>Voříškova 715</p>
            <p>33901, Klatovy</p>
            <p>ID: 22850490</p>
            <p>VAT ID: CZ22850490</p>
          </div>
          <div className="row-start-3">
            <p>Bank account</p>
            <p>241341615/0300 ČSOB Klatovy</p>
            <p>IBAN: CZ54 0300 0000 0002 4134 1615</p>
            <p>SWIFT: CEKOCZPP</p>
            <p>Var. symbol: {dbData?.invoiceId}</p>
            <p>Issue date: {format(today, "dd/MM/yyyy")}</p>
            <p>Due date: {format(dueDate, "dd/MM/yyyy")}</p>
          </div>
          <Separator className="col-span-3 row-start-2 h-[3px]" />
          <div className="col-start-3">
            <h2 className="text-l mb-2 font-bold underline underline-offset-1">
              CUSTOMER:
            </h2>
            <p>{formValues?.companyName}</p>
            <p>{formValues?.address}</p>
            <p>{`${formValues?.zipCode}, ${formValues?.city}`}</p>
            <p>ID: {formValues?.ic}</p>
            <p>VAT ID: {formValues?.dic ?? ""}</p>
          </div>
          <div className="col-start-3 row-start-3">
            <p>Team name: {formValues?.teamName}</p>
            <p>Contact person: {formValues?.contactPerson}</p>
            <p>Email: {formValues?.email}</p>
            <p>Phone number: {formValues?.phoneNumber}</p>
          </div>
        </div>
        <Separator className="mb-1 h-[3px]" />
        <Separator className="h-[3px]" />
        <div className="mb-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item Description</TableHead>
                <TableHead>QTY</TableHead>
                <TableHead>Unit price (VAT incl.)</TableHead>
                <TableHead>Toal (VAT incl.)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Tournament fee: ({formValues?.category})</TableCell>
                <TableCell>1</TableCell>
                {/* TODO: get proper price in eur */}
                <TableCell>{REGISTRATION_FEE_EUR} €</TableCell>
                <TableCell>{REGISTRATION_FEE_EUR} € </TableCell>
              </TableRow>
              <Separator className="" />
            </TableBody>
          </Table>
        </div>
        <div className="mb-6 text-right font-bold">
          <p>Total amount: {REGISTRATION_FEE_EUR} €</p>
        </div>
      </div>
      <div className="mb-[600px] text-center font-bold">
        <p>ATTENTION! This is not a tax document, only a payment request!</p>
        <p>
          The tax document will be issued upon the accreditation of the team
          into the tournament at the event organizer&apos;s office.{" "}
        </p>
        <p>
          The team will be registered for the tournament only after the
          participation fee has been paid.
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

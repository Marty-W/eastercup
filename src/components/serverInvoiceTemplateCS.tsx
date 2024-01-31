import {
  REGISTRATION_INVOICE_DUE_DAYS,
  REGISTRATION_FEE_CZK,
  BANK_ACCOUNT_NUMBER_CZK,
  BANK_ACCOUNT_IBAN_CZK,
  BANK_ACCOUNT_SWIFT,
} from "@/lib/conts";
import { View, StyleSheet, Document, Page, Text } from "@react-pdf/renderer";
import { addDays, format } from "date-fns";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    paddingLeft: 20,
    paddingRight: 20,
    position: "relative",
    fontFamily: "Roboto",
  },
  header: {
    margin: 10,
    padding: 10,
    textAlign: "center",
    fontSize: 16,
    fontWeight: 700,
  },
  sectionLeft: {
    flexDirection: "column",
    fontSize: 10,
    lineHeight: 1.5,
    width: "50%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  sectionRight: {
    flexDirection: "column",
    fontSize: 10,
    lineHeight: 1.5,
    width: "50%",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  sectionHeader: {
    textDecoration: "underline",
    fontWeight: "bold",
    marginBottom: 5,
  },
});

interface Props {
  teamName: string;
  category: string;
  contactPerson: string;
  email: string;
  billing: {
    companyName: string;
    address: string;
    city: string;
    zip: string;
    ic: string;
    dic: string | null;
  };
  phoneNumber: string;
  invoiceVarSymbol: string;
}

export default function ServerInvoiceTemplateCS({
  billing: { companyName, address, zip, city, ic, dic },
  teamName,
  email,
  contactPerson,
  phoneNumber,
  category,
  invoiceVarSymbol,
}: Props) {
  const today = new Date();
  const dueDate = addDays(today, REGISTRATION_INVOICE_DUE_DAYS);

  const SEPARATOR_COLOR = "#1B1B1E";

  return (
    <Document pageMode="fullScreen" pageLayout="singlePage">
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text>Zálohová faktura</Text>
        </View>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={styles.sectionLeft}>
            <Text style={styles.sectionHeader}>DODAVATEL:</Text>
            <Text>BK KLATOVY z.s.</Text>
            <Text>Voříškova 715</Text>
            <Text>33901, Klatovy</Text>
            <Text>IČ: 22850490</Text>
            <Text>DIČ: CZ22850490</Text>
          </View>
          <View style={styles.sectionRight}>
            <Text style={styles.sectionHeader}>ODBĚRATEL:</Text>
            <Text>{companyName}</Text>
            <Text>{address}</Text>
            <Text>
              {zip}, {city}
            </Text>
            <Text>IČ: {ic}</Text>
            <Text>DIČ: {dic}</Text>
          </View>
        </View>
        <View
          style={{
            width: "100%",
            backgroundColor: SEPARATOR_COLOR,
            height: "1px",
            marginTop: "10px",
            marginBottom: "10px",
          }}
        />
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={styles.sectionLeft}>
            <Text>Číslo účtu: {BANK_ACCOUNT_NUMBER_CZK}</Text>
            <Text>IBAN: {BANK_ACCOUNT_IBAN_CZK}</Text>
            <Text>SWIFT: {BANK_ACCOUNT_SWIFT}</Text>
            <Text>Variabilní symbol: {invoiceVarSymbol}</Text>
            <Text>Datum vystavení: {format(today, "dd.M.yyyy")}</Text>
            <Text>Datum splatnosti: {format(dueDate, "dd.M.yyyy")}</Text>
          </View>
          <View style={styles.sectionRight}>
            <Text>Název týmu: {teamName}</Text>
            <Text>Kontaktní osoba: {contactPerson}</Text>
            <Text>Email: {email}</Text>
            <Text>Telefon: {phoneNumber}</Text>
          </View>
        </View>
        <View
          style={{
            marginBottom: "10px",
            marginTop: "10px",
          }}
        >
          <View
            style={{
              width: "100%",
              backgroundColor: SEPARATOR_COLOR,
              height: "1px",
              marginBottom: "1px",
            }}
          />
          <View
            style={{
              width: "100%",
              backgroundColor: SEPARATOR_COLOR,
              height: "1px",
            }}
          />
        </View>
        <View
          style={{
            fontSize: 9,
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexGrow: 1 }}>
            <Text>Popis položky</Text>
          </View>
          <View
            style={{
              flexGrow: 1,
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <Text>MJ</Text>
          </View>
          <View
            style={{
              flexGrow: 1,
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <Text>Cena za MJ s DPH</Text>
          </View>
          <View
            style={{
              flexGrow: 1,
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <Text>Celkem bez DPH</Text>
          </View>
          <View
            style={{
              flexGrow: 1,
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <Text>Sazba DPH</Text>
          </View>
          <View
            style={{
              flexGrow: 1,
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <Text>DPH</Text>
          </View>
          <View
            style={{
              flexGrow: 1,
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <Text>Cena celkem včetně DPH</Text>
          </View>
        </View>
        <View
          style={{
            width: "100%",
            backgroundColor: "#00000",
            height: "0.2px",
            marginTop: "4px",
            marginBottom: "4px",
          }}
        />
        <View
          style={{
            fontSize: 9,
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text>Startovné: {category}</Text>
          <Text>1</Text>
          <Text>{REGISTRATION_FEE_CZK} Kč</Text>
          <Text>{REGISTRATION_FEE_CZK} Kč</Text>
          <Text>0%</Text>
          <Text>0,00 Kč</Text>
          <Text>{REGISTRATION_FEE_CZK} Kč</Text>
        </View>
        <View
          style={{
            fontSize: 9,
            width: "100%",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            marginTop: "30px",
            marginBottom: "10px",
          }}
        >
          <Text>Celkem k úhradě: 5 000,00 Kč</Text>
        </View>
        <View
          style={{
            fontSize: 11,
            textAlign: "center",
            marginTop: "40px",
            lineHeight: 1.5,
            paddingRight: 20,
            paddingLeft: 20,
            fontWeight: 900,
          }}
        >
          <Text>
            POZOR !!! TOTO NENÍ DAŇOVÝ DOKLAD, POUZE VÝZVA K ÚHRADĚ !!!
          </Text>
          <Text>
            Daňový doklad bude vystaven při akreditaci družstva do turnaje v
            kanceláři organizátora akce.
          </Text>
          <Text>
            Družstvo bude zaregistrováno do turnaje až po zaplacení účastnického
            poplatku.
          </Text>
        </View>
        <View
          style={{
            fontSize: 9,
            textAlign: "center",
            position: "absolute",
            bottom: "20px",
            width: "100%",
          }}
        >
          <Text>
            BK Klatovy, Voříškova 715, 339 01 Klatovy | www.basketbal-klatovy.cz
            | www.eastercupklatovy.cz
          </Text>
        </View>
      </Page>
    </Document>
  );
}

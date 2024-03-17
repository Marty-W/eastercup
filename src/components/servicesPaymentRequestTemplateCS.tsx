import {
  BANK_ACCOUNT_NUMBER_CZK,
  BANK_ACCOUNT_IBAN_CZK,
  BANK_ACCOUNT_SWIFT,
} from "@/lib/conts";
import { type AccountItem } from "@/lib/types";
import {
  View,
  StyleSheet,
  Document,
  Page,
  Text,
  Font,
} from "@react-pdf/renderer";
import { format } from "date-fns";
import path from "path";

const Roboto = path.join(process.cwd(), "fonts", "Roboto.ttf");
const RobotoBold = path.join(process.cwd(), "fonts", "RobotoBold.ttf");

Font.register({
  family: "Roboto",
  fonts: [
    {
      src: Roboto,
      fontWeight: 400,
    },
    {
      src: RobotoBold,
      fontWeight: 700,
    },
  ],
});

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
  currency: string;
  totalInvoicePrice: string;
  accountItems: AccountItem[];
}

export default function ServicesPaymentRequestTemplateCS({
  billing: { companyName, address, zip, city, ic, dic },
  teamName,
  email,
  contactPerson,
  phoneNumber,
  invoiceVarSymbol,
  accountItems,
  currency,
  totalInvoicePrice,
}: Props) {
  const today = new Date();

  const SEPARATOR_COLOR = "#1B1B1E";

  const currencySymbol = currency === "czk" ? "Kč" : "€";

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
            {dic && <Text>DIČ: {dic}</Text>}
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
            marginTop: "4px",
            marginBottom: "4px",
          }}
        >
          <View style={{ flex: 3 }}>
            <Text>Popis položky</Text>
          </View>
          <View style={{ flex: 1, textAlign: "right" }}>
            <Text>MJ</Text>
          </View>
          <View style={{ flex: 2, textAlign: "right" }}>
            <Text>Cena za MJ s DPH</Text>
          </View>
          <View style={{ flex: 2, textAlign: "right" }}>
            <Text>Celkem bez DPH</Text>
          </View>
          <View style={{ flex: 1, textAlign: "right" }}>
            <Text>Sazba DPH</Text>
          </View>
          <View style={{ flex: 2, textAlign: "right" }}>
            <Text>DPH</Text>
          </View>
          <View style={{ flex: 2, textAlign: "right" }}>
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
        {accountItems.map((item) => {
          return (
            <View
              key={item.text}
              style={{
                fontSize: 9,
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={{ flex: 3 }}>
                <Text>{item.text}</Text>
              </View>
              <View style={{ flex: 1, textAlign: "right" }}>
                <Text>{item.quantity}</Text>
              </View>
              <View style={{ flex: 2, textAlign: "right" }}>
                {item.unitPrice && (
                  <Text>
                    {item.unitPrice} {currencySymbol}
                  </Text>
                )}
              </View>
              <View style={{ flex: 2, textAlign: "right" }}>
                <Text>
                  {item.priceWithoutDPH.toFixed()} {currencySymbol}
                </Text>
              </View>
              <View style={{ flex: 1, textAlign: "right" }}>
                <Text>{item.dphRate}%</Text>
              </View>
              <View style={{ flex: 2, textAlign: "right" }}>
                <Text>
                  {item.dph.toFixed(2)} {currencySymbol}
                </Text>
              </View>
              <View style={{ flex: 2, textAlign: "right" }}>
                <Text>
                  {item.priceWithDPH.toFixed(2)} {currencySymbol}
                </Text>
              </View>
            </View>
          );
        })}
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
          <Text>{`Celkem k úhradě: ${totalInvoicePrice} ${
            currency === "czk" ? "Kč" : "€"
          }`}</Text>
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

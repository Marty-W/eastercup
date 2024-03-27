import {
  BANK_ACCOUNT_NUMBER_CZK,
  BANK_ACCOUNT_IBAN_CZK,
  BANK_ACCOUNT_SWIFT,
  BANK_ACCOUNT_NUMBER_EUR,
  BANK_ACCOUNT_IBAN_EUR,
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
    { src: Roboto, fontWeight: 400 },
    { src: RobotoBold, fontWeight: 700 },
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
    paddingHorizontal: 10,
    paddingTop: 20,
    textAlign: "center",
    fontSize: 16,
    fontWeight: 700,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: "5px",
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
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  sectionHeader: {
    textDecoration: "underline",
    fontWeight: "bold",
    marginBottom: 5,
  },
  separator: {
    width: "100%",
    backgroundColor: "#1B1B1E",
    height: "1px",
    marginBottom: "2px",
    marginTop: "2px",
  },
  lightSeparator: {
    width: "100%",
    backgroundColor: "#858585",
    height: "1px",
    marginBottom: "2px",
    marginTop: "2px",
  },
  doubleSeparator: {
    width: "100%",
    backgroundColor: "#858585",
    height: "1px",
    marginBottom: "1px",
  },
  itemRow: {
    fontSize: 9,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: "2px",
    paddingTop: "2px",
    paddingBottom: "2px",
  },
  totalDueBox: {
    position: "absolute", // Explicitní nastavení pro absolutní pozicování
    bottom: 120, // Přesun na spodní část stránky (změňte dle potřeby)
    right: 40, // Přesun vůči pravé straně (změňte dle potřeby)
    fontSize: 11,
    display: "flex",
    flexDirection: "row", // Zarovnání obsahu vedle sebe
    justifyContent: "flex-end", // Zarovnání obsahu na konec (vpravo)
    width: "60%", // Šířka boxu (změňte dle potřeby)
  },
  footer: {
    fontSize: 9,
    textAlign: "center",
    position: "absolute",
    bottom: "20px",
    width: "100%",
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
  paidInAdvance: number;
  receiptText?: string;
}

export default function FinalInvoiceTemplateCS({
  billing: { companyName, address, zip, city, ic, dic },
  teamName,
  email,
  contactPerson,
  phoneNumber,
  invoiceVarSymbol,
  currency,
  totalInvoicePrice,
  paidInAdvance,
  accountItems,
  receiptText,
}: Props) {
  const today = new Date();

  const currencySymbol = currency === "czk" ? "Kč" : "€";

  const totalWithoutDPH = accountItems.reduce((acc, item) => {
    return acc + item.priceWithoutDPH;
  }, 0);

  const totalDPH = accountItems.reduce((acc, item) => {
    return acc + item.dph;
  }, 0);

  const totalWithDPH = accountItems.reduce((acc, item) => {
    return acc + item.priceWithDPH;
  }, 0);

  const totalDelta = totalWithDPH + paidInAdvance;

  return (
    <Document pageMode="fullScreen" pageLayout="singlePage">
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text>Faktura {`${invoiceVarSymbol}#`}</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.headerRow}>
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
        <View style={styles.lightSeparator} />
        <View style={styles.headerRow}>
          <View style={styles.sectionLeft}>
            <Text>
              Číslo účtu:
              {currency === "eur"
                ? BANK_ACCOUNT_NUMBER_EUR
                : BANK_ACCOUNT_NUMBER_CZK}
            </Text>
            <Text>
              IBAN:
              {currency === "eur"
                ? BANK_ACCOUNT_IBAN_EUR
                : BANK_ACCOUNT_IBAN_CZK}
            </Text>
            <Text>SWIFT: {BANK_ACCOUNT_SWIFT}</Text>
            <Text>Variabilní symbol: {invoiceVarSymbol}</Text>
            <Text>Datum vystavení: {format(today, "dd.M.yyyy")}</Text>
            <Text>DUZP: {format(today, "dd.M.yyyy")}</Text>
          </View>
          <View style={styles.sectionRight}>
            <Text>Název týmu: {teamName}</Text>
            <Text>Email: {email}</Text>
            <Text>Kontaktní osoba: {contactPerson}</Text>
            <Text>Telefon: {phoneNumber}</Text>
          </View>
        </View>
        <View style={styles.doubleSeparator} />
        <View style={styles.doubleSeparator} />
        <View
          style={{
            fontSize: 9,
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: "10px",
            marginBottom: "4px",
            paddingHorizontal: "2px",
          }}
        >
          <View style={{ flex: 3, textAlign: "left" }}>
            <Text>Popis položky</Text>
          </View>
          <View style={{ flex: 1, textAlign: "center" }}>
            <Text>MJ</Text>
          </View>
          <View style={{ flex: 1, textAlign: "center" }}>
            <Text>Cena za MJ</Text>
            <Text>(s DPH)</Text>
          </View>
          <View style={{ flex: 2, textAlign: "center" }}>
            <Text>Celkem</Text>
            <Text>(bez DPH)</Text>
          </View>
          <View style={{ flex: 1, textAlign: "center" }}>
            <Text>Sazba DPH</Text>
          </View>
          <View style={{ flex: 1, textAlign: "center" }}>
            <Text>DPH</Text>
          </View>
          <View style={{ flex: 2, textAlign: "right" }}>
            <Text>Cena celkem</Text>
            <Text>(včetně DPH)</Text>
          </View>
        </View>
        <View style={styles.separator} />
        <View style={{ marginBottom: "10px", marginTop: "10px" }}>
          {accountItems.map((item, index) => (
            <View key={index} style={styles.itemRow}>
              <Text style={{ flex: 3, textAlign: "left" }}>{item.text}</Text>
              <Text style={{ flex: 1, textAlign: "center" }}>
                {item.quantity}
              </Text>
              <Text style={{ flex: 1, textAlign: "center" }}>
                {item.unitPrice
                  ? `${item.unitPrice.toFixed(2)} ${currencySymbol}`
                  : ``}
              </Text>
              <Text style={{ flex: 2, textAlign: "center" }}>
                {item.priceWithoutDPH.toFixed(2)} {currencySymbol}
              </Text>
              <Text style={{ flex: 1, textAlign: "center" }}>
                {item.dphRate}%
              </Text>
              <Text style={{ flex: 1, textAlign: "center" }}>
                {item.dph.toFixed(2)} {currencySymbol}
              </Text>
              <Text style={{ flex: 2, textAlign: "right" }}>
                {item.priceWithDPH.toFixed(2)} {currencySymbol}
              </Text>
            </View>
          ))}
        </View>
        <View style={styles.separator} />
        <View style={styles.itemRow}>
          <Text style={{ flex: 3, textAlign: "left" }}>Celkem</Text>
          <Text style={{ flex: 1, textAlign: "center" }}></Text>
          <Text style={{ flex: 1, textAlign: "center" }}></Text>
          <Text style={{ flex: 2, textAlign: "center" }}>
            {totalWithoutDPH.toFixed(2)} {currencySymbol}
          </Text>
          <Text style={{ flex: 1, textAlign: "center" }}></Text>
          <Text style={{ flex: 1, textAlign: "center" }}>
            {totalDPH.toFixed(2)} {currencySymbol}
          </Text>
          <Text style={{ flex: 2, textAlign: "right" }}>
            {totalWithDPH.toFixed(2)} {currencySymbol}
          </Text>
        </View>
        {paidInAdvance !== 0 && (
          <View style={styles.itemRow}>
            <Text style={{ flex: 3, textAlign: "left" }}>Již zaplaceno</Text>
            <Text style={{ flex: 1, textAlign: "center" }}></Text>
            <Text style={{ flex: 1, textAlign: "center" }}></Text>
            <Text style={{ flex: 2, textAlign: "center" }}></Text>
            <Text style={{ flex: 1, textAlign: "center" }}></Text>
            <Text style={{ flex: 1, textAlign: "center" }}></Text>
            <Text style={{ flex: 2, textAlign: "right" }}>
              {paidInAdvance.toFixed(2)} {currencySymbol}
            </Text>
          </View>
        )}
        <View style={styles.itemRow}>
          <Text style={{ flex: 3, textAlign: "left", fontWeight: 700 }}>
            Celkem k úhradě
          </Text>
          <Text style={{ flex: 1, textAlign: "center" }}></Text>
          <Text style={{ flex: 1, textAlign: "center" }}></Text>
          <Text style={{ flex: 2, textAlign: "center" }}></Text>
          <Text style={{ flex: 1, textAlign: "center" }}></Text>
          <Text style={{ flex: 1, textAlign: "center" }}></Text>
          <Text style={{ flex: 2, textAlign: "right", fontWeight: 700 }}>
            {totalDelta.toFixed(2)} {currencySymbol}
          </Text>
        </View>
        <View style={styles.totalDueBox}>
          <Text style={{ fontWeight: 700 }}>Celkem k úhradě</Text>
          <Text style={{ marginLeft: "40px", fontWeight: 700 }}>
            {totalDelta.toFixed(2)} {currencySymbol}
          </Text>
        </View>
        <View style={styles.footer}>
          <Text>
            BK Klatovy, Voříškova 715, 339 01 Klatovy | www.basketbal-klatovy.cz
            | www.eastercupklatovy.cz
          </Text>
        </View>
      </Page>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text>Příjmový pokladní doklad č.</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.headerRow}>
          <View style={styles.sectionLeft}>
            <Text style={styles.sectionHeader}>Příjemce:</Text>
            <Text>BK KLATOVY z.s.</Text>
            <Text>Voříškova 715</Text>
            <Text>33901, Klatovy</Text>
            <Text>IČ: 22850490</Text>
            <Text>DIČ: CZ22850490</Text>
          </View>
          <View style={styles.sectionRight}>
            <Text style={styles.sectionHeader}>Přijato od:</Text>
            <Text>{companyName}</Text>
            <Text>{address}</Text>
            <Text>
              {zip}, {city}
            </Text>
            <Text>IČ: {ic}</Text>
            {dic && <Text>DIČ: {dic}</Text>}
          </View>
        </View>
        <View style={styles.lightSeparator} />
        <View
          style={{
            fontSize: 9,
            paddingVertical: "5px",
            lineHeight: 1.5,
          }}
        >
          <Text>Datum vystavení: {format(today, "dd.M.yyyy")}</Text>
          <Text>Datum platby: {format(today, "dd.M.yyyy")}</Text>
        </View>
        <View style={styles.doubleSeparator} />
        <View style={styles.doubleSeparator} />
        <View
          style={{
            fontSize: 12,
            paddingVertical: "8px",
            lineHeight: 1.5,
          }}
        >
          <Text>Text: {receiptText}</Text>
        </View>
        <View style={styles.lightSeparator} />
        <View style={{ width: "30%", marginLeft: "auto", marginTop: "40px" }}>
          <View
            style={{
              fontSize: 11,
              display: "flex",
              flexDirection: "row", // Zarovnání obsahu vedle sebe
              justifyContent: "flex-end", // Zarovnání obsahu na konec (vpravo)
              width: "80%", // Šířka boxu (změňte dle potřeby)
            }}
          >
            <Text style={{ fontWeight: 700 }}>Celkem</Text>
            <Text style={{ marginLeft: "40px", fontWeight: 700 }}>
              {totalDelta.toFixed(2)} {currencySymbol}
            </Text>
          </View>
          <View style={styles.separator} />
        </View>
        <View
          style={{
            fontSize: 9,
            marginTop: "40px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text>Podpis pokladníka:</Text>
          <Text style={{ marginRight: "200px" }}>Podpis plátce:</Text>
        </View>
        <View style={styles.footer}>
          <Text>
            BK Klatovy, Voříškova 715, 339 01 Klatovy | www.basketbal-klatovy.cz
            | www.eastercupklatovy.cz
          </Text>
        </View>
      </Page>
    </Document>
  );
}

import {
  BANK_ACCOUNT_NUMBER_EUR,
  BANK_ACCOUNT_IBAN_EUR,
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
      src: "https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Me5Q.ttf",
      fontWeight: 400,
    },
    {
      src: "https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmWUlvAw.ttf",
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

export default function ServicesPaymentRequestTemplateEN({
  billing: { companyName, address, zip, city, ic, dic },
  teamName,
  email,
  contactPerson,
  phoneNumber,
  invoiceVarSymbol,
  currency,
  totalInvoicePrice,
  accountItems,
}: Props) {
  const today = new Date();

  const SEPARATOR_COLOR = "#1B1B1E";

  return (
    <Document pageMode="fullScreen" pageLayout="singlePage">
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text>Payment request</Text>
        </View>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={styles.sectionLeft}>
            <Text style={styles.sectionHeader}>SUPPLIER:</Text>
            <Text>BK KLATOVY z.s.</Text>
            <Text>Voříškova 715</Text>
            <Text>33901, Klatovy</Text>
            <Text>ID: 22850490</Text>
            <Text>VAT ID: CZ22850490</Text>
          </View>
          <View style={styles.sectionRight}>
            <Text style={styles.sectionHeader}>CUSTOMER:</Text>
            <Text>{companyName}</Text>
            <Text>{address}</Text>
            <Text>
              {zip}, {city}
            </Text>
            <Text>ID: {ic}</Text>
            {dic && <Text>VAT ID: {dic}</Text>}
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
            <Text>Bank account: {BANK_ACCOUNT_NUMBER_EUR}</Text>
            <Text>IBAN: {BANK_ACCOUNT_IBAN_EUR}</Text>
            <Text>SWIFT: {BANK_ACCOUNT_SWIFT}</Text>
            <Text>Var. symbol: {invoiceVarSymbol}</Text>
            <Text>Issue date: {format(today, "dd/MM/yyyy")}</Text>
          </View>
          <View style={styles.sectionRight}>
            <Text>Team name: {teamName}</Text>
            <Text>Email: {email}</Text>
            <Text>Contact person: {contactPerson}</Text>
            <Text>Phone number: {phoneNumber}</Text>
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
            paddingHorizontal: "2px",
          }}
        >
          <View style={{ flex: 3, textAlign: "left" }}>
            <Text>Item Description</Text>
          </View>
          <View style={{ flex: 1, textAlign: "center" }}>
            <Text>QTY</Text>
          </View>
          <View style={{ flex: 1, textAlign: "center" }}>
            <Text>Unit price</Text>
            <Text>(VAT incl.)</Text>
          </View>
          <View style={{ flex: 2, textAlign: "center" }}>
            <Text>Total</Text>
            <Text>(w/o VAT)</Text>
          </View>
          <View style={{ flex: 1, textAlign: "center" }}>
            <Text>Rate VAT</Text>
          </View>
          <View style={{ flex: 1, textAlign: "center" }}>
            <Text>VAT</Text>
          </View>
          <View style={{ flex: 2, textAlign: "right" }}>
            <Text>Total</Text>
            <Text>(VAT incl.)</Text>
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
                paddingHorizontal: "2px",
              }}
            >
              <View
                style={{ flex: 3, textAlign: "left", paddingVertical: "1px" }}
              >
                <Text>{item.text}</Text>
              </View>
              <View
                style={{ flex: 1, textAlign: "center", paddingVertical: "1px" }}
              >
                <Text>{item.quantity}</Text>
              </View>
              <View
                style={{ flex: 1, textAlign: "center", paddingVertical: "1px" }}
              >
                {item.unitPrice && <Text>{item.unitPrice} €</Text>}
              </View>
              <View
                style={{ flex: 2, textAlign: "center", paddingVertical: "1px" }}
              >
                <Text>{item.priceWithoutDPH.toFixed(2)} €</Text>
              </View>
              <View
                style={{ flex: 1, textAlign: "center", paddingVertical: "1px" }}
              >
                <Text>{item.dphRate}%</Text>
              </View>
              <View
                style={{ flex: 1, textAlign: "center", paddingVertical: "1px" }}
              >
                <Text>{item.dph.toFixed(2)} €</Text>
              </View>
              <View
                style={{ flex: 2, textAlign: "right", paddingVertical: "1px" }}
              >
                <Text>{item.priceWithDPH.toFixed(2)} €</Text>
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
          <Text>{`Total price: ${totalInvoicePrice} ${
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
            ATTENTION! This is not a tax document, only a payment request!
          </Text>
          <Text>
            The tax document will be issued upon the accreditation of the team
            into the tournament at the event organizer&apos;s office.
          </Text>

          <Text>
            The team will be registered for the tournament only after the
            participation fee has been paid.
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

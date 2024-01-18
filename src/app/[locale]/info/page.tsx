import Image from "next/image";
import Link from "next/link";
import InfoHero from "public/info/hero.png";
import TshirtsImage from "public/info/tshirts.png";
import People from "public/info/people.png";
import Klatovy1 from "public/info/klatovy_1.jpeg";
import Klatovy2 from "public/info/klatovy_2.jpeg";
import Klatovy3 from "public/info/klatovy_3.jpeg";
import InfoSection from "@/components/ui/infoSection";
import { getCurrentLocale, getScopedI18n } from "locales/server";

export default async function InformationPage() {
  const t = await getScopedI18n("info");
  const curLocale = getCurrentLocale();
  return (
    <div className="container space-y-3 pb-8 font-display">
      <div>
        <h2 className="mx-auto w-fit border-2 border-brand-blue px-6 py-4 text-center text-2xl font-bold uppercase leading-5 text-brand-blue">
          {t("header")}
        </h2>
        {/* TODO: figure out spacing, maybe set a padding on the navbar or somethingV */}
        <Image src={InfoHero} alt="Hero" className="my-6" />
      </div>
      <InfoSection header={t("categories.header")}>
        <div className="space-y-1 text-xs">
          <p className="font-bold">{t("categories.subheader1")}</p>
          <p>{t("categories.mini.category1")}</p>
          <p>{t("categories.mini.category2")}</p>
          <p>{t("categories.mini.category3")}</p>
          <p>{t("categories.mini.category4")}</p>
        </div>
        <div className="space-y-1 text-xs">
          <p className="font-bold">{t("categories.subheader2")}</p>
          <p>{t("categories.normal.category1")}</p>
          <p>{t("categories.normal.category2")}</p>
          <p>{t("categories.normal.category3")}</p>
          <p>{t("categories.normal.category4")}</p>
        </div>
      </InfoSection>
      <InfoSection header={t("term.header")}>
        <div className="space-y-1 text-xs">
          <p className="font-bold">{t("term.date")}</p>
        </div>
      </InfoSection>
      <InfoSection header={t("place.header")}>
        <div className="space-y-1 text-xs">
          <p>{t("place.place1")}</p>
          <p>{t("place.place2")}</p>
          <p>{t("place.place3")}</p>
          <p>{t("place.place4")}</p>
          <p>{t("place.place5")}</p>
          <p>{t("place.place6")}</p>
          <p>{t("place.place7")}</p>
          <p>{t("place.place8")}</p>
        </div>
      </InfoSection>
      <InfoSection header={t("fee.header")}>
        <div className="space-y-1 text-xs">
          <p>{t("fee.text")}</p>
        </div>
      </InfoSection>
      <InfoSection header={t("system.header")}>
        <div className="space-y-1 text-xs">
          <p>{t("system.text")}</p>
        </div>
      </InfoSection>
      <InfoSection header={t("rules.header")}>
        <div className="space-y-1 text-xs">
          <p>{t("rules.text")}</p>
        </div>
      </InfoSection>
      <InfoSection header={t("prizes.header")}>
        <div className="space-y-1 text-xs">
          <p>{t("prizes.text")}</p>
        </div>
      </InfoSection>
      <InfoSection header={t("tshirts.header")}>
        <div className="">
          <Image src={TshirtsImage} alt="Tshirts" />
        </div>
      </InfoSection>
      <InfoSection header={t("registration.header")}>
        <Link href="/form/info" className="text-xs text-brand-blue">
          {t("registration.text")}
        </Link>
      </InfoSection>
      <InfoSection header={t("contact.header")}>
        <div className="space-y-2 text-xs">
          <div className="space-y-1">
            <p>
              <span className="mr-1 font-bold">email:</span>
              info@eastercupklatovy.cz
            </p>
            <p>
              <span className="mr-1 font-bold">web:</span>
              <Link href="https://eastercupklatovy.cz" target="_blank">
                www.eastercupklatovy.cz
              </Link>
            </p>
            <p>
              <span className="mr-1 inline-block font-bold">facebook:</span>
              www.facebook.com/EasterCupKlatovy
            </p>
          </div>
          <p>{t("contact.text")}</p>
        </div>
      </InfoSection>
      {curLocale === "cs" && (
        <InfoSection header="Pravidla turnaje">
          <ol className="list-inside list-decimal space-y-2 text-xs font-bold">
            <li className="space-y-1">
              <p className="font-normal">Turnaj je vyhlášen pro kategorie:</p>
              <p className="font-normal">
                U11 dívky, chlapci a mix (nar. 1. 1. 2014 a mladší)
              </p>
              <p className="font-normal">
                U12 dívky, chlapci a mix (nar. 1. 1. 2013 a mladší)
              </p>
              <p className="font-normal">
                U14 dívky a chlapci (nar. 1. 1. 2011 a mladší)
              </p>
              <p className="font-normal">
                U16 dívky a chlapci (nar. 1. 1. 2009 a mladší)
              </p>
            </li>
            <li>
              <p className="font-normal">
                Každé družstvo je složeno z maximálně 15 hráčů, v kategorii U15
                z maximálně 12 hráčů
              </p>
            </li>
            <li>
              <p className="font-normal">
                Kategorie U11 a U12 hrají s míčem velikosti 5, dívky U14 a U15 s
                míčem vel. 6 a chlapci U14 a U15 s míčem vel. 7
              </p>
            </li>
            <li>
              <p className="font-normal">
                Výška košů v kategoriích U11 a U12 je 260 cm, v kategoriích U14
                a U15 je výška koše 305 cm
              </p>
            </li>
            <li>
              <p className="font-normal">
                Každý účastník je povinen na vyžádání předložit doklad
                totožnosti pro ověření věku. Nutné je foto a datum narození
              </p>
            </li>
            <li>
              <div className="font-normal">
                <p>
                  Hraje se podle platných pravidel basketbalu a minibasketbalu
                  pro sezónu 2023/2024 s těmito změnami:
                </p>
                <div className="space-y-1">
                  <p>
                    – v kategoriích U11 a U12 se hraje 4x8 minut hrubého času,
                    čas se zastavuje pouze při oddechovém čase
                  </p>
                  <p>
                    – v kategorie U15 a U14 se hraje 4x8 minut čistého času –
                    oddechový čas je 60 sec., družstvo má v 1. poločase k
                    dispozici 1 oddechový čas, ve 2. poločase 2 oddechové časy a
                    v prodloužení 1 oddechový čas
                  </p>
                  <p>
                    – všechny přestávky mezi čtvrtinami a před prodloužením jsou
                    2 minuty, poločasová přestávka je 5 minut
                  </p>
                  <p>– povinné střídání hráče nastává při 4 faulech</p>
                  <p>
                    – v případě nerozhodného stavu se prodloužení hraje 3 minuty
                    čistého času. Pokud nebude ani po prodloužení rozhodnuto,
                    přijde na řadu střelba trestných hodů (3 série) a poté po
                    jednom až do úplného rozhodnutí
                  </p>
                  <p>
                    – při rovnosti bodů ve skupinách rozhodují následující
                    kritéria: 1. vzájemný zápas, 2. rozdíl skóre, 3. vyšší počet
                    vstřelených bodů, 4. menší počet obdržených bodů 5. rozstřel
                    – – šestky
                  </p>
                  <p>
                    – každý tým musí být přítomen nejméně 5 minut před začátkem
                    každého utkání. Nedodržení tohoto pravidla bude potrestáno 5
                    body pro tým soupeře
                  </p>
                  <p>
                    – v kategorii U11 a U12 platí pravidlo obranných 3 vteřin
                  </p>
                  <p>
                    – v kategorii U11 a U12 smí každý hráč nastoupit pouze ve 2
                    čtvrtinách
                  </p>
                  <p>– v kategorii U11 a U12 nesmí hráči clonit</p>
                  <p>– v kategorii U11 a U12 neplatí tříbodové koše</p>
                </div>
              </div>
            </li>
            <li>
              <p className="font-normal">
                Každý tým je oprávněný podat protest proti výsledku zápasu nebo
                řízení hry organizačnímu výboru, a to nejpozději 10 minut po
                skončení zápasu společně s kaucí 500 Kč (20 EUR). V případě
                zamítnutí kauce propadá ve prospěch organizátora.
              </p>
            </li>
            <li>
              <p className="font-normal">
                Pořadatel nemá hmotnou zodpovědnost za majetek hráčů a trenérů.
                Všechny týmy jsou povinné dbát na své věci tak, aby předcházeli
                případným krádežím
              </p>
            </li>
            <li>
              <p className="font-normal">
                Rozlosování turnaje proběhne po uzávěrce přihlášek a bude
                zasláno společně s hracím systémem na adresu uvedenou v
                přihlášce
              </p>
            </li>
            <li>
              <p className="font-normal">
                Každý tým se rozcvičuje s vlastními míči. Pořadatel zajišťuje
                pouze hrací míče.
              </p>
            </li>
          </ol>
        </InfoSection>
      )}
      <Image src={People} alt="People" />
      <InfoSection header={t("accomodation.header")}>
        <div className="space-y-1 text-xs">
          <div className="space-y-2">
            <div>
              <h4 className="font-bold">{t("accomodation.hotel.header")}</h4>
              {curLocale === "cs" ? (
                <p>- 2–3 lůžkové pokoje</p>
              ) : (
                <>
                  <p>– price based on hotel</p>
                  <p>– starting from 34 EUR per person and night</p>
                </>
              )}
            </div>
            <div>
              <h4 className="font-bold">{t("accomodation.pension.header")}</h4>
              {curLocale === "cs" ? (
                <p>- 2–3 lůžkové pokoje</p>
              ) : (
                <p>– price from 26 EUR per person/night</p>
              )}
            </div>
            <div>
              <h4 className="font-bold">{t("accomodation.hostel.header")}</h4>
              {curLocale === "cs" ? (
                <p>- 2–3 lůžkové pokoje</p>
              ) : (
                <p>– price from 19 EUR per person/night</p>
              )}
            </div>
            <div>
              <h4 className="font-bold">{t("accomodation.school.header")}</h4>
              {curLocale === "cs" ? (
                <p>– na karimatce ve vlastním spacáku</p>
              ) : (
                <>
                  <p>– own sleepig bags and pads</p>
                  <p>– price 7 EUR per person and night</p>
                </>
              )}
            </div>
          </div>
          <div>
            <p>{t("accomodation.text")}</p>
          </div>
          <div>
            <p className="font-bold">{t("accomodation.storno.header")}</p>
            <p>{t("accomodation.storno.text1")}</p>
            <p>{t("accomodation.storno.text2")}</p>
            <p>{t("accomodation.storno.text3")}</p>
          </div>
        </div>
      </InfoSection>
      <InfoSection header={t("catering.header")}>
        <div className="space-y-2 text-xs">
          <p>{t("catering.text")}</p>
          {curLocale === "en" && (
            <div>
              <p>
                breakfast – 5 EUR (rich buffet tables including fruit and
                vegetables)
              </p>
              <p>lunch – 8 EUR (soup, main course, fruit or vegetable salad)</p>
              <p>dinner – 6,5 EUR (the hot meal + fruit)</p>
            </div>
          )}
          <div>
            <p className="font-bold">{t("catering.place1.header")}</p>
            <p>{t("catering.place1.text")}</p>
          </div>
          <div>
            <p className="font-bold">{t("catering.place2.header")}</p>
            <p>{t("catering.place2.header")}</p>
          </div>
        </div>
      </InfoSection>
      <InfoSection header={t("city.header")}>
        <div className="space-y-2 text-xs">
          <p>{t("city.text1")}</p>
          <p>{t("city.text2")}</p>
          <p>{t("city.text3")}</p>
          <p>{t("city.text4")}</p>
        </div>
      </InfoSection>
      <div className="flex flex-col space-y-1">
        <Image src={Klatovy1} alt="Image from the city of Klatovy" />
        <Image src={Klatovy2} alt="Image from the city of Klatovy" />
        <Image src={Klatovy3} alt="Image from the city of Klatovy" />
      </div>
    </div>
  );
}

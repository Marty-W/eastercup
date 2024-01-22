import Image from "next/image";
import Link from "next/link";
import InfoHero from "public/info/hero.png";
import TshirtsImage from "public/info/tshirts.png";
import People from "public/info/people.png";
import Klatovy1 from "public/info/klatovy_1.jpeg";
import Klatovy2 from "public/info/klatovy_2.jpeg";
import Klatovy3 from "public/info/klatovy_3.jpeg";
import { InfoSection, InfoSubsection } from "@/components/ui/infoSection";
import { getCurrentLocale, getScopedI18n } from "locales/server";

export default async function InformationPage() {
  const t = await getScopedI18n("info");
  const curLocale = getCurrentLocale();
  return (
    <div className="container space-y-6 pb-8 font-display lg:px-8">
      <div>
        <div className="lg:py-8">
          <h2 className="mx-auto w-fit border-2 border-brand-blue px-6 py-4 text-center text-2xl font-bold uppercase leading-5 text-brand-blue lg:text-4xl">
            {t("header")}
          </h2>
        </div>
        <Image src={InfoHero} alt="Hero" className="my-6" />
      </div>
      <InfoSection header={t("categories.header")}>
        <div className="space-y-3 lg:flex lg:justify-between lg:space-y-0 lg:pr-4">
          <InfoSubsection>
            <p className="font-bold">{t("categories.subheader1")}</p>
            <p>{t("categories.mini.category1")}</p>
            <p>{t("categories.mini.category2")}</p>
            <p>{t("categories.mini.category3")}</p>
            <p>{t("categories.mini.category4")}</p>
          </InfoSubsection>
          <InfoSubsection>
            <p className="font-bold">{t("categories.subheader2")}</p>
            <p>{t("categories.normal.category1")}</p>
            <p>{t("categories.normal.category2")}</p>
            <p>{t("categories.normal.category3")}</p>
            <p>{t("categories.normal.category4")}</p>
          </InfoSubsection>
        </div>
      </InfoSection>
      <InfoSection
        header={t("term.header")}
        className="flex items-center space-x-3 space-y-0 lg:space-x-0"
      >
        <p className="font-bold">{t("term.date")}</p>
      </InfoSection>
      <InfoSection header={t("place.header")}>
        <InfoSubsection>
          <p>{t("place.place1")}</p>
          <p>{t("place.place2")}</p>
          <p>{t("place.place3")}</p>
          <p>{t("place.place4")}</p>
          <p>{t("place.place5")}</p>
          <p>{t("place.place6")}</p>
          <p>{t("place.place7")}</p>
          <p>{t("place.place8")}</p>
        </InfoSubsection>
      </InfoSection>
      <InfoSection header={t("fee.header")}>
        <p className="lg:leading-5">{t("fee.text")}</p>
      </InfoSection>
      <InfoSection header={t("system.header")}>
        <p className="lg:leading-5">{t("system.text")}</p>
      </InfoSection>
      <InfoSection header={t("rules.header")}>
        <p className="lg:leading-5">{t("rules.text")}</p>
      </InfoSection>
      <InfoSection header={t("prizes.header")}>
        <p className="lg:leading-5">{t("prizes.text")}</p>
      </InfoSection>
      <InfoSection header={t("tshirts.header")}>
        <div className="">
          <Image src={TshirtsImage} alt="Tshirts" />
        </div>
      </InfoSection>

      {/* TODO: add back when we have registration ready */}
      {/* <InfoSection header={t("registration.header")}> */}
      {/*   <Link href="/form/info" className="text-brand-blue"> */}
      {/*     {t("registration.text")} */}
      {/*   </Link> */}
      {/* </InfoSection> */}
      <InfoSection header={t("contact.header")}>
        <div className="mb-4 space-y-1">
          <p>
            <span className="mr-1 font-bold">email:</span>
            info@eastercupklatovy.cz
          </p>
          <p>
            <span className="mr-1 font-bold">web:</span>
            <Link href="https://eastercupklatovy.cz" target="_blank">
              eastercupklatovy.cz
            </Link>
          </p>
          <div>
            <span className="mr-1 block font-bold md:inline-block">
              facebook:
            </span>
            <Link href="https://facebook.com/EasterCupKlatovy" target="_blank">
              facebook.com/EasterCupKlatovy
            </Link>
          </div>
        </div>
        <p className="lg:leading-5">{t("contact.text")}</p>
      </InfoSection>
      {curLocale === "cs" && (
        <InfoSection header="Pravidla turnaje">
          <ol className="list-inside list-decimal space-y-2 text-xs marker:inline marker:font-bold">
            <li className="space-y-1">
              <span>Turnaj je vyhlášen pro kategorie:</span>
              <p>U11 dívky, chlapci a mix (nar. 1. 1. 2014 a mladší)</p>
              <p>U12 dívky, chlapci a mix (nar. 1. 1. 2013 a mladší)</p>
              <p>U14 dívky a chlapci (nar. 1. 1. 2011 a mladší)</p>
              <p>U16 dívky a chlapci (nar. 1. 1. 2009 a mladší)</p>
            </li>
            <li>
              <span>
                Každé družstvo je složeno z maximálně 15 hráčů, v kategorii U15
                z maximálně 12 hráčů
              </span>
            </li>
            <li>
              <span>
                Kategorie U11 a U12 hrají s míčem velikosti 5, dívky U14 a U15 s
                míčem vel. 6 a chlapci U14 a U15 s míčem vel. 7
              </span>
            </li>
            <li>
              <span>
                Výška košů v kategoriích U11 a U12 je 260 cm, v kategoriích U14
                a U15 je výška koše 305 cm
              </span>
            </li>
            <li>
              <span>
                Každý účastník je povinen na vyžádání předložit doklad
                totožnosti pro ověření věku. Nutné je foto a datum narození
              </span>
            </li>
            <li>
              <span>
                Hraje se podle platných pravidel basketbalu a minibasketbalu pro
                sezónu 2023/2024 s těmito změnami:
              </span>
              <div className="space-y-1">
                <p>
                  – v kategoriích U11 a U12 se hraje 4x8 minut hrubého času, čas
                  se zastavuje pouze při oddechovém čase
                </p>
                <p>
                  – v kategorie U15 a U14 se hraje 4x8 minut čistého času –
                  oddechový čas je 60 sec., družstvo má v 1. poločase k
                  dispozici 1 oddechový čas, ve 2. poločase 2 oddechové časy a v
                  prodloužení 1 oddechový čas
                </p>
                <p>
                  – všechny přestávky mezi čtvrtinami a před prodloužením jsou 2
                  minuty, poločasová přestávka je 5 minut
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
                  vstřelených bodů, 4. menší počet obdržených bodů 5. rozstřel –
                  – šestky
                </p>
                <p>
                  – každý tým musí být přítomen nejméně 5 minut před začátkem
                  každého utkání. Nedodržení tohoto pravidla bude potrestáno 5
                  body pro tým soupeře
                </p>
                <p>– v kategorii U11 a U12 platí pravidlo obranných 3 vteřin</p>
                <p>
                  – v kategorii U11 a U12 smí každý hráč nastoupit pouze ve 2
                  čtvrtinách
                </p>
                <p>– v kategorii U11 a U12 nesmí hráči clonit</p>
                <p>– v kategorii U11 a U12 neplatí tříbodové koše</p>
              </div>
            </li>
            <li>
              <span>
                Každý tým je oprávněný podat protest proti výsledku zápasu nebo
                řízení hry organizačnímu výboru, a to nejpozději 10 minut po
                skončení zápasu společně s kaucí 500 Kč (20 EUR). V případě
                zamítnutí kauce propadá ve prospěch organizátora.
              </span>
            </li>
            <li>
              <span>
                Pořadatel nemá hmotnou zodpovědnost za majetek hráčů a trenérů.
                Všechny týmy jsou povinné dbát na své věci tak, aby předcházeli
                případným krádežím
              </span>
            </li>
            <li>
              <span>
                Rozlosování turnaje proběhne po uzávěrce přihlášek a bude
                zasláno společně s hracím systémem na adresu uvedenou v
                přihlášce
              </span>
            </li>
            <li>
              <span>
                Každý tým se rozcvičuje s vlastními míči. Pořadatel zajišťuje
                pouze hrací míče.
              </span>
            </li>
          </ol>
        </InfoSection>
      )}
      <InfoSection subSectionClassName="lg:col-start-2">
        <Image
          src={People}
          alt="People"
          className="mx-auto block w-full max-w-screen-md py-8"
        />
      </InfoSection>
      <InfoSection header={t("accomodation.header")}>
        <InfoSubsection>
          <div className="space-y-2 lg:grid lg:grid-cols-2 lg:grid-rows-2">
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
          <div className="lg:py-4">
            <p>{t("accomodation.text")}</p>
          </div>
          <div className="pt-6 lg:pt-0 lg:leading-5">
            <p className="font-bold">{t("accomodation.storno.header")}</p>
            <p>{t("accomodation.storno.text1")}</p>
            <p>{t("accomodation.storno.text2")}</p>
            <p>{t("accomodation.storno.text3")}</p>
          </div>
        </InfoSubsection>
      </InfoSection>
      <InfoSection header={t("catering.header")}>
        <InfoSubsection>
          <p className="lg:leading-5">{t("catering.text")}</p>
          {curLocale === "en" && (
            <div className="lg:leading-5">
              <p>
                breakfast – 5 EUR (rich buffet tables including fruit and
                vegetables)
              </p>
              <p>lunch – 8 EUR (soup, main course, fruit or vegetable salad)</p>
              <p>dinner – 6,5 EUR (the hot meal + fruit)</p>
            </div>
          )}
          <div className="space-y-2 lg:grid lg:grid-cols-2 lg:space-y-0">
            <div className="flex-col lg:flex lg:space-y-1">
              <p className="font-bold">{t("catering.place1.header")}</p>
              <p>{t("catering.place1.text")}</p>
            </div>
            <div className="lg:flex lg:flex-col lg:space-y-1">
              <p className="font-bold">{t("catering.place2.header")}</p>
              <p>{t("catering.place2.text")}</p>
            </div>
          </div>
        </InfoSubsection>
      </InfoSection>
      <InfoSection header={t("city.header")}>
        <InfoSubsection className="space-y-4 lg:space-y-7 lg:leading-5">
          <p>{t("city.text1")}</p>
          <p>{t("city.text2")}</p>
          <p>{t("city.text3")}</p>
          <p>{t("city.text4")}</p>
        </InfoSubsection>
      </InfoSection>
      <div className="lg:grid lg:grid-cols-[0.6fr_2fr] lg:gap-x-1">
        <div className="flex flex-col space-y-1 lg:col-start-2 lg:grid lg:grid-cols-3 lg:gap-x-1">
          <Image
            src={Klatovy1}
            alt="Image from the city of Klatovy"
            className="mx-auto inline-block w-full max-w-lg lg:max-h-[200px] lg:object-cover"
          />
          <Image
            src={Klatovy2}
            alt="Image from the city of Klatovy"
            className="mx-auto inline-block w-full max-w-lg lg:max-h-[200px] lg:object-cover"
          />
          <Image
            src={Klatovy3}
            alt="Image from the city of Klatovy"
            className="mx-auto inline-block w-full max-w-lg lg:max-h-[200px] lg:object-cover"
          />
        </div>
      </div>
    </div>
  );
}

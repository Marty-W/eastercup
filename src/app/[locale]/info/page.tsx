import Image from "next/image";
import Link from "next/link";
import InfoHero from "public/info/hero.png";
import TshirtsImage from "public/info/tshirts.png";
import People from "public/info/people.png";
import Klatovy1 from "public/info/klatovy_1.jpeg";
import Klatovy2 from "public/info/klatovy_2.jpeg";
import Klatovy3 from "public/info/klatovy_3.jpeg";

export default function InformationPage() {
  return (
    <div className="container space-y-3 pb-8 font-display">
      <div>
        <h2 className="mx-auto w-fit border-2 border-brand-blue px-6 py-4 text-center text-2xl font-bold uppercase leading-5 text-brand-blue">
          Informace
        </h2>
        {/* TODO: figure out spacing, maybe set a padding on the navbar or somethingV */}
        <Image src={InfoHero} alt="Hero" className="my-6" />
      </div>
      <div className="space-y-2">
        <h3 className="text-sm font-bold uppercase text-brand-blue">
          Kategorie
        </h3>
        <div className="space-y-1 text-xs">
          <p className="font-bold">Mini Easter Cup:</p>
          <p>U11 Divky a mix (narozeni 2013 a mladsi)</p>
          <p>U11 CHLAPCI a MIX (narozeni 2013 a mladší)</p>
          <p>U12 DÍVKY (narozené 2012 a mladší)</p>
          <p>U12 CHLAPCI (narození 2012 a mladší)</p>
        </div>
        <div className="space-y-1 text-xs">
          <p className="font-bold">Easter Cup:</p>
          <p>U14 DÍVKY (narozené 2010 a mladší)</p>
          <p>U14 CHLAPCI (narození 2010 a mladší)</p>
          <p>U16 DÍVKY (narozené 2008 a mladší)</p>
          <p>U16 CHLAPCI (narození 2008 a mladší)</p>
        </div>
      </div>
      <div className="space-y-2">
        <h3 className="text-sm font-bold uppercase text-brand-blue">Termin</h3>
        <div className="space-y-1 text-xs">
          <p className="font-bold">28.3 - 31.3.2024</p>
        </div>
      </div>
      <div className="space-y-2">
        <h3 className="text-sm font-bold uppercase text-brand-blue">
          Misto konani
        </h3>
        <div className="space-y-1 text-xs">
          <p>Hala BK Klatovy (Voříškova 715, Klatovy)</p>
          <p>Hala CMS Klatovy (U Elektrárny 917, Klatovy)</p>
          <p>Městská sportovní hala (Čapkova 136, Klatovy)</p>
          <p>Tělocvična ZŠ Plánická (Studentská 624, Klatovy)</p>
          <p>Tělocvična ZŠ Masarykova (Národních mučedníků 185)</p>
          <p>Tělocvična Gymnázium Klatovy (Národních mučedníků 347)</p>
          <p>Tělocvična SPŠ Klatovy (Kpt. Nálepky 362)</p>
          <p>Tělocvična Obchodní akademie (Hálkova 131)</p>
        </div>
      </div>
      <div className="space-y-2">
        <h3 className="text-sm font-bold uppercase text-brand-blue">
          Startovne
        </h3>
        <div className="space-y-1 text-xs">
          <p>
            5 000 Kč – v případě zrušení turnaje z důvodu vyšší moci se
            startovné nevrací a bude použito na úhradu již vynaložených nákladů
            ze strany pořadatele a nezbytných poplatků spojených se zrušením
            turnaje.
          </p>
        </div>
      </div>
      <div className="space-y-2">
        <h3 className="text-sm font-bold uppercase text-brand-blue">
          Pravidla
        </h3>
        <div className="space-y-1 text-xs">
          <p>
            Dle platných pravidel minibasketbalu a basketbalu pro sezonu
            2023/2024 s výjimkami uvedenými v sekci „Pravidla“.
          </p>
        </div>
      </div>
      <div className="space-y-2">
        <h3 className="text-sm font-bold uppercase text-brand-blue">Ceny</h3>
        <div className="space-y-1 text-xs">
          <p>
            Dle platných pravidel minibasketbalu a basketbalu pro sezonu
            2023/2024 s výjimkami uvedenými v sekci „Pravidla“.
          </p>
        </div>
      </div>
      <div className="space-y-2">
        <h3 className="text-sm font-bold uppercase text-brand-blue">
          Turnajova trika
        </h3>
        <div className="">
          <Image src={TshirtsImage} alt="Tshirts" />
        </div>
      </div>
      <div className="space-y-2">
        <h3 className="text-sm font-bold uppercase text-brand-blue">
          Registrace
        </h3>
        <Link href="/form/info" className="text-xs">
          Odkaz na formulář
        </Link>
      </div>
      <div className="space-y-2">
        <h3 className="text-sm font-bold uppercase text-brand-blue">
          Kontakty
        </h3>
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
          <p>
            Zaplacením startovného účastníci turnaje souhlasí s podmínkami
            účasti, propozicemi a pravidly turnaje
          </p>
        </div>
      </div>
      <div className="space-y-2">
        <h3 className="text-sm font-bold uppercase text-brand-blue">
          Pravidla turnaje
        </h3>
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
              Každé družstvo je složeno z maximálně 15 hráčů, v kategorii U15 z
              maximálně 12 hráčů
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
              Výška košů v kategoriích U11 a U12 je 260 cm, v kategoriích U14 a
              U15 je výška koše 305 cm
            </p>
          </li>
          <li>
            <p className="font-normal">
              Každý účastník je povinen na vyžádání předložit doklad totožnosti
              pro ověření věku. Nutné je foto a datum narození
            </p>
          </li>
          <li>
            <div className="font-normal">
              <p>
                Hraje se podle platných pravidel basketbalu a minibasketbalu pro
                sezónu 2023/2024 s těmito změnami:
              </p>
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
              Rozlosování turnaje proběhne po uzávěrce přihlášek a bude zasláno
              společně s hracím systémem na adresu uvedenou v přihlášce
            </p>
          </li>
          <li>
            <p className="font-normal">
              Každý tým se rozcvičuje s vlastními míči. Pořadatel zajišťuje
              pouze hrací míče.
            </p>
          </li>
        </ol>
      </div>
      <Image src={People} alt="People" />
      <div className="space-y-2">
        <h3 className="text-sm font-bold uppercase text-brand-blue">
          Ubytovani
        </h3>
        <div className="space-y-1 text-xs">
          <div className="space-y-2">
            <div>
              <h4 className="font-bold">Typ A:Hotel</h4>
              <p>- 2–3 lůžkové pokoje</p>
            </div>
            <div>
              <h4 className="font-bold">Typ B:Penzion</h4>
              <p>- 2–3 lůžkové pokoje</p>
            </div>
            <div>
              <h4 className="font-bold">Typ C: Hostel nebo internát</h4>
              <p>- 2–3 lůžkové pokoje</p>
            </div>
            <div>
              <h4 className="font-bold">Typ D: Ve třídách základní školy</h4>
              <p>– na karimatce ve vlastním spacáku</p>
            </div>
          </div>
          <div>
            <p>Ubytování typu A, B a C jsou početně omezeny.</p>
            <p> Ceny budou upřesněné.</p>
          </div>
          <div>
            <p className="font-bold">Storno podmínky:</p>
            <p>– zrušení rezervace do 48 hodin před příjezdem – zdarma</p>
            <p>
              – zrušení rezervace do 24 hodin před příjezdem – 50 % z ceny první
              noci
            </p>
            <p>
              – zrušení rezervace méně než 24 hodin před příjezdem – poplatek
              100 % z ceny první noci
            </p>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <h3 className="text-sm font-bold uppercase text-brand-blue">
          Stravovani
        </h3>
        <div className="space-y-2 text-xs">
          <p>
            V průběhu turnaje mají hráči a trenéři možnost se stravovat ve 2
            jídelnách, kde mají zajištěné plnohodnotné jídlo po celou dobu
            turnaje – snídaně, obědy, večeře. Dále nabízíme možnost diety (stačí
            napsat do poznámky při registraci).
          </p>
          <div>
            <p className="font-bold">Jídelna A – ZŠ PLÁNICKÁ:</p>
            <p>
              Plánická 194, Klatovy (vchod z ulice Pavlíkova, naproti restauraci
              Segafredo)
            </p>
          </div>
          <div>
            <p className="font-bold">Jídelna B – ZŠ ČAPKOVA:</p>
            <p>Hálkova 134, Klatovy</p>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <h3 className="text-sm font-bold uppercase text-brand-blue">
          Mesto Klatovy
        </h3>
        <div className="space-y-2 text-xs">
          <p>
            Klatovy leží v šumavském podhůří poblíž jihozápadní hranice České
            republiky s Německou spolkovou republikou, 40 km jižně od Plzně.
            Bývalé královské město Klatovy jsou moderním městem s bohatou
            historickou tradicí. Počtem obyvatel jsou po Plzni druhým největším
            městem Plzeňského kraje.
          </p>
          <p>
            Náměstí Klatovy - Černá věž a jezuitský kostel a
            katakombamiDominantou města je na náměstí stojící Černá věž. Z 81,6
            metrů vysoké věže je výhled na celé Klatovy a za příznivého počasí i
            na velkou část Šumavy
          </p>
          <p>
            Vedle Černé věže se na náměstí nachází jezuitský kostel, pod kterým
            jsou klatovské katakomby, podzemní prostory určené k pohřbívání
            jezuitů i osob, které nebyly členy řádu. Větrací systém katakomb
            umožňuje udržovat optimální teplotu pro konzervaci mumifikovaných
            těl. Návštěvníci jich mohou v klatovských katakombách zhlédnout 30,
            dalších 7 je uloženo ve veřejnosti nepřístupné části krypt.
          </p>
          <p>
            Vedle Černé věže se na náměstí nachází jezuitský kostel, pod kterým
            jsou klatovské katakomby, podzemní prostory určené k pohřbívání
            jezuitů i osob, které nebyly členy řádu. Větrací systém katakomb
            umožňuje udržovat optimální teplotu pro konzervaci mumifikovaných
            těl. Návštěvníci jich mohou v klatovských katakombách zhlédnout 30,
            dalších 7 je uloženo ve veřejnosti nepřístupné části krypt.
          </p>
          <p>
            Za návštěvu stojí i další klatovské pamětihodnosti, např. barokní
            lékárna U Bílého jednorožce, kde je nyní muzeum dokumentující vývoj
            lékárnictví od roku 1776 do roku 1966, kdy lékárna ukončila svoji
            činnost.
          </p>
        </div>
      </div>
      <div className="flex flex-col space-y-1">
        <Image src={Klatovy1} alt="Image from the city of Klatovy" />
        <Image src={Klatovy2} alt="Image from the city of Klatovy" />
        <Image src={Klatovy3} alt="Image from the city of Klatovy" />
      </div>
    </div>
  );
}

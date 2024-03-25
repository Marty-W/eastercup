import { getScopedI18n } from "locales/server";
import Image from "next/image";
import Klatovy1 from "public/info/klatovy_1.jpeg";
import Klatovy2 from "public/info/klatovy_2.jpeg";
import Klatovy3 from "public/info/klatovy_3.jpeg";

export default async function Klatovy() {
  const t = await getScopedI18n("info");
  return (
    <div className="space-y-3 text-xs md:text-base">
      <p>{t("city.text1")}</p>
      <p>{t("city.text2")}</p>
      <p>{t("city.text3")}</p>
      <p>{t("city.text4")}</p>
      <div className="flex flex-col space-y-1 lg:grid lg:grid-cols-3 lg:items-stretch lg:gap-x-1 lg:space-y-0">
        <Image
          src={Klatovy1}
          alt="Image from the city of Klatovy"
          className="mx-auto inline-block w-full max-w-lg rounded-lg lg:max-h-[200px] lg:object-cover"
        />
        <Image
          src={Klatovy2}
          alt="Image from the city of Klatovy"
          className="mx-auto inline-block w-full max-w-lg rounded-lg lg:max-h-[200px] lg:object-cover"
        />
        <Image
          src={Klatovy3}
          alt="Image from the city of Klatovy"
          className="mx-auto inline-block w-full max-w-lg rounded-lg lg:max-h-[200px] lg:object-cover"
        />
      </div>
    </div>
  );
}

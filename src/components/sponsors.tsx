import Image from "next/image";
import czb from "public/brand_logos/czb.svg";
import dragonPress from "public/brand_logos/dragonPress.svg";
import fiba from "public/brand_logos/fiba.svg";
import klatovy from "public/brand_logos/klatovy.svg";
import meks from "public/brand_logos/meks.svg";
import peak from "public/brand_logos/peak.svg";
import plzenskyKraj from "public/brand_logos/plzenskyKraj.svg";
import smucler from "public/brand_logos/smucler.svg";

export default function Sponsors() {
  const sponsorLogos = [
    czb,
    dragonPress,
    fiba,
    klatovy,
    meks,
    peak,
    plzenskyKraj,
    smucler,
  ];

  return (
    <div className="my-auto grid grid-cols-2 place-items-center gap-4 pb-6 md:grid-cols-4">
      {sponsorLogos.map((logo, index) => (
        <div
          key={index}
          className="flex h-16 w-32 items-center justify-center overflow-hidden"
        >
          <Image
            src={logo as string}
            alt={`${logo} logo`}
            layout="responsive"
            className="max-h-full max-w-full object-scale-down"
          />
        </div>
      ))}
    </div>
  );
}

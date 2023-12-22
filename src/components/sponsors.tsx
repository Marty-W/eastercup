import Image from "next/image";

export default function Sponsors() {
  const sponsorLogos = [
    "czb",
    "dragonPress",
    "fiba",
    "klatovy",
    "meks",
    "peak",
    "plzenskyKraj",
    "smucler",
  ];

  return (
    <div className="my-auto grid grid-cols-2 place-items-center gap-4 pb-6 md:grid-cols-4 md:pb-10">
      {sponsorLogos.map((logo, index) => (
        <div
          key={index}
          className="flex h-16 w-32 items-center justify-center overflow-hidden md:h-32 md:w-40"
        >
          <Image
            src={`/brand_logos/${logo}.svg`}
            alt={`${logo} logo`}
            width={500}
            height={500}
            layout="responsive"
            className="max-h-full max-w-full object-scale-down"
          />
        </div>
      ))}
    </div>
  );
}

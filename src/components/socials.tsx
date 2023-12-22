import Image from "next/image";
export default function Socials() {
  return (
    <div className="flex justify-around">
      <Image
        src="/socials/instagram.svg"
        alt="Instagram"
        className=""
        width={50}
        height={50}
      />
      <Image
        src="/socials/facebook.svg"
        alt="Facebook"
        className=""
        width={50}
        height={50}
      />
      <Image
        src="/socials/youtube.svg"
        alt="Youtube"
        className=""
        width={50}
        height={50}
      />
      <Image
        src="/socials/tiktok.svg"
        alt="Tiktok"
        className=""
        width={50}
        height={50}
      />
    </div>
  );
}

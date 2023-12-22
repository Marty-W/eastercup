import Link from "next/link";
import Image from "next/image";
export default function Socials() {
  return (
    <div className="flex justify-around">
      <Link
        href="https://www.instagram.com/eastercupklatovy/"
        rel="noopener noreferrer"
        target="_blank"
      >
        <Image
          src="/socials/instagram.svg"
          alt="Instagram"
          className=""
          width={50}
          height={50}
        />
      </Link>
      <Link
        href="https://www.facebook.com/EasterCupKlatovy/"
        rel="noopener noreferrer"
        target="_blank"
      >
        <Image
          src="/socials/facebook.svg"
          alt="Facebook"
          className=""
          width={50}
          height={50}
        />
      </Link>
      <Link
        href="https://www.youtube.com/@eastercupklatovy"
        rel="noopener noreferrer"
        target="_blank"
      >
        <Image
          src="/socials/youtube.svg"
          alt="Youtube"
          className=""
          width={50}
          height={50}
        />
      </Link>
      <Link
        href="https://www.tiktok.com/@eastercupklatovy"
        rel="noopener noreferrer"
        target="_blank"
      >
        <Image
          src="/socials/tiktok.svg"
          alt="Tiktok"
          className=""
          width={50}
          height={50}
        />
      </Link>
    </div>
  );
}

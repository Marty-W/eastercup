import Link from "next/link";
import Image from "next/image";

interface Props {
  iconSize?: number;
}

export default function Socials({ iconSize = 50 }: Props) {
  return (
    <div className="flex justify-around space-x-1">
      <Link
        href="https://www.instagram.com/eastercupklatovy/"
        rel="noopener noreferrer"
        target="_blank"
      >
        <Image
          src="/socials/instagram.svg"
          alt="Instagram"
          width={iconSize}
          height={iconSize}
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
          width={iconSize}
          height={iconSize}
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
          width={iconSize}
          height={iconSize}
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
          width={iconSize}
          height={iconSize}
        />
      </Link>
    </div>
  );
}

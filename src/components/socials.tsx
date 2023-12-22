import Instagram from "public/socials/instagram.svg";
import Facebook from "public/socials/facebook.svg";
import Youtube from "public/socials/youtube.svg";
import Tiktok from "public/socials/tiktok.svg";
import Image from "next/image";
export default function Socials() {
  return (
    <div className="flex justify-around">
      <Image src={Instagram} alt="Instagram" className="" />
      <Image src={Facebook} alt="Facebook" className="" />
      <Image src={Youtube} alt="Youtube" className="" />
      <Image src={Tiktok} alt="Tiktok" className="" />
    </div>
  );
}

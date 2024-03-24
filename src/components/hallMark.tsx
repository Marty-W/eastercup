import { cn } from "@/lib/utils";
import { MapPin } from "lucide-react";
import Link from "next/link";

interface Props {
  placeLink: string;
  color: string;
  tag: string;
  address: string;
  name: string;
}

export const HallMark = ({ placeLink, tag, address, name, color }: Props) => {
  const borderColor = () => {
    switch (color) {
      case "blue":
        return "#213a8f";
      case "red":
        return "#FF0000";
      case "yellow":
        return "#ffed03";
      case "black":
      default:
        return "#121212";
    }
  };
  return (
    <div
      className={cn(
        `grid w-full grid-cols-[40px_1fr_70px] grid-rows-[30px_20px]
            rounded-lg border-[2px] px-2 py-3`,
      )}
      style={{ borderColor: borderColor() }}
    >
      <span className="self-end text-right">{tag})</span>
      <span className="self-end pl-1">{name}</span>
      <span className=" col-start-2 row-start-2 self-center pl-1 text-xs">
        {address}
      </span>
      <Link
        href={placeLink}
        className="row-span-2 place-self-center self-center p-2"
        target="_blank"
      >
        <MapPin
          className={cn("ml-2 h-7 w-7")}
          style={{ color: borderColor() }}
        />
      </Link>
    </div>
  );
};

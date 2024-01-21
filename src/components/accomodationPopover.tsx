import { useScopedI18n } from "locales/client";
import { Info } from "lucide-react";
import { PopoverContent, PopoverTrigger, Popover } from "./ui/popover";

export default function AccomodationPopover() {
  const t = useScopedI18n("accomodation.tooltip");
  return (
    <Popover>
      <PopoverTrigger asChild className="cursor-pointer">
        <Info className="text-secondary-foreground/50" size={20} />
      </PopoverTrigger>
      <PopoverContent className="max-w-screen-sm p-5 md:w-max">
        <div className="text-wrap">
          <h4 className="text-md py-2 text-center font-semibold">
            {t("headline")}
          </h4>
          <ul className="list-inside list-disc">
            <li>
              {t("categoryA")}: {t("categoryA.price")}
            </li>
            <li>
              {t("categoryB")}: {t("categoryB.price")}
            </li>
            <li>
              {t("categoryC")}: {t("categoryC.price")}
            </li>
            <li>
              {t("categoryD")}: {t("categoryD.price")}
            </li>
          </ul>
        </div>
        <div className="text-wrap py-2">
          <p>{t("note")}</p>
        </div>
        <div className="text-wrap py-2">
          <p>{t("note2")}</p>
        </div>
        <div className="text-wrap py-2">
          <p>{t("note3")}</p>
        </div>
        <div className="text-wrap">
          <h4 className="text-md py-2 text-center font-semibold">
            {t("storno")}
          </h4>
          <ul className="list-inside list-disc">
            <li>{t("storno.one")}</li>
            <li>{t("storno.two")}</li>
            <li>{t("storno.three")}</li>
          </ul>
        </div>
      </PopoverContent>
    </Popover>
  );
}

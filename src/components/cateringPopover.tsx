import { useI18n } from "locales/client";
import InfoPopover from "./ui/infoPopover";

export default function CateringPopover() {
  const t = useI18n();
  return (
    <InfoPopover>
      <div className="flex flex-col space-y-1 text-center">
        <h4 className="text-md font-semibold">
          {t("catering.tooltip.headline")}
        </h4>
        <div className="text-center">
          <p className="text-sm">{t("catering.tooltip.breakfastPrice")}</p>
          <p className="text-sm">{t("catering.tooltip.lunchPrice")}</p>
          <p className="text-sm">{t("catering.tooltip.dinnerPrice")}</p>
        </div>
        <p className="mx-auto max-w-[200px] text-sm">
          {t("catering.tooltip.note")}
        </p>
      </div>
    </InfoPopover>
  );
}

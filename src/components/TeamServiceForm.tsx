import { useFormContext, useWatch } from "react-hook-form";
import TshirtsImage from "public/info/tshirts.png";
import { Form } from "./ui/form";
import { type teamFormServicesSchema } from "@/lib/conts";
import { type z } from "zod";
import InterestRadio from "./formFields/interestRadio";
import React from "react";
import TshirtInput from "./formFields/tshirtInput";
import InfoTooltip from "./ui/infoTooltip";
import { useI18n } from "locales/client";
import CateringOptions from "./formFields/cateringOptions";
import SubQuestionContainerWithReturn from "./ui/subQuestionWithReturn";
import AccomodationTooltip from "./accomodationPopover";
import AccomodationCategories from "./formFields/accomodationCategories";
import AccomodationRooms from "./formFields/accomodationRooms";
import Image from "next/image";
import InfoPopover from "./ui/infoPopover";
import CateringPopover from "./cateringPopover";
import AccomodationPopover from "./accomodationPopover";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { BedIcon } from "lucide-react";

export default function TeamServiceForm() {
  const form = useFormContext<z.infer<typeof teamFormServicesSchema>>();
  const interestedInTshirts = useWatch({
    control: form.control,
    name: "interestInTshirts",
  });

  const interestInCatering = useWatch({
    control: form.control,
    name: "interestInCatering",
  });

  const interestInAccomodation = useWatch({
    control: form.control,
    name: "interestInAccomodation",
  });

  const t = useI18n();

  return (
    <Form {...form}>
      <div className="space-y-6 font-sans">
        {!interestInCatering ? (
          <InterestRadio
            fieldName="interestInCatering"
            fieldLabel="form.interestInCatering"
            control={form.control}
            infoPopover={<CateringPopover />}
          />
        ) : (
          <SubQuestionContainerWithReturn
            header={t("form.catering.header")}
            infoPopover={<CateringPopover />}
            headerAction={() => {
              form.setValue("interestInCatering", false, {
                shouldTouch: true,
                shouldValidate: true,
              });
            }}
          >
            <CateringOptions />
          </SubQuestionContainerWithReturn>
        )}
        {!interestInAccomodation ? (
          <InterestRadio
            fieldName="interestInAccomodation"
            fieldLabel="form.interestInAccomodation"
            control={form.control}
            infoPopover={<AccomodationPopover />}
          />
        ) : (
          <SubQuestionContainerWithReturn
            header={t("common.accomodation")}
            infoPopover={<AccomodationPopover />}
            headerAction={() => {
              form.setValue("interestInAccomodation", false, {
                shouldTouch: true,
                shouldValidate: true,
              });
            }}
          >
            <div className="space-y-4">
              <AccomodationCategories />
              <AccomodationRooms />
              <Alert>
                <BedIcon className="h-4 w-4" />
                <AlertTitle>{t("accomodation.alertTitle")}</AlertTitle>
                <AlertDescription>
                  {t("accomodation.alertDescription")}
                </AlertDescription>
              </Alert>
            </div>
          </SubQuestionContainerWithReturn>
        )}
        <InterestRadio
          control={form.control}
          fieldName="interestInTshirts"
          fieldLabel="form.interestInTshirts"
          infoPopover={
            <InfoPopover>
              <div className="flex max-w-sm flex-col space-y-1 text-center">
                <h4 className="text-md font-semibold">
                  {t("tshirts.tooltip.headline")}
                </h4>
                <Image
                  src={TshirtsImage}
                  className="mx-auto"
                  width={200}
                  height={200}
                  alt="tshirt"
                />
                <div className="text-center">
                  <p className="text-sm">{t("tshirts.tooltip.price")}</p>
                </div>
              </div>
            </InfoPopover>
          }
        />
        {interestedInTshirts ? (
          <div className="grid h-20 grid-cols-3 grid-rows-2 gap-y-2">
            {/* <TshirtInput */}
            {/*   fieldName="tshirtOrder.noXsShirts" */}
            {/*   fieldLabel="XS" */}
            {/*   control={form.control} */}
            {/* /> */}
            <TshirtInput
              fieldName="tshirtOrder.noSShirts"
              fieldLabel="S"
              control={form.control}
            />
            <TshirtInput
              fieldName="tshirtOrder.noMShirts"
              fieldLabel="M"
              control={form.control}
            />
            <TshirtInput
              fieldName="tshirtOrder.noLShirts"
              fieldLabel="L"
              control={form.control}
            />
            <TshirtInput
              fieldName="tshirtOrder.noXLShirts"
              fieldLabel="XL"
              control={form.control}
            />
            <TshirtInput
              fieldName="tshirtOrder.noXXLShirts"
              fieldLabel="XXL"
              control={form.control}
            />
          </div>
        ) : (
          <div className="h-20" />
        )}
      </div>
    </Form>
  );
}

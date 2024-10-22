import { useBookAppSelector } from "@/hooks/redux";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Rating from "../Rating";
import { locale } from "@/types/types";

export default function BookingPassengers() {
  const t = useTranslations();
  const { tourData } = useBookAppSelector((state) => state.book);
  const { locale } = useParams<{ locale: locale }>();
  const [psInfo, setPsInfo] = useState<{
    checkin: string;
    checkout: string;
    adult: string;
    rooms: string;
    children: string;
  }>();
  const searchParams = useSearchParams();
  useEffect(() => {
    const checkin = searchParams.get("checkin") || "";
    const checkout = searchParams.get("checkout") || "";
    const adult = searchParams.get("adult") || "";
    const rooms = searchParams.get("rooms") || "";
    const children = searchParams.get("children") || "";

    setPsInfo({ checkin, checkout, adult, rooms, children });
  }, []);
  // console.log("book: ", tourData);
  return (
    <>
      {tourData && (
        <div className="grid grid-cols-1 lg:grid-cols-3  ">
          <div className="lg:col-span-2"></div>
          <div className="flex flex-col gap-y-6 border rounded-md p-6 lg:p-3 text-sm md:text-base">
            <h5 className="text-base md:text-lg xl:text-xl font-semibold text-center">
              Your booking details
            </h5>
            <div className="flex gap-x-3">
              <Image
                src={
                  process.env.NEXT_PUBLIC_URL +
                  tourData?.attributes.imagePrimary.data.attributes.url
                }
                alt={tourData.attributes.title}
                width={200}
                height={200}
                className="col-span-1 aspect-square object-cover rounded"
              />
              <div className="col-span-2 flex flex-col">
                <Rating
                  defaultValue={tourData.attributes.rating}
                  width="16px"
                />
                <h2>{tourData.attributes.title}</h2>
                <h4>{tourData.attributes.place}</h4>
                <p className="text-light text-justify">
                  {t("common.lorem_ipsum_short")}
                </p>
              </div>
            </div>
            <hr className="w-full bg-border" />
            <div className="flexBetween gap-x-6 flex-wrap">
              <div className="flex flex-col gap-y-2">
                <span>{t("common.checkin")}</span>
                <span className="font-semibold text-nowrap ">
                  {psInfo?.checkin
                    ? new Intl.DateTimeFormat(locale, {
                        dateStyle: "full",
                      }).format(new Date(psInfo.checkin))
                    : ""}
                </span>
                <span className="text-lighter dark:text-light">
                  15:00 - 23:00
                </span>
              </div>
              <div className="flex flex-col gap-y-2">
                <span>{t("common.checkout")}</span>
                <span className="font-semibold text-nowrap">
                  {psInfo?.checkout
                    ? new Intl.DateTimeFormat(locale, {
                        dateStyle: "full",
                      }).format(new Date(psInfo.checkout))
                    : ""}
                </span>
                <span className="text-lighter dark:text-light">
                  01:00 - 11:00
                </span>
              </div>
            </div>
            <hr className="w-full bg-border" />
            <div className="flexBetween gap-y-2">
              <p>{t("tour.you_selected")}:</p>
              <div className="">
                <span>
                  {psInfo?.adult}{" "}
                  {t("common.adults", {
                    plural: `${psInfo && +psInfo?.adult > 1 ? "s" : ""}`,
                  })}
                </span>
                {psInfo && psInfo?.children !== "0" ? (
                  <>
                    ,{" "}
                    <span>
                      {psInfo?.children}{" "}
                      {+psInfo > 1 ? t("common.children") : t("common.child")}
                    </span>
                  </>
                ) : (
                  ""
                )}
                <span>
                  , {psInfo?.rooms}{" "}
                  {t("common.rooms", {
                    plural: `${psInfo && +psInfo?.rooms > 1 ? "s" : ""}`,
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

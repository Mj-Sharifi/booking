import { useTranslations } from "next-intl";
import React, { useState } from "react";
import TextInput from "../Form/TextInput";
import { useBookAppSelector } from "@/hooks/redux";
import { useSearchParams } from "next/navigation";
import BookingPaymentWallet from "./BookingPaymentWallet";
import BookingPaymentCash from "./BookingPaymentCash";

export default function BookingPayment() {
  const { tourData } = useBookAppSelector((state) => state.book);
  const searchParams = useSearchParams();
  const totalPrice =
    Number(tourData?.attributes.chd_price) *
      Number(searchParams.get("children")) +
    Number(tourData?.attributes.price) * Number(searchParams.get("adult"));

  const t = useTranslations();
  const [payMethod, setPayMethod] = useState<"cash" | "wallet">("wallet");
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-4 gap-y-10 xl:gap-x-7 2xl:gap-x-10">
      <div className="lg:col-span-2 border rounded-md p-6 lg:p-3 flex flex-col gap-y-2">
        <h5 className="font-semibold md:text-lg xl:text-xl">
          {t("tour.how_wanna_pay")}
        </h5>
        <div className="flex gap-x-4">
          <button
            type="button"
            onClick={() => setPayMethod("cash")}
            className={`py-1 md:py-2 px-2 md:px-4 text-center transition-all duration-300 ${
              payMethod == "cash"
                ? "bg-darkblue hover:bg-dark dark:bg-lightblue dark:hover:bg-white text-white dark:text-dark"
                : "bg-border hover:bg-darkblue dark:bg-lighter dark:hover:bg-lighter text-dark hover:text-white dark:text-dark"
            } rounded-md`}
          >
            {t("tour.cash")}
          </button>
          <button
            type="button"
            onClick={() => setPayMethod("wallet")}
            className={`py-1 md:py-2 px-2 md:px-4 text-center transition-all duration-300 ${
              payMethod == "wallet"
                ? "bg-darkblue hover:bg-dark dark:bg-lightblue dark:hover:bg-white text-white dark:text-dark"
                : "bg-hoverlight hover:bg-darkblue dark:bg-lighter dark:hover:bg-lightblue text-dark hover:text-white dark:text-white dark:hover:text-dark"
            }  rounded-md`}
          >
            {t("tour.wallet")}
          </button>
        </div>
        <div className="mt-10">
          {payMethod == "wallet" ? (
            <BookingPaymentWallet totalPrice={totalPrice} />
          ) : (
            <BookingPaymentCash />
          )}
        </div>
      </div>
      <div className="flex flex-col gap-y-6 text-sm md:text-base h-fit">
        <div className="flex flex-col gap-y-2 border rounded-md p-6 lg:p-3">
          <h5 className="text-base md:text-lg xl:text-xl font-semibold text-start mb-2">
            {t("tour.price_per_traveller")}
          </h5>
          <div className="flex justify-between ">
            <span>{t("common.adult", { plural: "s" })}:</span>
            <span>
              {`${searchParams.get("adult")}×`}{" "}
              {(
                Number(tourData?.attributes.price) *
                Number(searchParams.get("adult"))
              )
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </span>
          </div>
          {searchParams.get("children") !== "0" && (
            <div className="flex justify-between">
              <span>{t("common.children")}:</span>
              <span>
                {`${searchParams.get("children")}×`}{" "}
                {(
                  Number(tourData?.attributes.chd_price) *
                  Number(searchParams.get("children"))
                )
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </span>
            </div>
          )}
          <div className="flex justify-between">
            <span>{t("tour.tax_fee")}:</span>
            <span>50</span>
          </div>
          <div className="flex justify-between py-2 px-4 md:text-lg bg-lightblue dark:bg-darkblue rounded-md mt-4">
            <span>{t("tour.total_price")}:</span>
            <span>
              {50 +
                Number(tourData?.attributes.price) *
                  Number(searchParams.get("adult")) +
                Number(tourData?.attributes.chd_price) *
                  Number(searchParams.get("children"))}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-y-4 border rounded-md p-6 lg:p-3">
          <h5 className="text-base md:text-lg font-semibold">
            {t("tour.have_promo_code")}
          </h5>
          <TextInput label={t("tour.enter_promo_code")} />
          <button
            type="button"
            className="md:text-lg px-6 py-2 w-fit duration-300 border rounded-md text-darkblue dark:text-white dark:hover:text-dark dark:border-lightblue dark:hover:bg-lightblue border-darkblue hover:bg-darkblue hover:text-white"
          >
            {t("common.apply")}
          </button>
        </div>
      </div>
    </div>
  );
}

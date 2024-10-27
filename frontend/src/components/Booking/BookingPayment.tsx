import { useTranslations } from "next-intl";
import React, { useState } from "react";
import TextInput from "../Form/TextInput";

export default function BookingPayment() {
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
      </div>
      <div className="flex flex-col gap-y-6 text-sm md:text-base h-fit">
        <div className="flex flex-col gap-y-4 border rounded-md p-6 lg:p-3">
        <h5 className="text-base md:text-lg xl:text-xl font-semibold text-center">Your price summary</h5>
        </div>
        <div className="flex flex-col gap-y-4 border rounded-md p-6 lg:p-3">
          <h5 className="text-base md:text-lg xl:text-xl font-semibold text-center">Do you have a promo code?</h5>
          <TextInput/>
          <button></button>
        </div>
      </div>
    </div>
  );
}

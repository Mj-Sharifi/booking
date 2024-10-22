import { useTranslations } from "next-intl";
import React, { useState } from "react";

export default function BookingPayment() {
  const t = useTranslations();
  const [payMethod, setPayMethod] = useState<"debit/credit" | "digital">(
    "debit/credit"
  );
  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex flex-col gap-y-2">
        <h5 className="font-semibold md:text-lg xl:text-xl">
          {t("tour.how_wanna_pay")}
        </h5>
        <div className="flex gap-x-4">
          <button
            type="button"
            onClick={() => setPayMethod("debit/credit")}
            className={`py-1 md:py-2 px-2 md:px-4 text-center transition-all duration-300 ${
              payMethod == "debit/credit"
                ? "bg-darkblue hover:bg-dark dark:bg-lightblue dark:hover:bg-white text-white dark:text-dark"
                : "bg-border hover:bg-darkblue dark:bg-lighter dark:hover:bg-lighter text-dark hover:text-white dark:text-dark"
            } rounded-md`}
          >
            {t("tour.debit_credit")}
          </button>
          <button
            type="button"
            onClick={() => setPayMethod("digital")}
            className={`py-1 md:py-2 px-2 md:px-4 text-center transition-all duration-300 ${
              payMethod == "digital"
                ? "bg-darkblue hover:bg-dark dark:bg-lightblue dark:hover:bg-white text-white dark:text-dark"
                : "bg-hoverlight hover:bg-darkblue dark:bg-lighter dark:hover:bg-lightblue text-dark hover:text-white dark:text-white dark:hover:text-dark"
            }  rounded-md`}
          >
            {t("tour.digital_payment")}
          </button>
        </div>
      </div>
    </div>
  );
}

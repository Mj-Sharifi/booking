import Image from "next/image";
import React from "react";
import TextInput from "../Form/TextInput";
import { useTranslations } from "next-intl";

export default function BookingPaymentCash() {
  const t = useTranslations();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 justify-center gap-y-4 sm:gap-x-4 lg:gap-x-8">
      <div className="flex flex-col gap-y-2 justify-around">
        <TextInput label={t("tour.card_holder")} />
        <TextInput label={t("tour.card_number")} />
        <TextInput label={t("tour.cvv2")} />
        <button
          type="button"
          className="md:text-lg px-6 py-2 w-fit duration-300 border rounded-md text-darkblue dark:text-white dark:hover:text-dark dark:border-lightblue dark:hover:bg-lightblue border-darkblue hover:bg-darkblue hover:text-white"
        >
          {t("tour.pay_cash")}
        </button>
      </div>
      <Image
        src={"/assets/images/tour/debit_card.png"}
        alt="wallet"
        width={400}
        height={400}
        className="mx-auto order-1 sm:order-2"
      />
    </div>
  );
}

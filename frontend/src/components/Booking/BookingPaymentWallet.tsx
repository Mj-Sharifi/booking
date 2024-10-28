import { userInfo } from "@/types/response";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";
import { useCookies } from "react-cookie";

type props = {
  //   walletCharge: number;
  totalPrice: number;
};
export default function BookingPaymentWallet({ totalPrice }: props) {
  const [{ user_info }] = useCookies<"user_info", { user_info: userInfo }>([
    "user_info",
  ]);
  const walletCharge = user_info.user.wallet;
  const t = useTranslations();
  console.log("totalPrice: ", totalPrice);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="flex flex-col gap-y-2">
        {walletCharge > totalPrice ? (
          <>
            <p className="md:text-lg">
            {t.rich("tour.wallet_deduction", {
                span1: (chunks) => (
                  <span className="font-semibold">
                    {totalPrice} {t("footer.usd")}
                  </span>
                ),
              })}
            </p>
            <p className="md:text-lg">
              {t.rich("tour.wallet_remaining", {
                span1: (chunks) => (
                  <span className="font-semibold">
                    {walletCharge - totalPrice} {t("footer.usd")}
                  </span>
                ),
              })}
            </p>
          </>
        ) : (
          <p>{t("wallet_no_money")}</p>
        )}
      </div>
      <div className="">
        <Image
          src={"/assets/images/tour/wallet_1.svg"}
          alt="wallet"
          width={400}
          height={400}
        />
      </div>
    </div>
  );
}

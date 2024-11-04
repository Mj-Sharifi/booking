import { useBookAppSelector } from "@/hooks/redux";
import { userInfo } from "@/types/response";
import { locale } from "@/types/types";
import { countries } from "@/utils/location";
import { useTranslations } from "next-intl";
import { useParams, useSearchParams } from "next/navigation";
import React from "react";
import { useCookies } from "react-cookie";
import { HiCheck } from "react-icons/hi2";

export default function BookingFinal() {
  const { locale } = useParams<{ locale: locale }>();
  const searchParams = useSearchParams();
  const t = useTranslations();
  const { tourData } = useBookAppSelector((state) => state.book);
  const [{ user_info }] = useCookies<"user_info", { user_info: userInfo }>([
    "user_info",
  ]);
  return (
    <div className="flexCenter flex-col gap-y-8">
      <div className="flexCenter w-12 h-12 md:w-16 md:h-16 p-1 rounded-full overflow-hidden bg-darkblue dark:bg-lightblue mb-4">
        <HiCheck size={52} className=" text-white  dark:text-dark" />
      </div>
      <p className="md:text-lg text-center font-semibold">
        {user_info.user.username}, {t("tour.submitted_successfully")}
      </p>
      <p className="text-light dark:text-lighter text-xs md:text-sm text-center -mt-6">
        {t.rich("tour.booking_details_sent_to",{
          span:()=><span className="font-semibold">{user_info.user.email}</span>
        })}
      </p>
      <div className="border-2 border-dashed border-darkblue dark:border-lightblue rounded-md grid grid-cols-2 sm:grid-cols-4 gap-6 p-4 md:p-6 text-sm md:text-base">
        <div className="flexCenter flex-col">
          <span className="text-darkblue dark:text-lightblue text-center">
           {t("tour.order_number")}
          </span>
          <span className="text-center">13119</span>
        </div>
        <div className="flexCenter flex-col">
          <span className="text-darkblue dark:text-lightblue text-center">
            {t("common.date")}
          </span>
          <span className="text-center">{new Date().toLocaleDateString()}</span>
        </div>
        <div className="flexCenter flex-col">
          <span className="text-darkblue dark:text-lightblue text-center">
            {t("tour.total_price")}
          </span>
          <span className="text-center">2500 {t("footer.usd")}</span>
        </div>
        <div className="flexCenter flex-col">
          <span className="text-darkblue dark:text-lightblue text-center">
            {t("tour.pay_method")}
          </span>
          <span className="text-center">{t("tour.wallet")}</span>
        </div>
      </div>
      <div className="border-2 border-light dark:border-lighter rounded-md p-2 md:p-4 flex flex-col text-sm md:text-base divide-y-2 w-full sm:w-11/12 md:w-5/6 lg:w-3/4 xl:w-2/3 2xl:w-1/2 mx-auto">
        <div className="flexBetween py-2 gap-x-4">
          <span>{t("profile.firstname")}</span>
          <span className="text-dakblue dark:text-lightblue">
            {user_info.user.firstname}
          </span>
        </div>
        <div className="flexBetween py-2 gap-x-4">
          <span>{t("profile.lastname")}</span>
          <span className="text-dakblue dark:text-lightblue">
            {user_info.user.lastname}
          </span>
        </div>
        <div className="flexBetween py-2 gap-x-4">
          <span>{t("profile.email")}</span>
          <span className="text-dakblue dark:text-lightblue">
            {user_info.user.email}
          </span>
        </div>
        <div className="flexBetween py-2 gap-x-4">
          <span>{t("profile.phone")}</span>
          <span className="text-dakblue dark:text-lightblue">
            {user_info.user.phone}
          </span>
        </div>
        <div className="flexBetween py-2 gap-x-4">
          <span>{t("common.tour")}</span>
          <span className="text-dakblue dark:text-lightblue">
            {tourData?.attributes.title}
          </span>
        </div>
        <div className="flexBetween py-2 gap-x-4">
          <span>{t("common.checkin")}</span>
          <span className="text-dakblue dark:text-lightblue">
            {searchParams.get("checkin")?.replaceAll("-", "/") || ""}
          </span>
        </div>
        <div className="flexBetween py-2 gap-x-4">
          <span>{t("common.checkout")}</span>
          <span className="text-dakblue dark:text-lightblue">
            {searchParams.get("checkout")?.replaceAll("-", "/") || ""}
          </span>
        </div>
        <div className="flexBetween py-2 gap-x-4">
          <span>{t("tour.travellers")}</span>
          <span className="text-dakblue dark:text-lightblue">
            <span>
              {searchParams.get("adult")}{" "}
              {t("common.adult", {
                plural: `${Number(searchParams.get("adult")) > 1 ? "s" : ""}`,
              })}
            </span>
            {searchParams.get("children") &&
            Number(searchParams.get("children")) !== 0 ? (
              <>
                ,{" "}
                <span>
                  {searchParams.get("children")}{" "}
                  {Number(searchParams.get("children")) > 1
                    ? t("common.children")
                    : t("common.child")}
                </span>
              </>
            ) : (
              ""
            )}
          </span>
        </div>
        <div className="flexBetween py-2 gap-x-4">
          <span>{t("profile.city")}</span>
          <span className="text-dakblue dark:text-lightblue first-letter:uppercase">
            {countries
          .filter((cn) => cn.value == user_info.user.country)[0]
          .cities.filter((ct) => ct.value == user_info.user.city)[0][
          locale == "fa" ? "name_fa" : "name_en"
        ]}
          </span>
        </div>
        <div className="flexBetween py-2 gap-x-4">
          <span>{t("profile.country")}</span>
          <span className="text-dakblue dark:text-lightblue">
            {
              countries.filter((cn) => cn.value == user_info.user.country)[0][
                `name_${locale}`
              ]
            }
          </span>
        </div>
        <div className="flexBetween py-2 gap-x-4">
          <span>{t("profile.special_request")}</span>
          <span className="text-dakblue dark:text-lightblue">
            {t("common.lorem_ipsum_short")}
          </span>
        </div>
      </div>
    </div>
  );
}

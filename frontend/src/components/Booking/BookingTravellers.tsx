import { useBookAppSelector } from "@/hooks/redux";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Rating from "../Rating";
import { locale } from "@/types/types";
import TextInput from "../Form/TextInput";
import { Form, Formik } from "formik";
import RadioInput from "../Form/RadioInput";
import { FaFemale, FaMale } from "react-icons/fa";
import TextAreaInput from "../Form/TextAreaInput";
import { useCookies } from "react-cookie";
import { userInfo } from "@/types/response";

export default function BookingTravellers() {
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
  const [{ user_info }] = useCookies<"user_info", { user_info: userInfo }>([
    "user_info",
  ]);
  return (
    <>
      {tourData && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-4 gap-y-10 xl:gap-x-7 2xl:gap-x-10">
          <div className="lg:col-span-2 border rounded-md p-6 lg:p-3">
            <h4 className="font-semibold md:text-lg 2xl:text-xl mb-6">Let us know who you are</h4>
            <h5 className="font-semibold text-xm md:text-base">Major traveller:</h5>
            <Formik
              initialValues={{
                fullname: user_info?.user
                  ? [
                      user_info?.user?.firstname as string,
                      user_info?.user?.lastname as string,
                    ].join(" ")
                  : "",
                email: (user_info?.user?.email as string) || "",
                phone: (user_info?.user?.phone as string) || "",
                gender: (user_info?.user?.gender as boolean) || true,
                zipcode:(user_info?.user?.zipcode as string) || "",
                request: "",
              }}
              // validationSchema={userInfoVldSchema}
              onSubmit={() => {}}
            >
              {({
                values,
                setFieldValue,
                errors,
                touched,
                setFieldTouched,
              }) => (
                <Form className="flex flex-col items-center gap-y-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                    <TextInput
                      name="fullname"
                      label={t("profile.fullname")}
                      touched={touched.fullname || false}
                      value={values.fullname}
                      onChange={(e) => setFieldValue("fullname", e)}
                      errorMessage={
                        errors.fullname ? t(`error.${errors.fullname}`) : ""
                      }
                      onBlur={() => setFieldTouched("fullname", true)}
                    />
                    <TextInput
                      name="email"
                      label={t("profile.email")}
                      touched={touched.email || false}
                      value={values.email}
                      onChange={(e) => setFieldValue("email", e)}
                      errorMessage={
                        errors.email ? t(`error.${errors.email}`) : ""
                      }
                      onBlur={() => setFieldTouched("email", true)}
                    />
                    <TextInput
                      name="phone"
                      type="number"
                      label={t("profile.phone")}
                      touched={touched.phone || false}
                      value={values.phone}
                      onChange={(e) => setFieldValue("phone", e)}
                      errorMessage={
                        errors.phone ? t(`error.${errors.phone}`) : ""
                      }
                      onBlur={() => setFieldTouched("phone", true)}
                    />
                    <TextInput
                      name="zipcode"
                      label={t("profile.zipcode")}
                      touched={touched.zipcode || false}
                      value={values.zipcode}
                      onChange={(e) => setFieldValue("zipcode", e)}
                      errorMessage={
                        errors.zipcode ? t(`error.${errors.zipcode}`) : ""
                      }
                      onBlur={() => setFieldTouched("zipcode", true)}
                    />
                    <RadioInput
                      values={["male", "female"]}
                      initialValue={values.gender ? "male" : "female"}
                      onChange={(v) =>
                        setFieldValue("gender", v == "male" ? true : false)
                      }
                      rightLabel={t("profile.male")}
                      leftLabel={t("profile.female")}
                      rightIcon={<FaMale size={22} />}
                      leftIcon={<FaFemale size={22} />}
                    />
                    <div className="col-span-2">
                      <TextAreaInput
                        name="request"
                        label={t("profile.about_yourself")}
                        touched={touched.request || false}
                        value={values.request}
                        onChange={(e) => setFieldValue("request", e)}
                        errorMessage={
                          errors.request ? t(`error.${errors.request}`) : ""
                        }
                        onBlur={() => setFieldTouched("request", true)}
                      />
                    </div>

                    <button
                      type="submit"
                      className="duration-300 px-6 py-2 rounded-md bg-darkblue dark:bg-lightblue text-white dark:text-dark hover:bg-dark dark:hover:bg-white"
                      onClick={(e) => {
                        console.log("errors: ", errors);
                        console.log("values: ", values);
                      }}
                    >
                      {t("common.apply")}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
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
                width={160}
                height={160}
                className="col-span-1 object-cover rounded"
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

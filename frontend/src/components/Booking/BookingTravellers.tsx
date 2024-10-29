import { useBookAppSelector } from "@/hooks/redux";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import Rating from "../Rating";
import { locale } from "@/types/types";
import TextInput from "../Form/TextInput";
import { Form, Formik } from "formik";
import RadioInput from "../Form/RadioInput";
import { FaFemale, FaMale } from "react-icons/fa";
import TextAreaInput from "../Form/TextAreaInput";
import { useCookies } from "react-cookie";
import { userInfo } from "@/types/response";
import { validationRules } from "@/utils/auth";
import * as yup from "yup";

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
  const psValues = useMemo(() => {
    const [adl, chd] = [
      psInfo?.adult ? +psInfo.adult - 1 : 0,
      psInfo?.children ? +psInfo?.children : 0,
    ];
    // Formik Initial Values
    let initVals: { [key: string]: any } = {
      fullname_adl_1: user_info?.user
        ? [
            user_info?.user?.firstname as string,
            user_info?.user?.lastname as string,
          ]
            .join(" ")
            .trim()
        : "",
      gender_adl_1: (user_info?.user?.gender as boolean) || true,
      passportNumber_adl_1: "",
      email: (user_info?.user?.email as string) || "",
      phone: (user_info?.user?.phone as string) || "",
      zipcode: (user_info?.user?.zipcode as string) || "",
      request: "",
    };
    for (let i = 0; i < adl; i++) {
      initVals[`fullname_adl_${i + 2}`] = "";
      initVals[`gender_adl_${i + 2}`] = true;
      initVals[`passportNumber_adl_${i + 2}`] = "";
    }
    for (let i = 0; i < chd; i++) {
      initVals[`Fullname_chd_${i + 1}`] = "";
      initVals[`gender_chd_${i + 1}`] = true;
      initVals[`passportNumber_chd_${i + 1}`] = "";
    }
    // Formik ValidationSchema
    let vldSchema: { [key: string]: any } = {
      fullname_adl_1: validationRules.name("fullname", true),
      // gender_adl_1: "",
      passportNumber_adl_1: validationRules.passportNumber(true),
      email: validationRules.email(true),
      phone: validationRules.phone(true),
      zipcode: validationRules.number(),
      request: validationRules.string,
    };
    for (let i = 0; i < adl; i++) {
      vldSchema[`fullname_adl_${i + 2}`] = validationRules.name(
        `fullname`,
        true
      );
      // vldSchema[`gender_adl_${i + 2}`] = "";
      vldSchema[`passportNumber_adl_${i + 2}`] =
        validationRules.passportNumber(true);
    }
    for (let i = 0; i < chd; i++) {
      vldSchema[`fullname_chd_${i + 1}`] = validationRules.name(
        `fullname`,
        true
      );
      // vldSchema[`gender_chd_${i + 2}`] = ;
      vldSchema[`passportNumber_chd_${i + 1}`] =
        validationRules.passportNumber(true);
    }
    return { initVals, vldSchema: yup.object().shape(vldSchema) };
  }, [JSON.stringify(psInfo)]);
  return (
    <>
      {tourData && psInfo ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-4 gap-y-10 xl:gap-x-7 2xl:gap-x-10">
          <div className="lg:col-span-2 border rounded-md p-6 lg:p-3">
            <h4 className="font-semibold md:text-lg 2xl:text-xl mb-6">
              Let us know who you are
            </h4>
            <Formik
              initialValues={psValues.initVals}
              validationSchema={psValues.vldSchema}
              onSubmit={() => {}}
            >
              {({
                values,
                setFieldValue,
                errors,
                touched,
                setFieldTouched,
              }) => (
                <Form className="flex flex-col items-center gap-y-10">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                    <h5 className=" sm:col-span-2 font-semibold text-xm md:text-base text-start w-full">
                      {t("tour.major_traveller")}:
                    </h5>
                    <TextInput
                      name="fullname_adl_1"
                      label={t("profile.fullname")}
                      touched={touched.fullname_adl_1 ? true : false}
                      value={values["fullname_adl_1"]}
                      onChange={(e) => setFieldValue("fullname_adl_1", e)}
                      errorMessage={
                        errors["fullname_adl_1"]
                          ? t(`error.${errors.fullname_adl_1}`)
                          : ""
                      }
                      onBlur={() => setFieldTouched("fullname_adl_1", true)}
                    />
                    <TextInput
                      name="email"
                      label={t("profile.email")}
                      touched={touched.email ? true : false}
                      value={values.email}
                      onChange={(e) => setFieldValue("email", e)}
                      errorMessage={
                        errors.email ? t(`error.${errors.email}`) : ""
                      }
                      onBlur={() => setFieldTouched("email", true)}
                    />
                    <TextInput
                      name="passportNumber_adl_1"
                      label={t("profile.passportNumber")}
                      touched={touched.passportNumber_adl_1 ? true : false}
                      value={values.passportNumber_adl_1}
                      onChange={(e) => setFieldValue("passportNumber_adl_1", e)}
                      errorMessage={
                        errors.passportNumber
                          ? t(`error.${errors.passportNumber_adl_1}`)
                          : ""
                      }
                      onBlur={() =>
                        setFieldTouched("passportNumber_adl_1", true)
                      }
                    />
                    <RadioInput
                      values={["male", "female"]}
                      initialValue={values.gender_adl_1 ? "male" : "female"}
                      onChange={(v) =>
                        setFieldValue(
                          "gender_adl_1",
                          v == "male" ? true : false
                        )
                      }
                      rightLabel={t("profile.male")}
                      leftLabel={t("profile.female")}
                      rightIcon={<FaMale size={22} />}
                      leftIcon={<FaFemale size={22} />}
                      size="medium"
                    />
                  </div>
                  {Array(+psInfo?.adult - 1)
                    .fill(true)
                    .map((_, i) => (
                      <div
                        key={i}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full"
                      >
                        <h5 className=" sm:col-span-2 font-semibold text-xm md:text-base text-start w-full">
                          {t("common.adult", { plural: "" })} {i + 2}:
                        </h5>
                        <TextInput
                          name="fullname"
                          label={t("profile.fullname")}
                          touched={
                            touched[`fullname_adl_${i + 2}`] ? true : false
                          }
                          value={values[`fullname_adl_${i + 2}`]}
                          onChange={(e) =>
                            setFieldValue(`fullname_adl_${i + 2}`, e)
                          }
                          errorMessage={
                            errors[`fullname_adl_${i + 2}`]
                              ? t(`error.${errors[`fullname_adl_${i + 2}`]}`)
                              : ""
                          }
                          onBlur={() =>
                            setFieldTouched(`fullname_adl_${i + 2}`, true)
                          }
                        />
                        <TextInput
                          name={`passportNumber_adl_${i + 2}`}
                          label={t("profile.passportNumber")}
                          touched={
                            touched[`passportNumber_adl_${i + 2}`]
                              ? true
                              : false
                          }
                          value={values[`passportNumber_adl_${i + 2}`]}
                          onChange={(e) =>
                            setFieldValue(`passportNumber_adl_${i + 2}`, e)
                          }
                          errorMessage={
                            errors[`passportNumber_adl_${i + 2}`]
                              ? t(`error.${errors.passportNumber}`)
                              : ""
                          }
                          onBlur={() =>
                            setFieldTouched(`passportNumber_adl_${i + 2}`, true)
                          }
                        />
                        <RadioInput
                          values={["male", "female"]}
                          initialValue={
                            values[`gender_adl_${i + 2}`] ? "male" : "female"
                          }
                          onChange={(v) =>
                            setFieldValue("gender", v == "male" ? true : false)
                          }
                          rightLabel={t("profile.male")}
                          leftLabel={t("profile.female")}
                          rightIcon={<FaMale size={22} />}
                          leftIcon={<FaFemale size={22} />}
                          size="medium"
                        />
                      </div>
                    ))}
                  {psInfo.children &&
                    Array(+psInfo?.children || 0)
                      .fill(true)
                      .map((_, i) => (
                        <div
                          key={i}
                          className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full"
                        >
                          <h5 className=" sm:col-span-2 font-semibold text-xm md:text-base text-start w-full">
                            {t("common.child", { plural: "" })} {i + 1}:
                          </h5>
                          <TextInput
                            name={`fullname_chd_${i + 1}`}
                            label={t("profile.fullname")}
                            touched={
                              touched[`fullname_chd_${i + 1}`] ? true : false
                            }
                            value={values[`fullname_chd_${i + 1}`]}
                            onChange={(e) =>
                              setFieldValue(`fullname_chd_${i + 1}`, e)
                            }
                            errorMessage={
                              errors[`fullname_chd_${i + 2}`]
                                ? t(`error.${errors[`fullname_chd_${i + 1}`]}`)
                                : ""
                            }
                            onBlur={() =>
                              setFieldTouched(`fullname_chd_${i + 1}`, true)
                            }
                          />
                          <TextInput
                            name={`passportNumber_chd_${i + 1}`}
                            label={t("profile.passportNumber")}
                            touched={
                              touched[`passportNumber_chd_${i + 1}`]
                                ? true
                                : false
                            }
                            value={values[`passportNumber_chd_${i + 1}`]}
                            onChange={(e) =>
                              setFieldValue(`passportNumber_chd_${i + 1}`, e)
                            }
                            errorMessage={
                              errors[`passportNumber_chd_${i + 1}`]
                                ? t(`error.${errors.passportNumber}`)
                                : ""
                            }
                            onBlur={() =>
                              setFieldTouched(
                                `passportNumber_chd_${i + 1}`,
                                true
                              )
                            }
                          />
                          <RadioInput
                            values={["male", "female"]}
                            initialValue={
                              values[`gender_chd_${i + 1}`]
                                ? "male"
                                : "female"
                            }
                            onChange={(v) =>
                              setFieldValue(
                                "gender",
                                v == "male" ? true : false
                              )
                            }
                            rightLabel={t("profile.male")}
                            leftLabel={t("profile.female")}
                            rightIcon={<FaMale size={22} />}
                            leftIcon={<FaFemale size={22} />}
                            size="medium"
                          />
                        </div>
                      ))}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                    <h5 className=" sm:col-span-2 font-semibold text-xm md:text-base text-start w-full">
                      {t("tour.additional_info")}:
                    </h5>
                    <TextInput
                      name="phone"
                      type="number"
                      label={t("profile.phone")}
                      touched={touched.phone ? true : false}
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
                      touched={touched.zipcode ? true : false}
                      value={values.zipcode}
                      onChange={(e) => setFieldValue("zipcode", e)}
                      errorMessage={
                        errors.zipcode ? t(`error.${errors.zipcode}`) : ""
                      }
                      onBlur={() => setFieldTouched("zipcode", true)}
                    />
                    <div className="col-span-2">
                      <TextAreaInput
                        name="request"
                        label={t("profile.special_request")}
                        touched={touched.request ? true : false}
                        value={values.request}
                        onChange={(e) => setFieldValue("request", e)}
                        errorMessage={
                          errors.request ? t(`error.${errors.request}`) : ""
                        }
                        onBlur={() => setFieldTouched("request", true)}
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="duration-300 mt-8 px-4 md:px-6 py-2 md:text-lg rounded-md bg-darkblue dark:bg-lightblue text-white dark:text-dark hover:bg-dark dark:hover:bg-white"
                    onClick={(e) => {
                      console.log("errors: ", errors);
                      console.log("values: ", values);
                    }}
                  >
                    {t("common.apply")}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
          <div className="flex flex-col gap-y-6 border rounded-md p-6 lg:p-3 text-sm md:text-base h-fit">
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
                <span
                  dir="ltr"
                  className="text-lighter dark:text-light text-right"
                >
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
                <span
                  dir="ltr"
                  className="text-lighter dark:text-light text-right"
                >
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
                  {t("common.adult", {
                    plural: `${psInfo && +psInfo?.adult > 1 ? "s" : ""}`,
                  })}
                </span>
                {psInfo && psInfo?.children !== "0" ? (
                  <>
                    ,{" "}
                    <span>
                      {psInfo?.children}{" "}
                      {+psInfo.children > 1 ? t("common.children") : t("common.child")}
                    </span>
                  </>
                ) : (
                  ""
                )}
                <span>
                  , {psInfo?.rooms}{" "}
                  {t("common.room", {
                    plural: `${psInfo && +psInfo?.rooms > 1 ? "s" : ""}`,
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

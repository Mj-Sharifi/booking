"use client";
import Select from "@/components/Form/Select";
import TextInput from "@/components/Form/TextInput";
import { userInfo } from "@/types/response";
import { userLocationVldSchema } from "@/utils/auth";
import { countries } from "@/utils/location";
import { updateUser } from "@/utils/utils";
import axios from "axios";
import { Form, Formik } from "formik";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";
import { useCookies } from "react-cookie";
import { FaLocationDot } from "react-icons/fa6";

export default function page() {
  const { locale } = useParams();
  const t = useTranslations();
  const [{ user_info }] = useCookies<"user_info", { user_info: userInfo }>(["user_info"]);
  return (
    <Formik
      initialValues={{
        address: (user_info?.user?.address as string) || "",
        city: (user_info?.user?.city as string) || "",
        country: (user_info?.user?.country as string) || "",
        zipcode: (user_info?.user?.zipcode as string) || "",
      }}
      validationSchema={userLocationVldSchema}
      onSubmit={(e, f) => {
        axios
          .put(
            process.env.NEXT_PUBLIC_API + `users/${user_info?.user?.id}`,
            {
              address: e.address || null,
              city: e.city || null,
              country: e.country || null,
              zipcode: e.zipcode || null,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user_info?.jwt}`,
              },
            }
          )
          .then((res) => {
            if (res && res.data) {
              updateUser();
            }
          })
          .catch((err) => console.log(err));
      }}
    >
      {({
        values,
        setFieldValue,
        errors,
        touched,
        setFieldTouched,
        handleSubmit,
      }) => {
        return (
          <Form
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-y-8"
          >
            <div className="flex gap-2 w-full ">
              <FaLocationDot size={24} />
              <h5 className="md:text-lg font-semibold">
                {t("common.location_information")}
              </h5>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-8 md:gap-y-10 w-full">
              <div className="md:col-span-2">
                <TextInput
                  name="address"
                  label={t("profile.address")}
                  touched={touched.address || false}
                  value={values.address}
                  onChange={(e) => setFieldValue("address", e)}
                  errorMessage={
                    errors.address ? t(`error.${errors.address}`) : ""
                  }
                  onBlur={() => setFieldTouched("address", true)}
                />
              </div>
              <Select
                id="countrySelection"
                onChange={(value) => {
                  setFieldValue("country", value);
                }}
                initialValue={values.country}
                options={countries.map((cn) => {
                  return {
                    value: cn.value,
                    title: locale == "fa" ? cn.name_fa : cn.name_en,
                    icon: (
                      <Image
                        src={`/assets/images/flag/${cn.isoCode}.svg`}
                        alt={cn.name_en}
                        width={30}
                        height={22.5}
                      />
                    ),
                  };
                })}
                label={t("profile.country")}
                isToched={touched.country}
                errorMessage={
                  errors.address ? t(`error.${errors.country}`) : ""
                }
                onBlur={() => setFieldTouched("country", true)}
              />
              <Select
                id="citySelection"
                onChange={(value) => setFieldValue("city", value)}
                initialValue={values.city}
                options={
                  countries
                    .filter((cn) => cn.value == values.country)
                    .map((cn) => {
                      let options = [];
                      for (const city of cn.cities) {
                        options.push({
                          title: locale == "fa" ? city.name_fa : city.name_en,
                          value: city.value,
                        });
                      }
                      return options;
                    })[0]
                }
                label={t("profile.city")}
                isToched={touched.city}
                errorMessage={errors.address ? t(`error.${errors.city}`) : ""}
                onBlur={() => setFieldTouched("city", true)}
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
            </div>
            <button
              type="button"
              className="duration-300 px-6 py-2 rounded-md bg-darkblue dark:bg-lightblue text-white dark:text-dark hover:bg-dark dark:hover:bg-white"
              onClick={(e) => {
                handleSubmit();
                console.log("errors", errors);
                console.log("values: ", values);
              }}
            >
              {t("common.apply")}
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}

"use client";
import Select from "@/components/Form/Select";
import TextInput from "@/components/Form/TextInput";
import { userLocationVldSchema } from "@/utils/auth";
import { countries } from "@/utils/location";
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
  const [{ user_info }, setUserInfo] = useCookies(["user_info"]);
  return (
    <Formik
      initialValues={{
        address: (user_info?.user?.address as string) || "",
        city: (user_info?.user?.city as string) || "",
        country: (user_info?.user?.country as string) || "",
        zipcode: (user_info?.user?.zipcode as string) || "",
      }}
      validationSchema={userLocationVldSchema}
      onSubmit={(e) => {
        axios
          .put(
            process.env.NEXT_PUBLIC_API + `users/${user_info?.user?.id}`,
            {
              address: e.address,
              city: e.city || "",
              country: e.country || "",
              zipcode: e.zipcode || "",
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
              console.log(res);
            }
          })
          .catch((err) => console.log(err));
      }}
    >
      {({ values, setFieldValue, errors, touched, setFieldTouched }) => {
        console.log(values);
        console.log(
          countries
            .filter((cn) => cn.value == values.country)
            .map((cn) => {
              let options = [];
              for (const city of cn.cities) {
                options.push({
                  text: locale == "fa" ? city.name_fa : city.name_en,
                  value: city.value,
                });
              }
              return options;
            })
        );
        return (
          <Form className="flex flex-col items-center gap-y-8">
            <div className="flex gap-2 w-full ">
              <FaLocationDot size={24} />
              <h5 className="md:text-lg font-semibold">
                {t("profile.change_password")}
              </h5>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-8 md:gap-y-10 w-full">
              <div className="md:col-span-2">
                <TextInput
                  name="address"
                  label={t("profile.address")}
                  touched={touched.address || false}
                  value={values.address}
                  onChange={(e) => setFieldValue("username", e)}
                  errorMessage={
                    errors.address ? t(`error.${errors.address}`) : ""
                  }
                  onBlur={() => setFieldTouched("address", true)}
                />
              </div>
              <Select
                onChange={(value) => setFieldValue("country", value)}
                options={countries.map((cn) => {
                  return {
                    value: cn.value,
                    text: locale == "fa" ? cn.name_fa : cn.name_en,
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
              />
              <Select
                onChange={(value) => setFieldValue("city", value)}
                options={countries
                  .filter((cn) => cn.value == values.country)
                  .map((cn) => {
                    let options = [];
                    for (const city of cn.cities) {
                      options.push({
                        text: locale == "fa" ? city.name_fa : city.name_en,
                        value: city.value,
                      });
                    }
                    return options;
                  })[0]}
                label={t("profile.city")}
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
              type="submit"
              className="duration-300 px-6 py-2 rounded-md bg-darkblue dark:bg-lightblue text-white dark:text-dark hover:bg-dark dark:hover:bg-white"
              onClick={(e) => console.log(errors)}
            >
              {t("common.apply")}
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}

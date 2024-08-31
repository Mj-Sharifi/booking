"use client";
import TextInput from "@/components/Form/TextInput";
import NavigationLink from "@/components/link/NavigationLink";
import { loginInitVals, loginVldSchema } from "@/utils/auth";
import { Form, Formik } from "formik";
import { useTranslations } from "next-intl";
import React from "react";

export default function Login() {
  const t = useTranslations();

  return (
    <>
      <Formik initialValues={loginInitVals} validationSchema={loginVldSchema} onSubmit={(e) => console.log(e)}>
        {({ errors, touched, setFieldTouched, setFieldValue }) => (
          <Form className="duration-300 rounded-md bg-white text-dark dark:bg-dark dark:text-white flex flex-col gap-y-4 w-80 sm:w-96 lg:w-100 p-2 sm:p-6 lg:p-10">
            <span className="md:text-lg xl:text-xl font-semibold">
              {t("common.welcome_back")}
            </span>
            <span className="text-light dark:text-lighter text-xs md:text-sm">
              {t("profile.dont_have_account")}{" "}
              <NavigationLink
                href={"/register"}
                className="text-darkblue dark:text-lightblue font-semibold"
              >
                {t("profile.free_register")}
              </NavigationLink>
            </span>
            <TextInput
              name="email"
              label={t("profile.email")}
              onChange={(v) => setFieldValue("email", v.target.value)}
              onBlur={() => setFieldTouched("email", true)}
              touched={touched.email || false}
              errorMessage={errors.email ? t(`error.${errors.email}`) : ""}
            />
            <TextInput
              type="password"
              name="password"
              label={t("profile.password")}
              onChange={(v) => setFieldValue("password", v.target.value)}
              onBlur={() => setFieldTouched("password", true)}
              touched={touched.password || false}
              errorMessage={
                errors.password ? t(`error.${errors.password}`) : ""
              }
            />
            <button
              type="submit"
              className="duration-300 px-6 py-2 rounded-md bg-darkblue dark:bg-lightblue text-white dark:text-dark hover:bg-dark dark:hover:bg-white"
            >
              {t("common.login")}
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
}

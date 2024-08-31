"use client";
import TextInput from "@/components/Form/TextInput";
import { useTranslations } from "next-intl";
import React from "react";
import { Form, Formik, useFormik } from "formik";
import { registerInitVals, registerVldSchema } from "@/utils/auth";
import NavigationLink from "@/components/link/NavigationLink";

export default function Register() {
  const t = useTranslations();

  return (
    <>
      <Formik
        initialValues={registerInitVals}
        validationSchema={registerVldSchema}
        onSubmit={(e) => console.log(e)}
      >
        {({ touched, errors, setFieldValue, setFieldTouched }) => (
          <Form
            // onSubmit={handleSubmit}
            className="duration-300 rounded-md bg-white text-dark dark:bg-dark dark:text-white flex flex-col gap-y-10 sm:gap-y-8 w-11/12 sm:w-96 lg:w-128 py-6 px-4 sm:p-6 lg:p-10"
          >
            <span className="md:text-lg xl:text-xl font-semibold">
              {t("common.welcome")}
            </span>
            <span className="text-light dark:text-lighter text-xs md:text-sm">
              {t("profile.already_have_account")}{" "}
              <NavigationLink
                href={"/login"}
                className="text-darkblue dark:text-lightblue font-semibold"
              >
                {t("common.login")}
              </NavigationLink>
            </span>
            <TextInput
              name="firstname"
              label={t("profile.firstname")}
              errorMessage={
                errors.firstname ? t(`error.${errors.firstname}`) : ""
              }
              touched={touched.firstname || false}
              onChange={(v) => setFieldValue("firstname", v.target.value)}
              onBlur={() => setFieldTouched("firstname", true)}
            />
            <TextInput
              name="lastname"
              label={t("profile.lastname")}
              touched={touched.lastname || false}
              errorMessage={
                errors.lastname ? t(`error.${errors.lastname}`) : ""
              }
              onChange={(v) => setFieldValue("lastname", v.target.value)}
              onBlur={() => setFieldTouched("lastname", true)}
            />
            <TextInput
              type="email"
              name="email"
              label={t("profile.email")}
              touched={touched.email || false}
              errorMessage={errors.email ? t(`error.${errors.email}`) : ""}
              onChange={(v) => setFieldValue("email", v.target.value)}
              onBlur={() => setFieldTouched("email", true)}
            />
            <TextInput
              type="password"
              name="password"
              label={t("profile.password")}
              touched={touched.password || false}
              errorMessage={
                errors.password ? t(`error.${errors.password}`) : ""
              }
              onChange={(v) => setFieldValue("password", v.target.value)}
              onBlur={() => setFieldTouched("password", true)}
            />
            <TextInput
              type="password"
              name="confirm_password"
              label={t("profile.confirm_password")}
              touched={touched.confirm_password || false}
              errorMessage={
                errors.confirm_password
                  ? t(`error.${errors.confirm_password}`)
                  : ""
              }
              onChange={(v) =>
                setFieldValue("confirm_password", v.target.value)
              }
              onBlur={() => setFieldTouched("confirm_password", true)}
            />
            <button
              type="submit"
              className="duration-300 px-6 py-2 rounded-md bg-darkblue dark:bg-lightblue text-white dark:text-dark hover:bg-dark dark:hover:bg-white"
              // onClick={() => {
              //   console.log("errors: ", errors);
              //   console.log("values: ", values);
              // }}
            >
              {t("common.register")}
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
}

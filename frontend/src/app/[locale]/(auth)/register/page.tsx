"use client";
import TextInput from "@/components/Form/TextInput";
import { useTranslations } from "next-intl";
import React from "react";
import { Form, Formik, useFormik } from "formik";
import { registerInitVals } from "@/utils/auth";
import NavigationLink from "@/components/link/NavigationLink";

export default function Register() {
  const t = useTranslations();
  // formik
  // const { handleSubmit } = useFormik({
  //   initialValues: registerInitVals,
  //   onSubmit: (e) => console.log(e),
  // });
  return (
    <>
      <Formik initialValues={registerInitVals} onSubmit={(e) => console.log(e)}>
        <Form
          // onSubmit={handleSubmit}
          className="duration-300 rounded-md bg-white text-dark dark:bg-dark dark:text-white flex flex-col gap-y-4 w-80 sm:w-96 lg:w-112 py-6 px-4 sm:p-6 lg:p-10"
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
          <TextInput name="firstname" label={t("profile.firstname")} />
          <TextInput name="lastname" label={t("profile.lastname")} />
          <TextInput type="password" name="email" label={t("profile.email")} />
          <TextInput
            type="password"
            name="password"
            label={t("profile.password")}
          />
          <TextInput
            name="confirm_password"
            label={t("profile.confirm_password")}
          />
          <button
            type="submit"
            className="duration-300 px-6 py-2 rounded-md bg-darkblue dark:bg-lightblue text-white dark:text-dark hover:bg-dark dark:hover:bg-white"
          >
            {t("common.register")}
          </button>
        </Form>
      </Formik>
    </>
  );
}

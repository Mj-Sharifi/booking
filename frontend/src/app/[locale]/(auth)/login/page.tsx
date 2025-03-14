"use client";
import TextInput from "@/components/Form/TextInput";
import NavigationLink from "@/components/link/NavigationLink";
import { useRouter } from "@/navigation";
import { locale } from "@/types/types";
import { loginInitVals, loginVldSchema } from "@/utils/auth";
import { showNotif } from "@/utils/notification";
import axios from "axios";
import { Form, Formik } from "formik";
import { useTranslations } from "next-intl";
import { useParams, useSearchParams } from "next/navigation";
import React from "react";
import { useCookies } from "react-cookie";

export default function Login() {
  const t = useTranslations();
  const [_, setCookie] = useCookies();
  const { locale } = useParams<{ locale: locale }>();
  const router = useRouter();
  const searchParams = useSearchParams();
  return (
    <>
      <Formik
        initialValues={loginInitVals}
        validationSchema={loginVldSchema}
        onSubmit={(e) =>
          axios
            .post(
              process.env.NEXT_PUBLIC_API + "auth/local?populate=*&locale=fa",
              {
                identifier: e.email,
                password: e.password,
              }
            )
            .then((res) => {
              if (res && res.data) {
                setCookie("user_info", res.data, { path: "/" });
                showNotif(t(`notif.login_successful`), "success");
                if (searchParams.get("redirect")) {
                  // @ts-ignore
                  router.push(searchParams.get("redirect"), { locale });
                } else {
                  router.push("/profile/dashboard", { locale });
                }
              }
            })
            .catch((err) => showNotif(err.response.data.error.message))
        }
      >
        {({ values, errors, touched, setFieldTouched, setFieldValue }) => (
          <Form className="duration-300 rounded-md bg-white text-dark dark:bg-profile_dark dark:text-white flex flex-col gap-y-10 sm:gap-y-6 w-80 sm:w-96 lg:w-100 p-2 sm:p-5 lg:p-8">
            <span className="md:text-lg xl:text-xl font-semibold -mb-6 sm:-mb-2">
              {t("common.welcome_back")}
            </span>
            <span className="text-light dark:text-lighter text-xs md:text-sm -mb-2 sm:-mb-0">
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
              value={values.email}
              onChange={(v) => setFieldValue("email", v)}
              onBlur={() => setFieldTouched("email", true)}
              touched={touched.email || false}
              errorMessage={errors.email ? t(`error.${errors.email}`) : ""}
            />
            <TextInput
              type="password"
              name="password"
              label={t("profile.password")}
              onChange={(v) => setFieldValue("password", v)}
              value={values.password}
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

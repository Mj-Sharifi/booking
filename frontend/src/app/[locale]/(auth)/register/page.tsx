"use client";
import TextInput from "@/components/Form/TextInput";
import { useTranslations } from "next-intl";
import React from "react";
import { Form, Formik } from "formik";
import { registerInitVals, registerVldSchema } from "@/utils/auth";
import NavigationLink from "@/components/link/NavigationLink";
import axios from "axios";
import { useCookies } from "react-cookie";
import { registerResponce } from "@/types/response";
import { showNotif } from "@/utils/notification";

const x = {
  message: "Request failed with status code 400",
  name: "AxiosError",
  stack:
    "AxiosError: Request failed with status code 400\n    at settle (http://localhost:3000/_next/static/chunks/node_modules_axios_lib_999991._.js:1914:16)\n    at XMLHttpRequest.onloadend (http://localhost:3000/_next/static/chunks/node_modules_axios_lib_999991._.js:2458:174)\n    at Axios.request (http://localhost:3000/_next/static/chunks/node_modules_axios_lib_999991._.js:3153:49)",
  config: {
    transitional: {
      silentJSONParsing: true,
      forcedJSONParsing: true,
      clarifyTimeoutError: false,
    },
    adapter: ["xhr", "http", "fetch"],
    transformRequest: [null],
    transformResponse: [null],
    timeout: 0,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
    maxContentLength: -1,
    maxBodyLength: -1,
    env: {},
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    method: "post",
    url: "http://localhost:1337/api/auth/local/register",
    data: '{"username":"mj74mj","email":"mj74mj@gmail.com","password":"zaq123"}',
  },
  code: "ERR_BAD_REQUEST",
  status: 400,
};
export default function Register() {
  const t = useTranslations();
  const [cookie, setCookie] = useCookies();
  return (
    <>
      <Formik
        initialValues={registerInitVals}
        validationSchema={registerVldSchema}
        onSubmit={(e) =>
          axios
            .post<registerResponce>(process.env.NEXT_PUBLIC_API + "auth/local/register", {
              username: e.username,
              email: e.email,
              password: e.password,
            })
            .then((res) => {
              if (res.status == 200 && res.data) {
                setCookie("user_info", res.data, { path: "/" });
              }
            })
            .catch((err) => {
              showNotif(err.response.data.error.message)
            })
        }
      >
        {({ touched, errors, setFieldValue, setFieldTouched }) => (
          <Form
            // onSubmit={handleSubmit}
            className="duration-300 rounded-md bg-white text-dark dark:bg-profile_dark dark:text-white flex flex-col gap-y-10 sm:gap-y-8 w-11/12 sm:w-96 lg:w-128 py-6 px-4 sm:p-6 lg:p-10"
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
              name="username"
              label={t("profile.username")}
              errorMessage={
                errors.username ? t(`error.${errors.username}`) : ""
              }
              touched={touched.username || false}
              onChange={(v) => setFieldValue("username", v.target.value)}
              onBlur={() => setFieldTouched("username", true)}
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

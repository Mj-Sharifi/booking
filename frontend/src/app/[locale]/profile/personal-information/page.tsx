"use client";
import TextInput from "@/components/Form/TextInput";
import { userInfoVldSchema } from "@/utils/auth";
import axios from "axios";
import { Form, Formik } from "formik";
import { useTranslations } from "next-intl";
import React from "react";
import { useCookies } from "react-cookie";
import { FaClipboardUser } from "react-icons/fa6";

export default function page() {
  const t = useTranslations();
  const [{ user_info }, setUserInfo] = useCookies(["user_info"]);
  return (
    <Formik
      initialValues={{
        username: (user_info?.user?.username as string) || "",
        firstname: (user_info?.user?.firstname as string) || "",
        lastname: (user_info?.user.lastname as string) || "",
        email: (user_info?.user?.email as string) || "",
        phone: (user_info?.user?.phone as string) || "",
        birthday: (user_info?.user?.birthday as string) || "",
        about: (user_info?.user?.about as string) || "",
        gender: (user_info?.user?.gender as boolean) || true,
      }}
      validationSchema={userInfoVldSchema}
      onSubmit={(e) => {
        console.log(user_info?.jwt);
        axios
          .put(
            process.env.NEXT_PUBLIC_API + `users/${user_info?.user?.id}`,
            {
              username: e.username,
              firstname: e.firstname,
              lastname: e.lastname,
              email: e.email,
              phone: e.phone,
              birthday: e.birthday,
              about: e.about,
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
              setUserInfo(
                "user_info",
                { ...user_info, user: res.data },
                { path: "/" }
              );
            }
          })
          .catch((err) => console.log(err));
      }}
    >
      {({ values,setFieldValue, errors, touched, setFieldTouched }) => (
        <Form className="flex flex-col items-center gap-y-8">
          <div className="flex gap-2 w-full ">
            <FaClipboardUser size={24} />
            <h5 className="md:text-lg font-semibold">
              {t("profile.change_password")}
            </h5>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-10 md:gap-y-8 w-full">
            <TextInput
              name="username"
              label={t("profile.username")}
              touched={touched.username || false}
              value={values.username}
              onChange={(e) => setFieldValue("username", e)}
              errorMessage={
                errors.username ? t(`error.${errors.username}`) : ""
              }
              onBlur={() => setFieldTouched("old_password", true)}
            />
            <div></div>
            <TextInput
              name="firstname"
              label={t("profile.firstname")}
              touched={touched.firstname || false}
              value={values.firstname}
              onChange={(e) => setFieldValue("new_password", e)}
              errorMessage={
                errors.firstname ? t(`error.${errors.firstname}`) : ""
              }
              onBlur={() => setFieldTouched("new_password", true)}
            />

            <TextInput
              name="lastname"
              label={t("profile.lastname")}
              touched={touched.lastname || false}
              value={values.lastname}
              onChange={(e) => setFieldValue("lastname", e)}
              errorMessage={
                errors.lastname ? t(`error.${errors.lastname}`) : ""
              }
              onBlur={() => setFieldTouched("lastname", true)}
            />

            <TextInput
              name="email"
              label={t("profile.email")}
              touched={touched.email || false}
              value={values.email}
              onChange={(e) => setFieldValue("email", e)}
              errorMessage={errors.email ? t(`error.${errors.email}`) : ""}
              onBlur={() => setFieldTouched("confirm_password", true)}
            />
            <TextInput
              name="phone"
              type="number"
              label={t("profile.phone")}
              touched={touched.phone || false}
              value={values.phone}
              onChange={(e) => setFieldValue("phone", e)}
              errorMessage={errors.phone ? t(`error.${errors.phone}`) : ""}
              onBlur={() => setFieldTouched("phone", true)}
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
      )}
    </Formik>
  );
}

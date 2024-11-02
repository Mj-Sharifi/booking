"use client";
import FileUploader from "@/components/Form/FileUploader";
import TextAreaInput from "@/components/Form/TextAreaInput";
import TextInput from "@/components/Form/TextInput";
import { userInfo } from "@/types/response";
import { userInfoVldSchema } from "@/utils/auth";
import { updateUser } from "@/utils/utils";
import axios from "axios";
import { Form, Formik } from "formik";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { FaClipboardUser } from "react-icons/fa6";

export default function page() {
  const t = useTranslations();
  const [{ user_info }] = useCookies<"user_info", { user_info: userInfo }>([
    "user_info",
  ]);
  useEffect(() => {
    axios.get(process.env.NEXT_PUBLIC_API + "users/me?populate=*", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user_info.jwt}`,
      },
    });
  }, [user_info]);
  const [imageForm, setImageForm] = useState<File>();
  return (
    <Formik
      initialValues={{
        avatar: user_info?.user?.avatar
          ? ((process.env.NEXT_PUBLIC_URL +
              user_info?.user?.avatar?.url) as string)
          : "",
        username: (user_info?.user?.username as string) || "",
        firstname: (user_info?.user?.firstname as string) || "",
        lastname: (user_info?.user?.lastname as string) || "",
        email: (user_info?.user?.email as string) || "",
        phone: (user_info?.user?.phone as string) || "",
        birthday: (user_info?.user?.birthday as string) || "",
        about: (user_info?.user?.about as string) || "",
        gender: (user_info?.user?.gender as boolean) || true,
      }}
      validationSchema={userInfoVldSchema}
      onSubmit={(e) => {
        const formData = new FormData();
        formData.append("files", e.avatar);
        // if (e.avatar) {
        //   axios
        //     .post(process.env.NEXT_PUBLIC_API + "upload", formData)
        //     .then((res) => {
        //       const imageId = res.data[0].id;
        //       axios
        //         .put(
        //           process.env.NEXT_PUBLIC_API +
        //             `users/${user_info?.user?.id}?populate=*`,
        //           {
        //             username: e.username,
        //             firstname: e.firstname,
        //             lastname: e.lastname,
        //             email: e.email || null,
        //             phone: e.phone || null,
        //             birthday: e.birthday || null,
        //             about: e.about,
        //             avatar: imageId,
        //           },
        //           {
        //             headers: {
        //               "Content-Type": "application/json",
        //               Authorization: `Bearer ${user_info?.jwt}`,
        //             },
        //           }
        //         )
        //         .then((res) => {
        //           if (res && res.data) {
        //             updateUser();
        //           }
        //         })
        //         .catch((err) => console.log(err));
        //     })
        //     .catch((error) => {
        //       //handle error
        //     });
        // } else {
        //   axios
        //     .put(
        //       process.env.NEXT_PUBLIC_API +
        //         `users/${user_info?.user?.id}?populate=*`,
        //       {
        //         username: e.username || null,
        //         firstname: e.firstname || null,
        //         lastname: e.lastname || null,
        //         email: e.email || null,
        //         phone: e.phone || null,
        //         birthday: e.birthday || null,
        //         about: e.about || null,
        //         avatar: null,
        //       },
        //       {
        //         headers: {
        //           "Content-Type": "application/json",
        //           Authorization: `Bearer ${user_info?.jwt}`,
        //         },
        //       }
        //     )
        //     .then((res) => {
        //       if (res && res.data) {
        //         updateUser();
        //       }
        //     })
        //     .catch((err) => console.log(err));
        // }
        if (user_info?.user?.avatar && e.avatar == null) {
          // Remove image from database
          axios
            .delete(
              process.env.NEXT_PUBLIC_API +
                `upload/files/${user_info.user.avatar.id}`
            )
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
        }
      }}
    >
      {({ values, setFieldValue, errors, touched, setFieldTouched }) => {
        console.log(values);
        return (
          <Form className="flex flex-col items-center gap-y-8">
            <div className="flex gap-2 w-full ">
              <FaClipboardUser size={24} />
              <h5 className="md:text-lg font-semibold">
                {t("common.personal_information")}
              </h5>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-10 md:gap-y-8 w-full">
              <FileUploader
                id={`${user_info?.user?.avatar?.id || ""}`}
                name="avatar"
                accept=".jpg, .jpeg"
                label={t("profile.avatar_title")}
                description={t("profile.avatar_description")}
                onChange={(v) => {
                  if (v) {
                    setFieldValue("avatar", v[0]);
                    setFieldTouched("avatar", true);
                    setImageForm(v[0]);
                  } else {
                    setFieldValue(
                      "avatar",null);
                    setImageForm(undefined);
                  }
                }}
                isToched={touched.avatar}
                errorMessage={errors.avatar ? t(`error.${errors.avatar}`) : ""}
                imageURL={
                  imageForm ? URL.createObjectURL(imageForm) : values.avatar
                }
              />
              <div></div>
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
                onChange={(e) => setFieldValue("firstname", e)}
                errorMessage={
                  errors.firstname ? t(`error.${errors.firstname}`) : ""
                }
                onBlur={() => setFieldTouched("firstname", true)}
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
            <TextAreaInput
              name="about"
              label={t("profile.about_yourself")}
              touched={touched.about || false}
              value={values.about}
              onChange={(e) => setFieldValue("about", e)}
              errorMessage={errors.about ? t(`error.${errors.about}`) : ""}
              onBlur={() => setFieldTouched("about", true)}
            />
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
          </Form>
        );
      }}
    </Formik>
  );
}

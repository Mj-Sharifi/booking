import TextInput from '@/components/Form/TextInput';
import axios from 'axios';
import { Form, Formik } from 'formik';
import { useTranslations } from 'next-intl';
import React from 'react'
import { Cookies } from 'react-cookie';
import { FaLocationDot } from 'react-icons/fa6';

export default function page() {
  const t = useTranslations()
  return (
    <Formik
    // initialValues={changePassInitVals}
    // validationSchema={changePassVldSchema}
    onSubmit={(e) => {
      const cookie = new Cookies();
      const { jwt } = cookie.get("user_info");
      console.log(jwt);
      axios
        .post(
          process.env.NEXT_PUBLIC_API + "auth/change-password",
          {
            currentPassword: e.old_password,
            password: e.new_password,
            passwordConfirmation: e.confirm_password,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwt}`,
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
    {({ setFieldValue, errors, touched, setFieldTouched }) => (
      <Form className="flex flex-col items-center gap-y-8">
        <div className="flex gap-2 w-full ">
          <FaLocationDot size={24} />
          <h5 className="md:text-lg font-semibold">
            {t("profile.change_password")}
          </h5>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          <TextInput
            type="password"
            name="old_password"
            label={t("profile.old_password")}
            touched={touched.old_password || false}
            onChange={(e) => setFieldValue("old_password", e.target.value)}
            errorMessage={
              errors.old_password ? t(`error.${errors.old_password}`) : ""
            }
            onBlur={() => setFieldTouched("old_password", true)}
          />
          <TextInput
            type="password"
            name="new_password"
            label={t("profile.new_password")}
            touched={touched.new_password || false}
            onChange={(e) => setFieldValue("new_password", e.target.value)}
            errorMessage={
              errors.new_password ? t(`error.${errors.new_password}`) : ""
            }
            onBlur={() => setFieldTouched("new_password", true)}
          />
          <TextInput
            type="password"
            name="confirm_password"
            label={t("profile.confirm_password")}
            touched={touched.confirm_password || false}
            onChange={(e) =>
              setFieldValue("confirm_password", e.target.value)
            }
            errorMessage={
              errors.confirm_password
                ? t(`error.${errors.confirm_password}`)
                : ""
            }
            onBlur={() => setFieldTouched("confirm_password", true)}
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
  )
}

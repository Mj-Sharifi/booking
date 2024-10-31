"use client";
import React from "react";
import { HiHome } from "react-icons/hi2";
import { useCookies } from "react-cookie";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { locale } from "@/types/types";
import NavigationLink from "../link/NavigationLink";
export default function ErrorContent() {
  const { locale } = useParams<{ locale: locale }>();
  const dict = {
    cant_process: {
      fa: "پردازش این صفحه با مشکل روبرو شد.",
      en: "There was a problem processing this page.",
    },
    go_home: {
      fa: "بازگشت به صفحه اصلی",
      en: "Go back to homepage",
    },
  };

  return (
    <html lang={locale} dir={locale == "en" ? "ltr" : "rtl"}>
      <body className={`bg-background flex items-center `}>
        <div className="py-4 lg:py-10 space-y-6 container mx-auto px-2 md:px-3 xl:px-4 flex flex-col gap-4 items-center">
          <Image
            src={"/assets/images/error.png"}
            alt="404"
            width={1088}
            height={572}
            className="md:w-3/4 lg:w-3/5 xl:w-2/5"
          />
          <p className="text-xl md:text-3xl text-black">
            {dict.cant_process[locale]}
          </p>
          <NavigationLink
            href={"/"}
            className="px-4 py-2 duration-300 bg-lightblue hover:bg-darkblue rounded-md text-white dark:text-dark flex items-center gap-2 md:text-lg"
          >
            <HiHome size={22} />
            {dict.go_home[locale]}
          </NavigationLink>
        </div>
      </body>
    </html>
  );
}

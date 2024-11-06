"use client";
import NavigationLink from "@/components/link/NavigationLink";
import "@/Styles/global.css";
import { locale } from "@/types/types";
import { NextIntlClientProvider } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Cookies, useCookies } from "react-cookie";
import { HiHome } from "react-icons/hi2";

export default function NotFoundPage() {
  const [isInWindow, setIsInWindow] = useState(false);
  const [theme, setTheme] = useState<string>("light");
  const cookie = new Cookies();
  const locale = cookie.get("NEXT_LOCALE");
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsInWindow(true);
      setTheme(window?.localStorage.getItem("theme")||"light");
    }
  }, []);

  const dict = {
    oops: {
      fa: "اوه!",
      en: "Oops!",
    },
    lost: {
      fa: "به نظر میاد مسیرتو گم کردی.",
      en: "It looks like you are lost.",
    },
    not_found: {
      fa: "متاسفانه صفحه مورد نظر شما یافت نشد.",
      en: "The page you're looking for isn't available.",
    },
    go_home: {
      fa: "بازگشت به صفحه اصلی",
      en: "Go back to homepage",
    },
  };
  return (
    <>
      {isInWindow && (
        <html lang={locale} dir={locale == "fa" ? "rtl" : "ltr"}>
          <body
            className={`${theme} container mx-auto px-2 md:px-4 duration-300 h-screen overflow-hidden scroller dark:text-white dark:bg-dark flex items-center`}
          >
            <NextIntlClientProvider locale={locale}>
              <section className="grid grid-cols-1 md:grid-cols-2">
                <Image
                  src="/assets/images/404-blue.png"
                  alt="404"
                  width="800"
                  height="800"
                />
                <div className="flex flex-col items-center md:items-start justify-center gap-6 md:gap-8 xl:gap-10 text-center md:text-start">
                  <p className="font-bold  text-2xl md:3xl xl:4xl">
                    <span className="text-3xl md:text-4xl xl:[48px] after:content-['\00a0']">
                      {dict.oops[locale as locale]}
                    </span>
                    {dict.lost[locale as locale]}
                  </p>
                  <p className="md:text-lg xl:text-xl">
                    {dict.not_found[locale as locale]}
                  </p>
                  <div className="flex items-center">
                    <NavigationLink
                      href="/"
                      className="duration-300 px-4 py-2 bg-darkblue hover:text-darkblue dark:bg-lightblue hover:bg-white rounded-md text-white flex items-center gap-2 md:text-lg"
                    >
                      <HiHome size={22} />
                      {dict.go_home[locale as locale]}
                    </NavigationLink>
                  </div>
                </div>
              </section>
            </NextIntlClientProvider>
          </body>
        </html>
      )}
    </>
  );
}

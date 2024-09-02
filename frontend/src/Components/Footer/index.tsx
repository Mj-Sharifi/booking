import { localeFlag } from "@/utils/utils";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  FaFacebookF,
  FaGooglePlay,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";

import { GrAppleAppStore } from "react-icons/gr";
import NavigationLink from "../link/NavigationLink";

const companyMenu = [
  { title: "about_us", href: "/about" },
  { title: "careers", href: "" },
  { title: "blog", href: "/blog" },
  { title: "press", href: "" },
  { title: "gift_cards", href: "" },
];
const supportMenu = [
  { title: "contact", href: "/contact" },
  { title: "legal_notice", href: "" },
  { title: "privacy_policy", href: "" },
  { title: "terms_conditions", href: "" },
  { title: "sitemap", href: "" },
];
const otherServicesMenu = [
  { title: "car_hire", href: "" },
  { title: "activity_finder", href: "" },
  { title: "tour_list", href: "" },
  { title: "flight_finder", href: "" },
  { title: "cruise_ticket", href: "" },
  { title: "holiday_rental", href: "" },
  { title: "travel_agents", href: "" },
];
const socialMediaMenu = [
  {
    title: <FaFacebookF size={24} />,
    href: "",
  },
  {
    title: <FaTwitter size={24} />,

    href: "",
  },
  {
    title: <FaInstagram size={24} />,
    href: "",
  },
  {
    title: <FaLinkedin size={24} />,
    href: "",
  },
];
type props = {
  locale: "fa" | "en";
};
export default function Footer({ locale }: props) {
  const t = useTranslations();

  return (
    <div className="bg-darkblue text-white dark:bg-lightblue dark:text-dark pt-10">
      <div className="container mx-auto px-4 sm:px-12 md:px-4">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-x-6 gap-y-10">
          <div className="lg:col-span-3 xl:col-span-2">
            <NavigationLink href="/">
              <Image
                src="/assets/images/navbar/tour-booking-logo-1.png"
                alt="logo"
                width={80}
                height={80}
                className="mb-5"
              />
            </NavigationLink>
            <div className="grid gric-cols-1 sm:grid-cols-2 gap-y-8 mb-10 sm:mb-14">
              <div className="flex flex-col gap-1">
                <span className="text-sm">
                  {t("footer.free_customer_care")}
                </span>
                <Link
                  dir="ltr"
                  href="tel:+989039104679"
                  className="rtl:text-end"
                >
                  (+98) 903 910 4679
                </Link>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm">{t("footer.live_support")}</span>
                <Link
                  dir="ltr"
                  href="mailto:mj.sharifimanesh@gmail.com"
                  className="rtl:text-end"
                >
                  mj.sharifimanesh@gmail.com
                </Link>
              </div>
            </div>
            <div className="flex flex-col items-start gap-4 mb-10 sm:mb-14">
              <p>{t("footer.your_app")}</p>
              <div className="flex flex-wrap gap-x-10 gap-y-4 text-white">
                <Link
                  href=""
                  className="flexCenter gap-4 rounded px-6 py-2 bg-glass dark:bg-darkblue "
                >
                  <GrAppleAppStore size={32} />
                  <div className="ltr:hover:translate-x-2 rtl:hover:-translate-x-2 duration-200 text-sm">
                    {t.rich("footer.download_apple", {
                      span1: (chunks) => (
                        <span className="block">{chunks}</span>
                      ),
                      span2: (chunks) => (
                        <span className="block font-semibold">{chunks}</span>
                      ),
                    })}
                  </div>
                </Link>
                <Link
                  href=""
                  className="flexCenter gap-4 rounded px-6 py-2 bg-glass dark:bg-darkblue"
                >
                  <FaGooglePlay size={28} />

                  <div className="ltr:hover:translate-x-2 rtl:hover:-translate-x-2 duration-200 text-sm">
                    {t.rich("footer.download_google", {
                      span1: (chunks) => (
                        <span className="block">{chunks}</span>
                      ),
                      span2: (chunks) => (
                        <span className="block font-semibold">{chunks}</span>
                      ),
                    })}
                  </div>
                </Link>
              </div>
            </div>
            <div className="flex flex-col items-start gap-4 ">
              <span>{t("footer.follow_us")}</span>
              <ul className="flexCenter gap-6 text-white dark:text-darkblue">
                {socialMediaMenu.map(({ title, href }, i) => (
                  <li
                    key={i}
                    className="duration-200 ltr:hover:translate-x-2 rtl:hover:-translate-x-2"
                  >
                    <Link href={href}>{title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="lg:col-span-3 xl:col-start-4">
            <div className="mb-10 sm:mb-14">
              <p className="font-semibold mb-2">{t("footer.get_updates")}</p>
              <div className="relative w-full">
                <input
                  className="bg-white text-dark w-full p-5 border-none outline-none rounded"
                  placeholder={t("footer.your_email")}
                />
                <button
                  type="button"
                  className="absolute ltr:right-4 rtl:left-4 h-full top-1/2 -translate-y-1/2 underline text-dark font-semibold"
                >
                  {t("footer.subscribe")}
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 ">
              <div>
                <span className="block mb-5 font-bold">
                  {t("footer.company")}
                </span>
                <ul>
                  {companyMenu.map(({ title, href }, i) => (
                    <li
                      key={i}
                      className="duration-200 ltr:translate-x-2 rtl:-translate-x-2 mb-3"
                    >
                      <Link href={href}>{t(`footer.${title}`)}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="block mb-5 font-bold">
                  {t("footer.support")}
                </span>
                <ul>
                  {supportMenu.map(({ title, href }, i) => (
                    <li
                      key={i}
                      className="duration-200 ltr:translate-x-2 rtl:-translate-x-2 mb-3"
                    >
                      <Link href={href}>{t(`footer.${title}`)}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="block mb-5 font-bold">
                  {t("footer.other_services")}
                </span>
                <ul>
                  {otherServicesMenu.map(({ title, href }, i) => (
                    <li
                      key={i}
                      className="duration-200 ltr:translate-x-2 rtl:-translate-x-2 mb-3"
                    >
                      <Link href={href}>{t(`footer.${title}`)}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-white mt-10 py-4 text-sm flex flex-wrap justify-between w-full gap-x-10">
          <div className="py-4 text-sm flex flex-wrap sm:gap-6 md:gap-10 gap-y-5">
            <span>
              {t("footer.developed")}{" "}
              <Link href="mailto:mj.sharifimanesh@gmail.com">
                mj.sharifimanesh@gmail.com
              </Link>
            </span>
            <div className="flexCenter gap-3">
              {[
                { title: "privacy", href: "#" },
                { title: "terms", href: "#" },
                { title: "sitemap", href: "#" },
              ].map(({ title, href }, i) => (
                <Link
                  key={i}
                  href={href}
                  className="ltr:hover:translate-x-1 rtl:hover:-translate-x-1 duration-200"
                >
                  {t(`footer.${title}`)}
                </Link>
              ))}
            </div>
          </div>
          <div className="flexCenter gap-6">
            <div className="flexCenter gap-2">
              <Image
                src={`/assets/images/navbar/${localeFlag[locale]}`}
                alt={locale as string}
                width={28}
                height={18}
                className="rounded"
              />
              <span className="underline font-semibold">
                {t(`common.${locale}`)}
              </span>
            </div>
            <div className="flexCenter gap-1">
              $ &nbsp;{" "}
              <span className="underline font-semibold">{t("footer.usd")}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

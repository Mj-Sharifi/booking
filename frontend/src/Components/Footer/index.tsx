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
const companyMenu = [
  { title: "About Us", href: "/about" },
  { title: "Careers", href: "" },
  { title: "Blog", href: "/blog" },
  { title: "Press", href: "" },
  { title: "Gift Cards", href: "" },
];
const supportMenu = [
  { title: "Contact", href: "/contact" },
  { title: "Legal Notice", href: "" },
  { title: "Privacy Policy", href: "" },
  { title: "Terms and Conditions", href: "" },
  { title: "Sitemap", href: "" },
];
const otherServicesMenu = [
  { title: "Car hire", href: "" },
  { title: "Activity Finder", href: "" },
  { title: "Tour List", href: "" },
  { title: "Flight finder", href: "" },
  { title: "Cruise Ticket", href: "" },
  { title: "Holiday Rental", href: "" },
  { title: "Travel Agents", href: "" },
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
]
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
            <Image
              src="/assets/images/navbar/tour-booking-logo-1.png"
              alt="logo"
              width={80}
              height={80}
              className="mb-5"
            />
            <div className="grid gric-cols-1 sm:grid-cols-2 gap-y-8 mb-10 sm:mb-14">
              <div className="flex flex-col gap-1">
                <span className="text-sm">Toll Free Customer Care</span>
                <Link href="tel:+989039104679">(+98) 903 910 4679</Link>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm">Need live support?</span>
                <a href="mailto:mj.sharifimanesh@gmail.com">
                  mj.sharifimanesh@gmail.com
                </a>
              </div>
            </div>
            <div className="flex flex-col items-start gap-4 mb-10 sm:mb-14">
              <p>Your all-in-one travel app</p>
              <div className="flex flex-wrap gap-x-10 gap-y-4 text-white">
                <Link
                  href=""
                  className="flexCenter gap-4 rounded px-6 py-2 bg-glass dark:bg-darkblue "
                >
                  <GrAppleAppStore size={32} />

                  <div className="ltr:hover:translate-x-2 rtl:hover:-translate-x-2 duration-200 text-sm">
                    <span className="block">Download on the</span>
                    <span className="block font-semibold">Apple Store</span>
                  </div>
                </Link>
                <Link
                  href=""
                  className="flexCenter gap-4 rounded px-6 py-2 bg-glass dark:bg-darkblue"
                >
                  <FaGooglePlay size={28} />

                  <div className="ltr:hover:translate-x-2 rtl:hover:-translate-x-2 duration-200 text-sm">
                    <span className="block">Get it on</span>
                    <span className="block font-semibold">Google Play</span>
                  </div>
                </Link>
              </div>
            </div>
            <div className="flex flex-col items-start gap-4 ">
              <span>Follow us on social media</span>
              <ul className="flexCenter gap-6 text-white dark:text-darkblue">
                {socialMediaMenu.map((r, i) => (
                  <li className="duration-200 ltr:hover:translate-x-2 rtl:hover:-translate-x-2">
                    <Link href={r.href}>{r.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="lg:col-span-3 xl:col-start-4">
            <div className="mb-10 sm:mb-14">
              <p className="font-semibold mb-2">Get Updates & More</p>
              <div className="relative w-full">
                <input
                  className="bg-white text-dark w-full p-5 border-none outline-none rounded"
                  placeholder="Your Email"
                />
                <button className="absolute ltr:right-4 rtl:left-4 h-full top-1/2 -translate-y-1/2 underline text-dark font-semibold">
                  Subscribe
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 ">
              <div>
                <span className="block mb-5 font-bold">Company</span>
                <ul>
                  {companyMenu.map((e, i) => (
                    <li
                      key={i}
                      className="duration-200 ltr:translate-x-2 rtl:-translate-x-2 mb-3"
                    >
                      <Link href={e.href}>{e.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="block mb-5 font-bold">Support</span>
                <ul>
                  {supportMenu.map((e, i) => (
                    <li
                      key={i}
                      className="duration-200 ltr:translate-x-2 rtl:-translate-x-2 mb-3"
                    >
                      <Link href={e.href}>{e.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="block mb-5 font-bold">Other Services</span>
                <ul>
                  {otherServicesMenu.map((e, i) => (
                    <li
                      key={i}
                      className="duration-200 ltr:translate-x-2 rtl:-translate-x-2 mb-3"
                    >
                      <Link href={e.href}>{e.title}</Link>
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
              by{" "}
              <Link href="mailto:mj.sharifimanesh@gmail.com">
                mj.sharifimanesh@gmail.com
              </Link>
            </span>
            <div className="flexCenter gap-3">
              {[
                { title: "Privacy", href: "#" },
                { title: "Terms", href: "#" },
                { title: "Site Map", href: "#" },
              ].map((r, i) => (
                <Link
                  key={i}
                  href={r.href}
                  className="ltr:hover:translate-x-1 rtl:hover:-translate-x-1 duration-200"
                >
                  {r.title}
                </Link>
              ))}
            </div>
          </div>
          <div className="flexCenter gap-6">
            <div className="flexCenter gap-2">
              <Image
                src={`/assets/images/navbar/${
                  localeFlag[locale]
                }`}
                alt={locale as string}
                width={28}
                height={18 }
                className="rounded"
              />
              <span className="underline font-semibold">
                {t(`common.${locale}`)}
              </span>
            </div>
            <div className="flexCenter gap-1">
              $ &nbsp; <span className="underline font-semibold">USD</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

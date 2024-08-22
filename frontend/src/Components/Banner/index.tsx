"use client";
import React, { useEffect, useRef, useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian_en from "react-date-object/locales/gregorian_en"
import type { Value } from "react-multi-date-picker";
import "./style.css";
import axios from "axios";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { locationData } from "@/types/response";
import { useParams } from "next/navigation";

const locationSVG = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
    />
  </svg>
);
const minusSVG = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="w-5 h-5 text-darkblue"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
  </svg>
);
const plusSVG = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="w-5 h-5 text-darkblue"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 4.5v15m7.5-7.5h-15"
    />
  </svg>
);

export default function Banner() {
  // Translation
  const {locale}=useParams()
  const t = useTranslations();
  //Location
  const [locations, setLocations] = useState<locationData[]>();
  useEffect(() => {
    axios
      .get(process.env.NEXT_PUBLIC_API + "locations")
      .then((res) => setLocations(res.data.data))
      .catch((err) => console.log(err));
  }, []);
  const [destination, setDestination] = useState<string>(
    t("banner.where_u_going")
  );

  const [locationEl, setLocationEl] = useState<boolean>(false);
  useEffect(() => {
    document.addEventListener("click", (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(".location-selection")) {
        setLocationEl(false);
      }
    });
  }, []);
  //DatePicker
  const [dateRange, setDateRange] = useState<Value[]>([
    new DateObject().add(7, "days"),
    new DateObject().add(12, "days"),
  ]);
  // Guest Number
  const [guestEl, setGuestEl] = useState<boolean>(false);
  const [guest, setGuest] = useState<{
    adult: number;
    children: number;
    rooms: number;
  }>({ adult: 2, children: 1, rooms: 1 });
  useEffect(() => {
    document.addEventListener("click", (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(".guest-selection")) {
        setGuestEl(false);
      }
    });
  }, []);
  // Entrance Animation
  const [startAnimation, setStartAnimation] = useState<boolean>(false);
  const banner = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const bannerTop = banner.current?.getBoundingClientRect().top;
    const scrollY = window.scrollY;
    if (bannerTop) {
      if (bannerTop >= scrollY) {
        setStartAnimation(true);
      }
    }
  }, []);
  return (
    <section className="relative pt-24 md:pt-56 xl:pt-64 pb-14 md:pb-40 xl:pb-52">
      <div className="absolute ltr:left-0 rtl:right-0 top-0 h-full w-full md:w-7/12">
        <Image
          src="/assets/images/home/banner/bg-1.svg"
          alt="bg-banner"
          width={1115}
          height={760}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="container px-3 sm:px-6 mx-auto w-full relative z-10">
        <div ref={banner} className="w-full">
          <div
            className={`flex items-start md:w-[600px] lg:w-[750px] text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold transition-all duration-700 ${
              startAnimation
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            } `}
          >
            {t.rich("banner.title", {
              span1: (chunks) => (
                <span className="relative text-darkblue before:content-['\00a0']">
                  {chunks}
                </span>
              ),
              span2: (chunks) => (
                <span className="absolute -bottom-1/4 left-0 w-full">
                  {chunks}
                </span>
              ),
              img: (chunks) => (
                <Image
                  src="/assets/images/home/banner/line.png"
                  alt="banner-line"
                  width={295}
                  height={18}
                  className="w-full object-cover"
                />
              ),
            })}
          </div>
          <p
            className={`mt-8 text-light md:w-2/3 lg:w-3/5 md:text-lg transition-all duration-700 delay-200 ${
              startAnimation ? "translate-y-0" : "translate-y-10"
            }`}
          >
            {t("banner.description")}
          </p>
          <div
            className={`bg-white rounded-md w-full xl:w-4/5 max-w-[960px] p-5 flex flex-col lg:flex-row lg:justify-between mt-12 transition-all duration-700 delay-500 ${
              startAnimation ? "translate-y-0" : "translate-y-12"
            }`}
          >
            {/* Location */}
            <div className="flex flex-col gap-2 pb-4 lg:pb-0 lg:pr-8 relative">
              <span className="font-semibold">{t("common.location")}</span>
              <span
                className="location-selection border-none outline-none"
                onClick={() => setLocationEl(true)}
              >
                {destination}
              </span>
              <div
                className={`absolute rounded-sm bg-white shadow-nav p-7 left-0 top-full min-w-80 sm:min-w-96 duration-300 overflow-hidden ${
                  locationEl ? "visible animate-fadeUp" : "invisible"
                } z-20`}
              >
                <ul className="flex flex-col gap-3 max-h-64 md:max-h-96 overflow-y-scroll text-dark">
                  {locations?.map((e) => (
                    <li
                      key={e?.id}
                      className="flex align-top justify-start gap-2 hover:bg-hoverlight py-2 px-3 transition-all duration-300"
                      onClick={() => setDestination(e?.attributes.city)}
                    >
                      {locationSVG}
                      <div className="flex flex-col gap-1">
                        <span className="text-black">
                          {e?.attributes?.city}
                        </span>
                        <span className="text-light text-sm">
                          {e?.attributes?.country}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* Date Picker */}
            <div className="flex flex-col gap-2 border-y lg:border-y-0 lg:border-x border-border py-6 lg:py-0 lg:px-12">
              <span className="font-semibold">
                {t("common.checkin")} - {t("common.checkout")}
              </span>
              <DatePicker
                // calendar={persian}
                locale={locale=="fa"?persian_fa:gregorian_en}
                value={dateRange}
                onChange={setDateRange}
                format="MMMM DD"
                range
                numberOfMonths={2}
                inputClass="outline-none border-none text-light text-sm p-0"
              />
            </div>
            {/* Number of Guest */}
            <div className="flex flex-col gap-2 relative py-4 lg:py-0 lg:px-8">
              <span className="font-semibold">{t("common.guest")}</span>
              <span
                className="guest-selection text-light text-sm"
                onClick={() => setGuestEl(true)}
              >
                {guest.adult} {t("common.adults")} - {guest.children}{" "}
                {t("common.children")} - {guest.rooms} {t("common.rooms")}
              </span>
              <div
                className={`guest-selection absolute rounded-sm bg-white shadow-nav p-7 left-0 top-full min-w-80 sm:min-w-96 duration-300 overflow-hidden ${
                  guestEl ? "visible animate-fadeUp" : "invisible"
                }`}
              >
                <div className="flexBetween pb-4">
                  <span>{t("common.adults")}</span>
                  <div className="flexBetween w-32 ">
                    <button
                      className="border border-darkblue rounded p-2"
                      onClick={() =>
                        setGuest({
                          ...guest,
                          adult:
                            guest.adult > 1 ? guest.adult - 1 : guest.adult,
                        })
                      }
                    >
                      {minusSVG}
                    </button>
                    <span className="text-lg">{guest.adult}</span>
                    <button
                      className="border border-darkblue rounded p-2"
                      onClick={() =>
                        setGuest({ ...guest, adult: guest.adult + 1 })
                      }
                    >
                      {plusSVG}
                    </button>
                  </div>
                </div>
                <div className="flexBetween py-4 border-y border-border">
                  <span>{t("common.children")}</span>
                  <div className="flexBetween w-32">
                    <button
                      className="border border-darkblue rounded p-2"
                      onClick={() =>
                        setGuest({
                          ...guest,
                          children:
                            guest.children > 0
                              ? guest.children - 1
                              : guest.children,
                        })
                      }
                    >
                      {minusSVG}
                    </button>
                    <span className="text-lg">{guest.children}</span>
                    <button
                      className="border border-darkblue rounded p-2"
                      onClick={() =>
                        setGuest({ ...guest, children: guest.children + 1 })
                      }
                    >
                      {plusSVG}
                    </button>
                  </div>
                </div>
                <div className="flexBetween pt-4">
                  <span>{t("common.rooms")}</span>
                  <div className="flexBetween w-32">
                    <button
                      className="border border-darkblue rounded p-2"
                      onClick={() =>
                        setGuest({
                          ...guest,
                          rooms:
                            guest.rooms > 1 ? guest.rooms - 1 : guest.rooms,
                        })
                      }
                    >
                      {minusSVG}
                    </button>
                    <span className="text-lg">{guest.rooms}</span>
                    <button
                      className="border border-darkblue rounded p-2"
                      onClick={() =>
                        setGuest({ ...guest, rooms: guest.rooms + 1 })
                      }
                    >
                      {plusSVG}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Search Button */}
            <button className="w-full lg:w-36 h-16 transition-all duration-300 bg-darkblue hover:bg-dark text-white rounded flexCenter gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
              {t("common.search")}
            </button>
          </div>
        </div>
      </div>
      <div className="absolute hidden md:block ltr:right-0 rtl:left-0 top-0 h-full w-5/12">
        <Image
          src="/assets/images/home/banner/bg-2.jpg"
          alt="bg-banner"
          height={805}
          width={760}
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
}

"use client";
import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import axios from "axios";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { locationData } from "@/types/response";
import { useParams } from "next/navigation";
import { HiMagnifyingGlass, HiMapPin, HiMinus, HiPlus } from "react-icons/hi2";

// React Multi Date Picker
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian_en from "react-date-object/locales/gregorian_en";
import type { Value } from "react-multi-date-picker";
import { FiMapPin } from "react-icons/fi";
import GuestSelection from "@/components/GuestSelection";

export default function Banner() {
  // Translation
  const { locale } = useParams();
  const t = useTranslations();
  //Location
  const [locations, setLocations] = useState<locationData[]>();
  useEffect(() => {
    axios
      .get(process.env.NEXT_PUBLIC_API + `locations?locale=${locale}`)
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
  const [guest, setGuest] = useState<{
    adult: number;
    children: number;
    rooms: number;
  }>({ adult: 2, children: 1, rooms: 1 });
  // const [guestEl, setGuestEl] = useState<boolean>(false);
  // const [guest, setGuest] = useState<{
  //   adult: number;
  //   children: number;
  //   rooms: number;
  // }>({ adult: 2, children: 1, rooms: 1 });
  // useEffect(() => {
  //   document.addEventListener("click", (e: MouseEvent) => {
  //     if (!(e.target as HTMLElement).closest(".guest-selection")) {
  //       setGuestEl(false);
  //     }
  //   });
  // }, []);
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
            className={`flex text-dark items-start md:w-[600px] lg:w-[750px] text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold transition-all duration-700 ${
              startAnimation
                ? "translate-y-0 opacity-100"
                : "translate-y-12 opacity-0"
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
            className={`mt-8 text-light dark:text-lighter md:w-2/3 lg:w-3/5 md:text-lg transition-all duration-700 delay-200 ${
              startAnimation
                ? "translate-y-0 opacity-100"
                : "translate-y-12 opacity-0"
            }`}
          >
            {t("banner.description")}
          </p>
          <div
            className={`bg-white dark:bg-dark rounded-md w-full xl:w-4/5 max-w-[960px] p-5 grid grid-cols-1 lg:grid-cols-12 mt-12 transition-all duration-700 delay-500 ${
              startAnimation
                ? "translate-y-0 opacity-100"
                : "translate-y-12 opacity-0"
            }`}
          >
            {/* Location */}
            <div className="lg:col-span-3 flex flex-col gap-2 pb-4 lg:pb-0 lg:pr-8 relative">
              <span className="font-semibold">{t("common.location")}</span>
              <span
                className="location-selection border-none outline-none text-light dark:text-lighter"
                onClick={() => setLocationEl(true)}
              >
                {destination}
              </span>
              <div
                className={`absolute rounded-sm bg-white shadow-nav p-7 ltr:left-0 rtl:right-0 top-full min-w-80 sm:min-w-96 overflow-hidden ${
                  locationEl ? "animate-fadeInUp" : "invisible"
                } z-20`}
              >
                <ul className="flex flex-col gap-3 max-h-64 md:max-h-96 overflow-y-scroll scroller text-dark">
                  {locations?.map((e) => (
                    <li
                      key={e?.id}
                      className="flex align-top justify-start gap-2 hover:bg-hoverlight py-2 px-3 transition-colors duration-300"
                      onClick={() => setDestination(e?.attributes.city)}
                    >
                      <FiMapPin size={18} />
                      <div className="flex flex-col gap-1">
                        <span className="text-black">
                          {e?.attributes?.city}
                        </span>
                        <span className="text-light dark:text-lighter text-sm">
                          {e?.attributes?.country}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* Date Picker */}
            <div className="lg:col-span-3 flex flex-col gap-2 border-y lg:border-y-0 lg:border-x border-border py-6 lg:py-0 lg:px-8">
              <span className="font-semibold">
                {t("common.checkin")} - {t("common.checkout")}
              </span>
              <DatePicker
                // calendar={persian}
                locale={locale == "fa" ? persian_fa : gregorian_en}
                value={dateRange}
                onChange={setDateRange}
                format="MMMM DD"
                range
                numberOfMonths={2}
                inputClass="duration-700 delay-500 transition-all outline-none border-none text-light dark:text-lighter dark:bg-dark text-sm p-0"
              />
            </div>
            {/* Number of Guest */}
            <div className="lg:col-span-4 flex flex-col align-top gap-2 relative py-4 lg:py-0 lg:px-8">
              <GuestSelection value={guest} onChange={(g) => setGuest(g)} />
            </div>
            
            {/* Search Button */}
            <div className="lg:col-span-2">
              <button
                type="button"
                className="w-full lg:w-36 h-16 transition-all duration-300 bg-darkblue hover:bg-dark dark:bg-lightblue dark:hover:bg-white text-white dark:text-dark rounded flexCenter gap-2"
              >
                <HiMagnifyingGlass size={20} />
                {t("common.search")}
              </button>
            </div>
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

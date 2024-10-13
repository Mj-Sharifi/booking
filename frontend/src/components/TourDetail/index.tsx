"use client";
import { tourData } from "@/types/response";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState, useTransition } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "@/styles/popularTourSlider.css";
import { FaBus, FaRegClock, FaUsers } from "react-icons/fa6";
import { TiCancel } from "react-icons/ti";
import { useTranslations } from "next-intl";
// React Multi Date Picker
import DatePicker, { DateObject } from "react-multi-date-picker";
import type { Value } from "react-multi-date-picker";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian_en from "react-date-object/locales/gregorian_en";
import { HiMinus, HiPlus } from "react-icons/hi2";
import NavigationLink from "@/components/link/NavigationLink";
import { useBookAppDispatch } from "@/hooks/redux";
import { useRouter } from "@/navigation";
import { locale } from "@/types/types";
import { saveTour } from "@/lib/slices/bookSlice";
import Rating from "../Rating";
import Timeliner from "../Timeliner";
import Image from "next/image";

export default function TourDetail() {
  const t = useTranslations();
  const { tourParams, locale } = useParams<{
    locale: locale;
    tourParams: string[];
  }>();
  const router = useRouter();
  const [tourData, setTourData] = useState<tourData>();
  useEffect(() => {
    axios
      .get(
        process.env.NEXT_PUBLIC_API +
          `tours/${tourParams[0]}?populate=*&locale=${locale}`
      )
      .then((res) => {
        if (res.status == 200) {
          setTourData(res.data.data);
        }
      });
  }, []);
  const dispatch = useBookAppDispatch();
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
  // Timeliner Details
  const [activeTimeline, setActiveTimeline] = useState<number[]>([]);
  const [timelineDetailsHeight, setTimelineDetialHeight] = useState<number[]>(
    []
  );
  const timelineDetails = [
    <div className="flex flex-col gap-y-2 justify-start items-start">
      <div
        id="timeline-detail-0"
        className="duration-300 flex flex-col gap-y-2 overflow-hidden"
        style={{ maxHeight: `${activeTimeline.includes(0) ? timelineDetailsHeight[0]+"px" : "0"}` }}

      >
        <Image
          src={"/assets/images/tour/winsdor-castle.jpg"}
          alt="winsdor castle"
          width={500}
          height={290}
        />
        <p className="text-xs md:text-sm">{t("common.lorem_ipsum_long")}</p>
      </div>
      <button
        type="button"
        className=" text-darkblue dark:text-lightblue underline underline-offset-2 text-xs md:text-sm"
        onClick={() => handleActiveTimeline(0)}
      >
        See details & photo
      </button>
    </div>,
    <div className="flex flex-col gap-y-2 justify-start items-start">
      <div
        id="timeline-detail-1"
        className="duration-300 flex flex-col gap-y-2 overflow-hidden"
        style={{
          maxHeight: `${
            activeTimeline.includes(1) ? timelineDetailsHeight[1] + "px" : "0"
          }`,
        }}
      >
        <Image
          src={"/assets/images/tour/st.george's-chapel.jpg"}
          alt="winsdor castle"
          width={500}
          height={290}
        />
        <p className="text-xs md:text-sm">{t("common.lorem_ipsum_long")}</p>
      </div>
      <button
        type="button"
        className=" text-darkblue dark:text-lightblue underline underline-offset-2 text-xs md:text-sm"
        onClick={() => handleActiveTimeline(1)}
      >
        See details & photo
      </button>
    </div>,
    <div className="flex flex-col gap-y-2 justify-start items-start">
      <div
        id="timeline-detail-2"
        className="duration-300 flex flex-col gap-y-2 overflow-hidden"
        style={{
          maxHeight: `${
            activeTimeline.includes(2) ? timelineDetailsHeight[2] + "px" : "0"
          }`,
        }}
      >
        <Image
          src={"/assets/images/tour/roman-baths.jpg"}
          alt="winsdor castle"
          width={500}
          height={290}
        />
        <p className="text-xs md:text-sm">{t("common.lorem_ipsum_long")}</p>
      </div>
      <button
        type="button"
        className=" text-darkblue dark:text-lightblue underline underline-offset-2 text-xs md:text-sm"
        onClick={() => handleActiveTimeline(2)}
      >
        See details & photo
      </button>
    </div>,
    <div className="flex flex-col gap-y-2 justify-start items-start">
      <div
        id="timeline-detail-3"
        className="duration-300 flex flex-col gap-y-2 overflow-hidden"
        style={{
          maxHeight: `${
            activeTimeline.includes(3) ? timelineDetailsHeight[3] + "px" : "0"
          }`,
        }}
      >
        <Image
          src={"/assets/images/tour/stonehenge.jpg"}
          alt="winsdor castle"
          width={500}
          height={290}
        />
        <p className="text-xs md:text-sm">{t("common.lorem_ipsum_long")}</p>
      </div>
      <button
        type="button"
        className=" text-darkblue dark:text-lightblue underline underline-offset-2 text-xs md:text-sm"
        onClick={() => handleActiveTimeline(3)}
      >
        See details & photo
      </button>
    </div>,
  ];

  const handleActiveTimeline = (detail: number) => {
    if (activeTimeline.includes(detail)) {
      const detailIndex = activeTimeline.indexOf(detail);
      const newActiveTimeline = [
        ...activeTimeline.slice(0, detailIndex),
        ...activeTimeline.slice(detailIndex + 1),
      ];
      setActiveTimeline(newActiveTimeline);
    } else {
      setActiveTimeline((prev) => [...prev, detail]);
    }
  };
  useEffect(() => {
    console.log("height-useeffect", activeTimeline);
    const calculateDetailHeight = () => {
      let height: number[] = [];
      for (let i = 0; i < timelineDetails.length; i++) {
        if (activeTimeline.includes(i)) {
          const detailEl = document.getElementById(`timeline-detail-${i}`);
          height.push(detailEl?.scrollHeight as number);
        } else {
          height.push(0);
        }
      }
      setTimelineDetialHeight(height);
    };
    calculateDetailHeight();
    window.addEventListener("resize", calculateDetailHeight);
    // return () => window.removeEventListener("resize", calculateDetailHeight);
  }, [
    JSON.stringify(activeTimeline),
    typeof document.getElementById("timeline-detail-0") !== "undefined",
  ]);

  return (
    <div className="flex flex-col">
      {tourData && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-x-6 xl:gap-x-10">
            <div className="lg:col-span-8">
              <h1 className="text-lg md:text-2xl xl:text-3xl font-semibold text-center mb-2 md:mb-4">
                {tourData.attributes.title}
              </h1>
              <div className="mb-4 md:mb-8">
                <Rating
                  defaultValue={tourData.attributes.rating}
                  width="20px"
                />
              </div>
              <div className="mb-6 md:mb-12">
                <Swiper
                  spaceBetween={20}
                  navigation={true}
                  modules={[Navigation]}
                  className="mySwiper popularTourSwiper"
                >
                  {tourData.attributes.images.data.map((m, n) => (
                    <SwiperSlide key={n}>
                      <img
                        src={process.env.NEXT_PUBLIC_URL + m.attributes.url}
                        alt={tourData?.attributes?.title}
                        className="duration-300 w-full group-hover:scale-110"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <div className="pb-3 md:pb-6 mb-4 md:mb-8 border-b border-light dark:border-lighter grid grid-cols-6 md:grid-cols-12 gap-x-6 text-xs md:text-sm">
                <div className="flex gap-2 col-span-3 justify-center">
                  <FaRegClock
                    size={22}
                    className="text-darkblue dark:text-lightblue flex-none"
                  />
                  <div className="flex flex-col gap-1">
                    <span>{t("tour.duration")}:</span>
                    <span>{tourData.attributes.duration}</span>
                  </div>
                </div>
                <div className="flex gap-2 col-span-3 justify-center">
                  <FaUsers
                    size={22}
                    className="text-darkblue dark:text-lightblue flex-none"
                  />
                  <div className="flex flex-col gap-1">
                    <span>{t("tour.group_size")}:</span>
                    <span>52</span>
                  </div>
                </div>
                <div className="flex gap-2 col-span-3 justify-center">
                  <FaBus
                    size={22}
                    className="text-darkblue dark:text-lightblue flex-none"
                  />
                  <span>{t("tour.near_public_transportation")}</span>
                </div>
                <div className="flex gap-2 col-span-3 justify-center">
                  <TiCancel
                    size={26}
                    className="text-darkblue dark:text-lightblue flex-none"
                  />
                  <span>{t("tour.free_cancellation")}</span>
                </div>
              </div>
              <div className="flex flex-col gap-y-8 pb-3 md:pb-6 mb-4 md:mb-8 border-b border-light dark:border-lighter">
                <h4 className="font-semibold text-sm sm:text-base lg:text-lg">
                  {t("tour.overview")}
                </h4>
                <p className="text-xs sm:text-sm lg:text-base">
                  {t("tour.text_1")}
                </p>
                <div className="grid md:grid-cols-2 gap-y-6 md:gap-x-8 xl:gap-x-12">
                  <div className="flex flex-col gap-y-1 md:gap-y-3">
                    <h5 className="font-semibold">
                      {t("tour.available_languages")}
                    </h5>
                    <p>{t("tour.languages")}</p>
                  </div>
                  <div className="flex flex-col gap-y-1 md:gap-y-3">
                    <h5 className="font-semibold">
                      {t("tour.cancellation_policy")}
                    </h5>
                    <p>{t("tour.cancellation_policy_text")}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold">{t("tour.highlights")}</h4>
                  <ul className="list-disc list-inside mt-3">
                    {Array(3)
                      .fill(true)
                      .map((_, i) => (
                        <li key={i} className="text-xs sm:text-sm lg:text-base">
                          {t("common.lorem_ipsum_short")}
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
              <div className="flex flex-col gap-y-8 pb-3 md:pb-6 mb-4 md:mb-8 border-b border-light dark:border-lighter">
                <h4 className="font-semibold text-sm sm:text-base lg:text-lg">
                  {t("tour.included")}
                </h4>
                <div className="grid md:grid-cols-2 gap-y-6 md:gap-x-8 xl:gap-x-12">
                  <ul className="list-inside list-image-checkmark">
                    <li className="text-xs sm:text-sm lg:text-base">
                      {t("common.lorem_ipsum_short")}
                    </li>
                    <li className="text-xs sm:text-sm lg:text-base">
                      {t("common.lorem_ipsum_short")}
                    </li>
                  </ul>
                  <ul className="list-inside list-image-xmark">
                    <li className="text-xs sm:text-sm lg:text-base">
                      {t("tour.food_drinks")}
                    </li>
                    <li className="text-xs sm:text-sm lg:text-base">
                      {t("tour.gratuities")}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="lg:col-span-4 lg:pt-16 pb-3 lg:pb-0 mb-4 lg:mb-0 border-b lg:border-b-0 border-light">
              <div className="h-auto rounded border border-border shadow-sm py-4 lg:py-6 px-3 lg:px-5 flex flex-col gap-6">
                <p className="font-semibold text-base md:text-lg">
                  <span className="text-light dark:text-lighter text-xs md:text-sm">
                    {t("common.from")}
                  </span>
                  <span>{tourData.attributes.price}$</span>
                </p>
                <div className="rounded border border-border w-full flex flex-col gap-2 p-3">
                  <span className="font-semibold  text-sm md:text-base">
                    {t("common.date")}
                  </span>
                  <DatePicker
                    locale={locale == "fa" ? persian_fa : gregorian_en}
                    value={dateRange}
                    onChange={setDateRange}
                    format="MMMM DD"
                    range
                    numberOfMonths={2}
                    inputClass=" outline-none border-none text-light dark:text-lighter dark:bg-dark text-xs md:text-sm p-0"
                  />
                </div>
                <div className="guest-selection rounded border border-border w-full flex flex-col gap-2 relative p-3">
                  <span className="font-semibold text-sm md:text-base">
                    {t("tour.travelers_number")}
                  </span>
                  <span
                    className="guest-selection text-light dark:text-lighter text-xs md:text-sm"
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
                          type="button"
                          className="border border-darkblue rounded p-2"
                          onClick={() =>
                            setGuest({
                              ...guest,
                              adult:
                                guest.adult > 1 ? guest.adult - 1 : guest.adult,
                            })
                          }
                        >
                          <HiMinus
                            size={18}
                            className="text-darkblue dark:text-lightblue"
                          />
                        </button>
                        <span className="text-lg">{guest.adult}</span>
                        <button
                          type="button"
                          className="border border-darkblue rounded p-2"
                          onClick={() =>
                            setGuest({ ...guest, adult: guest.adult + 1 })
                          }
                        >
                          <HiPlus
                            size={18}
                            className="text-darkblue dark:text-lightblue"
                          />
                        </button>
                      </div>
                    </div>
                    <div className="flexBetween py-4 border-y border-border">
                      <span>{t("common.children")}</span>
                      <div className="flexBetween w-32">
                        <button
                          type="button"
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
                          <HiMinus
                            size={18}
                            className="text-darkblue dark:text-lightblue"
                          />
                        </button>
                        <span className="text-lg">{guest.children}</span>
                        <button
                          type="button"
                          className="border border-darkblue rounded p-2"
                          onClick={() =>
                            setGuest({ ...guest, children: guest.children + 1 })
                          }
                        >
                          <HiPlus
                            size={18}
                            className="text-darkblue dark:text-lightblue"
                          />
                        </button>
                      </div>
                    </div>
                    <div className="flexBetween pt-4">
                      <span>{t("common.rooms")}</span>
                      <div className="flexBetween w-32">
                        <button
                          type="button"
                          className="border border-darkblue rounded p-2"
                          onClick={() =>
                            setGuest({
                              ...guest,
                              rooms:
                                guest.rooms > 1 ? guest.rooms - 1 : guest.rooms,
                            })
                          }
                        >
                          <HiMinus
                            size={18}
                            className="text-darkblue dark:text-lightblue"
                          />
                        </button>
                        <span className="text-lg">{guest.rooms}</span>
                        <button
                          type="button"
                          className="border border-darkblue rounded p-2"
                          onClick={() =>
                            setGuest({ ...guest, rooms: guest.rooms + 1 })
                          }
                        >
                          <HiPlus
                            size={18}
                            className="text-darkblue dark:text-lightblue"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="w-full py-3 text-center transition-all duration-300 bg-darkblue hover:bg-dark dark:bg-lightblue dark:hover:bg-white text-white dark:text-dark rounded-md"
                  onClick={() => {
                    dispatch(saveTour(tourData));
                    router.push("/booking", { locale });
                  }}
                >
                  {t("tour.book_now")}
                </button>
                {/* <NavigationLink
                  href={"/booking"}
                  className="w-full py-3 text-center transition-all duration-300 bg-darkblue hover:bg-dark dark:bg-lightblue dark:hover:bg-white text-white dark:text-dark rounded-md"
                >
                  {t("tour.book_now")}
                </NavigationLink> */}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-8 pb-3 md:pb-6 mb-4 md:mb-8 border-b border-light dark:border-lighter">
            <h4 className="col-span-12 font-semibold text-sm sm:text-base lg:text-lg">
              {t("tour.important_info")}
            </h4>
            <div className="col-span-12 sm:col-span-6 lg:col-span-4">
              <h5 className="font-semibold">{t("tour.inclusions")}</h5>
              <ul className="list-disc list-inside mt-3">
                <li className="text-xs sm:text-sm lg:text-base">
                  {t("tour.expert_guide")}
                </li>
                <li className="text-xs sm:text-sm lg:text-base">
                  {t("tour.admission_stonehenge")}
                </li>
                <li className="text-xs sm:text-sm lg:text-base">
                  {t("tour.admission_Windsor_Castle")}
                </li>
              </ul>
            </div>
            <div className="col-span-12 sm:col-span-6 lg:col-span-4">
              <h5 className="font-semibold">{t("tour.exclusion")}</h5>
              <ul className="list-disc list-inside mt-3">
                <li className="text-xs sm:text-sm lg:text-base">
                  {t("tour.food_drinks")}
                </li>
                <li className="text-xs sm:text-sm lg:text-base">
                  {t("tour.gratuities")}
                </li>
                <li className="text-xs sm:text-sm lg:text-base">
                  {t("tour.hotel")}
                </li>
              </ul>
            </div>
            <div className="col-span-12 sm:col-span-6 lg:col-span-4">
              <h5 className="font-semibold">{t("tour.departure_details")}</h5>
              <ul className="list-disc list-inside mt-3">
                <li className="text-xs sm:text-sm lg:text-base">
                  {t("tour.departure_time")}
                </li>
              </ul>
            </div>
            <div className="col-span-12">
              <h5 className="font-semibold">{t("tour.additional_info")}</h5>
              <ul className="list-disc list-inside mt-3">
                <li className="text-xs sm:text-sm lg:text-base">
                  {t("tour.additional_info_1")}
                </li>
                <li className="text-xs sm:text-sm lg:text-base">
                  {t("tour.additional_info_2")}
                </li>
                <li className="text-xs sm:text-sm lg:text-base">
                  {t("tour.additional_info_3")}
                </li>
              </ul>
            </div>
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-12 xl:gap-x-6 2xl:gap-x-10">
            <div className="lg:col-span-4">
              <Timeliner
                titles={[
                  "Windsor Castle",
                  "St. George's Chapel",
                  "The Roman Baths",
                  "Stonehenge",
                ]}
                subtitles={[
                  "Stop: 60 minutes - Admission included",
                  "Stop: 60 minutes - Admission included",
                  "Stop: 60 minutes - Admission included",
                  "Stop: 60 minutes - Admission included",
                ]}
                details={timelineDetails}
              />
            </div>
            <div className="hidden xl:block xl:col-span-8">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d47259.75457904058!2d-0.16978027898677037!3d51.49881486207125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4873e63b850af611%3A0x979170e2bcd3d2dd!2sStonehenge!5e0!3m2!1sen!2s!4v1728667377440!5m2!1sen!2s"
                className="w-full aspect-video border-2 border-darkblue dark:border-lightblue rounded-md "
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

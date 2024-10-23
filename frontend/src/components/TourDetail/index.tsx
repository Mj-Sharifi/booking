"use client";
import { tourData, userInfo } from "@/types/response";
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
import { HiArrowRight } from "react-icons/hi2";
import NavigationLink from "@/components/link/NavigationLink";
import { useBookAppDispatch } from "@/hooks/redux";
import { useRouter } from "@/navigation";
import { locale } from "@/types/types";
import { clearTourData, saveTour } from "@/lib/slices/bookSlice";
import Rating from "../Rating";
import Timeliner from "../Timeliner";
import Image from "next/image";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import TextAreaInput from "../Form/TextAreaInput";
import TextInput from "../Form/TextInput";
import ProgressBar from "../ProgressBar";
import GuestSelection from "../GuestSelection";
import { useCookies } from "react-cookie";

export default function TourDetail() {
  const t = useTranslations();
  const dispatch = useBookAppDispatch();

  const [{ user_info }] = useCookies<"user_info", { user_info: userInfo }>([
    "user_info",
  ]);
  const { tourParams, locale } = useParams<{
    locale: locale;
    tourParams: string[];
  }>();
  const router = useRouter();
  const [tourData, setTourData] = useState<tourData>();
  useEffect(() => {
    dispatch(clearTourData())
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
        style={{
          maxHeight: `${
            activeTimeline.includes(0) ? timelineDetailsHeight[0] + "px" : "0"
          }`,
        }}
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

  const handleBookingPath = () => {
    return `?checkin=${dateRange[0]?.toString()}&checkout=${dateRange[1]?.toString()}&adult=${
      guest.adult
    }&children=${guest.children}&rooms=${guest.rooms}`;
  };

  return (
    <div className="flex flex-col">
      {tourData && (
        <>
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-y-10 lg:gap-x-6 xl:gap-x-10 pb-3 md:pb-6 mb-4 md:mb-8 border-b border-light dark:border-lighter">
            <div className="xl:col-span-8">
              <h1 className="text-lg md:text-2xl xl:text-3xl font-semibold text-center mb-2 md:mb-3">
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
              <div className="flex flex-col gap-y-8">
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
            <div className="xl:col-span-4 xl:pt-24 pb-3 lg:pb-0 mb-4 lg:mb-0 border-b lg:border-b-0 border-light">
              <div className="h-auto rounded border border-border shadow-sm py-4 lg:py-6 px-3 lg:px-5 flex flex-col gap-6">
                <div className="font-semibold text-base md:text-lg flex justify-start items-center gap-x-1">
                  <span className="text-light dark:text-lighter text-xs md:text-sm ">
                    {t("common.from")}
                  </span>
                  <span>{tourData.attributes.price}$</span>
                </div>
                <div className="rounded border border-border w-full flex flex-col gap-2 p-3">
                  <span className="font-semibold  text-sm md:text-base">
                    {t("common.date")}
                  </span>
                  <DatePicker
                    locale={locale == "fa" ? persian_fa : gregorian_en}
                    value={dateRange}
                    onChange={setDateRange}
                    format="YYYY-MM-DD"
                    range
                    numberOfMonths={2}
                    inputClass="outline-none border-none !text-light dark:!text-lighter dark:!bg-dark text-xs md:text-sm p-0"
                  />
                </div>
                <div className=" border border-border rounded p-3">
                  <GuestSelection value={guest} onChange={(g) => setGuest(g)} />
                </div>

                <button
                  type="button"
                  className="w-full py-3 text-center transition-all duration-300 bg-darkblue hover:bg-dark dark:bg-lightblue dark:hover:bg-white text-white dark:text-dark rounded-md"
                  onClick={() => {
                    if (user_info?.jwt) {
                      dispatch(saveTour(tourData));
                      // @ts-ignore
                      router.push("/booking" + handleBookingPath(), { locale });
                    }else{
                      router.push("/login",{locale})
                    }
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
          <div className="grid grid-cols-1 xl:grid-cols-12 xl:gap-x-6 2xl:gap-x-10 pb-3 md:pb-6 mb-4 md:mb-8 border-b border-light dark:border-lighter">
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
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-y-8 xl:gap-x-16 2xl:gap-x-24 pb-3 md:pb-6 mb-4 md:mb-8 border-b border-light dark:border-lighter">
            <div className="col-span-1 xl:col-span-4 flex flex-col gap-y-4">
              <h4 className="md:text-lg font-semibold">
                {t("blog.geust_reviews")}
              </h4>
              <div className="flex gap-x-4">
                <div className="w-12 h-12 md:h-14 md:w-14 2xl:w-16 2xl:h-16 text-lg md:text-2xl xl:text-4xl font-semibold bg-darkblue text-white rounded-md flexCenter dark:bg-lightblue dark:text-darkblue">
                  {tourData.attributes.rating}
                </div>
                <div className="h-full flex flex-col justify-evenly">
                  <span className="font-semibold text-sm md:text-base">
                    {t("tour.exceptional")}
                  </span>
                  <span className="text-nowrap text-xs md:text-sm text-light dark:text-lighter">
                    {t("tour.reviews_count", { count: 3000 })}
                  </span>
                </div>
              </div>
              {[
                { title: t("tour.location"), value: 9.4 },
                { title: t("tour.staff"), value: 8.4 },
                { title: t("tour.cleanliness"), value: 9.4 },
                { title: t("tour.value_money"), value: 8 },
                { title: t("tour.comfort"), value: 8.9 },
                { title: t("tour.facilities"), value: 8 },
                { title: t("tour.free_wiFi"), value: 9.6 },
              ].map((p, i) => (
                <ProgressBar
                  title={p.title}
                  value={p.value}
                  progressPercent={p.value * 10}
                  size="small"
                />
              ))}
            </div>
            <div className="col-span-1 xl:col-span-8 flex flex-col gap-y-10">
              {Array(3)
                .fill(true)
                .map((_, i) => (
                  <div key={i} className="flex flex-col gap-4">
                    <div className="flex gap-4">
                      <Image
                        src={"/assets/images/blog/reviewer.png"}
                        alt="reviewer"
                        width={60}
                        height={60}
                      />
                      <div className="flex flex-col gap-1">
                        <span className="text-sm md:text-base">Tonko</span>
                        <span className="text-light dark:text-lighter text-xs md:text-sm">
                          {new Intl.DateTimeFormat(locale, {
                            dateStyle: "medium",
                          }).format(new Date("2022-02-15"))}
                        </span>
                      </div>
                    </div>
                    <h4 className="font-semibold md:text-lg text-darkblue dark:text-lightblue">
                      9.2 {t("blog.superb")}
                    </h4>
                    <p className="text-sm md:text-base">
                      {t("common.lorem_ipsum_long")}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {Array(4)
                        .fill(true)
                        .map((_, i) => (
                          <Image
                            key={i}
                            src={`/assets/images/blog/review_${i + 1}.png`}
                            alt="review_image"
                            height={100}
                            width={100}
                            className="rounded-md"
                          />
                        ))}
                    </div>
                    <div className="flex gap-5">
                      <button
                        type="button"
                        className="text-sm md:text-base flex gap-2 items-center text-darkblue dark:text-lightblue"
                      >
                        {t("blog.helpful")}
                        <AiFillLike size={22} />{" "}
                      </button>
                      <button
                        type="button"
                        className="text-sm md:text-base flex gap-2 items-center text-light dark:text-lighter"
                      >
                        {t("blog.not_helpful")}
                        <AiFillDislike size={22} />{" "}
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-y-8 xl:gap-x-16 2xl:gap-x-24 pb-3 md:pb-6 mb-4 md:mb-8 border-b border-light dark:border-lighter">
            <div className="col-span-1 xl:col-span-4 grid grid-cols-2 gap-y-4 gap-x-8">
              <div className="col-span-2 flex flex-col gap-y-2">
                <h4 className="md:text-lg font-semibold">{t("blog.reply")}</h4>
                <h6 className="text-xs md:text-sm text-light dark:text-lighter">
                  {t("blog.email_not_show")}
                </h6>
              </div>
              {[
                { title: t("tour.location"), value: 4.7 },
                { title: t("tour.staff"), value: 4.2 },
                { title: t("tour.cleanliness"), value: 4.7 },
                { title: t("tour.value_money"), value: 4 },
                { title: t("tour.comfort"), value: 4.45 },
                { title: t("tour.facilities"), value: 4 },
                { title: t("tour.free_wiFi"), value: 4.8 },
              ].map((p, i) => (
                <div key={i} className="col-span-1">
                  <Rating title={p.title} defaultValue={p.value} width="16px" />
                </div>
              ))}
            </div>
            <div className="col-span-1 xl:col-span-8 flex flex-col gap-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="">
                  <TextInput name="name" label={t("blog.your_display_name")} />
                </div>
                <div className="">
                  <TextInput name="email" label={t("footer.your_email")} />
                </div>
                <div className="col-span-2">
                  <TextAreaInput
                    name={"comment"}
                    label={t("blog.write_comment")}
                  />
                </div>
              </div>
              <button
                type="button"
                className="duration-300 flex w-fit gap-2 rounded-md mt-2 py-2 px-3 border-2 border-darkblue dark:border-lightblue bg-darkblue dark:bg-lightblue hover:border-dark hover:bg-dark text-white dark:hover:border-white dark:hover:bg-white dark:text-dark"
              >
                {t("blog.post_comment")}
                <HiArrowRight
                  className="-rotate-45 rtl:rotate-[-135deg]"
                  size={24}
                />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

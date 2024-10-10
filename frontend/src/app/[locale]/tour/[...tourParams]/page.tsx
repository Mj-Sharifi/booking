"use client";
import { tourData } from "@/types/response";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "@/styles/popularTourSlider.css";
import { FaBus, FaRegClock, FaUsers } from "react-icons/fa6";
import { TiCancel } from "react-icons/ti";
import { useTranslations } from "next-intl";

export default function SingleTour() {
  const t = useTranslations();
  const { tourParams, locale } = useParams<{
    locale: string;
    tourParams: string[];
  }>();
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
  console.log(tourData);
  return (
    <div className="flex flex-col">
      {tourData && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-12">
            <div className="md:col-span-8">
              <h1 className="text-lg md:text-2xl xl:text-3xl font-semibold text-center mb-4 md:mb-8">
                {tourData.attributes.title}
              </h1>
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
            <div className="md:col-span-4"></div>
          </div>
          <div className="grid grid-cols-12 gap-8 pb-3 md:pb-6 mb-4 md:mb-8 border-b border-light dark:border-lighter">
            <h4 className="col-span-12 font-semibold text-sm sm:text-base lg:text-lg">{t("tour.important_info")}</h4>
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
        </>
      )}
    </div>
  );
}

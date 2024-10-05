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
import { HiOutlineClock } from "react-icons/hi2";
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
    <div className="grid grid-cols-1 md:grid-cols-12">
      {tourData && (
        <>
          <div className="col-span-8">
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

            <div className="pb-3 md:pb-6 mb-4 md:mb-8 border-b border-light dark:border-lighter grid grid-cols-6 md:grid-cols-12 gap-x-4 text-xs md:text-sm">
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
          </div>

          <div className="col-span-4"></div>
        </>
      )}
    </div>
  );
}

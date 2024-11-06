"use client";
import React from "react";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import Slider from "@/components/Slider";

// Import Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
// import "./style.css";
import "@/Styles/popularTourSlider.css"
import { tourData } from "@/types/response";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { FaRegHeart } from "react-icons/fa6";
import NavigationLink from "@/components/link/NavigationLink";

export default function PopularTours() {
  const { locale } = useParams();
  const t = useTranslations();
  // Getting Data
  const [popularTours, setPopularTours] = useState<tourData[]>();
  useEffect(() => {
    axios
      .get(
        process.env.NEXT_PUBLIC_API +
          `tours?populate=*&locale=${locale}&filters[isPopular][$eq]=true`
      )
      .then((res) => setPopularTours(res.data.data))
      .catch((err) => console.log(err));
  }, []);
  // Entrance Animation
  const [startAnimation, setStartAnimation] = useState<boolean>(false);
  const popularTourDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartAnimation(true);
        }
      },
      { threshold: 0.1 }
    );

    if (popularTourDiv.current) {
      observer.observe(popularTourDiv.current);
    }
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-8 pt-14 sm:pt-20 md:pt-28 lg:pt-32 pb-7 sm:pb-10 md:pb-14 lg:pb-16">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-1">
        {t("tour.most_popular_tours")}
      </h2>
      <p className="text-light dark:text-lighter mb-8">
        {t("common.lorem_ipsum_short")}
      </p>
      <div className="w-full" ref={popularTourDiv}>
        {popularTours && (
          <Slider
            number={popularTours.length}
            swiperParam={{
              slidesPerView: 1,
              spaceBetween: 20,
              breakpoints: {
                [580]: { slidesPerView: 2, spaceBetween: 20 },
                [1024]: { slidesPerView: 4, spaceBetween: 40 },
              },
            }}
          >
            {popularTours.map((e, i: number) => (
              <SwiperSlide key={e.id}>
                <div
                  className=""
                  style={{
                    transition: "all 1.5s",
                    transitionDelay: `${i * 0.2 + 0.1}s`,
                    opacity: `${startAnimation ? "1" : "0"}`,
                  }}
                >
                  <NavigationLink
                    href={{
                      pathname: "/tour/[id]/[title]",
                      params: { id:e.id,title:e.attributes.title.trim().replaceAll(" ","-") },
                    }}
                    className="group duration-300 relative h-72 flex flex-col items-center shadow rounded"
                  >
    
                      <div className="overflow-hidden w-full aspect-[0.9]">
                        <Swiper
                          spaceBetween={20}
                          navigation={true}
                          modules={[Navigation]}
                          className="mySwiper popularTourSwiper"
                        >
                          {e.attributes.images.data.map((m, n) => (
                            <SwiperSlide key={n}>
                              <img
                                src={
                                  process.env.NEXT_PUBLIC_URL + m.attributes.url
                                }
                                alt={e?.attributes?.title.trim()}
                                className="duration-300 w-full group-hover:scale-110"
                              />
                            </SwiperSlide>
                          ))}
                        </Swiper>
                      </div>
                      <div className="flex flex-col text-sm items-center justify-evenly px-2 h-full">
                        {e?.attributes?.duration} {t("tour.days")}
                        <div className="text-light dark:text-lighter flexCenter gap-1 text-base">
                          {e?.attributes?.categories?.data.map((m, n) => (
                            <React.Fragment key={n}>
                              <p>{m.attributes.title}</p>
                              {n !==
                                e?.attributes?.categories?.data.length - 1 && (
                                <div className="w-1 h-1 bg-dark rounded-full"></div>
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                        <h2 className="text-lg font-semibold text-center">
                          {e?.attributes?.title}
                        </h2>
                        <h4 className="text-light dark:text-lighter text-sm ">
                          {e?.attributes?.place}
                        </h4>
                        <div className="flex justify-between font-medium">
                          {e?.attributes?.price} {t("footer.usd")}
                        </div>
                        <div className="p-1 rounded-full absolute top-[2%] right-[2%] z-20 duration-300 transition-all text-black hover:text-white bg-white hover:bg-darkblue">
                          <FaRegHeart size={16} />
                        </div>
                      </div>
   
                  </NavigationLink>
                </div>
              </SwiperSlide>
            ))}
          </Slider>
        )}
      </div>
    </div>
  );
}

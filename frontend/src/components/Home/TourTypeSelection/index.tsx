"use client";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
// import Slider from "@/components/Slider";
import { SwiperSlide } from "swiper/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { tourCategoryData } from "@/types/response";
import { useTranslations } from "next-intl";

export default function TourTypeSelection() {
  const t = useTranslations()
  const {locale}=useParams()
  const [tourCategories, setTourCategories] = useState<tourCategoryData[]>();
  useEffect(() => {
    axios
      .get(process.env.NEXT_PUBLIC_API + `categories?populate=*&locale=${locale}`)
      .then((res) => setTourCategories(res.data.data))
      .catch((err) => console.log(err));
  }, []);
  // Entrance Animation
  const [startAnimation, setStartAnimation] = useState<boolean>(false);
  const tourCategoryDiv = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartAnimation(true);
        }
      },
      { threshold: 0.1 }
    );

    if (tourCategoryDiv.current) {
      observer.observe(tourCategoryDiv.current);
    }
  }, []);
  return (
    <section className="container mx-auto px-4 sm:px-6 md:px-8 pt-14 sm:pt-20 md:pt-28 lg:pt-32 pb-7 sm:pb-10 md:pb-14 lg:pb-16">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-1">
        {t("tour.choose_tour_type")}
      </h2>
      <p className="text-light dark:text-lighter mb-8">
      {t("common.lorem_ipsum_short")}
      </p>
      <div className="w-full" ref={tourCategoryDiv}>
        {/* {tourCategories && (
          <Slider
            number={tourCategories.length}
            swiperParam={{
              slidesPerView: 1,
              spaceBetween: 20,
              breakpoints: {
                [450]: { slidesPerView: 2, spaceBetween: 20 },
                [768]: { slidesPerView: 3, spaceBetween: 30 },
                [1024]: { slidesPerView: 5, spaceBetween: 40 },
              },
            }}
          >
            {tourCategories.map((e, i: number) => (
              <SwiperSlide key={e.id}>
                <div
                  className="group bg-hoverlight shadow rounded-md dark:text-dark"
                  style={{
                    transition: "all 1.5s",
                    transitionDelay: `${i * 0.1 + 0.1}s`,
                    opacity: `${startAnimation ? "1" : "0"}`,
                  }}
                >
                  <Link
                    href=""
                    className="flex flex-col items-center gap-2 overflow-hidden duration-300 py-8 hover:py-6"
                  >
                    <img
                      src={
                        process.env.NEXT_PUBLIC_URL +
                        e.attributes.image.data.attributes.url
                      }
                      alt={e.attributes.title}
                      className="w-1/2"
                    />
                    <h2>{e.attributes.title}</h2>
                    <h4>{e.attributes.tours.data.length} {t("tour.tours")}</h4>
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Slider>
        )} */}
      </div>
    </section>
  );
}

"use client";
import React from "react";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import Slider from "@/Components/Slider";
import { favoriteSVG } from "@/Utils/svg";

// Import Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./style.css";
export default function PopularTours() {
  // Getting Data
  const [popularTours, setPopularTours] = useState();
  useEffect(() => {
    axios
      .get(
        process.env.NEXT_PUBLIC_API +
          "tours?populate=*&filters[isPopular][$eq]=true"
      )
      .then((res) => setPopularTours(res.data))
      .catch((err) => console.log(err));
  }, []);
  // Entrance Animation
  const [startAnimation, setStartAnimation] = useState<boolean>(false);
  const popularTour = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (popularTour) {
      window.addEventListener("scroll", () => {
        const popularTourTop = popularTour.current?.getBoundingClientRect().top;
        const scrollY = window.scrollY;
        if (popularTourTop) {
          if (0.6 * popularTourTop <= scrollY) {
            setStartAnimation(true);
          }
        }
      });
    }
  }, [popularTours]);
  return (
    <section className="container mx-auto px-4 sm:px-6 md:px-8 pt-14 sm:pt-20 md:pt-28 lg:pt-32 pb-7 sm:pb-10 md:pb-14 lg:pb-16">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-1">
        Most Popular Tours
      </h2>
      <p className="text-light mb-8">
        Interdum et malesuada fames ac ante ipsum
      </p>
      {popularTours && (
        <Slider
          number={popularTours.data.length}
          swiperParam={{
            slidesPerView: 1,
            spaceBetween: 20,
            breakpoints: {
              [580]: { slidesPerView: 2, spaceBetween: 20 },
              [1024]: { slidesPerView: 4, spaceBetween: 40 },
            },
          }}
        >
          {popularTours.data.map((e, i: number) => (
            <SwiperSlide key={e.id}>
              <div
                ref={popularTour}
                className="group duration-300 relative h-72 flex flex-col items-center shadow rounded"
                style={{
                  transition: "all 1.5s",
                  transitionDelay: `${i*0.1+0.1}s`,
                  opacity: `${startAnimation ? "1" : "0"}`,
                }}
              >
                <div className="overflow-hidden w-full aspect-[0.9]">
                  <Swiper
                    spaceBetween={20}
                    navigation={true}
                    modules={[Navigation]}
                    className="mySwiper popularTourSwiper"
                  >
                    {e.attributes.images?.data.map((m, n) => (
                      <SwiperSlide key={n}>
                        <img
                          src={process.env.NEXT_PUBLIC_URL + m?.attributes?.url}
                          alt={e?.attributes?.title}
                          className="duration-300 w-full group-hover:scale-110"
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
                <div className="flex flex-col text-sm items-center justify-evenly px-2 h-full">
                  {e?.attributes?.duration}
                  <div className="text-light flexCenter gap-1 text-base">
                    {e?.attributes?.categories?.data.map((m, n) => (
                      <React.Fragment key={n}>
                        <p>{m.attributes.title}</p>
                        {n !== e?.attributes?.categories?.data.length - 1 && (
                          <div className="w-1 h-1 bg-dark rounded-full"></div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                  <h2 className="text-lg font-semibold text-center">
                    {e?.attributes?.title}
                  </h2>
                  <h4 className="text-light text-sm ">
                    {e?.attributes?.place}
                  </h4>
                  <div className="flex justify-between font-medium">
                    {e?.attributes?.price} $
                  </div>
                  <div className="p-1 rounded-full absolute top-[2%] right-[2%] z-20 duration-300 transition-all text-black hover:text-white bg-white hover:bg-darkblue">
                    {favoriteSVG("w-5 h-5")}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Slider>
      )}
    </section>
  );
}
// top-[2%] right-[2%]

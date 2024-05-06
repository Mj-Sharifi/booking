"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SwiperSlide } from "swiper/react";
import Slider from "@/Components/Slider";
import {
  APIResponse,
  APIResponseCollection,
  APIResponseData,
} from "@/types/types";
import { favoriteSVG } from "@/Utils/svg";

export default function PopularTours() {
  // Getting Data
  const [popularTours, setPopularTours] =
    useState<APIResponseCollection<"api::tour.tour">>();
  useEffect(() => {
    axios
      .get(
        process.env.NEXT_PUBLIC_API +
          "tours?populate=*&filters[isPopular][$eq]=true"
      )
      .then((res) => setPopularTours(res.data))
      .catch((err) => console.log(err));
  }, []);
  console.log(popularTours);
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
          {popularTours.data.map((e) => (
            <SwiperSlide key={e.id}>
              <div className="group duration-300 relative h-72 flex flex-col items-center shadow rounded ">
                <div className="overflow-hidden w-full aspect-[0.9]">
                  <img
                    src={
                      process.env.NEXT_PUBLIC_URL +
                      e?.attributes?.imagePrimary?.data?.attributes.url
                    }
                    alt={e?.attributes?.title}
                    className="duration-300 w-full group-hover:scale-110"
                  />
                </div>
                <div className="flex flex-col items-center justify-evenly px-2 h-full">
                  <div className="text-light text-sm flexCenter gap-1">
                    {e?.attributes?.duration}
                    <div className="w-1 h-1 bg-dark rounded-full"></div>
                    {e?.attributes?.category?.data.map((m, n) => (
                      <p>{m.attributes.title}</p>
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

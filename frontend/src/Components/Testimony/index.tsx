"use client";
import axios from "axios";
import React, { ReactNode, useEffect, useRef, useState } from "react";

// import swiper for slider
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { leftArrowSVG, rightArrowSVG } from "@/Utils/svg";
type fetchData = {
  id: number;
  attributes;
};
const SwiperButtonNext = ({
  activeIndex,
  lastSlide,
}: {
  activeIndex: number;
  lastSlide: number;
}) => {
  const swiper = useSwiper();
  return (
    <button
      disabled={activeIndex === lastSlide}
      className={`duration-200 ${
        activeIndex === 0
          ? "hover:translate-x-. hover:scale-100"
          : "hover:translate-x-2 hover:scale-125"
      }`}
      onClick={() => swiper.slideNext()}
    >
      {rightArrowSVG(
        `duration-200 w-6 h-6 text-dark hover:text-violet ${
          activeIndex === lastSlide
            ? "text-light hover:text-light"
            : "text-dark hover:text-violet"
        }`
      )}
    </button>
  );
};
const SwiperButtonPrev = ({ activeIndex }: { activeIndex: number }) => {
  const swiper = useSwiper();
  return (
    <button
      disabled={activeIndex == 0}
      className={`duration-200 ${
        activeIndex === 0
          ? "hover:translate-x-0 hover:scale-100"
          : "hover:translate-x-2 hover:scale-125"
      }`}
      onClick={() => swiper.slidePrev()}
    >
      {leftArrowSVG(
        `duration-200 w-6 h-6 ${
          activeIndex === 0
            ? "text-light hover:text-light"
            : " text-dark hover:text-violet"
        }`
      )}
    </button>
  );
};
const SwiperPagination = ({ number }: { number: number }) => {
  const swiper = useSwiper();
  return (
    <ul className="flexCenter gap-2">
      {Array(number)
        .fill(true)
        .map((e, i) => (
          <li
            key={i}
            className={`cursor-pointer transition-all duration-200 h-[6px] w-[6px] ${
              i === swiper.activeIndex
                ? " bg-violet scale-150 opacity-100"
                : " bg-light opacity-80"
            } rounded-full`}
            onClick={() => swiper.slideTo(i)}
          ></li>
        ))}
    </ul>
  );
};
export default function Testimony() {
  // Getting Data
  const [testimonies, setTestimonies] = useState<fetchData[]>();
  useEffect(() => {
    axios
      .get(process.env.NEXT_PUBLIC_API + "testimonies?populate=*")
      .then((res) => setTestimonies(res.data.data))
      .catch((err) => console.log(err));
  }, []);
  // Entrance Animation
  const [startAnimation, setStartAnimation] = useState<boolean>(false);
  const testimony = useRef<HTMLDivElement>(null);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      const testimonyTop = testimony.current?.getBoundingClientRect().top;
      const scrollY = window.scrollY;
      if (testimonyTop) {
        if (testimonyTop > 1.05 * scrollY) {
          setStartAnimation(true);
        }
      }
    });
  }, []);
  //Slider
  const [activIndex, setActiveIndex] = useState<number>(0);
  return (
    <section className="relative flexCenter pt-12">
      <img
        src="/assets/images/testimony/testimony-bg.png"
        className="absolute top-0 h-full w-full object-cover"
        alt="testimony background"
      />
      <div
        ref={testimony}
        className={`duration-500 ${
          startAnimation ? "translate-y-0" : "translate-y-[5%]"
        } bg-transparent overflow-hidden w-96 md:w-112 lg:w-128`}
      >
        <h5 className="text-xl sm:text-2xl md:text-3xl font-semibold text-center mb-1">
          Customer Reviews
        </h5>
        <p className="text-light text-center text-">
          Interdum et malesuada fames ac ante ipsum
        </p>
        <Swiper
          slidesPerView={1}
          className="mySwiper"
          onActiveIndexChange={(e) => setActiveIndex(e.activeIndex)}
        >
          {testimonies?.map((e, i) => (
            <SwiperSlide key={i}>
              <div className="flex flex-col items-center px-2 sm:px-0 sm:w-96 md:w-112 lg:w-128">
                <div className="relative mb-5">
                  <img
                    src="/assets/images/testimony/testimony-lines.svg"
                    className=""
                  />
                  <img
                    src={
                      process.env.NEXT_PUBLIC_URL +
                      e?.attributes?.image.data.attributes.url
                    }
                    className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 scale-125"
                  />
                </div>
                <h5 className="text-darkblue font-semibold mb-5">
                  {e?.attributes?.place}
                </h5>
                <p className="mb-10 text-dark">
                  "{e?.attributes?.description}"
                </p>
                <h5 className="mb-1 text-dark">{e?.attributes?.name}</h5>
                <h6 className="text-light">{e?.attributes?.skill}</h6>
              </div>
            </SwiperSlide>
          ))}
          {testimonies && (
            <div className="flexCenter gap-6 mt-10">
              <SwiperButtonPrev activeIndex={activIndex} />
              <SwiperPagination number={testimonies?.length} />
              <SwiperButtonNext
                activeIndex={activIndex}
                lastSlide={testimonies?.length - 1}
              />
            </div>
          )}
        </Swiper>
      </div>
    </section>
  );
}

import React, { ReactNode, useEffect, useRef, useState } from "react";
import { leftArrowSVG, rightArrowSVG } from "@/Utils/svg";

//Import Swiper
import { Swiper, useSwiper } from "swiper/react";
import { SwiperOptions } from "swiper/types";
import "swiper/css";
import { Pagination } from "swiper/modules";
import "./style.css"
const SwiperButtonNext = ({
  activeIndex,
  lastSlideIndex,
}: {
  activeIndex: number;
  lastSlideIndex: number;
}) => {
  const swiper = useSwiper();
  return (
    <button
      disabled={activeIndex === lastSlideIndex}
      className={`duration-200 ${
        activeIndex === 0
          ? "hover:translate-x-. hover:scale-100"
          : "hover:translate-x-2 hover:scale-125"
      }`}
      onClick={() => swiper.slideNext()}
    >
      {rightArrowSVG(
        `duration-200 w-6 h-6 text-dark hover:text-violet ${
          activeIndex === lastSlideIndex
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

export default function Slider({
  children,
  number,
  swiperParam,
}: {
  children: ReactNode;
  number: number;
  slidesPerView?: number;
  swiperParam: SwiperOptions;
}) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  return (
    <Swiper
      slidesPerView={swiperParam.slidesPerView}
      breakpoints={swiperParam.breakpoints}
      className="mySwiper"
      onActiveIndexChange={(e) => setActiveIndex(e.activeIndex)}
      pagination={{
        el: ".swiperPagination",
        clickable: true,
        type: "bullets",
        bulletActiveClass:
          "swiperPaginationBulletActive",
        bulletClass: "swiperPaginationBullet",
      }}
      modules={[Pagination]}
    >
      {children}
      {children && (
        <div className="flexCenter gap-6 mt-10">
          <SwiperButtonPrev activeIndex={activeIndex} />
          <div className="swiperPagination flex gap-2"></div>
          <SwiperButtonNext
            activeIndex={activeIndex}
            lastSlideIndex={number - 1}
          />
        </div>
      )}
    </Swiper>
  );
}

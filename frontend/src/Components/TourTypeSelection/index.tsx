"use client";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

import Slider from "@/Components/Slider";
import { SwiperSlide } from "swiper/react";
import Link from "next/link";
import { categoryData } from "@/types/types";

const icons = [];
export default function TourTypeSelection() {
  const [tourCategories, setTourCategories] = useState<categoryData[]>();
  useEffect(() => {
    axios
      .get(process.env.NEXT_PUBLIC_API + "categories?populate=*")
      .then((res) => setTourCategories(res.data.data))
      .catch((err) => console.log(err));
  }, []);
  // Entrance Animation
  const [startAnimation, setStartAnimation] = useState<boolean>(false);
  const tourCategoryDiv = useRef<HTMLDivElement>(null);
  useEffect(() => {
  if (tourCategories) {
    window.addEventListener("scroll", () => {
      const tourCategoriesTop =
        tourCategoryDiv.current?.getBoundingClientRect().top;
      const scrollY = window.scrollY;
      if (tourCategoriesTop) {
        if (0.4 * tourCategoriesTop <= scrollY) {
          setStartAnimation(true);
        }
      }
    });
  }
}, [tourCategories]);
  return (
    <>
      {tourCategories && (
        <section className="container mx-auto px-4 sm:px-6 md:px-8 pt-14 sm:pt-20 md:pt-28 lg:pt-32 pb-7 sm:pb-10 md:pb-14 lg:pb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-1">
            Choose Tour Types
          </h2>
          <p className="text-light mb-8">
            Interdum et malesuada fames ac ante ipsum
          </p>
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
                  ref={tourCategoryDiv}
                  className="group bg-hoverlight shadow rounded"
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
                    <h4>{e.attributes.tours.data.length} tours</h4>
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Slider>
        </section>
      )}
    </>
  );
}

  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       entries.forEach((entry) => {
  //         if (entry.isIntersecting) {
  //           // When the div enters the viewport, set the animate state to true
  //           setStartAnimation(true);
  //           observer.unobserve(entry.target); // Stop observing once animation starts
  //         }
  //       });
  //     },
  //     {
  //       threshold: 0.5,
  //     }
  //   );

  //   if (tourCategoryDiv.current) {
  //     observer.observe(tourCategoryDiv.current);
  //   }

  //   return () => {
  //     if (tourCategoryDiv.current) {
  //       observer.unobserve(tourCategoryDiv.current);
  //     }
  //   };
  // }, []);
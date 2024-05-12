"use client";
import axios from "axios";
import React, { ReactNode, useEffect, useRef, useState } from "react";
//Slider
import Slider from "../Slider";
import { SwiperSlide } from "swiper/react";
import { testimonyData } from "@/types/types";

export default function Testimony() {
  // Getting Data
  const [testimonies, setTestimonies] = useState<testimonyData[]>();
  useEffect(() => {
    axios
      .get(process.env.NEXT_PUBLIC_API + "testimonies?populate=*")
      .then((res) => setTestimonies(res.data.data))
      .catch((err) => console.log(err));
  }, []);
  // Entrance Animation
  const [startAnimation, setStartAnimation] = useState<boolean>(false);
  const testimonyDiv = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (testimonies) {
      window.addEventListener("scroll", () => {
        const testimonyTop = testimonyDiv.current?.getBoundingClientRect().top;
        const scrollY = window.scrollY;
        if (testimonyTop) {
          if (1.35 * testimonyTop <= scrollY - window.innerHeight) {
            setStartAnimation(true);
          }
        }
      });
    }
  }, [testimonies]);
  return (
    <>
      {testimonies && (
        <section className="relative flexCenter pt-12">
          <img
            src="/assets/images/home/testimony/testimony-bg.png"
            className="absolute top-0 h-full w-full object-cover"
            alt="testimony background"
          />
          <div
            ref={testimonyDiv}
            className="bg-transparent overflow-hidden w-96 md:w-112 lg:w-128"
            style={{
              transition: "all 1500ms",
              transform: `${
                startAnimation ? "translateY(0)" : "translateY(40px)"
              }`,
            }}
          >
            <h5 className="text-xl sm:text-2xl md:text-3xl font-semibold text-center mb-1">
              Customer Reviews
            </h5>
            <p className="text-light text-center text-">
              Interdum et malesuada fames ac ante ipsum
            </p>{" "}
            <Slider
              number={testimonies?.length}
              swiperParam={{ slidesPerView: 1 }}
            >
              {testimonies?.map((e, i) => (
                <SwiperSlide key={i}>
                  <div className="flex flex-col items-center px-2 sm:px-0 sm:w-96 md:w-112 lg:w-128">
                    <div className="relative mb-5">
                      <img src="/assets/images/home/testimony/testimony-lines.svg" />
                      <img
                        src={
                          process.env.NEXT_PUBLIC_URL +
                          e?.attributes.image?.data.attributes.url
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
            </Slider>
          </div>
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
  //           // entry.target.classList.add('animate');
  //           setStartAnimation(true)
  //         }
  //       });
  //     },
  //     {
  //       threshold: 0.5, // Adjust this value as needed
  //     }
  //   );

  //   if (testimonyDiv.current) {
  //     observer.observe(testimonyDiv.current);
  //   }

  //   return () => {
  //     if (testimonyDiv.current) {
  //       observer.unobserve(testimonyDiv.current);
  //     }
  //   };
  // }, []);
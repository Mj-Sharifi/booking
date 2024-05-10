"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

import Slider from "@/Components/Slider";
import { SwiperSlide } from "swiper/react";
export default function TourTypeSelection() {
  const [tourCategories, setTourCategories] = useState();
  useEffect(() => {
    axios
      .get(process.env.NEXT_PUBLIC_API + "categories?populate=*")
      .then((res) => setTourCategories(res.data))
      .catch((err) => console.log(err));
  }, []);
  console.log(tourCategories);
  return (
    <>
      {tourCategories && (
        <div></div>
        // <Slider
        //   number={tourCategories.data.length}
        //   swiperParam={{
        //     slidesPerView: 1,
        //     spaceBetween: 20,
        //     breakpoints: {
        //       [580]: { slidesPerView: 2, spaceBetween: 20 },
        // [768]: { slidesPerView: 3, spaceBetween: 30 }
        //       [1024]: { slidesPerView: 5, spaceBetween: 40 },
        //     },
        //   }}
        // >
        //   {tourCategories.data.map((e) => (
        //     <SwiperSlide key={e.id}>
        //       <div className="group duration-300 relative h-72 flex flex-col items-center shadow rounded ">
        //         <div className="flex flex-col text-sm items-center justify-evenly px-2 h-full">
        //           {e?.attributes?.duration}

        //           <h2 className="text-lg font-semibold text-center">
        //             {e?.attributes?.title}
        //           </h2>
        //           <h4 className="text-light text-sm ">
        //             {e?.attributes?.place}
        //           </h4>
        //           <div className="flex justify-between font-medium">
        //             {e?.attributes?.price} $
        //           </div>
        //         </div>
        //       </div>
        //     </SwiperSlide>
        //   ))}
        // </Slider>
      )}
    </>
  );
}

"use client";
import React, { useState } from "react";
import DatePicker, { DateObject, Calendar } from "react-multi-date-picker";
import type { Value } from "react-multi-date-picker";
import styles from "./style.module.css";
export default function Banner() {
  //DatePicker
  const [dateRange, setDateRange] = useState<Value>(new Date());
  return (
    <div className="font-jost relative pt-24 md:pt-56 xl:pt-64 pb-14 md:pb-40 xl:pb-52">
      <div className="absolute left-0 top-0 h-full w-full md:w-7/12">
        <img
          src="/assets/images/banner/bg-1.svg"
          alt="bg-banner"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="container px-2 sm:px-6 mx-auto w-full relative z-10">
        <div className="w-full ">
          <div className="flex items-start md:w-2/3 lg:w-3/5 text-2xl sm:text-4xl md:text-5xl font-semibold">
            Best Travel &nbsp;
            <span className="relative text-darkblue">
              Experience
              <span className="absolute -bottom-1/4 left-0 w-full">
                <img
                  src="/assets/images/banner/line.png"
                  className="w-full object-cover"
                />
              </span>
            </span>
          </div>
          <p className="mt-6 text-light md:w-2/3 lg:w-3/5">
            Experience the various exciting tour and travel packages and Make
            hotel reservations, find vacation packages, search cheap hotels and
            events
          </p>
          <div className="bg-white rounded-md w-full xl:w-4/5 p-5 flex flex-col lg:flex-row">
            <div className="flex flex-col gap-3">
              <span className="font-semibold">Location</span>
              <input
                className="border-none outline-none"
                placeholder="Where are you going?"
              />
            </div>
            <div className="flex flex-col gap-3 border-x border-border">
              <span className="font-semibold">Check in - Check out</span>
              <DatePicker
                value={dateRange}
                onChange={setDateRange}
                format="MMMM DD"
                range
                numberOfMonths={2}
                // containerClassName={styles["date-picker"]}
              />
            </div>
            <div className="flex flex-col gap-3">
              <span className="font-semibold">Guest</span>
              <span className="text-nowrap">Where are you going?</span>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute hidden md:block right-0 top-0 h-full w-5/12">
        <img
          src="/assets/images/banner/bg-2.jpg"
          alt="bg-banner"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

"use client";
import TourSidebar from "@/components/Tour/TourSidebar";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { tourData } from "@/types/response";
import TourCard from "@/components/Tour/TourCard";
export default function Tours() {
  const { locale } = useParams();
  const [tours, setTours] = useState<tourData[]>();
  const t = useTranslations();
  // Handle Category
  const [category, setCategory] = useState<string[]>([]);
  const handleCategory = (c: string) => {
    if (c == "all") {
      setCategory([]);
    } else if (category.includes(c)) {
      const newList = category.filter((e) => {
        return !(e == c);
      });
      setCategory(newList);
    } else {
      setCategory([...category, c]);
    }
  };
  // Handle Duration
  const [durationRange, setDurationRange] = useState<string>([]);
  const handleDuration = (c: string) => {
    if (c == "all") {
      setCategory([]);
    } else if (category.includes(c)) {
      const newList = category.filter((e) => {
        return !(e == c);
      });
      setCategory(newList);
    } else {
      setCategory([c]);
    }
  };
  useEffect(() => {
    const filterQuery = () => {
      const categoryQuery: string[] =
        category.length > 0
          ? category.map((e) => `&filters[categories][title][$contains]=${e}`)
          : [""];
      const durationQuery: string =
        category.length > 0
          ? `&filters[duration][$gte]=${durationRange.split("-")[0]}${
              durationRange.split("-")[1]
                ? `&filters[duration][$lte]=${durationRange.split("-")[1]}`
                : ""
            }`
          : "";
      return categoryQuery.join("")+durationQuery;
    };
    axios
      .get(
        process.env.NEXT_PUBLIC_API +
          `tours?populate=*&locale=${locale}${filterQuery()}&filters[duration][$lte]=5`
      )
      .then((res) => setTours(res.data.data));
  }, [category]);
  console.log(tours);
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 sm:gap-6 lg:gap-8">
      <div className="col-span-1">
        <TourSidebar handleCategory={handleCategory} handleDuration={handleDuration} category={category} />
      </div>
      <div className="col-span-1 md:col-span-3 flex flex-col gap-y-6 px-6 sm:px-2">
        {tours &&
          tours?.map(({ id, attributes }, i) => (
            <TourCard
              key={i}
              id={id}
              duration={attributes.duration}
              title={attributes.title}
              image={attributes.imagePrimary.data.attributes.url}
            />
          ))}
      </div>
    </div>
  );
}

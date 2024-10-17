"use client";
import TourSidebar from "@/components/Tour/TourSidebar";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { tourCategoryData, tourData } from "@/types/response";
import TourCard from "@/components/Tour/TourCard";
import { FaFilter } from "react-icons/fa6";
import Drawer from "@/components/Drawer";
export default function Tours() {
  const { locale } = useParams();
  const [tours, setTours] = useState<tourData[]>();
  const [filteredTours, setFilteredTours] = useState<tourData[]>();
  const t = useTranslations();
  // Handle Category
  const [allCategories, setAllCategories] = useState<tourCategoryData[]>();
  useEffect(() => {
    axios
      .get(process.env.NEXT_PUBLIC_API + `categories?locale=${locale}`)
      .then((res) => setAllCategories(res.data.data));
  }, []);
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
  const [durationRange, setDurationRange] = useState<string>("");
  const handleDuration = (d: string) => {
    if (durationRange == d) {
      setDurationRange("");
    } else {
      setDurationRange(d);
    }
  };
  // Handle Price
  const [priceRange, setPriceRange] = useState<number[]>([0,2000])
  const handlePrice = (newValue:number[]) => {
    setPriceRange(newValue);
  };
  // Backend Filters
  useEffect(() => {
    const filterQuery = () => {
      const categoryQuery: string[] =
        category.length > 0
          ? category.map((e) => `&filters[categories][title][$contains]=${e}`)
          : [""];
      const durationQuery: string = durationRange
        ? `&filters[duration][$gte]=${durationRange.split("-")[0]}${
            durationRange.split("-")[1]
              ? `&filters[duration][$lte]=${durationRange.split("-")[1]}`
              : ""
          }`
        : "";
      return categoryQuery.join("") + durationQuery;
    };
    axios
      .get(
        process.env.NEXT_PUBLIC_API +
          `tours?populate=*&locale=${locale}${filterQuery()}`
      )
      .then((res) => setTours(res.data.data));
  }, [JSON.stringify(category), durationRange]);

  // Handle Free Cancelation
  const [freeCancelation, setFreeCancelation] = useState(false);
  // Frontend Filters
  useEffect(() => {
    let newTours = tours;
    if (freeCancelation) {
      newTours = newTours?.filter((t) => t.attributes.free_cancelation);
    }
    setFilteredTours(newTours);
  }, [JSON.stringify(tours), freeCancelation]);
  // Show filter
  const [showFilter, setShowFilters] = useState(false);
  useEffect(() => {
    const handleFilterResize = () => {
      if (window.innerWidth > 1024) {
        console.log("handleFilterResize");
        setShowFilters(false);
        document.body.classList.remove("body_wrapper");
      }
    };
    const handleFilterClick = (e: MouseEvent) => {
      console.log("handleFilterClick");
      if (!(e.target as HTMLElement).closest(".tour-mobile-filters")) {
        setShowFilters(false);
        document.body.classList.remove("body_wrapper");
      }
    };
    window;
    window.addEventListener("resize", handleFilterResize);
    window.addEventListener("click", handleFilterClick);
    return () => {
      window.removeEventListener("resize", handleFilterResize);
      window.removeEventListener("click", handleFilterClick);
    };
  }, []);
  console.log(tours);
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-4 sm:gap-6 lg:gap-8">
        <div className="hidden lg:block col-span-1">
          {allCategories && (
            <TourSidebar
              allCategories={allCategories}
              handleCategory={handleCategory}
              category={category}
              handleDuration={handleDuration}
              duration={durationRange}
              freeCancelation={freeCancelation}
              handleFreeCancelation={() => setFreeCancelation(!freeCancelation)}
              price={priceRange}
              handlePrice={handlePrice}
            />
          )}
        </div>
        <div className="col-span-1 lg:col-span-3 px-6 sm:px-2">
          <div className="flex">
            <button
              type="button"
              className="tour-mobile-filters px-3 py-2 rounded-md flex gap-1 items-center bg-hoverlight text-darkblue lg:hidden"
              onClick={() => {
                setShowFilters(true);
                document.body.classList.add("body_wrapper");
              }}
            >
              {t("common.filter")} <FaFilter size={18} />
            </button>
          </div>
          <div className=" flex flex-col">
            {filteredTours &&
              filteredTours?.map(({ id, attributes }, i) => (
                <TourCard
                  key={i}
                  id={id}
                  duration={attributes.duration}
                  title={attributes.title}
                  image={attributes.imagePrimary.data.attributes.url}
                  place={attributes.place}
                  freeCancellation={attributes.free_cancelation}
                  rating={attributes.rating}
                  price={attributes.price}
                />
              ))}
          </div>
        </div>
      </div>
      <div
        className={`w-72 px-4 flex justify-center tour-mobile-filters duration-300 fixed bg-white dark:bg-dark top-0 bottom-0 z-[1000] min-h-screen ltr:border-r rtl:border-l border-darkblue dark:border-lightblue ${
          showFilter ? "ltr:left-0 rtl:right-0" : "ltr:-left-72 rtl:-right-72"
        }`}
      >
        {allCategories && (
          <Drawer show={showFilter} onClose={() => setShowFilters(false)}>
            <TourSidebar
              allCategories={allCategories}
              handleCategory={handleCategory}
              category={category}
              handleDuration={handleDuration}
              duration={durationRange}
              freeCancelation={freeCancelation}
              handleFreeCancelation={() => setFreeCancelation(!freeCancelation)}
              price={priceRange}
              handlePrice={handlePrice}
            />
          </Drawer>
        )}
      </div>
    </>
  );
}

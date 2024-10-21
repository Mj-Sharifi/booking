"use client";
import TourSidebar from "@/components/Tour/TourSidebar";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { tourCategoryData, tourData } from "@/types/response";
import TourCard from "@/components/Tour/TourCard";
import { FaFilter } from "react-icons/fa6";
import Drawer from "@/components/Drawer";
import { loading_status } from "@/types/types";
import Loader from "@/components/Loader";
import useTheme from "@/hooks/useTheme";
import TourSorting from "@/components/Tour/TourSorting";
import Dropdown from "@/components/Dropdown";
export default function Tours() {
  const { locale } = useParams();
  const [tours, setTours] = useState<tourData[]>();
  const [filteredTours, setFilteredTours] = useState<tourData[]>();
  const t = useTranslations();
  const [loading, setLoading] = useState<loading_status>("loading");
  // Handle Category
  const [allCategories, setAllCategories] = useState<tourCategoryData[]>();
  useEffect(() => {
    axios
      .get(process.env.NEXT_PUBLIC_API + `categories?locale=${locale}`)
      .then((res) => setAllCategories(res.data.data));
  }, []);
  const [category, setCategory] = useState<string[]>();
  const handleCategory = (c: string) => {
    if (c == "all") {
      setCategory([]);
    } else if (category?.includes(c)) {
      const newList = category.filter((e) => {
        return !(e == c);
      });
      setCategory(newList);
    } else {
      // @ts-ignore
      setCategory([...category, c]);
    }
  };

  // Handle Duration
  const [durationRange, setDurationRange] = useState<string>();
  const handleDuration = (d: string) => {
    if (durationRange == d) {
      setDurationRange("");
    } else {
      setDurationRange(d);
    }
  };
  // Handle Price
  const [priceRange, setPriceRange] = useState<number[]>();
  const handlePrice = (newValue: number[]) => {
    setPriceRange(newValue);
  };
  // Handle Free Cancelation
  const [freeCancelation, setFreeCancelation] = useState<boolean>();
  // Setting Filters from URL
  const searchParams = useSearchParams();
  useEffect(() => {
    let category = searchParams.get("category");
    if (category) {
      setCategory(category.split(","));
    } else {
      setCategory([]);
    }
    let price = searchParams.get("price");
    if (price) {
      setPriceRange(price.split("-").map(Number));
    } else {
      setPriceRange([0, 2000]);
    }
    let duration = searchParams.get("duration");
    if (duration) {
      setDurationRange(duration);
    } else {
      setDurationRange("");
    }
    let freeCancel = searchParams.get("freeCancel");
    if (freeCancel) {
      setFreeCancelation(true);
    } else {
      setFreeCancelation(false);
    }
  }, []);
  // Sorting
  const [sort, setSort] = useState<
    "price:asc" | "price:desc" | "duration:asc" | "duration:desc" | ""
  >("");
  const handleSorting = (
    s: "price:asc" | "price:desc" | "duration:asc" | "duration:desc"
  ) => {
    if (sort == "") {
      setSort(s);
    } else {
      setSort("");
    }
  };
  // Pagination
  const [page, setPage] = useState(1);
  const handlePagination = (p: number) => {
    setPage(p);
  };
  // Backend Filters
  useEffect(() => {
    if (priceRange && category && typeof durationRange == "string") {
      const filterQuery = () => {
        // Category Filter
        let categoryQuery =
          category.length > 0
            ? category.map((e) => `&filters[categories][value][$contains]=${e}`)
            : [""];
        // Duration Filter
        let durationQuery = durationRange
          ? `&filters[duration][$gte]=${durationRange.split("-")[0]}${
              durationRange.split("-")[1]
                ? `&filters[duration][$lte]=${durationRange.split("-")[1]}`
                : ""
            }`
          : "";
        // Price Filter
        const priceQuery: string = `&filters[price][$gte]=${priceRange[0]}&filters[price][$lte]=${priceRange[1]}`;
        return categoryQuery.join("") + durationQuery + priceQuery;
      };
      axios
        .get(
          process.env.NEXT_PUBLIC_API +
            `tours?populate=*&locale=${locale}${filterQuery()}${
              sort ? "&" + sort : ""
            }&pagination[page]=${page}&pagination[pageSize]=10`
        )
        .then((res) => {
          if (res.status == 200) {
            setTours(res.data.data);
            setLoading("success");
          } else {
            setLoading("failed");
          }
        })
        .catch(() => setLoading("failed"));
    }
  }, [
    JSON.stringify(category),
    durationRange,
    JSON.stringify(priceRange),
    page,
  ]);
  // Frontend Filters
  useEffect(() => {
    // Backend URL Query
    let categoryURL = "";
    let durationURL = "";
    let priceURL = "";
    if (category && durationRange && priceRange) {
      if (category.length > 0) {
        categoryURL = `category=${category.join(",")}`;
      }
      if (durationRange) {
        durationURL = `duration=${durationRange}`;
      }
      if (priceRange[0] !== 0 || priceRange[1] !== 2000) {
        priceURL = `price=${priceRange.join(",")}`;
      }
    }

    const backQuery = [categoryURL, durationURL, priceURL]
      .filter(Boolean)
      .join("&");
    let frontQuery = "";
    let newTours = tours ? [...tours] : [];
    if (freeCancelation) {
      newTours = newTours?.filter((t) => t.attributes.free_cancelation);
      frontQuery = "freeCancel=1";
    }
    setFilteredTours(newTours);
    // Calculate final Query
    let finalQuery = "";
    if (backQuery && frontQuery) {
      finalQuery = "?" + backQuery + "&" + frontQuery;
    } else if (backQuery) {
      finalQuery = "?" + backQuery;
    } else if (frontQuery) {
      finalQuery = "?" + frontQuery;
    }
    // Adding Filters to URL
    window.history.pushState(
      undefined,
      "",
      window.location.pathname + finalQuery
    );
  }, [JSON.stringify(tours), freeCancelation]);
  // Show filter
  const [showFilter, setShowFilters] = useState(false);
  useEffect(() => {
    const handleFilterResize = () => {
      if (window.innerWidth > 1024) {
        setShowFilters(false);
        document.body.classList.remove("body_wrapper");
      }
    };
    const handleFilterClick = (e: MouseEvent) => {
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
  const isDark = useTheme();
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-4 sm:gap-6 lg:gap-8">
        {loading == "success" ? (
          <>
            <div className="hidden lg:block col-span-1">
              {allCategories &&
              priceRange &&
              category &&
              typeof durationRange == "string" &&
              typeof freeCancelation == "boolean" ? (
                <TourSidebar
                  allCategories={allCategories}
                  handleCategory={handleCategory}
                  category={category}
                  handleDuration={handleDuration}
                  duration={durationRange}
                  freeCancelation={freeCancelation}
                  handleFreeCancelation={() =>
                    setFreeCancelation(!freeCancelation)
                  }
                  price={priceRange}
                  handlePrice={handlePrice}
                />
              ) : (
                ""
              )}
            </div>
            <div className="col-span-1 lg:col-span-3 px-6 sm:px-2">
              <div className="flex justify-between lg:justify-end">
                <Dropdown label={t("tour.sort")}>
                  <div className="flexCenter flex-col gap-y-2 text-xs md:text-sm shadow-md rounded-md">
                    {[
                      { title: t("tour.price:asc"), value: "price:asc" },
                      { title: t("tour.price:desc"), value: "price:desc" },
                      { title: t("tour.duration:asc"), value: "duration:asc" },
                      {
                        title: t("tour.duration:desc"),
                        value: "duration:desc",
                      },
                    ].map((op, i) => (
                      <button
                        key={i}
                        type="button"
                        className="py-1 px-2 rounded-md "
                        // @ts-ignore
                        onClick={() => handleSorting(op.value)}
                      >
                        {op.title}
                      </button>
                    ))}
                  </div>
                </Dropdown>
                {/* <TourSorting
                  handleSorting={handleSorting}
                  options={[
                    "price:asc",
                    "price:desc",
                    "duration:asc",
                    "duration:desc",
                  ]}
                /> */}
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
                {filteredTours?.length ? (
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
                  ))
                ) : (
                  <p className="md:text-lg xl:text-xl font-semibold text-center mt-10 text-red-700 dark:text-red-400">
                    {/* {t("tour.no_filtered_tour")} */}
                  </p>
                )}
              </div>
            </div>
            <div
              className={`w-72 px-4 flex justify-center tour-mobile-filters duration-300 fixed bg-white dark:bg-dark top-0 bottom-0 z-[1000] min-h-screen ltr:border-r rtl:border-l border-darkblue dark:border-lightblue ${
                showFilter
                  ? "ltr:left-0 rtl:right-0"
                  : "ltr:-left-72 rtl:-right-72"
              }`}
            >
              {allCategories &&
              priceRange &&
              category &&
              typeof durationRange == "string" &&
              typeof freeCancelation == "boolean" ? (
                <Drawer show={showFilter} onClose={() => setShowFilters(false)}>
                  <TourSidebar
                    allCategories={allCategories}
                    handleCategory={handleCategory}
                    category={category}
                    handleDuration={handleDuration}
                    duration={durationRange}
                    freeCancelation={freeCancelation}
                    handleFreeCancelation={() =>
                      setFreeCancelation(!freeCancelation)
                    }
                    price={priceRange}
                    handlePrice={(v) => handlePrice(v)}
                  />
                </Drawer>
              ) : (
                ""
              )}
            </div>
          </>
        ) : loading == "loading" ? (
          <div className="lg:col-span-4 h-80 flexCenter">
            <Loader
              type="Three Circles"
              height="80"
              width="80"
              color={isDark ? "#A4CAFE" : "#3554d1"}
            />
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

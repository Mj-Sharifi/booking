"use client";

import { useEffect, useState } from "react";
import BlogSidebar from "../../../../components/Blog/BlogSidebar";
import axios from "axios";
import PostCard from "../../../../components/Blog/PostCard";
import { blogData } from "@/types/response";
import { useParams, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import Pagination from "@/components/Pagination";
import { loading_status } from "@/types/types";
import useTheme from "@/hooks/useTheme";
import Loader from "@/components/Loader";
import Drawer from "@/components/Drawer";
import { FaFilter } from "react-icons/fa6";

export default function Blog() {
  const { locale } = useParams();
  const [blog, setBlog] = useState<blogData[]>();
  const t = useTranslations();
  const [loading, setLoading] = useState<loading_status>("loading");

  // Handle Category
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
      if(category&&category.length==6){
        setCategory([])
      }
    }
    
  };
  // Handle Pagination
  const [pageCount, setPageCount] = useState<number>();
  const [page, setPage] = useState(1);

  // Setting Filters from URL
  const searchParams = useSearchParams();
  useEffect(() => {
    let category = searchParams.get("category");
    if (category) {
      setCategory(category.split(","));
    } else {
      setCategory([]);
    }
    let page = searchParams.get("page");
    if (page) {
      setPage(+page);
    }
  }, []);

  useEffect(() => {
    if (category) {
      let categoryURL = "";
      if (category.length > 0) {
        categoryURL = `category=${category.join(",")}`;
      }
      let paginationURL = "";
      if (page > 1) {
        categoryURL
          ? (paginationURL = `&page=${page}`)
          : (paginationURL = `page=${page}`);
      }
      window.history.pushState(
        undefined,
        "",
        window.location.pathname + "?" + categoryURL + paginationURL
      );
      const filterQuery = () => {
        const categoryQuery: string[] =
          category.length > 0
            ? category.map(
                (e) => `&filters[blog_categories][value][$contains]=${e}`
              )
            : [""];
        return categoryQuery.join("");
      };
      axios
        .get(
          process.env.NEXT_PUBLIC_API +
            `blogs?populate=*&locale=${locale}${filterQuery()}&pagination[page]=${page}&pagination[pageSize]=10`
        )
        .then((res) => {
          if (res && res.status == 200) {
            setLoading("success");
            setBlog(res.data.data);
            setPageCount(res.data.meta.pagination.pageCount as number);
          } else {
            setLoading("failed");
          }
        })
        .catch(() => setLoading("failed"));
    }
  }, [category, page]);
  const isDark = useTheme();
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
  return (
    <>
      {loading == "loading" ? (
        <div className="lg:col-span-4 h-80 flexCenter">
          <Loader
            type="Three Circles"
            height="80"
            width="80"
            color={isDark ? "#A4CAFE" : "#3554d1"}
          />
        </div>
      ) : loading == "success" ? (
        <>
          <h3 className="text-center font-semibold text-lg sm:text-xl lg:text-2xl xl:text-3xl">
            {t("blog.travel_articles")}
          </h3>
          <p className="text-center md:text-lg xl:text-xl text-light dark:text-lighter mb-8 md:mb-12 xl:mb-16">
            {t("common.lorem_ipsum_short")}
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-4 sm:gap-6 lg:gap-8">
            <div className="hidden lg:block col-span-1 lg:order-2 lg:sticky lg:top-28 lg:h-fit">
              {category && (
                <BlogSidebar
                  handleCategory={handleCategory}
                  category={category}
                />
              )}
            </div>
            <div className="col-span-1 lg:col-span-3 flex flex-col px-6 sm:px-2">
            <div className="flex justify-between lg:justify-end mb-6">
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
              {blog &&
                blog?.map((e, i) => (
                  <PostCard
                    key={i}
                    id={e.id}
                    release_Date={e.attributes.release_date}
                    image={e.attributes.image.data.attributes.url}
                    title={e.attributes.title}
                  />
                ))}
              {pageCount && pageCount > 1 ? (
                <div className="w-full mt-6"><Pagination
                count={pageCount}
                page={page}
                onChange={(p) => setPage(p)}
                searchable={false}
                updateUrl={false}
              /></div>
              ) : (
                ""
              )}
            </div>
            <div
              className={` w-72 p-4 flexCenter tour-mobile-filters duration-300 fixed bg-white dark:bg-dark top-0 bottom-0 z-[1000] min-h-screen ltr:border-r rtl:border-l border-darkblue dark:border-lightblue ${
                showFilter
                  ? "ltr:left-0 rtl:right-0"
                  : "ltr:-left-72 rtl:-right-72"
              }`}
            >
              <div className="col-span-1 lg:order-2 lg:sticky lg:top-28 lg:h-fit">
                {category && (
                  <Drawer
                    show={showFilter}
                    onClose={() => setShowFilters(false)}
                  >
                    <BlogSidebar
                      handleCategory={handleCategory}
                      category={category}
                    />
                  </Drawer>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

"use client";

import { useEffect, useState } from "react";
import BlogSidebar from "../../../components/Blog/BlogSidebar";
import axios from "axios";
import PostCard from "../../../components/Blog/PostCard";
import { blogData } from "@/types/response";
import { useParams, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import Pagination from "@/components/Pagination";

export default function Blog() {
  const { locale } = useParams();
  const [blog, setBlog] = useState<blogData[]>();
  const t = useTranslations();
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
        categoryURL ? (paginationURL = `&page=${page}`) : paginationURL=`page=${page}`;
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
            setBlog(res.data.data);
            setPageCount(res.data.meta.pagination.pageCount as number);
          }
        });
    }
  }, [category, page]);
  return (
    <>
      <h3 className="text-center font-semibold text-lg sm:text-xl lg:text-2xl xl:text-3xl">
        {t("blog.travel_articles")}
      </h3>
      <p className="text-center md:text-lg xl:text-xl text-light dark:text-lighter mb-8 md:mb-12 xl:mb-16">
        {t("common.lorem_ipsum_short")}
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-4 sm:gap-6 lg:gap-8">
        <div className="col-span-1 lg:order-2 lg:sticky lg:top-28 lg:h-fit">
          {category && (
            <BlogSidebar handleCategory={handleCategory} category={category} />
          )}
        </div>
        <div className="col-span-1 lg:col-span-3 flex flex-col gap-y-6 px-6 sm:px-2">
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
          {pageCount && pageCount > 1 ? <Pagination count={pageCount} page={page} onChange={(p)=>setPage(p)} searchable={false} updateUrl={false}/> : ""}
        </div>
      </div>
    </>
  );
}

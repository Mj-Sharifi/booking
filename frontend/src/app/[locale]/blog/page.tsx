"use client";

import { useEffect, useState } from "react";
import BlogSidebar from "../../../components/Blog/BlogSidebar";
import axios from "axios";
import PostCard from "../../../components/Blog/PostCard";
import { blogData } from "@/types/response";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

export default function Blog() {
  const { locale } = useParams();
  const [blog, setBlog] = useState<blogData[]>();
  const t =useTranslations()
  // Handle Category
  const [category, setCategory] = useState<string[]>([""]);
  const handleCategory = (c: string) => {
    if (c == "all") {
      setCategory([""]);
    } else if (category.includes(c)) {
      const newList = category.filter((e) => {
        return !(e == c);
      });
      setCategory(newList);
    } else {
      setCategory([...category, c]);
    }
  };
  useEffect(() => {
    const filterQuery = () => {
      const categoryQuery: string[] =
        category.length > 1
          ? category.map((e, i) =>
              i > 0 ? `&filters[blog_categories][title][$contains]=${e}` : ""
            )
          : [""];
      return categoryQuery.join("");
    };

    axios
      .get(
        process.env.NEXT_PUBLIC_API +
          `blogs?populate=*&locale=${locale}${filterQuery()}`
      )
      .then((res) => setBlog(res.data.data));
  }, [category]);

  console.log(blog);
  return (
    <>
      <h3 className="text-center font-semibold text-lg sm:text-xl lg:text-2xl xl:text-3xl">{t("blog.travel_articles")}</h3>
      <p className="text-center md:text-lg xl:text-xl text-light dark:text-lighter mb-8 md:mb-12 xl:mb-16">{t("common.lorem_ipsum_short")}</p>
      <div className="grid grid-cols-1 md:grid-cols-4 sm:gap-6 lg:gap-8">
        <div className="col-span-1 md:order-2">
          <BlogSidebar handleCategory={handleCategory} category={category} />
        </div>
        <div className="col-span-1 md:col-span-3 flex flex-col gap-6 px-6 sm:px-2">
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
        </div>
      </div>
    </>
  );
}

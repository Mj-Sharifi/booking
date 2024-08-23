"use client";

import { useEffect, useState } from "react";
import BlogSidebar from "./components/BlogSidebar";
import axios from "axios";
import PostCard from "./components/PostCard";
import { blogData } from "@/types/response";
import { useParams } from "next/navigation";

export default function Blog() {
  const {locale}=useParams()
  const [blog, setBlog] = useState<blogData[]>();
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
    console.log(process.env.NEXT_PUBLIC_API + `blogs?populate=*&locale=${locale}${filterQuery()}`);
    axios
      .get(process.env.NEXT_PUBLIC_API + `blogs?populate=*&locale=${locale}${filterQuery()}`)
      .then((res) => setBlog(res.data.data));
  }, [category]);

  return (
    <section className="container mx-auto flex flex-col md:flex-row sm:gap-6 lg:gap-8 py-24 lg:py-28 px-2 md:px-4">
      <div className="md:w-1/4 md:order-2">
        <BlogSidebar handleCategory={handleCategory} category={category}/>
      </div>
      <div className="w-full md:w-3/4 flex flex-col gap-6 px-6 sm:px-2">
        {blog &&
          blog?.map((e, i) => (
            <PostCard
              key={i}
              release_Date={e.attributes.release_date}
              image={e.attributes.image.data.attributes.url}
              title={e.attributes.title}
            />
          ))}
      </div>
    </section>
  );
}

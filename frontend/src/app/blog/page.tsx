"use client";

import { useEffect, useState } from "react";
import BlogSidebar from "./BlogSidebar";
import axios from "axios";
import { blogData } from "@/types/types";
import PostCard from "./PostCard";

export default function Blog() {
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
    axios
      .get(process.env.NEXT_PUBLIC_API + `blogs?populate=*${filterQuery()}`)
      .then((res) => setBlog(res.data.data));
  }, [category]);


  return (
    <section className="container mx-auto flex flex-col md:flex-row sm:gap-6 lg:gap-8">
      <div className="md:w-1/4 md:order-2">
        <BlogSidebar handleCategory={handleCategory} />
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

"use client";
import React, { useState, useEffect, ChangeEventHandler } from "react";
import axios from "axios";
import { blogCategoryDate, blogData } from "@/types/types";
import { title } from "process";
import CheckboxInput from "@/Components/Form/CheckboxInput";
import Link from "next/link";
type props = {
  handleCategory: (c: string) => void;
  category: string[];
};
export default function BlogSidebar({ handleCategory, category }: props) {
  const [allCategories, setAllCategories] = useState<blogCategoryDate[]>();
  useEffect(() => {
    axios
      .get(process.env.NEXT_PUBLIC_API + "blog-categories")
      .then((res) => setAllCategories(res.data.data));
  }, []);
  const [recentPosts, setRecentPost] = useState<blogData[]>();
  useEffect(() => {
    axios
      .get(
        process.env.NEXT_PUBLIC_API +
          `blogs?populate=*&sort[0]=release_date:desc`
      )
      .then((res) => setRecentPost(res.data.data));
  }, []);
  console.log(recentPosts)
  return (
    <div>
      <div className="flex flex-col gap-6">
        <div>
          <span className="font-semibold md:text-lg">Categories</span>
          {allCategories && (
            <ul className="mt-2">
              <li>
                <CheckboxInput
                  onChange={() => handleCategory("all")}
                  value={"all"}
                  checked={category.length === 1 && category[0] === ""}
                  label={"All Categories"}
                />
              </li>
              {allCategories?.map((e) => (
                <li key={e.id}>
                  <CheckboxInput
                    onChange={() =>
                      handleCategory(e.attributes.title.toLowerCase())
                    }
                    value={e.attributes.title.toLowerCase()}
                    checked={category.includes(
                      e.attributes.title.toLowerCase()
                    )}
                    label={e.attributes.title}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <span className="font-semibold md:text-lg mb-2">Recent Posts</span>
          <ul className="mt-2"> 
            {recentPosts?.slice(0, 5)?.map((e) => (
              <li key={e.id} className="mb-4">
               <Link href={""}>{e.attributes.title}</Link> 
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

"use client";
import React, { useState, useEffect, ChangeEventHandler } from "react";
import axios from "axios";
import { blogCategoryDate, blogData } from "@/types/types";
import { title } from "process";
type props = {
  handleCategory: (c: string) => void;
};
export default function BlogSidebar({ handleCategory }: props) {
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
        process.env.NEXT_PUBLIC_API + `blogs?populate=*&sort[0]=release_date:desc`
      )
      .then((res) => setRecentPost(res.data.data));
  }, []);
  return (
    <div>
      <div>
        <span className="font-semibold md:text-lg">Categories</span>
        <ul>
          <li>
            <label>
              All Categories
              <input
                value={"all"}
                type="checkbox"
                onChange={(e) => handleCategory(e.target.value)}
              />
            </label>
          </li>
          {allCategories?.map((e) => (
            <li key={e.id}>
              <label>
                {e.attributes.title}
                <input
                  value={e.attributes.title.toLowerCase()}
                  type="checkbox"
                  onChange={(e) => handleCategory(e.target.value)}
                />
              </label>
            </li>
          ))}
        </ul>
        <span className="font-semibold md:text-lg">Recent Posts</span>
        <ul >
          {recentPosts?.slice(0,5)?.map((e) => (
            <li key={e.id} className="mb-4">
              {e.attributes.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

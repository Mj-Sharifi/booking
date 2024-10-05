"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import CheckboxInput from "@/components/Form/CheckboxInput";
import Link from "next/link";
import { blogCategoryData, blogData } from "@/types/response";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
type props = {
  handleCategory: (c: string) => void;
  category: string[];
};
export default function BlogSidebar({ handleCategory, category }: props) {
  const t = useTranslations()
  const {locale}=useParams()
  const [allCategories, setAllCategories] = useState<blogCategoryData[]>();
  useEffect(() => {
    axios
      .get(process.env.NEXT_PUBLIC_API + `blog-categories?locale=${locale}`)
      .then((res) => setAllCategories(res.data.data));

  }, []);
  const [recentPosts, setRecentPost] = useState<blogData[]>();
  useEffect(() => {
    axios
      .get(
        process.env.NEXT_PUBLIC_API +
          `blogs?populate=*&locale=${locale}&sort[0]=release_date:desc`
      )
      .then((res) => setRecentPost(res.data.data));
  }, []);
  return (
    <div>
      <div className="flex flex-col gap-6">
        <div>
          <span className="font-semibold md:text-lg">{t("common.categories")}</span>
          {allCategories && (
            <ul className="mt-2">
              <li>
                <CheckboxInput
                  onChange={() => handleCategory("all")}
                  value={"all"}
                  checked={category.length === 0}
                  label={t("common.all_categories")}
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
          <span className="font-semibold md:text-lg mb-2">{t("blog.recent_posts")}</span>
          <ul className="mt-2"> 
            {recentPosts?.slice(0, 5)?.map((e) => (
              <li key={e.id} className="mb-4 text-light dark:text-lighter">
               <Link href={""}>{e.attributes.title}</Link> 
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

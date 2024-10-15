"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import CheckboxInput from "@/components/Form/CheckboxInput";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { tourCategoryData } from "@/types/response";
type props = {
  handleCategory: (c: string) => void;
  handleDuration: (d: string) => void;
  category: string[];
};
const durationOptions = [{title:"less_5d",value:"0-5"}, {title:"5d_10d",value:"6-10"}, {title:"more_10d",value:"11-"}];
export default function TourSidebar({ handleCategory,handleDuration, category }: props) {
  const t = useTranslations();
  const { locale } = useParams();
  const [allCategories, setAllCategories] = useState<tourCategoryData[]>();
  useEffect(() => {
    axios
      .get(process.env.NEXT_PUBLIC_API + `categories?locale=${locale}`)
      .then((res) => setAllCategories(res.data.data));
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-6">
        <div>
          <span className="font-semibold md:text-lg">
            {t("common.categories")}
          </span>
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
          <span className="font-semibold md:text-lg">{t("tour.duration")}</span>
          {durationOptions && (
            <ul className="mt-2">
              {durationOptions?.map((e,i) => (
                <li key={i}>
                  <CheckboxInput
                    onChange={() =>
                     handleDuration(e.value)
                    }
                    value={e.value}
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
      </div>
    </div>
  );
}

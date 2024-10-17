"use client";
import React, { useState, useEffect, SetStateAction, Dispatch } from "react";
import axios from "axios";
import CheckboxInput from "@/components/Form/CheckboxInput";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { tourCategoryData } from "@/types/response";
import RangeSlider from "../Form/RangeSlider";
type props = {
  allCategories: tourCategoryData[];
  handleCategory: (c: string) => void;
  category: string[];
  handleDuration: (d: string) => void;
  duration: string;
  freeCancelation: boolean;
  handleFreeCancelation: () => void;
  price: number[];
  handlePrice: (p: number[]) => void;
};
export default function TourSidebar({
  allCategories,
  handleCategory,
  handleDuration,
  category,
  duration,
  freeCancelation,
  handleFreeCancelation,
  price,
  handlePrice,
}: props) {
  const t = useTranslations();
  const { locale } = useParams();

  const durationOptions = [
    { title: t("tour.less_5d"), value: "0-5" },
    { title: t("tour.6d_10d"), value: "6-10" },
    { title: t("tour.more_10d"), value: "11-" },
  ];

  return (
    <div className="flex flex-col divide-y-2 w-full">
      <div className="pb-6">
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
                  checked={category.includes(e.attributes.title.toLowerCase())}
                  label={e.attributes.title}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="py-6">
        <span className="font-semibold md:text-lg">{t("tour.duration")}</span>
        {durationOptions && (
          <ul className="mt-2">
            {durationOptions?.map((e, i) => (
              <li key={i}>
                <CheckboxInput
                  onChange={() => handleDuration(e.value)}
                  value={e.value}
                  checked={e.value == duration}
                  label={e.title}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="py-6">
        <span className="font-semibold md:text-lg">{t("tour.other")}</span>
        <ul className="mt-2">
          <li>
            <CheckboxInput
              onChange={handleFreeCancelation}
              value={""}
              checked={freeCancelation}
              label={t("tour.free_cancellation")}
            />
          </li>
        </ul>
      </div>
      <div className="py-6">
        <span className="font-semibold md:text-lg">{t("tour.other")}</span>
        <div className="mt-2">
          <RangeSlider min={0} max={2000} value={price} onChange={handlePrice} />
        </div>
      </div>
    </div>
  );
}

import { useTranslations } from "next-intl";
import React from "react";

type props = {
  handleSorting: (
    v: "price:asc" | "price:desc" | "duration:asc" | "duration:desc"
  ) => void;
  options: ("price:asc" | "price:desc" | "duration:asc" | "duration:desc")[];
};
export default function TourSorting({ handleSorting, options }: props) {
  const t = useTranslations("tour");
  return (
    <div className="flexCenter gap-x-2 text-xs md:text-sm">
      {options.map((op, i) => (
        <button
          key={i}
          type="button"
          className="py-1 px-2 rounded-md border"
          onClick={()=>handleSorting(op)}
        >
          {t(op)}
        </button>
      ))}
    </div>
  );
}

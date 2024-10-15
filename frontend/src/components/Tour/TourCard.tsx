import React from "react";
import NavigationLink from "../link/NavigationLink";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Rating from "../Rating";

type props = {
  id: number;
  duration: number;
  image: string;
  title: string;
  place: string;
  freeCancellation: boolean;
  rating: number;
  price: number;
};
export default function TourCard({
  id,
  duration,
  image,
  title,
  place,
  freeCancellation,
  rating,
  price,
}: props) {
  const t = useTranslations();
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 overflow-hidden border-b py-5">
      <div className="col-span-1 rounded-lg overflow-hidden">
        <Image
          src={process.env.NEXT_PUBLIC_URL + image}
          alt={title}
          width={300}
          height={300}
          className="w-full h-full object-cover hover:scale-110 duration-300 aspect-square"
        />
      </div>
      <div className="md:col-span-2 flex flex-col justify-start gap-2 md:gap-4 md:py-1">
        <span className="text-light dark:text-lighter text-xs md:text-sm">
          {duration} {t("tour.days")}
        </span>
        <h2 className="font-semibold md:text-lg">{title}</h2>
        <h3 className="md:text-lg text-light dark:text-lighter">
          {place}
        </h3>
        <p className="text-sm md:text-base text-light dark:text-lighter">{t("common.lorem_ipsum_long")}</p>
        {freeCancellation && (
          <span className=" text-xs md:text-sm text-emerald-600 dark:text-emerald-300 font-semibold">
            {t("tour.free_cancellation")}
          </span>
        )}
      </div>
      <div className="col-span-1 flex flex-col gap-2 justify-between md:items-center">
        <div className="flex flex-col">
          <Rating defaultValue={rating} width="16px" />
          <span className="text-xs md:text-sm text-light dark:text-lighter">
            {t("tour.reviews_count", {
              count: Math.round((price * rating) / 4),
            })}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs md:text-sm text-light dark:text-lighter">{t("common.from")}</span>
          <span className="text-sm md:text-base font-semibold">{price} {t("footer.usd")}</span>
          <span className="text-xs md:text-sm text-light dark:text-lighter">{t("tour.per_adult")}</span>
        </div>
        <NavigationLink
          href={{
            pathname: "/tour/[id]/[title]",
            params: { id, title: title.trim().replaceAll(" ", "-") },
          }}
          className="w-full py-2 text-center transition-all duration-300 bg-darkblue hover:bg-dark dark:bg-lightblue dark:hover:bg-white text-white dark:text-dark rounded-md"
        >
          {t("tour.tour_detail")}
        </NavigationLink>
      </div>
    </div>
  );
}

import NavigationLink from "@/components/link/NavigationLink";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";

type props = {
  id: number;
  release_Date: string;
  image: string;
  title: string;
};

export default function PostCard({ id, release_Date, image, title }: props) {
  const t = useTranslations("common");
  const {locale}=useParams()
  const date = new Date(release_Date);
  const formattedDate = new Intl.DateTimeFormat(locale, {
    dateStyle: "long",
  }).format(date);
  return (
    <NavigationLink
      href={{
        pathname: "/blog/[id]",
        params: { id },
      }}
    > 
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 overflow-hidden border-b-2 py-5">
      <div className="col-span-1 md:col-span-1 rounded-lg overflow-hidden">
      <Image
            src={process.env.NEXT_PUBLIC_URL + image}
            alt={title}
            width={300}
            height={300}
            className="w-full h-full object-cover hover:scale-110 duration-300"
          />
        </div>
        <div className="sm:col-span-2 md:col-span-3 flex flex-col justify-start gap-2 sm:gap-4 sm:py-1">
          <span>{formattedDate}</span>
          <h2 className="font-semibold text-lg md:text-xl">{title}</h2>
          <p className="text-sm md:text-base text-light dark:text-lighter">
            {t("lorem_ipsum_long")}
          </p>
        </div>
      </div>
    </NavigationLink>
  );
}
{/* <div className="flex flex-col items-center sm:flex-row gap-4 lg:max-h-60 overflow-hidden border-b-2 py-5">
<div className="rounded-lg overflow-hidden md:min-w-40 lg:min-w-60 aspect-square">
  <Image
    src={process.env.NEXT_PUBLIC_URL + image}
    alt={title}
    width={300}
    height={300}
    className="w-full h-full object-cover hover:scale-110 duration-300"
  />
</div>
<div className="flex flex-col gap-2 md:gap-4">
  <span>{formattedDate}</span>
  <h2 className="font-semibold text-lg md:text-xl">{title}</h2>
  <p className="text-sm md:text-base text-light dark:text-lighter">
    {t("lorem_ipsum_long")}
  </p>
</div>
</div> */}
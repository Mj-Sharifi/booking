"use client";
import NavigationLink from "@/components/link/NavigationLink";
import WhyLocalExpert from "@/components/WhyLocalExpert";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useState } from "react";
import { FaPlay } from "react-icons/fa";

const data = [
  {
    title: "qwerweetyyu",
    description:
      "asfdsfs kgo;lgmerdg mob;k h,'ptrh;/h,w trbm ;lbdf tow;ht4 mrljk3 eg;em brl;fbn tio;'hjg[w kalf24q4+96f 2",
  },
  {
    title: "uio89yyu",
    description:
      "asfdsfs kgo;lgmerdg mob;k h,'ptrh;/h,w trbm ;lbdf tow;ht4 mrljk3 eg;em brl;fbn tio;'hjg[w kalf24q4+96f 2",
  },
  {
    title: "dsgfdg3r",
    description:
      "asfdsfs kgo;lgmerdg mob;k h,'ptrh;/h,w trbm ;lbdf tow;ht4 mrljk3 eg;em brl;fbn tio;'hjg[w kalf24q4+96f 2",
  },
  {
    title: "qwrterw rheetyhr",
    description:
      "asfdsfs kgo;lgmerdg mob;k h,'ptrh;/h,w trbm ;lbdf tow;ht4 mrljk3 eg;em brl;fbn tio;'hjg[w kalf24q4+96f 2",
  },
];
export default function BecomeExpert() {
  const t = useTranslations();
  const [videoPopup, setVideoPopup] = useState(false);
  return (
    <>
      <div className="relative py-16 md:py-24 xl:py-32">
        <Image
          src="/assets/images/become-expert/become-expert-1.webp"
          alt="become an expert"
          width="1920"
          height="400"
          className="object-cover w-full h-full top-0 absolute z-[-1]"
        />
        <div className="container mx-auto px-2 md:px-4 xl:px-8 text-center text-white flex flex-col gap-y-6 justify-center items-center">
          <h1 className="font-bold text-xl md:text-3xl xl:text-5xl md:w-2/3 xl:w-1/2">
            {t("become-expert.main_title")}
          </h1>
          <h2 className="text-sm md:text-base xl:text-lg">
            {t("become-expert.secondary_title")}
          </h2>
          <NavigationLink
            href={"/register"}
            className="duration-300 text-xs md:text-sm xl:text-base py-3 px-10 rounded-md bg-white text-dark hover:bg-darkblue hover:text-white"
          >
            {t("common.register")}
          </NavigationLink>
        </div>
      </div>
      <div className="container mx-auto px-2 md:px-12 xl:px-24 py-8 md:py-12 xl:py-16 ">
        <h2 className="text-center mb-3 font-semibold md:text-xl xl:text-3xl">
          {t("become-expert.how_work")}
        </h2>
        <h4 className="text-center mb-12 text-light dark:text-lighter text-xs md:text-sm xl:text-base">
          {t("common.lorem_ipsum_short")}
        </h4>
        <div className="flex gap-y-8 flex-col sm:flex-row items-center sm:justify-around">
          <div className="font-semibold">
            <div className="relative rounded-full w-28 h-28 flex justify-center items-center bg-lightgreen ">
              <span className="absolute text-xs md:text-sm rounded-full top-0 ltr:left-0 rtl:right-0 w-8 h-8 flex justify-center items-center bg-myyellow z-[1]">
                01
              </span>
              <Image
                src="/assets/images/become-expert/become-expert-2.svg"
                alt="local expert"
                width={50}
                height={50}
              />
            </div>
            <p className="text-center mt-2 sm:mt-4 text-sm md:text-base">
              {t("become-expert.sign_up")}
            </p>
          </div>
          <div className="hidden lg:flex items-center">
            <Image
              src="/assets/images/become-expert/become-expert-6.svg"
              alt="become-expert"
              height={20}
              width={140}
              className="-scale-y-100"
            />
          </div>
          <div className="font-semibold">
            <div className="relative rounded-full w-28 h-28 flex justify-center items-center bg-lightgreen ">
              <span className="absolute text-xs md:text-sm rounded-full top-0 ltr:left-0 rtl:right-0 w-8 h-8 flex justify-center items-center bg-myyellow z-[1]">
                02
              </span>
              <Image
                src="/assets/images/become-expert/become-expert-3.svg"
                alt="local expert"
                width={50}
                height={50}
              />
            </div>
            <p className="text-center mt-2 sm:mt-4 text-sm md:text-base">
              {t("become-expert.add_service")}
            </p>
          </div>
          <div className="hidden lg:flex items-center">
            <Image
              src="/assets/images/become-expert/become-expert-6.svg"
              alt="become-expert"
              height={20}
              width={140}
            />
          </div>
          <div className="font-semibold">
            <div className="relative rounded-full w-28 h-28 flex justify-center items-center bg-lightgreen ">
              <span className="absolute text-xs md:text-sm rounded-full top-0 ltr:left-0 rtl:right-0 w-8 h-8 flex justify-center items-center bg-myyellow z-[1]">
                03
              </span>
              <Image
                src="/assets/images/become-expert/become-expert-4.svg"
                alt="local expert"
                width={50}
                height={50}
              />
            </div>
            <p className="text-center mt-2 sm:mt-4 text-sm md:text-base">
              {t("become-expert.get_booking")}
            </p>
          </div>
        </div>
      </div>
      <WhyLocalExpert
        media={
          <div className="relative">
            <Image
              src="/assets/images/become-expert/become-expert-5.webp"
              alt="become expert"
              width={640}
              height={670}
              className="z[-1]"
            />
            <button
              type="button"
              className="group absolute text-white flex items-center gap-x-2 top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2"
              onClick={() => setVideoPopup(true)}
            >
              <div className="duration-300 border-2 border-white rounded-full p-3 group-hover:bg-white group-hover:text-dark">
                <FaPlay size={20} />
              </div>
              <span className="font-semibold text-sm md:text-base">
                {t("become-expert.watch_video")}
              </span>
            </button>
          </div>
        }
      />
    </>
  );
}

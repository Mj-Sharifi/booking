"use effect";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { ReactNode } from "react";

type props = {
  //   media: {
  //     type: "image" | "video";
  //     url: string;
  //     width:string;
  //     height:string
  //   };
  media: ReactNode;
};
export default function WhyLocalExpert({ media }: props) {
  const t = useTranslations();
  return (
    <section className="bg-border grid grid-cols-1 md:grid-cols-5 w-full">
      <div className="md:col-span-2 order-1 md:order-2">
        {media}
        {/* {media.type == "image" ? (
          <Image src={media.url} alt="local expert" width={+media.width} height={+media.height} />
        ) : (
          <video width={media.width} height={media.height} controls preload="none">
            <source src={media.url} type="video/mp4" />
          </video>
        )} */}
      </div>
      <div className="md:col-span-3 flex flex-col justify-center py-10 order-2 md:order-1">
        <div className="mx-auto px-2">
          <h4 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-1">
            {t("become-expert.why_local_expert")}
          </h4>
          <p className="text-light dark:text-lighter mb-8">
            {t("common.lorem_ipsum_short")}
          </p>
          {[
            t("become-expert.best_price_gurantee"),
            t("become-expert.easy_booking"),
            t("become-expert.24/7"),
          ].map((title, i) => (
            <div key={i} className="mb-5 flexCenter gap-4">
              <Image
                src={`/assets/images/home/${i + 1}.svg`}
                alt="local expert"
                width={50}
                height={50}
              />
              <div className="flex flex-col items-start justify-between max-w-72">
                <h5 className="md:text-lg font-medium">{title}</h5>
                <p>{t("common.lorem_ipsum_short")}</p>
              </div>
            </div>
          ))}
          {/* <div className="mb-5 flexCenter gap-4">
           
            <img
              src="/assets/images/home/1.svg"
              alt=""
              className="w-12 sm:w-14"
            />
            <div className="flex flex-col items-start justify-between max-w-72">
              <h5 className="md:text-lg font-medium">Best Price Guarantee</h5>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </div>
          <div className="mb-5 flexCenter gap-4">
            <img
              src="/assets/images/home/2.svg"
              alt=""
              className="w-12 sm:w-14"
            />
            <div className="flex flex-col items-start justify-between max-w-72">
              <h5 className="md:text-lg font-medium">Easy & Quick Booking</h5>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </div>
          <div className="mb-5 flexCenter gap-4">
            <img
              src="/assets/images/home/3.svg"
              alt=""
              className="w-12 sm:w-14"
            />
            <div className="flex flex-col items-start justify-between max-w-72">
              <h5 className="md:text-lg font-medium">Customer Care 24/7</h5>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}

"use client";
import { blogData } from "@/types/response";
import { locale } from "@/types/types";
import axios from "axios";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function page() {
  const t = useTranslations("blog");
  const { locale, id } = useParams();
  const [post, setPost] = useState<blogData>();
  useEffect(() => {
    axios
      .get(
        process.env.NEXT_PUBLIC_API + `blogs/${id}?populate=*&locale=${locale}`
      )
      .then((res) => {
        if (res.status == 200) {
          setPost(res.data.data);
        }
      });
  }, []);

  return (
    <>
      {post && (
        <>
          <h1 className="text-center font-semibold text-lg sm:text-xl lg:text-2xl mb-4">
            {post.attributes.title}
          </h1>
          <span className="text-center text-sm md:text-base text-light dark:text-lighter mb-12">
            {new Intl.DateTimeFormat(locale, {
              dateStyle: "medium",
            }).format(new Date(post.attributes.release_date))}
          </span>
          <Image
            src={
              process.env.NEXT_PUBLIC_URL +
              post.attributes.image.data.attributes.url
            }
            alt={post.attributes.title}
            width={1920}
            height={1080}
            className="mx-auto w-3/4 mb-8"
          />
          <div className="mx-auto w-11/12 lg:w-3/5">
            <h4 className="font-semibold text-sm sm:text-base lg:text-xl">
              What makes a good brand book?
            </h4>
            <p className="text-justify text-xs sm:text-sm lg:text-lg my-4">
              {t("p1")}
            </p>
            <ul className="list-disc">
              <li>
                Sed viverra ipsum nunc aliquet bibendum enim facilisis gravida.
              </li>
              <li>
                At urna condimentum mattis pellentesque id nibh. Laoreet non
                curabitur
              </li>
              <li>Magna etiam tempor orci eu lobortis elementum.</li>
              <li>
                Bibendum est ultricies integer quis. Semper eget duis at tellus.
              </li>
            </ul>
            <div className="ltr:border-l-4 rtl:border-r-4 border-darkblue dark:border-lightblue flex gap-2 px-2 mx-2 md:mx-4 my-4">
              <Image
                src="/assets/images/blog/quote-light.svg"
                alt="quote_icon"
                width={60}
                height={60}
                className="scale-90 md:scale-100"
              />
              <p className="italic font-bold text-sm sm:text-base lg:text-xl">
                “{t("p1")}“
              </p>
            </div>
            <p className=" text-xs sm:text-sm lg:text-lg my-4">{t("p2")}</p>
            <p className="text-justify text-xs sm:text-sm lg:text-lg mb-4">
              {t("p3")}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 lg:gap-4">
              {new Array(2).fill(2).map((e, i) => (
                <div className="col-span-1">
                  <Image
                    src={`/assets/images/blog/blog-${i+1}.jpg`}
                    alt={`img1${i+1}`}
                    width={410}
                    height={350}
                  />
                  <span className="block text-center text-light dark:text-lighter">{t("caption")}</span>
                </div>
              ))}

            </div>
            <p className=" text-xs sm:text-sm lg:text-lg my-4">
             {t("p2")}
            </p>
            <p className=" text-xs sm:text-sm lg:text-lg mb-4">
            {t("p3")}
            </p>
          </div>
        </>
      )}
    </>
  );
}

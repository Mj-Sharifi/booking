"use client";
import { blogData } from "@/types/response";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import axios from "axios";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi2";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import TextInput from "@/components/Form/TextInput";
import TextAreaInput from "@/components/Form/TextAreaInput";
import { Link, useRouter } from "@/navigation";

export default function SingleBlog() {
  const t = useTranslations();
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
            <p className="text-justify text-xs sm:text-sm lg:text-base my-4">
              {t("blog.p1")}
            </p>
            <ul className="list-disc">
              {Array(4)
                .fill(true)
                .map((_, i) => (
                  <li>{t("common.lorem_ipsum_short")}</li>
                ))}
            </ul>
            <div className="ltr:border-l-4 rtl:border-r-4 border-darkblue dark:border-lightblue flex gap-2 px-2 mx-2 md:mx-4 my-4">
              <Image
                src="/assets/images/blog/quote-light.svg"
                alt="quote_icon"
                width={60}
                height={60}
                className="scale-90 md:scale-100"
              />
              <p className="italic font-bold text-sm sm:text-base lg:text-lg">
                “{t("blog.p1")}“
              </p>
            </div>
            <p className=" text-xs sm:text-sm lg:text-base my-4">
              {t("blog.p2")}
            </p>
            <p className="text-justify text-xs sm:text-sm lg:text-base mb-4">
              {t("blog.p3")}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2 gap-y-4 lg:gap-4">
              {new Array(2).fill(2).map((e, i) => (
                <div className="col-span-1">
                  <Image
                    src={`/assets/images/blog/blog-${i + 1}.jpg`}
                    alt={`img1${i + 1}`}
                    width={410}
                    height={350}
                    className="mx-auto"
                  />
                  <span className="block text-center text-light dark:text-lighter text-xs md:text-sm mt-1">
                    {t("blog.caption")}
                  </span>
                </div>
              ))}
            </div>
            <p className=" text-xs sm:text-sm lg:text-base my-4">
              {t("blog.p2")}
            </p>
            <p className=" text-xs sm:text-sm lg:text-base mb-4">
              {t("blog.p3")}
            </p>
            <div className="flex justify-between flex-col md:flex-row gap-y-3 my-6 md:my-12">
              <div className="flex gap-4">
                <span>{t("blog.share")}</span>
                <button
                  type="button"
                  className="duration-300 p-1 rounded-full hover:bg-darkblue hover:text-white dark:hover:bg-lightblue dark:hover:text-dark"
                >
                  <FaFacebookF size={20} />
                </button>
                <button
                  type="button"
                  className="duration-300 p-1 rounded-full hover:bg-darkblue hover:text-white dark:hover:bg-lightblue dark:hover:text-dark"
                >
                  <FaTwitter size={20} />
                </button>
                <button
                  type="button"
                  className="duration-300 p-1 rounded-full hover:bg-darkblue hover:text-white dark:hover:bg-lightblue dark:hover:text-dark"
                >
                  <FaInstagram size={20} />
                </button>
                <button
                  type="button"
                  className="duration-300 p-1 rounded-full hover:bg-darkblue hover:text-white dark:hover:bg-lightblue dark:hover:text-dark"
                >
                  <FaLinkedin size={20} />
                </button>
              </div>
              <div className="flex  gap-2 ">
                {post.attributes.blog_categories.data.map((e, i) => (
                  <Link
                    key={i}
                    // @ts-ignore
                    href={`/blog?category=${e.attributes.title}`}
                    className="dark:bg-lightblue dark:text-dark bg-darkblue text-white hover: px-2 py-1 rounded-full text-xs md:text-sm font-semibold"
                  >
                    {/* {t("blog.family_holidays")} */}
                    {e.attributes.title}
                  </Link>
                ))}
              </div>
            </div>
            <div className="border-t border-b border-light dark:border-lighter flex flex-col items-center md:flex-row gap-4 md:items-start py-4">
              <Image
                src="/assets/images/blog/author.png"
                alt="author_avatar"
                height={70}
                width={70}
              />
              <div className="flex flex-col items-center md:items-start gap-1 text-xs sm:text-sm lg:text-base">
                <h3 className="font-semibold">Brooklyn Simmons</h3>
                <h5 className="text-light dark:text-lighter">
                  {t("blog.content_creator")}
                </h5>
                <p className="mt-2">{t("common.lorem_ipsum_long")}</p>
              </div>
            </div>
            <div className="flex justify-between py-4 border-b border-light dark:border-lighter">
              <button type="button" className="flex gap-2 items-center group">
                <HiArrowLeft
                  size={18}
                  className="duration-300 group-hover:-translate-x-1 rtl:rotate-180 rtl:group-hover:translate-x-1"
                />
                {t("blog.prev")}
              </button>
              <Image
                src="/assets/images/blog/menu.svg"
                alt="blog_menu"
                width={20}
                height={20}
              />
              <button type="button" className="flex gap-2 items-center group">
                {t("blog.next")}
                <HiArrowRight
                  size={18}
                  className="duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
                />
              </button>
            </div>
            {/* Guest Reviews */}
            <div className="flex flex-col gap-y-10 py-4  border-b border-light dark:border-lighter">
              <h4 className="md:text-lg font-semibold">
                {t("blog.geust_reviews")}
              </h4>
              {/* Card */}
              {Array(2)
                .fill(true)
                .map((_, i) => (
                  <div key={i} className="flex flex-col gap-4">
                    <div className="flex gap-4">
                      <Image
                        src={"/assets/images/blog/reviewer.png"}
                        alt="reviewer"
                        width={60}
                        height={60}
                      />
                      <div className="flex flex-col gap-1">
                        <span className="text-sm md:text-base">Tonko</span>
                        <span className="text-light dark:text-lighter text-xs md:text-sm">
                          {new Intl.DateTimeFormat(locale, {
                            dateStyle: "medium",
                          }).format(new Date("2022-02-15"))}
                        </span>
                      </div>
                    </div>
                    <h4 className="font-semibold md:text-lg text-darkblue dark:text-lightblue">
                      9.2 {t("blog.superb")}
                    </h4>
                    <p className="text-sm md:text-base">
                      {t("common.lorem_ipsum_long")}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {Array(4)
                        .fill(true)
                        .map((_, i) => (
                          <Image
                            key={i}
                            src={`/assets/images/blog/review_${i + 1}.png`}
                            alt="review_image"
                            height={100}
                            width={100}
                            className="rounded-md"
                          />
                        ))}
                    </div>
                    <div className="flex gap-5">
                      <button
                        type="button"
                        className="text-sm md:text-base flex gap-2 items-center text-darkblue dark:text-lightblue"
                      >
                        {t("blog.helpful")}
                        <AiFillLike size={22} />{" "}
                      </button>
                      <button
                        type="button"
                        className="text-sm md:text-base flex gap-2 items-center text-light dark:text-lighter"
                      >
                        {t("blog.not_helpful")}
                        <AiFillDislike size={22} />{" "}
                      </button>
                    </div>
                  </div>
                ))}
              <button
                type="button"
                className="duration-300 flex w-fit gap-2 rounded-md mt-2 py-2 px-3 border-2 border-darkblue dark:border-lightblue text-darkblue hover:text-white hover:bg-darkblue dark:text-lightblue dark:hover:text-dark dark:hover:bg-lightblue"
              >
                {t("blog.show_reviews")}
                <HiArrowRight
                  className="-rotate-45 rtl:rotate-[-135deg]"
                  size={24}
                />
              </button>
            </div>
            {/* Reply */}
            <div className="flex flex-col gap-6 py-4">
              <h4 className="md:text-lg font-semibold">{t("blog.reply")}</h4>
              <h6 className="text-xs md:text-sm text-light dark:text-lighter">
                {t("blog.email_not_show")}
              </h6>
              <div className="grid grid-cols-2 gap-6">
                <div className="">
                  <TextInput name="name" label={t("blog.your_display_name")} />
                </div>
                <div className="">
                  <TextInput name="email" label={t("footer.your_email")} />
                </div>
                <div className="col-span-2">
                  <TextAreaInput
                    name={"comment"}
                    label={t("blog.write_comment")}
                  />
                </div>
              </div>
              <button
                type="button"
                className="duration-300 flex w-fit gap-2 rounded-md mt-2 py-2 px-3 bg-darkblue dark:bg-lightblue hover:border-dark hover:bg-dark text-white dark:hover:border-white dark:hover:bg-white dark:text-dark"
              >
                {t("blog.post_comment")}
                <HiArrowRight
                  className="-rotate-45 rtl:rotate-[-135deg]"
                  size={24}
                />
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

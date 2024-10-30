import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import NavigationLink from "../link/NavigationLink";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaXmark,
} from "react-icons/fa6";
import { useCookies } from "react-cookie";
import { userInfo } from "@/types/response";
import { capitalizaWords } from "@/utils/utils";

type props = {
  pages: string[];
  logout: Function;
};
export default function HamburgerMenu({ pages, logout }: props) {
  const t = useTranslations();
  const [{ user_info }] = useCookies<"user_info", { user_info: userInfo }>([
    "user_info",
  ]);
  return (
    <div className="flex flex-col">
      <div className="flexBetween px-3 py-4 border-b border-border">
        <Image
          src="/assets/images/navbar/tour-booking-logo-2.png"
          alt="logo"
          width={60}
          height={60}
        />
        <button
          type="button"
          className="duration-300 rounded-full p-1 hover:bg-red-600 hover:text-white"
        >
          <FaXmark size={20} />
        </button>
      </div>
      <div className="py-5 px-3 border-b border-border text-lg">
        <ul className="flex flex-col gap-5">
          {pages.map((page, index) => (
            <li key={index}>
              <NavigationLink
                // @ts-ignore
                href={page === "home" ? "/" : "/" + page}
                className="text-lg first-letter:uppercase"
              >
                {capitalizaWords(t(`common.${page}`))}
              </NavigationLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="py-4 px-3">
        {user_info?.user && (
          <div className="mb-5 flex gap-2">
            <span>{t("tour.wallet")}:</span>
            <span className="font-semibold">
              {user_info?.user?.wallet} {t("footer.usd")}
            </span>
          </div>
        )}
        <div className="mb-5">
          <span className="block">Toll Free Customer Care</span>
          <Link href={""} className="font-semibold">
            +(98) 9039104679
          </Link>
        </div>
        <div className="mb-5">
          <span className="block">Need live support?</span>
          <Link
            href={"mailto:mj.sharifimanesh@gmail.com"}
            className="font-semibold"
          >
            mj.sharifimanesh@gmail.com
          </Link>
        </div>
        <div className="mb-4">
          <span>Follow us on social media</span>
          <div className="flexBetween">
            <FaFacebookF size={22} className="text-gray-800 dark:text-white hover:text-darkblue dark:hover:text-lightblue duration-300" />
            <FaTwitter size={22} className=" text-gray-800 dark:text-white hover:text-darkblue dark:hover:text-lightblue duration-300"/>
            <FaInstagram
              size={22}
              className=" text-gray-800 dark:text-white hover:text-darkblue dark:hover:text-lightblue duration-300"
            />
            <FaLinkedin size={22} className="text-gray-800 dark:text-white hover:text-darkblue dark:hover:text-lightblue duration-300" />
          </div>
        </div>
        <NavigationLink
          href={"/become-expert"}
          className="cursor-pointer w-full py-2 rounded-md duration-300  bg-darkblue dark:bg-lightblue hover:border-dark hover:bg-dark text-white dark:hover:border-white dark:hover:bg-white dark:text-dark text-sm md:text-base flexCenter"
        >
          {t("common.become_expert")}
        </NavigationLink>
        <button
          type="button"
          className="mt-5 text-sm md:text-base w-full py-2 duration-300 border rounded-md text-darkblue dark:text-white dark:hover:text-dark dark:border-lightblue dark:hover:bg-lightblue border-darkblue hover:bg-darkblue hover:text-white"
          onClick={() => logout()}
        >
          {t("common.logout")}
        </button>
      </div>
    </div>

    // </div>
  );
}

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

export default function HamburgerMenu({
  open,
  pages,
  closeHamburgerMenu,
}: {
  open: boolean;
  // pages: {title:string,href:string}[];
  pages: string[];
  closeHamburgerMenu: () => void;
}) {
  const t = useTranslations("common");
  return (
    <div
      className={`hamburgerMenu absolute z-70 top-0 bottom-0 ${
        open ? "ltr:left-0 rtl:right-0" : "ltr:-left-72 rtl:-right-72"
      } transition-all duration-300 ltr:border-r rtl:border-l border-darkblue w-72 bg-white py-4 flex flex-col`}
    >
      <div className="flexBetween px-3 pb-4 border-b border-border">
        <Image
          src="/assets/images/navbar/tour-booking-logo-2.png"
          alt="logo"
          width={70}
          height={70}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-7 h-7 cursor-pointer "
          onClick={closeHamburgerMenu}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </div>
      <div className="py-5 px-3 border-b border-border text-lg">
        <ul className="flex flex-col gap-5">
          {pages.map((page, index) => (
            <li key={index}>
              <Link
                href={page === "home" ? "/" : "/" + page}
                className="text-lg"
              >
                {t(page)}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="py-4 px-3">
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
          <ul className="flexBetween">
            <li>
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M13.135 6H15V3h-1.865a4.147 4.147 0 0 0-4.142 4.142V9H7v3h2v9.938h3V12h2.021l.592-3H12V6.591A.6.6 0 0 1 12.592 6h.543Z"
                  clipRule="evenodd"
                />
              </svg>
            </li>
            <li>
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M22 5.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.343 8.343 0 0 1-2.605.981A4.13 4.13 0 0 0 15.85 4a4.068 4.068 0 0 0-4.1 4.038c0 .31.035.618.105.919A11.705 11.705 0 0 1 3.4 4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 6.1 13.635a4.192 4.192 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 2 18.184 11.732 11.732 0 0 0 8.291 20 11.502 11.502 0 0 0 19.964 8.5c0-.177 0-.349-.012-.523A8.143 8.143 0 0 0 22 5.892Z"
                  clipRule="evenodd"
                />
              </svg>
            </li>
            <li>
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </li>
            <li>
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M12.51 8.796v1.697a3.738 3.738 0 0 1 3.288-1.684c3.455 0 4.202 2.16 4.202 4.97V19.5h-3.2v-5.072c0-1.21-.244-2.766-2.128-2.766-1.827 0-2.139 1.317-2.139 2.676V19.5h-3.19V8.796h3.168ZM7.2 6.106a1.61 1.61 0 0 1-.988 1.483 1.595 1.595 0 0 1-1.743-.348A1.607 1.607 0 0 1 5.6 4.5a1.601 1.601 0 0 1 1.6 1.606Z"
                  clipRule="evenodd"
                />
                <path d="M7.2 8.809H4V19.5h3.2V8.809Z" />
              </svg>
            </li>
          </ul>
        </div>
        <a className="w-full h-12 rounded-md bg-darkblue text-white text-sm flexCenter">
          Become An Expert
        </a>
      </div>
    </div>
  );
}
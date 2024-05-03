import {
  facebookSVG,
  instagramSVG,
  linkedinSVG,
  twitterSVG,
} from "@/Utils/svg";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const companyMenu = [
  { title: "About Us", href: "/about" },
  { title: "Careers", href: "" },
  { title: "Blog", href: "/blog" },
  { title: "Press", href: "" },
  { title: "Gift Cards", href: "" },
];
const supportMenu = [
  { title: "Contact", href: "/contact" },
  { title: "Legal Notice", href: "" },
  { title: "Privacy Policy", href: "" },
  { title: "Terms and Conditions", href: "" },
  { title: "Sitemap", href: "" },
];
const otherServicesMenu = [
  { title: "Car hire", href: "" },
  { title: "Activity Finder", href: "" },
  { title: "Tour List", href: "" },
  { title: "Flight finder", href: "" },
  { title: "Cruise Ticket", href: "" },
  { title: "Holiday Rental", href: "" },
  { title: "Travel Agents", href: "" },
];
export default function Footer() {
  return (
    <div className="bg-darkblue text-white pt-10">
      <div className="container mx-auto px-4 sm:px-12 md:px-4">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-x-6 gap-y-10">
          <div className="lg:col-span-3 xl:col-span-2">
            <Image
              src="/assets/images/navbar/tour-booking-logo-1.png"
              alt="logo"
              width={80}
              height={80}
              className="mb-5"
            />
            <div className="grid gric-cols-1 sm:grid-cols-2 gap-y-8 mb-10 sm:mb-14">
              <div className="flex flex-col gap-1">
                <span className="text-sm">Toll Free Customer Care</span>
                <a href="tel:+989039104679">(+98) 903 910 4679</a>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm">Need live support?</span>
                <a href="mailto:mj.sharifimanesh@gmail.com">
                  mj.sharifimanesh@gmail.com
                </a>
              </div>
            </div>
            <div className="flex flex-col items-start gap-4 mb-10 sm:mb-14">
              <p>Your all-in-one travel app</p>
              <div className="flex flex-wrap gap-x-10 gap-y-4">
                <a
                  href=""
                  className="flexCenter gap-4 rounded px-6 py-2 bg-glass"
                >
                  <svg
                    className="w-8 h-8 bg-transparent text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.537 12.625a4.421 4.421 0 0 0 2.684 4.047 10.96 10.96 0 0 1-1.384 2.845c-.834 1.218-1.7 2.432-3.062 2.457-1.34.025-1.77-.794-3.3-.794-1.531 0-2.01.769-3.275.82-1.316.049-2.317-1.318-3.158-2.532-1.72-2.484-3.032-7.017-1.27-10.077A4.9 4.9 0 0 1 8.91 6.884c1.292-.025 2.51.869 3.3.869.789 0 2.27-1.075 3.828-.917a4.67 4.67 0 0 1 3.66 1.984 4.524 4.524 0 0 0-2.16 3.805m-2.52-7.432A4.4 4.4 0 0 0 16.06 2a4.482 4.482 0 0 0-2.945 1.516 4.185 4.185 0 0 0-1.061 3.093 3.708 3.708 0 0 0 2.967-1.416Z" />
                  </svg>
                  <div className="hover:translate-x-2 duration-200 text-sm">
                    <span className="block">Download on the</span>
                    <span className="block font-semibold">Apple Store</span>
                  </div>
                </a>
                <a
                  href=""
                  className="flexCenter gap-4 rounded px-6 py-2 bg-glass"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    style={{ fill: "#fff", width: "32px", height: "32px" }}
                  >
                    <path d="m12.954 11.616 2.957-2.957L6.36 3.291c-.633-.342-1.226-.39-1.746-.016l8.34 8.341zm3.461 3.462 3.074-1.729c.6-.336.929-.812.929-1.34 0-.527-.329-1.004-.928-1.34l-2.783-1.563-3.133 3.132 2.841 2.84zM4.1 4.002c-.064.197-.1.417-.1.658v14.705c0 .381.084.709.236.97l8.097-8.098L4.1 4.002zm8.854 8.855L4.902 20.91c.154.059.32.09.495.09.312 0 .637-.092.968-.276l9.255-5.197-2.666-2.67z"></path>
                  </svg>
                  <div className="hover:translate-x-2 duration-200 text-sm">
                    <span className="block">Get it on</span>
                    <span className="block font-semibold">Google Play</span>
                  </div>
                </a>
              </div>
            </div>
            <div className="flex flex-col items-start gap-4">
              <span>Follow us on social media</span>
              <ul className="flexCenter gap-6">
                <li className="duration-200 hover:translate-x-2">
                  <a href="">
                    {facebookSVG(undefined, "text-white", "w-5", "h-5")}
                  </a>
                </li>
                <li className="duration-200 hover:translate-x-2">
                  <a href="">
                    {twitterSVG(undefined, "text-white", "w-5", "h-5")}
                  </a>
                </li>
                <li className="duration-200 hover:translate-x-2">
                  <a href="">
                    {instagramSVG(undefined, "text-white", "w-5", "h-5")}
                  </a>
                </li>
                <li className="duration-200 hover:translate-x-2">
                  <a href="">
                    {linkedinSVG(undefined, "text-white", "w-5", "h-5")}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="lg:col-span-3 xl:col-start-4">
            <div className="mb-10 sm:mb-14">
              <p className="font-semibold mb-2">Get Updates & More</p>
              <div className="relative w-full">
                <input
                  className="bg-white text-dark w-full px-3 py-5 border-none outline-none rounded placeholder:text-"
                  placeholder="Your Email"
                />
                <button className="absolute right-4 h-full top-1/2 -translate-y-1/2 underline text-dark font-semibold">
                  Subscribe
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 ">
              <div>
                <span className="block mb-5 font-bold">Company</span>
                <ul>
                  {companyMenu.map((e, i) => (
                    <li key={i} className="duration-200 translate-x-2 mb-3">
                      <a href={e.href}>{e.title}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="block mb-5 font-bold">Support</span>
                <ul>
                  {supportMenu.map((e, i) => (
                    <li key={i} className="duration-200 translate-x-2 mb-3">
                      <a href={e.href}>{e.title}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="block mb-5 font-bold">Other Services</span>
                <ul>
                  {otherServicesMenu.map((e, i) => (
                    <li key={i} className="duration-200 translate-x-2 mb-3">
                      <a href={e.href}>{e.title}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-white mt-10 py-4 text-sm flex flex-wrap justify-between w-full gap-x-10">
          <div className="py-4 text-sm flex flex-wrap sm:gap-6 md:gap-10 gap-y-5">
            <span>
              by{" "}
              <a href="mailto:mj.sharifimanesh@gmail.com">
                mj.sharifimanesh@gmail.com
              </a>
            </span>
            <div className="flexCenter gap-3">
              <Link href={"#"} className="hover:translate-x-1 duration-200">
                Privacy
              </Link>
              <Link href={"#"} className="hover:translate-x-1 duration-200">
                Terms
              </Link>
              <Link href={"#"} className="hover:translate-x-1 duration-200">
                Site Map
              </Link>
            </div>
          </div>
          <div className="flexCenter gap-6">
            <div className="flexCenter gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                />
              </svg>
              <span className="underline font-semibold">English(US)</span>
            </div>
            <div className="flexCenter gap-1">
              $ &nbsp; <span className="underline font-semibold">USD</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import HamburgerMenu from "./HamburgerMenu";

const activePage = (path: string): string => {
  switch (path) {
    case "/":
      return "Home";
    case "/tours":
      return "Tour";
    case "/blog":
      return "Blog";
    default:
      return "";
  }
};
const pages = [
  { title: "Home", link: "/" },
  { title: "Tour", link: "/tours" },
  { title: "Blog", link: "/blog" },
];
export default function Navbar() {
  const pathName = usePathname();
  // Handle Hamburger Menu
  const [hamburgerMenu, setHamburgerMenu] = useState<boolean>(false);
  const openHamburgerMenu = (event: React.MouseEvent<SVGSVGElement>): void => {
    setHamburgerMenu(true);
    document.body.classList.add(
      "before:content-['']",
      "before:absolute",
      "before:top-0",
      "before:bottom-0",
      "before:right-0",
      "before:left-0",
      "before:bg-black",
      "before:opacity-0",
      "before:z-60"
    );
  };
  const closeHamburgerMenu = () => {
    setHamburgerMenu(false);
    document.body.classList.remove(
      "before:content-['']",
      "before:absolute",
      "before:top-0",
      "before:bottom-0",
      "before:right-0",
      "before:left-0",
      "before:bg-black",
      "before:opacity-60",
      "before:z-60"
    );
  };
  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (!(e.target as HTMLElement).closest(".hamburgerMenu")) {
        closeHamburgerMenu();
      }
      window.addEventListener("resize", () => {
        if (window.innerWidth > 1024) {
          closeHamburgerMenu();
        }
      });
    });
  }, []);
  // Nav BackgroundColor
  const [bgWhite, setBgWhite] = useState<boolean>(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 0 ? setBgWhite(true) : setBgWhite(false);
    });
  }, []);
  return (
    <>
      <nav
        className={`fixed z-40 top-0 left-0 right-0 h-22 transition-all duration-300 ${
          bgWhite ? "bg-white shadow-nav" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto h-full flexBetween px-2">
          <div className="flexCenter gap-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="hamburgerMenu hidden md:block lg:hidden w-7 h-7 cursor-pointer before:bg-dark"
              onClick={(e) => openHamburgerMenu(e)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
              />
            </svg>
            <Image
              src="/assets/images/navbar/tour-booking-logo-2.png"
              alt="logo"
              width={70}
              height={70}
            />
            <ul className="hidden lg:flexCenter gap-3">
              {pages.map((page, index) => (
                <li key={index}>
                  <Link
                    className={`text-md font-medium ${
                      page.title === activePage(pathName)
                        ? "text-darkblue"
                        : "text-dark"
                    }`}
                    href={page.link}
                  >
                    {page.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="hidden md:flexCenter gap-2">
            <Link
              href={""}
              className={`flexCenter duration-300 rounded-md ${
                bgWhite
                  ? "bg-dark hover:bg-darkblue text-white"
                  : "bg-white hover:bg-darkblue text-dark hover:text-white"
              }   h-12 px-4 text-md font-normal`}
            >
              Become An Expert
            </Link>
            <Link
              href={""}
              className={`flexCenter duration-300 rounded-md border bg-transparent h-12 px-4 ${
                bgWhite
                  ? "text-dark border-dark hover:bg-darkblue hover:border-darkblue hover:text-white"
                  : "text-white border-white hover:bg-white hover:text-dark"
              } text-md font-normal`}
            >
              Sign In / Register
            </Link>
          </div>
          <div className="flexCenter gap-3 md:hidden">
            <Link href={""}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-7 h-7 "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </Link>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="hamburgerMenu w-7 h-7 cursor-pointer"
              onClick={(e) => openHamburgerMenu(e)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
              />
            </svg>
          </div>
        </div>
      </nav>
      <HamburgerMenu
        open={hamburgerMenu}
        pages={pages}
        closeHamburgerMenu={closeHamburgerMenu}
      />
    </>
  );
}
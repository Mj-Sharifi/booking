"use client";
import Image from "next/image";
import { useParams, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import HamburgerMenu from "./HamburgerMenu";
import { useTranslations } from "next-intl";
import { localeFlag, locales } from "@/utils/utils";
import { HiChevronDown } from "react-icons/hi";
import Popup from "../Popup/Popup";
import LangSwitcher from "./LangSwitcher";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import RadioInput from "../Form/RadioInput";
import NavigationLink from "../link/NavigationLink";
import { useCookies } from "react-cookie";
import useCSR from "@/hooks/useCSR";

const pages = ["home", "tour", "blog"];
export default function Navbar() {
  const [{ user_info }] = useCookies(["user_info"]);
  const { locale } = useParams();
  const t = useTranslations("common");
  const pathName = usePathname();
  // Handle Hamburger Menu
  const [hamburgerMenu, setHamburgerMenu] = useState<boolean>(false);
  const openHamburgerMenu = (event: React.MouseEvent<SVGSVGElement>): void => {
    setHamburgerMenu(true);
    document.body.classList.add("body-wrapper");
  };
  const closeHamburgerMenu = () => {
    setHamburgerMenu(false);
    document.body.classList.remove("body-wrapper");
  };
  useEffect(() => {
    const clickEvent = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(".hamburgerMenu")) {
        closeHamburgerMenu();
      }
    };
    document.addEventListener("click", (e) => clickEvent(e));
    const resizeEvent = () => {
      if (window.innerWidth > 1024) {
        closeHamburgerMenu();
      }
    };
    document.addEventListener("resize", resizeEvent);

    return () => {
      document.removeEventListener("click", (e) => clickEvent(e));
      document.removeEventListener("resize", resizeEvent);
    };
  }, []);

  // Nav BackgroundColor
  const [bgEffect, setBgEffect] = useState<boolean>(false);
  useEffect(() => {
    setBgEffect(false);
    const scrollEvent = () => {
      window.scrollY > 0 ? setBgEffect(true) : setBgEffect(false);
    };
    if (pathName == "/" || pathName == "/fa") {
      window.addEventListener("scroll", scrollEvent);
      return () => {
        window.removeEventListener("scroll", scrollEvent);
      };
    } else {
      setBgEffect(true);
    }
  }, [pathName]);
  // Lang Switcher
  const [showLangSwitcher, setShowLangSwitcher] = useState(false);
  // Theme Switcher
  const themeSwitcher = (theme: "light" | "dark") => {
    if (typeof localStorage !== "undefined") {
      localStorage.theme = theme;
      if (theme == "dark") {
        document.body.classList.add("dark");
      } else {
        document.body.classList.remove("dark");
      }
    }
  };
  const isInClient = useCSR();
  return (
    <>
      {isInClient && (
        <>
          <nav
            className={`fixed z-40 top-0 left-0 right-0 h-22 transition-all duration-300 text-dark ${
              bgEffect
                ? "bg-white dark:bg-dark dark:text-white"
                : "bg-transparent dark:bg-dark"
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
                <NavigationLink href={"/"}>
                  <Image
                    src="/assets/images/navbar/tour-booking-logo-2.png"
                    alt="logo"
                    width={70}
                    height={70}
                  />
                </NavigationLink>
                <button
                  type="button"
                  disabled={pathName.includes("/blog/")}
                  className={`duration-300 border-none px-2 py-1 flex gap-1 items-center text-xs md:text-sm ${
                    pathName.includes("/blog/")
                      ? ""
                      : "hover:text-darkblue dark:hover:text-lightblue"
                  } text-dark dark:text-white`}
                  onClick={() => setShowLangSwitcher(true)}
                >
                  {t(`${locale}`)}{" "}
                  <Image
                    src={`/assets/images/navbar/${
                      localeFlag[locale as "en" | "fa"]
                    }`}
                    alt={locale as string}
                    width={32}
                    height={20}
                    className="rounded"
                  />
                  {!pathName.includes("/blog/") && <HiChevronDown size={20} />}
                </button>
                <RadioInput
                  values={["light", "dark"]}
                  initialValue={localStorage.getItem("theme") || "light"}
                  onChange={themeSwitcher}
                  rightLabel={t("light_mode")}
                  leftLabel={t("dark_mode")}
                  rightIcon={<MdOutlineLightMode size={22} />}
                  leftIcon={<MdOutlineDarkMode size={22} />}
                />
              </div>
              <ul className="hidden lg:flexCenter gap-8 text-lg">
                {pages.map((page, index) => (
                  <li key={index}>
                    <NavigationLink
                      className={`duration-300 text-md font-medium ${
                        locales.some(
                          (locale) =>
                            pathName ===
                            `${locale == "en" ? "" : "/" + locale}${
                              page == "home"
                                ? `${locale == "en" ? "/" : ""}`
                                : "/" + page
                            }`
                        )
                          ? "text-darkblue dark:text-lightblue"
                          : "text-dark dark:text-white hover:text-darkblue/70 dark:hover:text-lightblue/70"
                      }`}
                      // @ts-ignore
                      href={page === "home" ? "/" : "/" + page}
                    >
                      {t(page)}
                    </NavigationLink>
                  </li>
                ))}
              </ul>
              <div className="hidden md:flexCenter gap-2">
                <NavigationLink
                  href={"/become-expert"}
                  className={`flexCenter duration-300 rounded-md ${
                    bgEffect
                      ? "bg-dark dark:bg-white hover:bg-darkblue dark:hover:text-white text-white dark:text-dark"
                      : "bg-white hover:bg-darkblue text-dark hover:text-white"
                  }   h-12 px-4 text-md font-normal`}
                >
                  {t("become_expert")}
                </NavigationLink>
                <NavigationLink
                  href={user_info?.jwt ? "/profile/dashboard" : "/register"}
                  className={`flexCenter duration-300 rounded-md border bg-transparent h-12 px-4 ${
                    bgEffect
                      ? "text-dark dark:text-white dark:hover:text-dark dark:border-white dark:hover:bg-white border-dark hover:bg-darkblue hover:border-darkblue hover:text-white"
                      : "text-white border-white hover:bg-white hover:text-dark"
                  } text-md font-normal`}
                >
                  {user_info?.jwt
                    ? t("profile")
                    : `${t("login") + " / " + t("register")}`}
                </NavigationLink>
              </div>
              <div className="flexCenter gap-3 md:hidden">
                <NavigationLink href={"/"}>
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
                </NavigationLink>
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
          {showLangSwitcher && (
            <Popup show={showLangSwitcher} onClose={setShowLangSwitcher}>
              <LangSwitcher />
            </Popup>
          )}
        </>
      )}
    </>
  );
}

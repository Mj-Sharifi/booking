"use client";
import Image from "next/image";
import { useParams, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import HamburgerMenu from "./HamburgerMenu";
import { useTranslations } from "next-intl";
import { capitalizaWords, localeFlag, locales } from "@/utils/utils";
import { HiChevronDown } from "react-icons/hi";
import Popup from "../Popup/Popup";
import LangSwitcher from "./LangSwitcher";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import RadioInput from "../Form/RadioInput";
import NavigationLink from "../link/NavigationLink";
import { useCookies } from "react-cookie";
import { HiBars3BottomLeft, HiBars3BottomRight, HiOutlineUserCircle } from "react-icons/hi2";
import Drawer from "../Drawer";
import Dropdown from "../Dropdown";
import { useRouter } from "@/navigation";
import { locale } from "@/types/types";
import { userInfo } from "@/types/response";

const pages = ["home", "tour", "blog"];

export default function Navbar() {
  const [{ user_info },_,removeCookie] = useCookies<"user_info",{user_info:userInfo}>(["user_info"]);
  const { locale } = useParams<{ locale: locale }>();
  const t = useTranslations("");
  const pathName = usePathname();
  const router = useRouter();
  // Handle Hamburger Menu
  const [hamburgerMenu, setHamburgerMenu] = useState<boolean>(false);
  const openHamburgerMenu = () => {
    setHamburgerMenu(true);
    document.body.classList.add("body_wrapper");
  };
  const closeHamburgerMenu = () => {
    setHamburgerMenu(false);
    document.body.classList.remove("body_wrapper");
  };
  useEffect(() => {
    const clickEvent = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(".hamburgerMenu")) {
        closeHamburgerMenu();
      }
    };
    document.addEventListener("click", clickEvent);
    const resizeEvent = () => {
      if (window.innerWidth > 1024) {
        closeHamburgerMenu();
      }
    };
    document.addEventListener("resize", resizeEvent);

    return () => {
      document.removeEventListener("click", clickEvent);
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
  const logoutUser = () => {
    if (pathName.includes("/booking")) {
    } else if (pathName.includes("/profile/")) {
      removeCookie("user_info", { path: "/" });
      router.push("/", { locale });
    } else {
      removeCookie("user_info", { path: "/" });
    }
  };

  return (
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
          <button
              type="button"
              onClick={() => openHamburgerMenu()}
              className="hamburgerMenu hidden md:block lg:hidden"
            >
              <HiBars3BottomLeft className="rtl:rotate-180" size={24} />
            </button>
            <NavigationLink href={"/"}>
              <Image
                src="/assets/images/navbar/tour-booking-logo-2.png"
                alt="logo"
                width={60}
                height={60}
              />
            </NavigationLink>
            <button
              type="button"
              disabled={["/blog/","/tour/"].includes(pathName)}
              className={`duration-300 border-none px-2 py-1 flex gap-1 items-center text-xs md:text-sm ${
                ["/blog/","/tour/"].includes(pathName)
                  ? ""
                  : "hover:text-darkblue dark:hover:text-lightblue"
              } text-dark dark:text-white`}
              onClick={() => setShowLangSwitcher(true)}
            >
              {t(`common.${locale}`)}{" "}
              <Image
                src={`/assets/images/navbar/${
                  localeFlag[locale as "en" | "fa"]
                }`}
                alt={locale as string}
                width={32}
                height={20}
                className="rounded"
              />
              {!["/blog/","/tour/"].includes(pathName) && <HiChevronDown size={20} />}
            </button>
            <RadioInput
              values={["light", "dark"]}
              initialValue={localStorage.getItem("theme") || "light"}
              onChange={(v) => themeSwitcher(v as "light" | "dark")}
              rightLabel={t("common.light_mode")}
              leftLabel={t("common.dark_mode")}
              rightIcon={<MdOutlineLightMode size={22} />}
              leftIcon={<MdOutlineDarkMode size={22} />}
              size="small"
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
                  {capitalizaWords(t(`common.${page}`))}
                </NavigationLink>
              </li>
            ))}
          </ul>
          <div className="hidden md:flexCenter text-sm lg:text-base gap-2 rtl:ml-6 ltr:mr-6">
            <NavigationLink
              href={"/become-expert"}
              className={`flexCenter duration-300 rounded-md ${
                bgEffect
                  ? "bg-dark dark:bg-white hover:bg-darkblue dark:hover:text-white text-white dark:text-dark"
                  : "bg-white hover:bg-darkblue text-dark hover:text-white"
              }   h-12 px-3 text-md font-normal`}
            >
              {t("common.become_expert")}
            </NavigationLink>
            {user_info?.jwt ? (
              <Dropdown
                label={user_info.user.username||user_info.user.email}
                OpenMode="hover"
                btnClassNames={`flexCenter duration-300 rounded-md border bg-transparent h-12 px-3 ${
                  bgEffect
                    ? "text-dark dark:text-white dark:hover:text-dark dark:border-white dark:hover:bg-white border-dark hover:bg-darkblue hover:border-darkblue hover:text-white"
                    : "text-white border-white hover:bg-white hover:text-dark"
                } text-md font-normal`}
              >
                <div className="flexCenter flex-col gap-y-2 rounded-md bg-white shadow-md shadow-light dark:shadow-lighter">
                  <div className="flexBetween gap-x-2 text-nowrap py-1 px-3 text-sm border-b-2"><span>{t("tour.wallet")}:</span><span>{user_info.user.wallet} {t("footer.usd")}</span></div>
                  {["profile", "logout"].map((e, i) => (
                    <button
                      key={i}
                      type="button"
                      className="py-1 px-3 duration-300 w-full text-nowrap hover:bg-darkblue hover:text-white dark:hover:bg-lightblue dark:hover:text-dark rounded"
                      // @ts-ignore
                      onClick={() => {
                        if (e == "profile") {
                          router.push("/profile/dashboard", { locale });
                        } else {
                          logoutUser();
                        }
                      }}
                    >
                      {t(`common.${e}`)}
                    </button>
                  ))}
                </div>
              </Dropdown>
            ) : (
              <NavigationLink
                href="/login"
                className={`flexCenter duration-300 rounded-md border bg-transparent h-12 px-3 ${
                  bgEffect
                    ? "text-dark dark:text-white dark:hover:text-dark dark:border-white dark:hover:bg-white border-dark hover:bg-darkblue hover:border-darkblue hover:text-white"
                    : "text-white border-white hover:bg-white hover:text-dark"
                } text-md font-normal`}
              >
                {t("common.login") + " / " + t("common.register")}
              </NavigationLink>
            )}
          </div>
          <div className="flexCenter gap-3 md:hidden dark:text-white">
            <NavigationLink href={"/profile/dashboard"}>
              <HiOutlineUserCircle size={24} />
            </NavigationLink>
            <button
              type="button"
              onClick={() => openHamburgerMenu()}
              className="hamburgerMenu"
            >
              <HiBars3BottomRight className="rtl:rotate-180" size={24} />
            </button>
          </div>
        </div>
      </nav>
      <Drawer show={hamburgerMenu} onClose={closeHamburgerMenu}>
        <HamburgerMenu pages={pages} logout={logoutUser}/>
      </Drawer>

      {showLangSwitcher && (
        <Popup show={showLangSwitcher} onClose={setShowLangSwitcher}>
          <LangSwitcher />
        </Popup>
      )}
    </>
  );
}

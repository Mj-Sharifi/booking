"use client";
import { isTarget } from "@/utils/utils";
import React, { MouseEventHandler, ReactNode, useEffect } from "react";

type props = {
  children: ReactNode;
  show: boolean;
  onClose: Function;
  allowOutsideClick?: boolean;
};
export default function Drawer({
  children,
  show,
  onClose,
  allowOutsideClick = true,
}: props) {
  const handleWindowClick = (e: MouseEvent) => {
    if (allowOutsideClick && !isTarget(e, ["drawer-el"])) {
      setTimeout(() => onClose(false), 0);
    }
  };
  useEffect(() => {
    const resizeEvent = () => {
      if (window.innerWidth > 1024) {
        onClose();
      }
    };
    document.addEventListener("resize", resizeEvent);

    return () => document.removeEventListener("resize", resizeEvent);
  }, []);
    return (
      <div
        className={`${show?"body-black-wrapper fixed top-0 right-0 bottom-0 left-0 z-[999] min-h-screen h-full min-w-full w-full overflow-y-auto overflow-x-hidden grid items-center place-items-center p-4 bg-fade-popup":""}`}
        onClick={handleWindowClick}
      >
        <div
          className={`drawer-el w-72 px-4 flex justify-center tour-mobile-filters duration-300 fixed bg-white dark:bg-dark top-0 bottom-0 z-[1000] min-h-screen ltr:border-r rtl:border-l border-darkblue dark:border-lightblue ${
            show ? "ltr:left-0 rtl:right-0" : "ltr:-left-72 rtl:-right-72"
          }`}
        >
          {children}
        </div>
      </div>
    );
  }


"use client";
import { onlyNumbers } from "@/utils/utils";
import { useTranslations } from "next-intl";
import React, { useEffect, useRef, useState } from "react";
import { HiMinus, HiPlus } from "react-icons/hi2";

type props = {
  value: { adult: number; children: number; rooms: number };
  onChange: (g: { adult: number; children: number; rooms: number }) => void;
};
export default function GuestSelection({ value, onChange }: props) {
  const t = useTranslations();
  const guestSelectionDiv = useRef<HTMLDivElement>(null);
  const [guestEl, setGuestEl] = useState<boolean>(false);
  const [guest, setGuest] = useState<{
    adult: number;
    children: number;
    rooms: number;
  }>(value);
  const handleGuest = (name: "adult" | "children" | "rooms", value: number) => {
    let newGuest = { ...guest };
    if (name == "adult") {
      newGuest.adult = value >= 1 ? value : 1;
    } else if (name == "children") {
      newGuest.children = value;
    } else if (name == "rooms" && guest.adult > 1) {
      newGuest.rooms = value > 1 ? value : 1;
    }
    if (newGuest.rooms > newGuest.adult) {
      newGuest.rooms = newGuest.adult;
    }
    setGuest(newGuest);
  };
  useEffect(() => {
    if(guestSelectionDiv){
      setTimeout(()=>guestSelectionDiv.current?.classList.remove("hidden"),500)
    }
    document.addEventListener("click", (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(".guest-selection")) {
        setGuestEl(false);
      }
    });
  }, []);
  useEffect(() => {
    if (guestSelectionDiv.current) {
      if (guestEl) {
        guestSelectionDiv.current?.classList.remove("animate-fadeInDown");
        guestSelectionDiv.current?.classList.remove("invisible");
        guestSelectionDiv.current?.classList.add("animate-fadeInUp");
        setTimeout(() => {
          guestSelectionDiv.current?.classList.add("visible");
        }, 500);
      } else {
        guestSelectionDiv.current?.classList.remove("visible");
        guestSelectionDiv.current?.classList.remove("animate-fadeInUp");
        guestSelectionDiv.current?.classList.add("animate-fadeInDown");
        setTimeout(() => {
          guestSelectionDiv.current?.classList.add("invisible");
        }, 500);
      }
    }
  }, [guestEl]);
  useEffect(() => {
    onChange(guest);
  }, [JSON.stringify(guest)]);
  return (
    <div className="guest-selection w-full flex flex-col gap-2 relative">
      <span className="font-semibold text-sm md:text-base">
        {t("tour.travelers_number")}
      </span>
      <span
        className="guest-selection text-light dark:text-lighter text-xs md:text-sm cursor-pointer"
        onClick={() => setGuestEl(true)}
      >
        {guest.adult} {t("common.adult", { plural: "s" })} - {guest.children}{" "}
        {t("common.children")} - {guest.rooms}{" "}
        {t("common.room", { plural: "s" })}
      </span>
      <div
        ref={guestSelectionDiv}
        className={`guest-selection absolute rounded-sm bg-white dark:bg-dark shadow-nav p-7 left-0 top-full min-w-80 sm:min-w-96 duration-300 overflow-hidden hidden`}
      >
        <div className="flexBetween pb-4">
          <span>{t("common.adult", { plural: "s" })}</span>
          <div className="flexBetween w-32 ">
            <button
              type="button"
              className="border-2 border-darkblue dark:border-lightblue rounded w-9 h-9 flexCenter disabled:opacity-40"
              disabled={guest.adult == 1}
              onClick={() => handleGuest("adult", guest.adult - 1)}
            >
              <HiMinus
                size={18}
                className="text-darkblue dark:text-lightblue"
              />
            </button>
            <input
              value={guest.adult}
              onChange={(e) => {
                console.log(e.target.value);
                handleGuest("adult", onlyNumbers(e.target.value));
              }}
              className="w-9 h-9 flexCenter text-center outline-none border-0 rounded dark:bg-dark dark:text-white dark:border-2 dark:border-white"
            />
            <button
              type="button"
              className="border-2 border-darkblue dark:border-lightblue rounded w-9 h-9 flexCenter disabled:opacity-40"
              onClick={() => handleGuest("adult", guest.adult + 1)}
            >
              <HiPlus size={18} className="text-darkblue dark:text-lightblue" />
            </button>
          </div>
        </div>
        <div className="flexBetween py-4 border-y border-border">
          <span>{t("common.children")}</span>
          <div className="flexBetween w-32">
            <button
              type="button"
              className="border-2 border-darkblue dark:border-lightblue rounded w-9 h-9 flexCenter disabled:opacity-40"
              onClick={() => handleGuest("children", guest.children - 1)}
            >
              <HiMinus
                size={18}
                className="text-darkblue dark:text-lightblue"
              />
            </button>
            <input
              value={guest.children}
              onChange={(e) => {
                handleGuest("children", onlyNumbers(e.target.value));
              }}
              className="w-9 h-9 flexCenter text-center outline-none border-0 rounded dark:bg-dark dark:text-white dark:border-2 dark:border-white"
            />
            <button
              type="button"
              className="border-2 border-darkblue dark:border-lightblue rounded w-9 h-9 flexCenter disabled:opacity-40"
              onClick={() => handleGuest("children", guest.children + 1)}
            >
              <HiPlus size={18} className="text-darkblue dark:text-lightblue" />
            </button>
          </div>
        </div>
        <div className="flexBetween pt-4">
          <span>{t("common.room", { plural: "s" })}</span>
          <div className="flexBetween w-32">
            <button
              type="button"
              disabled={guest.rooms == 1}
              className="border-2 border-darkblue dark:border-lightblue rounded w-9 h-9 flexCenter disabled:opacity-40"
              onClick={() => handleGuest("rooms", guest.rooms - 1)}
            >
              <HiMinus
                size={18}
                className="text-darkblue dark:text-lightblue"
              />
            </button>
            <input
              value={guest.rooms}
              onChange={(e) => {
                handleGuest("rooms", onlyNumbers(e.target.value));
              }}
              className="w-9 h-9 flexCenter text-center outline-none border-0 rounded dark:bg-dark dark:text-white dark:border-2 dark:border-white"
            />
            <button
              type="button"
              className="border-2 border-darkblue dark:border-lightblue rounded w-9 h-9 flexCenter disabled:opacity-40"
              disabled={guest.rooms == guest.adult}
              onClick={() => handleGuest("rooms", guest.rooms + 1)}
            >
              <HiPlus size={18} className="text-darkblue dark:text-lightblue" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

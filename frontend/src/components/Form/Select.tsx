"use client";
import { useTranslations } from "next-intl";
import React, { ReactNode, useEffect, useRef, useState } from "react";

type props = {
  id?: string;
  name?: string;
  initialValue?:string
  options: {
    value: string | number;
    text: string | number;
    icon?: ReactNode;
  }[];
  height?: number;
  label?: string;
  isToched?: boolean;
  errorMessage?: string;
  onChange: (value: string | number) => void;
};
export default function Select({
  id,
  name,
  initialValue,
  options,
  onChange,
  height,
  label,
  isToched,
  errorMessage,
}: props) {
  const t = useTranslations("error");
  const [open, setOpen] = useState(false);
  const [focus, setFocus] = useState(false);
  const [text, setText] = useState<string | number>("");
  const [value, setValue] = useState<string | number>();
  const [searchedOptions, setSearchedOptions] = useState<
    {
      value: string | number;
      text: string | number;
      icon?: ReactNode;
    }[]
  >([]);
  useEffect(() => {
    options ? setSearchedOptions(options) : setSearchedOptions([]);
  }, [options]);
  // Move with arrows
  const [currentLi, setCurrentLi] = useState<number>(-1);
  const ulElement = useRef<HTMLUListElement>(null); // Ref for the scrollable container

  useEffect(() => {
    
    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();
      if (options?.length) {
        const lastIndex = options?.length - 1;
        switch (e.key) {
          case "ArrowDown":
            setCurrentLi((prev) =>
              prev === -1 || prev === lastIndex ? 0 : prev + 1
            );
            break;
          case "ArrowUp":
            setCurrentLi((prev) => (prev < 1 ? lastIndex : prev - 1));
            break;
          case "Escape":
            setOpen(false);
            setCurrentLi(-1);
            break;
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown); // Clean up listener
    };
  }, [options]);
  useEffect(() => {
    if (currentLi !== -1 && ulElement.current) {
      const currentItem = ulElement.current.children[currentLi] as HTMLElement;
      if (currentItem) {
        // Ensure the highlighted item scrolls into view
        currentItem.scrollIntoView({
          behavior: "smooth",
          block: "nearest", // Scrolls to the nearest edge if already partially visible
        });
      }
    }
  }, [currentLi]);

  return (
    <div className="relative">
      <div
        className={`duration-300 relative rounded-md w-full ${
          focus
            ? "border-2 border-dark dark:border-white"
            : "border border-light dark:border-lighter"
        } ${
          isToched
            ? errorMessage
              ? "!border-red-600 dark:!border-red-400 !border-2"
              : "!border-green-600 dark:!border-green-400 !border-2"
            : ""
        }`}
      >
        <input
          id={id || `select_component-${label}`}
          name={name}
          className="w-full outline-none pt-7 pb-2 px-6 bg-transparent focus:!outline-none focus:!ring-0 focus:!border-0"
          onClick={() => setOpen(true)}
          onFocus={() => {
            setFocus(true);
          }}
          value={value}
          onBlur={() => setFocus(false)}
          onChange={(e) => {
            setText("");
            setValue(e.target.value);

            if (e.target.value.length > 2) {
              let newOptions = options.filter((v) =>
                String(v.text)
                  .toLowerCase()
                  .includes(e.target.value.toLowerCase())
              );
              setSearchedOptions(newOptions);
            } else {
              setSearchedOptions(options);
            }
          }}
        />
        <label
          htmlFor={id || `select_component-${label}`}
          className={`text-xs md:text-sm duration-300 absolute ltr:left-6 rtl:right-6 top-1/2 text-light dark:text-lighter ${
            focus ? "-translate-y-[125%]" : "-translate-y-[85%]"
          }`}
        >
          {label}
        </label>
        {text && (
          <span className="absolute rtl:right-6 ltr:left-6 top-7">{text}</span>
        )}
      </div>

      <ul
        ref={ulElement}
        className={`text-sm md:text-base absolute z-20 top-full duration-300 transition-height overflow-y-auto overflow-x-hidden bg-transparent right-0 left-0 flex flex-col bg-white dark:bg-dark overflow-auto shadow-md rounded-b-lg ${
          open ? "border-2 border-t-0" : "border-0"
        }  border-dark dark:border-white`}
        style={{ maxHeight: open ? `${height || 160}px` : "0" }}
      >
        {searchedOptions.length > 0 ? (
          searchedOptions.map(({ value, text, icon }, i) => (
            <li
              key={i}
              onClick={() => {
                setOpen(false);
                setText(text);
                onChange(value);
                setFocus(false);
                setValue("");
              }}
              className={`duration-300 py-2 px-3 flex gap-2 cursor-pointer w-full hover:bg-darkblue hover:text-white dark:bg-lightblue dark:hover:text-dark ${
                i == currentLi ? "bg-lightblue dark:bg-darkblue" : ""
              }`}
            >
              {icon}
              {text}
            </li>
          ))
        ) : (
          <li className="p-3 w-full">{t("no_item_found")}</li>
        )}
      </ul>
    </div>
  );
}

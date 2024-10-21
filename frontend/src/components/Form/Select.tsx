"use client";
import { isTarget } from "@/utils/utils";
import { useTranslations } from "next-intl";
import React, {
  MouseEventHandler,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

type props = {
  id?: string;
  name?: string;
  initialValue?: string;
  options: {
    value: string | number;
    title: string | number;
    icon?: ReactNode;
  }[];
  height?: number;
  label?: string;
  isToched?: boolean;
  errorMessage?: string;
  onChange: (value: string | number) => void;
  onBlur?: (value: string | number) => void;
  autoComplete?:React.HTMLInputAutoCompleteAttribute
};
export default function Select({
  id,
  name,
  initialValue,
  options,
  onChange,
  onBlur,
  height=160,
  label,
  isToched,
  errorMessage,
  autoComplete="off"
}: props) {
  const t = useTranslations("error");
  const [open, setOpen] = useState(false);
  const [focus, setFocus] = useState(false);
  const [title, setTitle] = useState<string | number>("");
  const [value, setValue] = useState<string | number>();
  const [searchedOptions, setSearchedOptions] = useState<
    {
      value: string | number;
      title: string | number;
      icon?: ReactNode;
    }[]
  >([]);
  // const selectRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    setTitle((
      initialValue && !!options.filter((cn) => cn.value == initialValue).length
        ? options.filter((cn) => cn.value == initialValue)[0]?.title
        : ""
    ))
    options ? setSearchedOptions(options) : setSearchedOptions([]);
  }, [options]);
  // console.log(label,searchedOptions)
  // Move with arrows
  const [currentLi, setCurrentLi] = useState<number>(-1);
  const ulElement = useRef<HTMLUListElement>(null); // Ref for the scrollable container
  const selectRef = useRef<HTMLDivElement>(null);
  const handleMove = (e: KeyboardEvent) => {
    setTimeout(() => {
      if (["ArrowDown", "ArrowUp", "Enter", "Escape"].includes(e.key)) {
        e.preventDefault();
        ulElement.current?.focus()
      }
      const lastIndex = searchedOptions?.length - 1;
      switch (e.key) {
        case "ArrowDown":
          setCurrentLi((prev) =>
            prev === -1 || prev === lastIndex ? 0 : prev + 1
          );
          break;
        case "ArrowUp":
          setCurrentLi((prev) => (prev < 1 ? lastIndex : prev - 1));
          break;
        case "Enter":
          setOpen(false);
          setTitle(searchedOptions[currentLi].title);
          onChange(searchedOptions[currentLi].value);
          onBlur && onBlur(searchedOptions[currentLi].value);
          setFocus(false);
          setValue("");
          break;
        case "Escape":
          setOpen(false);
          setCurrentLi(-1);
          break;
        default:
      }
    }, 0);
  };

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
    if (selectRef.current) {
      selectRef.current.addEventListener("keydown", handleMove);
    }
    return () => {
      selectRef.current?.removeEventListener("keydown", handleMove); // Clean up listener
    };
  }, [currentLi, ulElement, selectRef,searchedOptions]);

  // Close by clicking outside
  useEffect(() => {
    const closeList = (e: MouseEvent) => {
      if (
        !e.target ||
        !(e.target instanceof Element) ||
        !e.target.closest(`#select_component-${id}`)
      ) {
        setOpen(false);
      }
    };
    window.addEventListener("click", (e) => closeList(e));
    return () => window.removeEventListener("click", (e) => closeList(e));
  }, []);
// console.log(label,"searchedOptions: ",searchedOptions)
  return (
    <div className={`relative`} id={`select_component-${id}`} ref={selectRef}>
      <div
        className={`duration-300 relative rounded-md w-full ${
          focus
            ? "border border-dark outline outline-1 outline-dark dark:border-white"
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
            setOpen(true)
            setCurrentLi(0);
            setTitle("");
            setValue(e.target.value);
            if (e.target.value.length > 2) {
              let newOptions = options.filter((v) =>
                String(v.title)
                  .toLowerCase()
                  .includes(e.target.value.toLowerCase())
              );
              setSearchedOptions(newOptions);
            } else {
              setSearchedOptions(options);
            }
          }}
          autoComplete={autoComplete}
        />
        <label
          htmlFor={id || `select_component-${label}`}
          className={`bg-transparent text-xs md:text-sm duration-300 absolute ltr:left-6 rtl:right-6 top-1/2 text-light dark:text-lighter ${
            focus ? "-translate-y-[125%]" : "-translate-y-[85%]"
          }`}
        >
          {label}
        </label>
        {title && (
          <span className="absolute rtl:right-6 ltr:left-6 top-7">{title}</span>
        )}
        {isToched && errorMessage ? (
          <span className="absolute z-[2] top-[calc(100%+6px)] ltr:left-1 rtl:right-1 text-xs lg:text-sm text-red-600 dark:text-red-400">
            {errorMessage}
          </span>
        ) : (
          ""
        )}
      </div>
      <ul
        ref={ulElement}
        className={`text-sm md:text-base absolute z-20 top-full duration-300 transition-height overflow-y-auto overflow-x-hidden bg-transparent right-0 left-0 flex flex-col bg-white dark:bg-dark shadow-md rounded-b-lg ${
          open ? "border-2 border-t-0" : "border-0"
        }  border-dark dark:border-white`}
        style={{ maxHeight: open ? `${height}px` : "0" }}
      >
        {searchedOptions.length > 0 ? (
          searchedOptions.map(({ value, title, icon }, i) => (
            <li
              key={i}
              onClick={() => {
                setOpen(false);
                setTitle(title);
                onChange(value);
                onBlur && onBlur(value);
                setFocus(false);
                setValue("");
              }}
              className={`duration-300 py-2 px-3 flex gap-2 cursor-pointer w-full hover:bg-darkblue hover:text-white dark:bg-lightblue dark:hover:text-dark ${
                i == currentLi ? "bg-lightblue dark:bg-darkblue" : ""
              }`}
            >
              {icon}
              {title}
            </li>
          ))
        ) : (
          <li className="p-3 w-full">{t("no_item_found")}</li>
        )}
      </ul>
    </div>
  );
}

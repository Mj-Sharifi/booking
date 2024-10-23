import React, { ReactNode, useEffect, useState } from "react";

type props = {
  values: [string, string];
  initialValue?: string;
  onChange: (v: string) => void;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  rightLabel?: string;
  leftLabel?: string;
  hideLabel?: "sm" | "md" | "lg" | "xl" | "2xl" | "hide";
  size?: "small" | "medium" | "large";
};
export default function RadioInput({
  values,
  initialValue = values[0],
  onChange,
  leftIcon,
  rightIcon,
  rightLabel,
  leftLabel,
  hideLabel = "sm",
  size = "medium",
}: props) {
  const [value, setValue] = useState(initialValue);
  useEffect(() => {
    onChange(value);
  }, [value]);
  return (
    <div className="flex gap-x-1 items-center">
      <button
        type="button"
        className={`${
          hideLabel == "hide" ? "hidden" : `hidden ${hideLabel}:block`
        } ${
          size == "small"
            ? "text-xs"
            : size == "medium"
            ? "text-sm"
            : "text-base"
        } text-dark dark:text-white text-center`}
        onClick={() => setValue(values[1])}
      >
        {leftLabel}
      </button>
      <div
        data-value={value}
        className={`duration-300 ${
          size == "small"
            ? "w-14 h-7 border"
            : size == "medium"
            ? "w-16 h-8 border"
            : "w-20 h-10 border-2"
        } rounded-full relative bg-white border-solid border-darkblue`}
        onClick={() => {
          setValue(value == values[0] ? values[1] : values[0]);
        }}
      >
        <div
          className={`duration-300 z-[1] shadow-sm-light shadow-darkblue bg-darkblue ${
            size == "small"
              ? "w-5 h-5"
              : size == "medium"
              ? "w-7 h-7"
              : "w-8 h-8"
          } rounded-full absolute top-1/2 -translate-y-1/2 ${
            values[0] == value
              ? "right-[2px]"
              : "right-full translate-x-[calc(100%+2px)]"
          }`}
        />
        <div
          className={`${
            value == values[0]
              ? "hidden"
              : "absolute top-1/2 -translate-y-1/2 right-[2px] text-dark"
          }`}
        >
          {rightIcon}
        </div>
        <div
          className={`${
            value == values[1]
              ? "hidden"
              : "absolute top-1/2 -translate-y-1/2 right-full translate-x-[calc(100%+2px)] text-dark"
          }`}
        >
          {leftIcon}
        </div>
      </div>
      <button
        type="button"
        className={`${
          hideLabel == "hide" ? "hidden" : `hidden ${hideLabel}:block`
        } ${
          size == "small"
            ? "text-xs"
            : size == "medium"
            ? "text-sm"
            : "text-base"
        } text-dark dark:text-white text-center`}
        onClick={() => setValue(values[0])}
      >
        {rightLabel}
      </button>
    </div>
  );
}
// sm:block md:block lg:block xl:block 2xl:block

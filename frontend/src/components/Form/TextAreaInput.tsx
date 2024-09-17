"use client";
import React, { useState } from "react";

type props = {
  name: string;
  label: string;
  value: string;
  onChange: (e: string) => void;
  rows?: number;
  cols?: number;
  onBlur?: Function;
  onFocus?: Function;
  touched?: boolean;
  errorMessage?: string;
};
export default function TextAreaInput({
  name,
  label,
  value,
  rows,
  cols,
  touched,
  errorMessage,
  onChange,
  onBlur,
  onFocus,
}: props) {
  const [focus, setFocus] = useState(false);
  return (
    <div
      className={`duration-300 relative rounded-md w-full ${
        focus
          ? `border border-dark dark:border-white ${
              !touched ? "outline outline-1 outline-dark" : ""
            }`
          : "border border-light dark:border-lighter"
      } ${
        touched
          ? errorMessage
            ? "!border-red-600 dark:!border-red-400 !border-2 outline-none"
            : "!border-green-600 dark:!border-green-400 !border-2 outline-none"
          : ""
      }`}
    >
      <textarea
        name={name}
        dir="auto"
        id={`text-input-id-${label}`}
        value={value}
        rows={rows||7}
        cols={cols}
        className="w-full h-full border-none outline-none pt-7 pb-2 px-6 bg-transparent focus:!outline-none focus:!ring-0 focus:!border-0 scroller"
        onFocus={() => {
          setFocus(true);
          onFocus && onFocus();
        }}
        onBlur={() => {
          setFocus(false);
          onBlur && onBlur();
        }}
        onChange={(e) => onChange(e.target.value)}
      />
      <label
        htmlFor={`text-input-id-${label}`}
        className={`text-xs md:text-sm duration-300 absolute ltr:left-6 rtl:right-6 top-8 text-light dark:text-lighter ${
          focus ? "-translate-y-[125%]" : "-translate-y-[85%]"
        }`}
      >
        {label}
      </label>

      {touched && errorMessage ? (
        <span className="absolute z-[2] top-[calc(100%+6px)] ltr:left-1 rtl:right-1 text-xs lg:text-sm text-red-600 dark:text-red-400">
          {errorMessage}
        </span>
      ) : (
        ""
      )}
    </div>
  );
}

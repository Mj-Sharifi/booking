"use client";
import React, { ChangeEvent, useState } from "react";
import { FaEye } from "react-icons/fa6";

type props = {
  name: string;
  label: string;
  onChange: (value: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: Function;
  onFocus?: Function;
  type?: "password" | "email" | "text";
  touched?: boolean;
  errorMessage?: string;
};
export default function TextInput({
  name,
  label,
  type,
  touched,
  errorMessage,
  onChange,
  onBlur,
  onFocus,
}: props) {
  const [focus, setFocus] = useState(false);
  const [eye, setEye] = useState<"text" | "password">("password");
  return (
    <div
      className={`duration-300 relative rounded-md w-full ${
        focus ? "border-2 border-dark dark:border-white" : "border"
      } ${
        touched
          ? errorMessage
            ? "!border-red-600 dark:!border-red-400 !border-2"
            : "!border-green-600 dark:!border-green-400 !border-2"
          : ""
      }`}
    >
      <input
        name={name}
        id={`text-input-id-${label}`}
        type={type == "password" ? eye : type}
        className="w-full border-none outline-none pt-7 pb-2 px-6 bg-transparent focus:!outline-none focus:!ring-0 focus:!border-0 "
        onFocus={() => {
          setFocus(true);
          onFocus && onFocus();
        }}
        onBlur={() => {
          setFocus(false);
          onBlur && onBlur();
        }}
        onChange={(e) => onChange(e)}
      />
      <label
        htmlFor={`text-input-id-${label}`}
        className={`text-xs md:text-sm duration-300 absolute ltr:left-6 rtl:right-6 top-1/2 text-light dark:text-lighter ${
          focus ? "-translate-y-full" : "-translate-y-2/3"
        }`}
      >
        {label}
      </label>
      {type == "password" && (
        <button
          className={`duration-300 absolute top-1/2 -translate-y-1/2 ltr:right-3 rtl:left-3 ${
            eye == "text" ? "opacity-90" : "opacity-60"
          }`}
          onClick={() =>
            eye == "password" ? setEye("text") : setEye("password")
          }
        >
          <FaEye size={16} />
        </button>
      )}
      {touched && errorMessage ?(
        <span className="absolute z-[2] top-[calc(100%+6px)] ltr:left-1 rtl:right-1 text-xs lg:text-sm text-red-600 dark:text-red-400">
          {errorMessage}
        </span>
      ):""}
    </div>
  );
}

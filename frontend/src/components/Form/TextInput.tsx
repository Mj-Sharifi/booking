"use client";
import React, { useState } from "react";
import { FaEye } from "react-icons/fa6";

type props = {
  name: string;
  label: string;
  type?: "password" | "email" | "text";
};
export default function TextInput({ name, label, type }: props) {
  const [focus, setFocus] = useState(false);
  const [eye, setEye] = useState<"text" | "password">("password");
  return (
    <div
      className={`duration-300 relative  rounded-md overflow-hidden w-full ${
        focus ? "border-2 border-dark dark:border-white" : "border"
      }`}
    >
      <input
        name={name}
        id={`text-input-id-${label}`}
        type={type == "password" ? eye : type}
        className="w-full border-none outline-none pt-8 pb-3 px-6 bg-transparent"
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
      <label
        htmlFor={`text-input-id-${label}`}
        className={`text-xs md:text-sm duration-300 absolute ltr:left-6 rtl:right-6 top-1/2 text-light dark:text-lighter ${
          focus ? "-translate-y-full" : "-translate-y-1/2"
        }`}
      >
        {label}
      </label>
      {type=="password"&&<button
        className={`duration-300 absolute top-1/2 -translate-y-1/2 ltr:right-3 rtl:left-3 ${eye=="text"?"opacity-90":"opacity-60"}`}
        onClick={() =>
          eye == "password" ? setEye("text") : setEye("password")
        }
      >
        <FaEye size={16} />
      </button>}
    </div>
  );
}

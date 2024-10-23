import React, { ReactNode, useEffect, useState } from "react";

type props = {
  values: [string, string];
  initialValue?: string;
  onChange: (v:string)=>void;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  rightLabel?: string;
  leftLabel?: string;
};
export default function RadioInput({
  values,
  initialValue = values[0],
  onChange,
  leftIcon,
  rightIcon,
  rightLabel,
  leftLabel,
}: props) {
  const [value, setValue] = useState(initialValue);
  useEffect(() => {
    onChange(value);
  }, [value]);
  return (
    <div
      data-value={value}
      className="duration-300 w-14 h-7 rounded-full relative bg-white !border border-solid border-darkblue m-4"
      onClick={() => {
        setValue(value == values[0] ? values[1] : values[0]);
      }}
    >
      <div
        className={`duration-300 z-[1] shadow-sm-light shadow-darkblue bg-darkblue w-5 h-5 rounded-full absolute top-1/2 -translate-y-1/2 ${
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
      <span className="text-xs text-dark dark:text-white text-center absolute top-1/2 -translate-y-1/2 left-[calc(100%+4px)]">
        {rightLabel}
      </span>
      <span className="text-xs text-dark dark:text-white text-center absolute top-1/2 -translate-y-1/2 right-[calc(100%+4px)]">
        {leftLabel}
      </span>
    </div>
  );
}

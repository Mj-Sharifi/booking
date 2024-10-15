import { checkedSVG } from "@/utils/svg";
import React, { ReactNode } from "react";

type props = {
  value: string | string[] | number;
  onChange: Function;
  label: ReactNode | string;
  labelClassNames?: string;
  checked: boolean;
};

export default function CheckboxInput({
  value,
  onChange,
  label,
  labelClassNames,
  checked,
}: props) {
  return (
    <label className={`${labelClassNames} text-light dark:text-white flex gap-2 duration-300 group`}>
      <input
        hidden
        type="checkbox"
        value={value}
        onChange={() => onChange()}
        checked={checked}
        className="hidden "
      />
      <div
        className={`duration-300 transition-all w-5 h-5 rounded-md border border-darkblue dark:border-lightblue group-hover:scale-105 group-hover:bg-darkblue/50 group-dark:hover:bg-lightblue/50 ${
          checked ? "bg-darkblue/50 dark:bg-lightblue/50" : ""
        }`}
      >
        {checked ? checkedSVG("text-white") : ""}
      </div>
      {label}
    </label>
  );
}

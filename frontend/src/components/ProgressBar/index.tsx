import React from "react";

type props = {
  title?: string;
  value: number;
  height?: string;
  size?: "small" | "medium" | "large";
  backgroundColor: string;
  foregroundColor: string;
};
export default function ProgressBar({
  title,
  value,
  size,
  height,
  backgroundColor = "#e5e0fd",
  foregroundColor = "#051036",
}: props) {
  return (
    <div className="flex flex-col gap-y-2 text-xs md:text-sm xl:text-base">
      {title && (
        <div className="flex justify-between items-center">
          <span className="font-semibold">{title}</span>
          <span className="">{value}</span>
        </div>
      )}
      <div
        className="w-full relative rounded-full overflow-hidden z-[-1]"
        style={{
          height:
            height ||
            `${size == "medium" ? "8px" : size == "small" ? "4px" : "12px"}`,
          backgroundColor,
        }}
      >
        <div
          className="absolute right-0 left-0 top-0 bottom-0"
          style={{ width: `${value + "%"}`, backgroundColor: foregroundColor }}
        ></div>
      </div>
    </div>
  );
}

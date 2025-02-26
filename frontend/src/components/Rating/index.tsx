"use client";
import React, { useEffect, useState } from "react";

type props = {
  title?: string;
  defaultValue: number;
  precision?: number;
  showEmptyStars?: boolean;
  readOnly?: boolean;
  width?: string;
  size?: "small" | "medium" | "large";
  backgroundColor?: string;
};
export default function Rating({
  title,
  defaultValue,
  precision = 0.5,
  showEmptyStars = true,
  size = "medium",
  width,
}: props) {
  const [value, setValue] = useState<number>();
  useEffect(() => {
    const roundToPrecision = (value: number, precision: number): number => {
      return Math.round(value / precision) * precision;
    };
    setValue(roundToPrecision(defaultValue, precision));
  }, [defaultValue, precision]);
  return (
    <div className="flex flex-col gap-y-2 text-xs md:text-sm xl:text-base">
      {title && (
        <div className="flex justify-between items-center">
          <span className="font-semibold">{title}</span>
          <span className="">{value}</span>
        </div>
      )}
      {value && (
        <div className="flex gap-1">
          {Array(5)
            .fill(true)
            .map((_, i) => (
              <div
                key={i}
                className={`relative ${
                  showEmptyStars ? "bg-dark dark:bg-white" : "bg-transparent"
                }`}
                style={{
                  strokeWidth: 1,
                  zIndex: "0",
                  width:
                    width ||
                    `${
                      size == "small"
                        ? "27px"
                        : size == "medium"
                        ? "37px"
                        : "52px"
                    }`,
                  aspectRatio: "1",
                  opacity: "0.7",
                  clipPath:
                    "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
                }}
              >
                <div
                  className="absolute right-1 left-1 top-1 bottom-1 bg-white dark:bg-dark"
                  style={{
                    strokeWidth: 1,
                    zIndex: "2",
                    clipPath:
                      "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
                  }}
                ></div>
                <div
                  key={i}
                  className="absolute bg-yellow-400 dark:bg-yellow-200"
                  style={{
                    width: `${
                      i + 1 <= value
                        ? "100%"
                        : i + 1 == Math.ceil(value)
                        ? (value - i) * 100 + "%"
                        : "0"
                    }`,
                    height: "100%",
                    zIndex: "3",
                    // backgroundColor,
                  }}
                ></div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

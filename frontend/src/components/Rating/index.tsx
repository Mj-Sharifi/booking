"use client";
import React, { useEffect, useState } from "react";

type props = {
  defaultValue: number;
  precision?: Number;
  readOnly?: boolean;
  width?: string;
  size?: "small" | "medium" | "large";
  backgroundColor?: string;
};
export default function Rating({
  defaultValue,
  precision = 0.5,
  readOnly = true,
  backgroundColor = "#f8d448",
  size = "medium",
  width,
}: props) {
  const [value, setValue] = useState<number>(defaultValue);
  useEffect(() => {}, [defaultValue, precision]);
  return (
    <div className="flex gap-1">
      {Array(5)
        .fill(true)
        .map((_, i) => (
          <div
            key={i}
            className="relative"
            style={{
              strokeWidth: 1,
              zIndex: "0",
              width:
                width ||
                `${
                  size == "small" ? "27px" : size == "medium" ? "37px" : "52px"
                }`,
              aspectRatio: "1",
              backgroundColor: "black",
              opacity:"0.7",
              clipPath:
                "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
            }}
          >
            <div
              className="absolute right-1 left-1 top-1 bottom-1"
              style={{
                strokeWidth: 1,
                zIndex:"2",
                backgroundColor: "white",
                clipPath:
                  "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
              }}
            ></div>
            <div
              key={i}
              className="absolute"
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

                // height:`${size=="small"?"20px":size=="medium"?"35px":"50px"}`,
                backgroundColor,
              }}
            ></div>
          </div>
        ))}
    </div>
  );
}
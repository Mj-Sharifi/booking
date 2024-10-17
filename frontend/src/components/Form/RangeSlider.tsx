"use client";
import React, { useRef, useState } from "react";

type props = {
  min: number;
  max: number;
  value: number[];
  size?: "small" | "medium" | "large";
  foregroundColor?: string;
  backgroundColor?: string;
  onChange?: (p: number[]) => void;
};
export default function RangeSlider({
  min = 0,
  max = 100,
  value,
  size = "medium",
  onChange,
  foregroundColor,
  backgroundColor,
}: props) {
  const [numbers, setNumbers] = useState<number[]>(value);
  const baseLineDiv =useRef<HTMLDivElement>(null) 
  const onMove = (e:MouseEvent) => {
    let [x1,x2]=[0,100]
    if(baseLineDiv.current){
      baseLineDiv.current.scrollWidth
    }

  };
  return (
    <div
      className={`relative w-full ${
        size == "small" ? "h-[2px]" : size == "medium" ? "h-[6px]" : "h-[10px]"
      }`}
    >
      <div ref={baseLineDiv} id={`rs-base-line`} className={`absolute top-0 bottom-0 right-0 left-0 bg-border`}></div>
      <div className={`absolute top-0 bottom-0 left-0  bg-border`}></div>
      {value.map((v, i) => (
        <span
        id={`rs-span-${i}`}
          key={i}
          className={`absolute top-1/2 -translate-y-1/2 rounded-full ${
            size == "small" ? "p-1" : size == "medium" ? "p-2" : "p-3"
          } bg-darkblue dark:bg-lightblue`}
          style={{ left: `${(v / (max - min)) * 100}%` }}
        />
      ))}
    </div>
  );
}

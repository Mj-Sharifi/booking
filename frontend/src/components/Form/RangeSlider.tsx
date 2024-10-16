import React from "react";

type props = {
  min: number;
  max: number;
  value: number[];
  size?: "small" | "medium" | "large";
  foregroundColor?: string;
  backgroundColor?: string;
};
export default function RangeSlider({
  min = 0,
  max = 100,
  value,
  size,
  foregroundColor,
  backgroundColor,
}: props) {
  return (
    <div className={`relative w-full`}>
      <span className={`absoloute right-0 left-0`}></span>
      <span className={`absoloute left-0`}></span>
      {value.map((v, i) => (
        <span
          key={i}
          className={`absolute top-1/2 -translate-y-1/2 rounded-full ${
            size == "small" ? "p-1" : size == "medium" ? "p-2" : "p-3"
          } bg-darkblue dark:bg-lightblue`}
          style={{ left:`${(v/(max-min))*100}%` }}
          draggable
        />
      ))}
    </div>
  );
}

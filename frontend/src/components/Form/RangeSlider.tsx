import { ChangeEvent, useCallback, useEffect, useState, useRef } from "react";
import "@/Styles/rangeSlider.css";

type props = {
  min: number;
  max: number;
  size?: "small" | "medium" | "large";
  values?:[number,number]
  onChange: ([v1,v2]: [number,number]) => void;
  step?:number
};

import React from "react";

export default function RangeSlider({
  min,
  max,
  size = "small",
  values=[min,max],
  onChange,
  step
}: props) {
  // const [vals,setVals]=useState<number[]>(values)
  const [minVal, setMinVal] = useState(values[0]);
  const [maxVal, setMaxVal] = useState(values[1]);
  const minValRef = useRef<HTMLInputElement>(null);
  const maxValRef = useRef<HTMLInputElement>(null);
  const range = useRef<HTMLDivElement>(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(+maxValRef.current.value); // Precede with '+' to convert the value from type string to type number

      if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    if (minValRef.current) {
      const minPercent = getPercent(+minValRef.current.value);
      const maxPercent = getPercent(maxVal);

      if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [maxVal, getPercent]);

  // Get min and max values when their state changes
  useEffect(() => {
    onChange([minVal, maxVal]);
  }, [minVal, maxVal]);

  return (
    <div className="relative w-full flexCenter">
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        ref={minValRef}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          const value = Math.min(+event.target.value, maxVal - 1);
          setMinVal(value);
          event.target.value = value.toString();
        }}
        className={`absolute pointer-events-none h-0 w-full outline-none thumb size ${
          size == "small"
            ? "thumb-small"
            : size == "medium"
            ? "thumb-medium"
            : "thumb-large"
        } z-[3]  ${minVal > max - 100 ? "z-[5]" : ""}`}
        step={step||1}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        ref={maxValRef}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          const value = Math.max(+event.target.value, minVal + 1);
          setMaxVal(value);
          event.target.value = value.toString();
        }}
        className={`absolute pointer-events-none h-0 w-full outline-none thumb ${
          size == "small"
            ? "thumb-small"
            : size == "medium"
            ? "thumb-medium"
            : "thumb-large"
        } z-[4]`}
        step={step||1}
      />
      <div className="relative w-full">
        <div
          className={`slider__track absolute bg-border z-[1] w-full rounded-full ${
            size == "small" ? "h-1" : size == "medium" ? "h-2" : "h-3"
          } aspect-square`}
        ></div>
        <div
          ref={range}
          className={`"slider__range absolute bg-lightblue z-[2] ${
            size == "small" ? "h-1" : size == "medium" ? "h-2" : "h-3"
          } aspect-square rounded-full`}
        ></div>
        <div className="slider__left-value absolute left-1 text-light dark:text-lighter text-xs md:text-sm mt-6">
          {minVal}
        </div>
        <div className="slider__right-value absolute right-1 text-light dark:text-lighter text-xs md:text-sm mt-6">
          {maxVal}
        </div>
      </div>
    </div>
  );
}

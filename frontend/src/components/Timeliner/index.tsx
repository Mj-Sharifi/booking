"use client";
import React, { ReactNode, useEffect, useRef, useState } from "react";

type props = {
  titles: string[];
  subtitles?: string[];
  details?: ReactNode[];
};
export default function Timeliner({
  titles,
  subtitles = [],
  details = [],
}: props) {
  const containerDiv = useRef<HTMLDivElement>(null);
  const [bottom, setBottom] = useState<number>();
  useEffect(() => {
    setBottom(containerDiv.current?.lastElementChild?.scrollHeight)
  }, [titles,subtitles,details]);
  return (
    <div className="relative text-sm md:text-base">
      <div className="absolute border-l-2 border-dashed border-border top-0 left-3 md:left-4 z-[-1]" style={{bottom:bottom+"px"}}></div>
      <div ref={containerDiv} className="w-full flex flex-col gap-6 md:gap-8 ">
        {titles.map((t, i) => (
          <div key={i} className="flex gap-x-3 items-start">
            <div className="bg-border flex-none rounded-full w-6 h-6 md:w-8 md:h-8 flex items-center justify-center">
              {i + 1}
            </div>
            <div className="flex flex-col gap-y-2">
              <h4 className="font-semibold">{t}</h4>
              <h6 className="text-light dark:text-lighter">
                {subtitles[i] || ""}
              </h6>
              <div className="">{details[i]||""}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

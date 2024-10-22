import React, { ReactNode, useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import "@/Styles/Stepper.css";
type props = {
  steps: { icon?: ReactNode; title: string }[];
  onChange?:(step:number)=>void;
  stepStyles?: {
    activeColor?: string;
    inactiveColor?: string;
  };
  dividerStyles?: {
    activeColor?: string;
    inactiveColor?: string;
    stroke?: string;
    style?:
      | "dashed"
      | "solid"
      | "dotted"
      | "double"
      | "groove"
      | "hidden"
      | "ridge";
  };
  activeStep: number;
};
export default function Stepper({
  steps,
  onChange,
  stepStyles,
  dividerStyles,
  activeStep = 0,
}: props) {
  const [show, setShow] = useState(false);
  const [divider, setDivider] = useState({
    activeColor: "lightgreen",
    inactiveColor: "grey",
    stroke: "1px",
    style: "solid",
  });
  const [step, setStep] = useState({
    activeColor: "lightgreen",
    inactiveColor: "grey",
  });
  useEffect(() => {
    setShow(false);
    // Set divider styles
    const newDivider = {
      activeColor: "lightgreen",
      inactiveColor: "grey",
      stroke: "2px",
      style: "solid",
      ...dividerStyles,
    };
    setDivider(newDivider);
    // Set step styles
    const newStep = {
      activeColor: "green",
      inactiveColor: "grey",
      ...stepStyles,
    };
    setStep(newStep);
    setTimeout(() => setShow(true), 0);
  }, [JSON.stringify(dividerStyles), JSON.stringify(stepStyles)]);
  return (
    <>
      {show && (
        <div className="flex w-full">
          {steps.map((s, i) => (
            <div
              className={`flex flex-1 items-center justify-between ${
                i === steps.length - 1 ? "flex-none" : ""
              } `}
              key={i}
            >
              {i !== steps.length - 1 ? (
                <>
                  <div
                    className={`h-full flex flex-col gap-1 items-center sm:px-2 md:px-4 xl:px-8 ${
                      onChange ? "cursor-pointer" : "cursor-auto"
                    } ${i > activeStep ? "opacity-85" : ""}`}
                    style={{
                      color:
                        i > activeStep ? step.inactiveColor : step.activeColor,
                    }}
                    onClick={() => onChange && onChange(i)}
                  >
                    <span>{s.icon}</span>
                    <span className="text-center text-xs sm:text-sm md:text-base md:text-nowrap font-semibold">
                      {s.title}
                    </span>
                  </div>
                  <div
                    className="my-stepper height-[1px] w-full flex justify-center"
                    style={{
                      borderColor:
                        i > activeStep - 1
                          ? divider.inactiveColor
                          : divider.activeColor,
                      borderTopWidth: divider.stroke,
                      borderStyle: divider.style,
                    }}
                  >
                    <FaChevronRight
                      size={22}
                      className="rtl:rotate-180 sm:hidden"
                      style={{
                        color:
                          i > activeStep - 1
                            ? divider.inactiveColor
                            : divider.activeColor,
                      }}
                    />
                  </div>
                </>
              ) : (
                <div
                  className={`h-full flex flex-col gap-1 items-center sm:px-2 md:px-4 xl:px-8 ${
                    onChange ? "cursor-pointer" : "cursor-auto"
                  } ${i > activeStep ? "opacity-85 " : ""}`}
                  style={{
                    color:
                      i == activeStep ? step.activeColor : step.inactiveColor,
                  }}
                  onClick={() => onChange && onChange(i)}
                >
                  <span className="">{s.icon}</span>
                  <span className="text-center text-xs sm:text-sm md:text-base md:text-nowrap font-semibold">
                    {s.title}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}

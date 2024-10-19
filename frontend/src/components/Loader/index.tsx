import React, { ReactNode } from "react";
import {
  Audio,
  InfinitySpin,
  Oval,
  ThreeCircles,
  ThreeDots,
} from "react-loader-spinner";

type props = {
  type: "Infinity Spin" | "Three Circles" | "Audio" | "Oval" | "Three Dots";
  color?: string;
  width?: string;
  height?: string;
  radius?:string
};
export default function Loader({
  type,
  color = "#f87171",
  width,
  height,
  radius
}: props) {
  const loaderSwitcher = (
    type: string,
    color: string = "#f87171"
  ): ReactNode => {
    switch (type) {
      case "Infinity Spin":
        return <InfinitySpin width={width || "200"} color={color} />;
      case "Three Circles":
        return (
          <ThreeCircles
            visible={true}
            height={height || "100"}
            width={width || "100"}
            color={color}
            ariaLabel="three-circles-loading"
            wrapperStyle={{  }}
            wrapperClass=""
          />
        );
      case "Audio":
        return (
          <Audio
            height={height || "100"}
            width={width || "100"}
            color={color}
            wrapperStyle={{}}
            wrapperClass="wrapper-class"
            visible={true}
            
          />
        );
      case "Oval":
        return (
          <Oval
            visible={true}
            height={height || "40"}
            width={width || "40"}
            strokeWidth={4}
            color={color}
            ariaLabel="oval-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        );
      case "Three Dots":
        return (
          <ThreeDots
            visible={true}
            height={height || "80"}
            width={width || "80"}
            color={color}
            radius={radius||"9"}
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        );
      default:
        break;
    }
  };
  return <>{loaderSwitcher(type, color)}</>;
}

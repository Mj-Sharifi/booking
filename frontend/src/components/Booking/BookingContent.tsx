import { useBookAppSelector } from "@/hooks/redux";
import React from "react";

export default function BookingContent() {
  const { tourData } = useBookAppSelector((state) => state.book);
  return <div>BookingDetail</div>;
}

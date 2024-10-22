import { useBookAppSelector } from "@/hooks/redux";
import React, { useState } from "react";
import Stepper from "../Stepper";
import { useTranslations } from "next-intl";
import useTheme from "@/hooks/useTheme";
import BookingPayment from "./BookingPayment";
import BookingFinal from "./BookingFinal";

export default function BookingContent() {
  const t = useTranslations();
  const { tourData } = useBookAppSelector((state) => state.book);
  const [step, setStep] = useState(0);
  const dark = useTheme();
  return (
    <div className="flex flex-col gap-y-8">
      <Stepper
        steps={[
          {
            title: "Passengers",
            icon: (
              <span className="rounded-full text-white bg-darkblue w-7 h-7 flexCenter">
                1
              </span>
            ),
          },
          {
            title: "Payment",
            icon: (
              <span className="rounded-full text-white bg-darkblue w-7 h-7 flexCenter">
                2
              </span>
            ),
          },
          {
            title: "Final Step",
            icon: (
              <span className="rounded-full text-white bg-darkblue w-7 h-7 flexCenter">
                3
              </span>
            ),
          },
        ]}
        activeStep={step}
        onChange={(s) => setStep(s)}
        stepStyles={{ activeColor: dark ? "#A4CAFE" : "#3554d1" }}
        dividerStyles={{ activeColor: dark ? "#A4CAFE" : "#3554d1" }}
      />
      {step == 1 ? (
        <BookingContent />
      ) : step == 2 ? (
        <BookingPayment />
      ) : (
        <BookingFinal />
      )}
    </div>
  );
}

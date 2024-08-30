import React, { ReactNode } from "react";

type props = {
  children: ReactNode;
};
export default function layout({ children }: props) {
  return (
    <div className="duration-300 bg-lightblue dark:bg-darkblue py-22 ">
      <section className="duration-300 container mx-auto flex justify-center items-center min-h-screen">
{children}
      </section>
    </div>
  );
}

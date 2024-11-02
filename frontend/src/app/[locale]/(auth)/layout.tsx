import React, { ReactNode } from "react";

type props = {
  children: ReactNode;
};
export default function layout({ children }: props) {
  return (
    <>
      <div className="fixed top-0 bottom-0 right-0 left-0 z-[-1] bg-auth bg-cover"></div>
      <section className=" duration-300 container mx-auto flexCenter min-h-screen">
        {children}
      </section>
    </>
  );
}

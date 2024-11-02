import React, { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
type props = {
  children: ReactNode;
};
export default function layout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  return (
    <>
  
      <main>{children}</main>
      <Footer locale={locale as "en" | "fa"} />
    </>
  );
}

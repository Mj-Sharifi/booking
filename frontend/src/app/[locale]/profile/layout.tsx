import ProfileTabs from "@/components/Profile/ProfileTabs";
import React from "react";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="container mx-auto py-28 lg:py-28 px-2 md:px-4 flex flex-col gap-y-4">
      <ProfileTabs/>
      <div>
      {children}
      </div>
 
    </section>
  );
}

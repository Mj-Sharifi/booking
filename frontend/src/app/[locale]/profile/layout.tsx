import ProfileTabs from "@/components/Profile/ProfileTabs";
import React from "react";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="container mx-auto py-28 lg:py-28 flex flex-col gap-y-4 px-2 sm:px-4">
      <ProfileTabs />
      <div className="w-11/12 sm:w-5/6 md:w-4/5 lg:w-[850px] xl:w-[1100px] 2x:w-[1280px] mx-auto bg-profile_light dark:bg-profile_dark rounded-lg p-3 sm:p-6">{children}</div>
    </section>
  );
}

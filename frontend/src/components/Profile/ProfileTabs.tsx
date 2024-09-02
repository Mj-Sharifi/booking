"use client";
import { useTranslations } from "next-intl";
import React from "react";
import NavigationLink from "../link/NavigationLink";
import { usePathname } from "next/navigation";

const profileRoutes: {
  title: string;
  href: "dashboard" | "personal-information" | "location-information";
}[] = [
  { title: "dashboard", href: "dashboard" },
  { title: "personal_information", href: "personal-information" },
  { title: "location_information", href: "location-information" },
];
export default function ProfileTabs() {
  const t = useTranslations();
  const pathname = usePathname();
  return (
    <div className="overflow-x-auto px-4">
      <ul className="flex justify-start sm:justify-center gap-x-2 md:gap-x-4 text-sm md:text-base py-2 !scroller-horizontal sticky top-0">
        {profileRoutes.map(({ title, href }, i) => (
          <li
            className={`duration-300 p-2 rounded text-nowrap ${
              pathname.includes(href)
                ? "bg-darkblue text-white dark:bg-lightblue dark:text-dark"
                : "hover:bg-border dark:hover:bg-lighter"
            }`}
          >
            <NavigationLink href={`/profile/${href}`}>{t(`common.${title}`)}</NavigationLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

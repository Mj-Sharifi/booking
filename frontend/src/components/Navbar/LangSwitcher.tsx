import { locales } from "@/utils/utils";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

export default function LangSwitcher() {
  const t = useTranslations("common");
  return (
    <div className="flex flex-col px-4 rounded-lg shadow-md">
      {locales.map((locale, i) => (
        <div key={i} className="flex justify-between">
          <span>{t(locale)}</span>
          <Image src={`@/assets/images/flag/${locale}.svg`} alt={`lang-${locale}`} width={45} height={30}/>
        </div>
      ))}
    </div>
  );
}

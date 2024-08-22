import { locale } from "@/types/types";
import { locales } from "@/utils/utils";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useParams, usePathname, useRouter } from "next/navigation";
import React, { ChangeEvent, useTransition } from "react";

export default function LangSwitcher() {
  const t = useTranslations("common");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  const onSelectChange = (nextLocale: locale) => {
    console.log(nextLocale);
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: nextLocale }
      );
    });
  };
  return (
    <div className="flex flex-col px-4 rounded-lg shadow-md">
      {locales.map((locale, i) => (
        <button
          type="button"
          key={i}
          className="flex justify-between"
          onClick={()=>onSelectChange(locale)}
        >
          <span>{t(locale)}</span>
          <Image
            src={`@/assets/images/flag/${locale}.svg`}
            alt={`lang-${locale}`}
            width={45}
            height={30}
          />
        </button>
      ))}
    </div>
  );
}

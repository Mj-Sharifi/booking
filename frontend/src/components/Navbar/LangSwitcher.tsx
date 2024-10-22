import { usePathname,useRouter } from "@/navigation";
import { locale } from "@/types/types";
import { locales } from "@/utils/utils";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import React, { useTransition } from "react";
import { FiCheckCircle, FiCircle } from "react-icons/fi";

export default function LangSwitcher() {
  const t = useTranslations("common");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();
  const searchParams = useSearchParams()
  const onSelectChange = (nextLocale: locale) => {
    const newPathname= pathname+"?"+searchParams.toString()
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname:newPathname, params },
        { locale: nextLocale }
      );
    });
  };
  return (
    <div className="flex flex-wrap justify-center gap-8 py-4 px-2 rounded-lg shadow-md bg-white dark:bg-dark">
      {locales.map((locale, i) => (
        <button
          type="button"
          key={i}
          className={`font-semibold flex items-center justify-between gap-1 w-36 p-1 py-2 rounded-md border-2 border-darkblue dark:border-lightblue ${
            params.locale == locale
              ? " text-white dark:text-dark bg-darkblue shadow-darkblue/70 dark:bg-lightblue dark:shadow-lightblue/70 shadow-md"
              : ""
          }`}
          onClick={() => onSelectChange(locale)}
        >
          <span>{t(locale)}</span>
          <Image
            src={`/assets/images/navbar/${locale}.svg`}
            alt={`lang-${locale}`}
            width={40}
            height={25}
            className="rounded"
          />
          {params.locale == locale ? (
            <FiCheckCircle size={20} className="dark:text-dark"/>
          ) : (
            <FiCircle size={20} className="text-darkblue dark:text-lightblue"/>
          )}
        </button>
      ))}
    </div>
  );
}

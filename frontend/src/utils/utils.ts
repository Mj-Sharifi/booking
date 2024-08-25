export const defaultLocale = 'en' as const;
export const locales = ['en', 'fa'] as const;
export const localeFlag = {
    "en":"en.svg",
    "fa":"fa.svg"
}
export const isTarget = (e: any, classnames: Array<string> = []) => {
    for (const classname of classnames) {
      const targets = document.getElementsByClassName(classname);
      for (const target of Array.from(targets)) {
        if (target && target.contains(e.target)) return true;
      }
    }
  };
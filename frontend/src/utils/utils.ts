export const defaultLocale = 'en' as const;
export const locales = ['en', 'fa'] as const;
export const localeFlag = {
  "en": "en.svg",
  "fa": "fa.svg"
}
export const isTarget = (e: any, classnames: Array<string> = []) => {
  for (const classname of classnames) {
    const targets = document.getElementsByClassName(classname);
    for (const target of Array.from(targets)) {
      if (target && target.contains(e.target)) return true;
    }
  }
};
export const getCookie = (cname:string) => {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
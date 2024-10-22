import axios from "axios";
import { Cookies } from "react-cookie";

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
export const onlyNumbers = (value: string): number => {
  return +value.replace(/[^0-9]/g, "");

}
export const getCookie = (cname: string) => {
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
export const updateUser = () => {
  const cookie = new Cookies
  const user_info = cookie.get("user_info")
  axios
    .get(process.env.NEXT_PUBLIC_API + "users/me?populate=*", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user_info.jwt}`,
      },
    })
    .then((res) => {
      if (res && res.data) {
        cookie.set("user_info", {...user_info,user:res.data}, { path: "/" })
      }
    });
}
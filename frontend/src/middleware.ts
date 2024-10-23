import createMiddleware from "next-intl/middleware";
import { defaultLocale, locales, protectedRoutes } from "./utils/utils";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";


function getLocale(request: NextRequest): string {
  let cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  return typeof cookieLocale === "string" ? cookieLocale : defaultLocale;
}

const handleI18nRouting = createMiddleware({
  locales: ["en", "fa"], // List all supported locales here
  defaultLocale: "en", // Define default locale
  localePrefix: "as-needed",
});

const validateToken = async (request: NextRequest) => {
  let response = handleI18nRouting(request);
  const user_info = request.cookies.get("user_info");
  const locale = getLocale(request);
  const { pathname } = request.nextUrl;

  // Create a response object so we can set cookies on it
  if (user_info) {
    try {
      const { jwt } = JSON.parse(user_info.value);
      // Validate token via API call
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}users/me?populate=*`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      // If the token is valid, update the cookies
      if (res && res.data) {
        response.cookies.set(
          "user_info",
          JSON.stringify({ jwt, user: res.data }),
          { path: "/" } // Set the cookie options as necessary (httpOnly, secure, etc.)
        );
      }
      return response; // Return here if the token is valid
    } catch (error) {
      // Token validation failed, so delete the 'user_info' cookie
      response.cookies.delete("user_info");

      if (protectedRoutes.includes(pathname)) {
        return NextResponse.redirect(
          new URL(`/${locale === "en" ? "" : locale}`, request.url)
        );
      }
      return response;
    }
  }

  // No user_info present or path is protected
  if (protectedRoutes.includes(pathname)) {
    return NextResponse.redirect(
      new URL(`/${locale === "en" ? "" : locale}`, request.url)
    );
  }
  return response;
};


export default async function middleware(request: NextRequest) {
  const userInfo = request.cookies.get("user_info");
  const { pathname } = request.nextUrl;
  // Validate token and continue request or redirect
  const response = await validateToken(request);

  // Handle restricted paths and ensure rewrites are handled at the end
  if (protectedRoutes.includes(pathname) && !userInfo) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return response; // Return the final response from validateToken
}

export const config = {
  matcher: [
    // Match localized paths and ensure i18n handling
    "/",
    // Match routes with locale prefixes (e.g. /en/...)
    "/(en|fa)/:path*",
    // Match any route not excluded (e.g. static assets)
    "/((?!_next|_vercel|.*\\..*).*)",
  ],
};

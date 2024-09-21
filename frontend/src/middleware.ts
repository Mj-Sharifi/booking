import createMiddleware from 'next-intl/middleware';
import { defaultLocale, locales } from './utils/utils';
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

function getLocale(request: NextRequest): string {
  let cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  return typeof cookieLocale === "string" ? cookieLocale : defaultLocale;
}


const handleI18nRouting = createMiddleware({
  locales: ['en', 'fa'], // List all supported locales here
  defaultLocale: 'en',  // Define default locale
});


const validateToken = async (request: NextRequest, response: NextResponse) => {
  const user_info = request.cookies.get('user_info');
  const locale = getLocale(request);
  const { pathname } = request.nextUrl;

  if (user_info) {
    try {
      const { jwt } = JSON.parse(user_info.value);

      // Validate token via API call
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API}users/me?populate=*`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      });

      // Update the cookie with fresh user info
      if (res && res.data) {
        response.cookies.set({
          name: 'user_info',
          value: JSON.stringify({ jwt, user: res.data }),
          path: '/',
        });

        // Allow request to continue if token is valid
        return handleI18nRouting(request);
      }
    } catch (error) {
      // If token validation fails, clear the user info cookie
      response.cookies.delete("user_info");

      // If the user is on a protected route, redirect them to the locale homepage
      if (pathname.includes("/profile/")) {
        return NextResponse.redirect(new URL(`/${locale === 'en' ? '' : locale}`, request.url));
      }

      // Allow request to continue even if token is invalid (optional)
      return handleI18nRouting(request);
    }
  }

  // If no token exists, check if the path is protected
  if (pathname.includes("/profile/")) {
    return NextResponse.redirect(new URL(`/${locale === 'en' ? '' : locale}`, request.url));
  }

  // Continue request flow for non-protected pages
  return handleI18nRouting(request);
}

export default async function middleware(request: NextRequest) {
  const userInfo = request.cookies.get("user_info");
  const { pathname, search } = request.nextUrl;

  // Handle restricted paths
  if (
    pathname.includes("/profile/")  &&
    !userInfo
  ) {
    // Redirect unauthenticated users trying to access restricted paths
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Validate token and continue request or redirect
  return await validateToken(
    request,
    NextResponse.next() // Pass the response object here to modify it if necessary
  );
}

export const config = {
  matcher: [
    // Match localized paths and ensure i18n handling
    '/',

    // Match routes with locale prefixes (e.g. /en/...)
    '/(en|fa)/:path*',

    // Match any route not excluded (e.g. static assets)
    '/((?!_next|_vercel|.*\\..*).*)'
  ],
};
import createMiddleware from 'next-intl/middleware';
import { defaultLocale, locales } from './utils/utils';

export default createMiddleware({
  // A list of all locales that are supported
  locales,
  // Used when no locale matches
  defaultLocale: defaultLocale,
  localePrefix: "as-needed",

});

export const config = {
  // Match only internationalized pathnames
  matcher: [    // Enable a redirect to a matching locale at the root
    '/',

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    '/(de|en)/:path*',

    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    '/((?!_next|_vercel|.*\\..*).*)']
};
import { Pathnames, LocalePrefix } from 'next-intl/routing';
import { locales } from './utils/utils';


export const pathnames = {
  '/': '/',
  '/tour': '/tour',
  '/tour/[id]/[title]':"/tour/[id]/[title]",
  '/blog': `/blog`,
  "/blog/[id]": "/blog/[id]",
  "/login": "/login",
  "/register": "/register",
  "/become-expert": "/become-expert",
  "/profile/dashboard": "/profile/dashboard",
  "/profile/personal-information": "/profile/personal-information",
  "/profile/location-information": "/profile/location-information"
} satisfies Pathnames<typeof locales>;

export const localePrefix: LocalePrefix<typeof locales> = 'as-needed';

export const port = process.env.PORT || 3000;
export const host = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : `http://localhost:${port}`;


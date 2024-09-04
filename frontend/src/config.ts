import { Pathnames, LocalePrefix } from 'next-intl/routing';
import { locales } from './utils/utils';


export const pathnames = {
  '/': '/',
  '/tour': '/tour',
  '/blog': '/blog',
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

  
  // export const pathnames = {
  //   // If all locales use the same pathname, a
  //   // single external path can be provided.
  //   '/': '/',
  //   '/blog': '/blog',
    
  //   // If locales use different paths, you can
  //   // specify each external path per locale.
  //   '/blog/[slug]': {
  //     en: '/blog/[slug]',
  //     it: '/blog/[slug]',
  //     es: '/blog/[slug]',
  //     fr: '/blog/[slug]',
  //   },
  
  //   '[...rest]': '[...rest]',
  // } satisfies Pathnames<typeof locales>;
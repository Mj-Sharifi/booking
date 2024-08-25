import {Pathnames, LocalePrefix} from 'next-intl/routing';
import { locales } from './utils/utils';


export const pathnames = {
  '/': '/',
  '/tour': {
    en: '/tour',
    fa: '/tour'
  },
  '/blog': {
    en: '/blog',
    fa: '/blog'
  }
} satisfies Pathnames<typeof locales>;

export const localePrefix: LocalePrefix<typeof locales> = 'as-needed';

export const port = process.env.PORT || 3000;
export const host = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : `http://localhost:${port}`;
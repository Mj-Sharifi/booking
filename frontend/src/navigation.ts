import {createLocalizedPathnamesNavigation} from 'next-intl/navigation';
import {pathnames, localePrefix} from './config';
import { locales } from './utils/utils';

export const {Link, getPathname, redirect, usePathname, useRouter} =
  createLocalizedPathnamesNavigation({
    locales,
    pathnames,
    localePrefix
  });
/** @see https://nextjs.org/docs/app/building-your-application/routing/middleware */

import { type NextRequest, NextResponse } from 'next/server';
import { withAuth } from 'next-auth/middleware';
import createIntlMiddleware from 'next-intl/middleware';

import { defaultLocale, locales } from '@/i18n/locales';

function doesPathMatchPages(req: NextRequest, pages: string[]) {
  return RegExp(`^(/(${locales.join('|')}))?(${pages.join('|')})/?$`, 'i').test(
    req.nextUrl.pathname,
  );
}

function redirect(req: NextRequest, redirectURL: string) {
  return NextResponse.redirect(
    new URL(redirectURL, req.nextUrl.origin).toString(),
  );
}

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
});

const authPages = ['/login', '/register'];
const blockedPages = ['/blocked'];
const defaultBlockedPage = '/blocked';

/**
 * `/{locale}/` -> `/{locale}`
 */
const publicPages = [''];

export default withAuth(
  (req) => {
    const { token } = req.nextauth;

    if (req.nextUrl.pathname.startsWith('/api')) {
      return NextResponse.next();
    }

    if (!token) {
      if (
        !doesPathMatchPages(req, authPages) &&
        !doesPathMatchPages(req, publicPages)
      ) {
        return intlMiddleware(req);
      }
      return intlMiddleware(req);
    }

    // todo: make it more stable
    // if (
    //   doesPathMatchPages(req, authPages) ||
    //   (doesPathMatchPages(req, blockedPages) && !token.isBlocked) ||
    //   (doesPathMatchPages(req, adminPages) && !token.isAdmin)
    // ) {
    //   return redirect(req, defaultPublicPage);
    // }

    if (!doesPathMatchPages(req, blockedPages) && token.isBlocked) {
      return redirect(req, defaultBlockedPage);
    }

    return intlMiddleware(req);
  },
  {
    callbacks: {
      authorized: () => true,
    },
  },
);

export const config = {
  // Skip all paths that should not be touched by this middleware
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};

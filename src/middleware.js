import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
    locales: ['uk', 'en'],
    defaultLocale: 'uk',
    localePrefix: 'as-needed',
    localeDetection: false
});

export const config = {
    matcher: ['/', '/(uk|en)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)']
};
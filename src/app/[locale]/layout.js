import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Yeseva_One, Nunito } from 'next/font/google';
import '../globals.scss';
import '../normalize.css';

const yesevaOne = Yeseva_One({
  weight: '400',
  subsets: ['latin', 'cyrillic'],
  variable: '--font-heading',
  display: 'swap',
});

const nunito = Nunito({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-text',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata = {
  title: 'Творча Майстерня Світанок',
  description: 'Це не просто майстерня, а цілий світ',
};

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${yesevaOne.variable} ${nunito.variable}`}>
      <body>
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}

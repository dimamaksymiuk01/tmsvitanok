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

// Замінюємо статичну константу на динамічну функцію для SEO
export async function generateMetadata({ params }) {
  const { locale } = await params;
  const isUk = locale === 'uk';

  // Базовий URL вашого сайту
  const baseUrl = 'https://tmsvitanok.vercel.app';

  return {
    title: isUk
      ? 'Творча Майстерня «Світанок» | Олена Єсип'
      : 'Svitanok Creative Workshop | Olena Yesyp',
    description: isUk
      ? 'Це не просто майстерня, а цілий світ, де голос — це мистецтво. Вокал, логопедія, художнє мистецтво, ранній розвиток та багато іншого.'
      : 'Not just a workshop, but a whole world where voice is art. Vocals, speech therapy, fine arts, early development, and more.',
    keywords: isUk
      ? ['творча майстерня', 'Світанок', 'вокал Рівне', 'вокал Зоря', 'логопед Рівне', 'ранній розвиток', 'Олена Єсип', 'художнє мистецтво', 'підготовка до школи']
      : ['creative workshop', 'Svitanok', 'vocal lessons Rivne', 'speech therapy', 'early development', 'Olena Yesyp', 'fine arts', 'preschool preparation'],

    openGraph: {
      title: isUk ? 'Творча Майстерня «Світанок»' : 'Svitanok Creative Workshop',
      description: isUk
        ? 'Маленька творча родина, де ростуть таланти. Запишіться на заняття!'
        : 'A small creative family where talents grow. Book a session!',
      url: baseUrl,
      siteName: isUk ? 'Світанок' : 'Svitanok',
      images: [
        {
          url: `${baseUrl}/icon.png`, // ТУТ ВСЕ ПРАВИЛЬНО
          width: 800,
          height: 600,
          alt: 'Svitanok Logo',
        },
      ],
      locale: isUk ? 'uk_UA' : 'en_US',
      type: 'website',
    },
  };
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  const messages = await getMessages();

  // Домен для JSON-LD
  const baseUrl = 'https://tmsvitanok.vercel.app';

  // JSON-LD Schema.org для Google
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Творча Майстерня «Світанок»",
    "alternateName": "Svitanok Creative Workshop",
    "description": "Простір, де голос — це мистецтво, а якісний сервіс — основа. Проводимо заняття з вокалу, логопедії, малювання та раннього розвитку.",
    "founder": {
      "@type": "Person",
      "name": "Олена Єсип",
      "alternateName": "Olena Yesyp"
    },
    "logo": `${baseUrl}/icon.png`, // ТУТ ВСЕ ПРАВИЛЬНО
    "url": baseUrl,
    "sameAs": [
      "https://www.instagram.com/olena.esip?igsh=MXN0a3pwMTY0MnhuYg==",
      "https://www.instagram.com/olena_esip?igsh=MmNlbHBpcTZ4ZWgz",
      "https://www.facebook.com/share/1BrvtQG7Sn/",
      "https://www.tiktok.com/@olena_esip?_r=1&_t=ZS-95ayrvySAar"
    ],
    "telephone": "+380964417738",
    "email": [
      "ms.olenkivna@ukr.net",
      "ms.olenkivna@gmail.com"
    ],
    "location": [
      {
        "@type": "Place",
        "name": "Студія у Рівному",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "вул. Пластова 3",
          "addressLocality": "Рівне",
          "addressRegion": "Рівненська область",
          "addressCountry": "UA"
        }
      },
      {
        "@type": "Place",
        "name": "Студія у Зорі",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "вул. Героїв України 41А, 2 поверх",
          "addressLocality": "Зоря",
          "addressRegion": "Рівненська область",
          "addressCountry": "UA"
        }
      }
    ],
    "makesOffer": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Вокал для дітей та дорослих" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Ранній музичний розвиток" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Логопедичні заняття" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Художнє мистецтво" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Клуб успішного школяра" } }
    ]
  };

  return (
    <html lang={locale} className={`${yesevaOne.variable} ${nunito.variable}`}>
    <head>
      <link rel="icon" href="/icon.png" type="image/png" />
      <link rel="apple-touch-icon" href="/icon.png" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </head>
    <body>
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
    </body>
    </html>
  );
}
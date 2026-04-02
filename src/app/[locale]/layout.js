import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

export const metadata = {
    title: 'Творча Майстерня Світанок',
    description: 'Це не просто майстерня, а цілий світ',
};

// Прибрали пряме витягування { locale } з аргументів
export default async function LocaleLayout({ children, params }) {
    // Чекаємо на виконання промісу params (вимога нових версій Next.js)
    const { locale } = await params;

    const messages = await getMessages();

    return (
        <html lang={locale}>
        <body>
        <NextIntlClientProvider messages={messages}>
            {children}
        </NextIntlClientProvider>
        </body>
        </html>
    );
}
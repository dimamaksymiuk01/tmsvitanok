'use client';

import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import styles from './LanguageSwitcher.module.scss';

const LanguageSwitcher = () => {
    const router = useRouter();
    const currentLocale = useLocale();

    const toggleLanguage = () => {
        const nextLocale = currentLocale === 'uk' ? 'en' : 'uk';
        const nextPath = nextLocale === 'uk' ? '/' : `/${nextLocale}`;

        router.push(nextPath);
        router.refresh();
    };

    return (
        <button className={styles.switcher} onClick={toggleLanguage}>
            {currentLocale === 'uk' ? 'EN' : 'УКР'}
        </button>
    );
};

export default LanguageSwitcher;
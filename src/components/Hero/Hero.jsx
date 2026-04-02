'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import styles from './Hero.module.scss';

const Hero = () => {
    const t = useTranslations('Hero');

    return (
        <section className={styles.heroSection}>
            <motion.h1
                className={styles.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                {t('title')}
            </motion.h1>

            <motion.p
                className={styles.subtitle}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
            >
                {t('subtitle')}
            </motion.p>

            <motion.button
                className={styles.ctaButton}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
            >
                {t('cta')}
            </motion.button>
        </section>
    );
};

export default Hero;
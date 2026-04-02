'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import styles from './DawnLoader.module.scss';

const DawnLoader = ({ onComplete }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onComplete, 800); // Чекаємо завершення анімації
        }, 2500); // Скільки часу показувати заставку

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className={styles.loaderContainer}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                >
                    <motion.div
                        className={styles.logoWrapper}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                    >
                        {/* Тимчасове сонце */}
                        <svg viewBox="0 0 100 100" fill="#FFCF50">
                            <circle cx="50" cy="50" r="40" />
                        </svg>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default DawnLoader;
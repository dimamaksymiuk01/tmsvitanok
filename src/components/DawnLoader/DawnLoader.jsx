'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import styles from './DawnLoader.module.scss';

const DawnLoader = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFirstVisit, setIsFirstVisit] = useState(null);

  useEffect(() => {
    const hasSeen = Cookies.get('hasSeenIntro');

    if (hasSeen) {
      setIsFirstVisit(false);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onComplete, 500);
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setIsFirstVisit(true);
      Cookies.set('hasSeenIntro', 'true', { expires: 1 });

      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onComplete, 1500);
      }, 3500);

      return () => clearTimeout(timer);
    }
  }, [onComplete]);

  if (isFirstVisit === null) {
    return <div className={styles.loaderContainer} />;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={styles.loaderContainer}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: isFirstVisit ? 1.5 : 0.5, ease: 'easeInOut' }}
        >
          {isFirstVisit && (
            <>
              <motion.div
                className={styles.darkOverlay}
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{
                  duration: 2.5,
                  delay: 2,
                  ease: 'easeInOut',
                }}
              />

              <motion.div
                className={styles.lightSource}
                initial={{ y: '60vh', scale: 0.5, opacity: 0 }}
                animate={{
                  y: ['60vh', '0vh', '-5vh'],
                  scale: [0.5, 1, 1.5, 150],
                  opacity: [0, 0.9, 1, 1],
                }}
                transition={{
                  duration: 4.5,
                  times: [0, 0.35, 0.75, 1],
                  ease: 'easeInOut',
                }}
              />
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DawnLoader;

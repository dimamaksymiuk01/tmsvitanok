'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import TypewriterText from '../TypewriterText/TypewriterText';
import styles from './Directions.module.scss';

import dir1 from '../../assets/direction1.jpg';
import dir2 from '../../assets/direction2.jpg';
import dir3 from '../../assets/direction3.jpg';
import dir4 from '../../assets/direction4.jpg';
import dir5 from '../../assets/direction5.jpg';
import dir6 from '../../assets/direction6.jpg';

const Directions = () => {
  const t = useTranslations('Directions');

  const [activeIndex, setActiveIndex] = useState(null);

  const directions = [
    { num: '01', title: t('item1Title'), desc: t('item1Desc'), image: dir1 },
    { num: '02', title: t('item2Title'), desc: t('item2Desc'), image: dir2 },
    { num: '03', title: t('item3Title'), desc: t('item3Desc'), image: dir5 },
    { num: '04', title: t('item4Title'), desc: t('item4Desc'), image: dir6 },
    { num: '05', title: t('item5Title'), desc: t('item5Desc'), image: dir6 },
    { num: '06', title: t('item6Title'), desc: t('item6Desc'), image: dir6 },
    { num: '07', title: t('item7Title'), desc: t('item7Desc'), image: dir6 },
    { num: '08', title: t('item8Title'), desc: t('item8Desc'), image: dir6 },
    { num: '09', title: t('item9Title'), desc: t('item9Desc'), image: dir6 },
  ];

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  return (
    <section id="directions" className={styles.directions}>
      <div className="container">
        <motion.div
          className={styles.header}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ staggerChildren: 0.2 }}
        >
          <motion.span variants={textVariants} className={styles.preTitle}>
            {t('preTitle')}
          </motion.span>

          <h2 className={styles.title}>
            <TypewriterText text={t('title')} tag="span" speed={0.04} />
            <br />
            <span className={styles.highlight}>
              <TypewriterText
                text={t('titleHighlight')}
                tag="span"
                delay={(t('title')?.length || 0) * 0.04}
                speed={0.04}
              />
              .
            </span>
          </h2>
        </motion.div>

        {/* ГАЛЕРЕЯ-АКОРДЕОН */}
        <motion.div
          className={styles.listContainer}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {directions.map((item, index) => {
            const isActive = activeIndex === index;

            return (
              <div
                key={index}
                className={styles.listItem}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
                onClick={() => setActiveIndex(isActive ? null : index)}
              >
                <div className={styles.imageRevealWrapper}>
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        className={styles.revealedImage}
                        initial={{ opacity: 0, scale: 0.8, x: -50 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.8, x: -50 }}
                        transition={{ duration: 0.4, ease: 'backOut' }}
                      >
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className={styles.textWrapper}>
                  <div className={styles.titleRow}>
                    <span className={styles.itemNum}>{item.num}</span>
                    <h3 className={`${styles.itemTitle} ${isActive ? styles.activeTitle : ''}`}>
                      {item.title}
                    </h3>
                  </div>

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        className={styles.descWrapper}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <p className={styles.itemDesc}>{item.desc}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className={styles.divider} />
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Directions;

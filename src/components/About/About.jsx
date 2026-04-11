'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import useMediaQuery from '@/hooks/useMediaQuery';
import TypewriterText from '../TypewriterText/TypewriterText';
import about1 from '../../assets/about1.jpg';
import styles from './About.module.scss';

const About = () => {
  const t = useTranslations('About');
  const isMobile = useMediaQuery('(max-width: 991px)');
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const features = [
    t('feature1'),
    t('feature2'),
    t('feature3'),
    'Емоційний інтелект у вокалі',
    'Повага до індивідуального темпу',
    'Спільнота однодумців',
  ];

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const particles = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      size: Math.random() * 5 + 2 + 'px',
      left: Math.random() * 100 + '%',
      top: Math.random() * 100 + '%',
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 5,
      moveX: Math.random() * 60 - 30,
    }));
  }, []);

  if (!mounted) return null;

  return (
    <section id="about" className={styles.about}>
      <div className={styles.particlesContainer}>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className={styles.particle}
            style={{
              width: particle.size,
              height: particle.size,
              left: particle.left,
              top: particle.top,
            }}
            animate={{
              y: [0, -120],
              x: [0, particle.moveX, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="container">
        <div className={styles.aboutGrid}>
          <motion.div
            className={styles.textContent}
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

            <motion.div variants={textVariants} className={styles.divider} />

            <motion.p variants={textVariants} className={styles.description}>
              {t('description1')}
            </motion.p>

            <motion.p variants={textVariants} className={styles.description}>
              {t('description2')}
            </motion.p>

            <motion.ul
              className={styles.featuresList}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.15 } },
              }}
            >
              {features.map((feature, index) => (
                <motion.li
                  key={index}
                  variants={listItemVariants}
                  whileHover={{ x: 5, transition: { duration: 0.2 } }}
                >
                  <span className={styles.bullet}></span>
                  {feature}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          <div className={styles.visualContent}>
            <motion.div
              className={styles.imageWrapperMain}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1, ease: 'easeOut' }}
            >
              <Image src={about1} alt="Svitanok process" priority />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

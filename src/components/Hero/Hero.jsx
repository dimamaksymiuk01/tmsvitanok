'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import useMediaQuery from '@/hooks/useMediaQuery';
import bannerImg from '../../assets/baner.jpg';
import hero1 from '../../assets/hero1.jpg';
import hero2 from '../../assets/hero2.jpg';
import hero3 from '../../assets/hero3.jpg';
import styles from './Hero.module.scss';

const Hero = () => {
  const isMobile = useMediaQuery('(max-width: 991px)');
  const [activeCard, setActiveCard] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const sunsData = [
    { size: 14, x: '15%', y: '25%', duration: 10, delay: 0 },
    { size: 24, x: '65%', y: '18%', duration: 15, delay: 1 },
    { size: 18, x: '20%', y: '75%', duration: 12, delay: 2 },
    { size: 30, x: '80%', y: '85%', duration: 18, delay: 0.5 },
    { size: 12, x: '45%', y: '40%', duration: 14, delay: 1.5 },
    { size: 20, x: '85%', y: '45%', duration: 16, delay: 0.8 },
    { size: 16, x: '10%', y: '55%', duration: 13, delay: 2.5 },
    { size: 26, x: '50%', y: '80%', duration: 19, delay: 0.2 },
    { size: 10, x: '35%', y: '15%', duration: 11, delay: 1.2 },
  ];

  const sidePhotos = [
    { id: 'hero1', src: hero1, desktopRot: -5, mobileRot: -18, mobileX: -70, delay: 0.7 },
    { id: 'hero2', src: hero2, desktopRot: 3, mobileRot: 0, mobileX: 0, delay: 0.9 },
    { id: 'hero3', src: hero3, desktopRot: -2, mobileRot: 18, mobileX: 70, delay: 1.1 },
  ];

  if (!mounted) return null;

  return (
    <section className={styles.hero}>
      <div className="container">
        <div className={styles.visualComposition}>
          <motion.div
            className={styles.mainBannerWrapper}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          >
            <div className={styles.imageContainer}>
              <Image src={bannerImg} alt="Workshop Atmosphere" priority />
              <div className={styles.floatingSuns}>
                {sunsData.map((sun, index) => (
                  <motion.div
                    key={index}
                    className={styles.sun}
                    style={{ width: sun.size, height: sun.size, left: sun.x, top: sun.y }}
                    animate={{
                      y: [0, -40, 20, -20, 0],
                      x: [0, 20, -10, 15, 0],
                      opacity: [0.2, 0.7, 0.3, 0.8, 0.2],
                    }}
                    transition={{ duration: sun.duration, repeat: Infinity, ease: 'easeInOut' }}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          <div className={styles.sidePhotosCluster}>
            {sidePhotos.map((photo, index) => {
              const isActive = activeCard === index;

              const desktopAnimate = {
                opacity: 1,
                y: [0, -15, 0],
                rotate: [photo.desktopRot, photo.desktopRot + 2, photo.desktopRot],
                transition: {
                  y: { duration: 4 + index, repeat: Infinity, ease: 'easeInOut' },
                  rotate: { duration: 5 + index, repeat: Infinity, ease: 'easeInOut' },
                  opacity: { duration: 0.8, delay: photo.delay },
                },
              };

              const mobileAnimate = {
                opacity: 1,
                y: isActive ? -120 : 0,
                x: isActive ? 0 : photo.mobileX,
                rotate: isActive ? 0 : photo.mobileRot,
                scale: isActive ? 1.15 : 1,
                zIndex: isActive ? 50 : 10 + index,
                transition: { type: 'spring', stiffness: 200, damping: 22 },
              };

              const mobileInitial = { opacity: 0, y: -150, rotate: 0, x: 0 };
              const desktopInitial = { opacity: 0, y: 0, rotate: photo.desktopRot };

              return (
                <motion.div
                  key={photo.id}
                  className={`${styles.sidePhoto} ${styles[photo.id]}`}
                  initial={isMobile ? mobileInitial : desktopInitial}
                  animate={isMobile ? mobileAnimate : desktopAnimate}
                  onClick={() => isMobile && setActiveCard(isActive ? null : index)}
                >
                  <Image src={photo.src} alt={`Detail ${index + 1}`} />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

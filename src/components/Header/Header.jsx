'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import logo from '../../assets/logo.png';
import styles from './Header.module.scss';
import useMediaQuery from '@/hooks/useMediaQuery';

const Header = () => {
  const t = useTranslations('Navigation');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const isMobile = useMediaQuery('(max-width: 991px)');

  const menuItems = [
    { id: 'hero', label: t('home') },
    { id: 'about', label: t('about') },
    { id: 'services', label: t('services') },
    { id: 'gallery', label: t('gallery') },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
  }, [isMenuOpen]);

  const menuVariants = {
    closed: { opacity: 0, y: '-100%', transition: { duration: 0.5, ease: 'easeInOut' } },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 15,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 },
  };

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.headerContent}>
          <div
            className={styles.logoWrapper}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setIsMenuOpen(false);
            }}
          >
            <Image
              src={logo}
              alt="Svitanok Logo"
              width={isMobile ? 50 : 70}
              height={isMobile ? 50 : 70}
              priority
            />
          </div>

          <div className={styles.centerPill}>
            <nav className={styles.nav}>
              {menuItems.map((item) => (
                <a key={item.id} href={`#${item.id}`}>
                  {item.label}
                </a>
              ))}
            </nav>
            <div className={styles.divider} />
            <LanguageSwitcher />
          </div>

          <div className={styles.rightActions}>
            <div className={styles.connectWrapper} ref={dropdownRef}>
              <button
                className={styles.connectBtn}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsDropdownOpen(!isDropdownOpen);
                }}
              >
                {t('connect')}
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    className={styles.dropdown}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                  >
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                      Instagram
                    </a>
                    <a href="https://t.me" target="_blank" rel="noopener noreferrer">
                      Telegram
                    </a>
                    <a href="viber://chat?number=">Viber</a>
                    <a href="#contacts" onClick={() => setIsDropdownOpen(false)}>
                      {t('contacts')}
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              className={`${styles.burger} ${isMenuOpen ? styles.burgerActive : ''}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className={styles.line}></span>
              <span className={styles.line}></span>
              <span className={styles.line}></span>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <div className={styles.bgLines}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>

            <div className={styles.mobileMenuContent}>
              <nav className={styles.mobileNav}>
                {menuItems.map((item, index) => (
                  <motion.a
                    key={item.id}
                    href={`#${item.id}`}
                    variants={itemVariants}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className={styles.itemNumber}>0{index + 1}</span>
                    {item.label}
                  </motion.a>
                ))}
              </nav>

              <motion.div className={styles.mobileFooter} variants={itemVariants}>
                <LanguageSwitcher />
                <div className={styles.mobileSocials}>
                  <a href="#" target="_blank">
                    Instagram
                  </a>
                  <a href="#" target="_blank">
                    Facebook
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;

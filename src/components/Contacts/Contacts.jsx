'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import TypewriterText from '../TypewriterText/TypewriterText';
import styles from './Contacts.module.scss';
import { FaViber, FaTelegramPlane, FaInstagram, FaFacebookF } from 'react-icons/fa';
import { FiMail, FiMapPin, FiPhoneCall } from 'react-icons/fi';

const Contacts = () => {
  const t = useTranslations('Contacts');

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  return (
    <section id="contacts" className={styles.contacts}>
      <div className="container">
        <div className={styles.grid}>

          {/* ЛІВА КОЛОНКА: Заголовок та загальні контакти */}
          <motion.div
            className={styles.leftColumn}
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

            <motion.div variants={textVariants} className={styles.generalInfo}>
              <div className={styles.infoBlock}>
                <span className={styles.label}>{t('emailLabel')}</span>
                <a href="mailto:hello@svitanok.rv.ua" className={styles.link}>
                  <FiMail className={styles.icon} />
                  hello@svitanok.rv.ua
                </a>
              </div>

              <div className={styles.infoBlock}>
                <span className={styles.label}>{t('socialLabel')}</span>
                <div className={styles.socialLinks}>
                  <a href="https://instagram.com/" target="_blank" rel="noreferrer" className={styles.socialLink}>
                    <FaInstagram className={styles.icon} />
                    Instagram
                  </a>
                  <span className={styles.dot}>•</span>
                  <a href="https://facebook.com" target="_blank" rel="noreferrer" className={styles.socialLink}>
                    <FaFacebookF className={styles.icon} />
                    Facebook
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className={styles.rightColumn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ staggerChildren: 0.2, delayChildren: 0.4 }}
          >
            {/* Локація 1 (Рівне) */}
            <motion.div variants={textVariants} className={styles.locationBlock}>
              <h3 className={styles.locationTitle}>
                <FiMapPin className={styles.titleIcon} />
                {t('location1Title')}
              </h3>
              <p className={styles.locationAddress}>{t('location1Address')}</p>

              <div className={styles.contactMethods}>
                <a href={`tel:${t('location1Phone').replace(/[^0-9+]/g, '')}`} className={styles.phoneLink}>
                  <FiPhoneCall className={styles.phoneIcon} />
                  {t('location1Phone')}
                </a>
                <div className={styles.messengers}>
                  <a href="viber://chat?number=%2B380981234567" className={styles.messengerIcon} title="Viber">
                    <FaViber className={styles.iconSm} />
                    Viber
                  </a>
                  <a href="https://t.me/+380981234567" className={styles.messengerIcon} title="Telegram">
                    <FaTelegramPlane className={styles.iconSm} />
                    Telegram
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div variants={textVariants} className={styles.divider} />

            {/* Локація 2 (Зоря) */}
            <motion.div variants={textVariants} className={styles.locationBlock}>
              <h3 className={styles.locationTitle}>
                <FiMapPin className={styles.titleIcon} />
                {t('location2Title')}
              </h3>
              <p className={styles.locationAddress}>{t('location2Address')}</p>

              <div className={styles.contactMethods}>
                <a href={`tel:${t('location2Phone').replace(/[^0-9+]/g, '')}`} className={styles.phoneLink}>
                  <FiPhoneCall className={styles.phoneIcon} />
                  {t('location2Phone')}
                </a>
                <div className={styles.messengers}>
                  <a href="viber://chat?number=%2B380507654321" className={styles.messengerIcon} title="Viber">
                    <FaViber className={styles.iconSm} />
                    Viber
                  </a>
                  <a href="https://t.me/+380507654321" className={styles.messengerIcon} title="Telegram">
                    <FaTelegramPlane className={styles.iconSm} />
                    Telegram
                  </a>
                </div>
              </div>
            </motion.div>

          </motion.div>

        </div>
      </div>
      {/* НИЖНЯ ЧАСТИНА (ФУТЕР СЕКЦІЇ) */}
      <motion.div
        className={styles.bottomFooter}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div className={styles.copyright}>
          © {new Date().getFullYear()} {t('desc')}
        </div>

        <div className={styles.credits}>
          {t('createdBy')} <a href="https://www.dk-forge.xyz" target="_blank" rel="noopener noreferrer" className={styles.forgeLink}>DK-FORGE</a>
        </div>
      </motion.div>
    </section>
  );
};

export default Contacts;
'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';

import TypewriterText from '../TypewriterText/TypewriterText';
import styles from './Gallery.module.scss';
import { galleryData } from './galleryData'; // Імпортуємо масив

const Gallery = () => {
  const t = useTranslations('Gallery');

  const categories = [
    { id: 'vokalDlyaDiteyTaDoroslykh', label: t('vocalKidsAdults') },
    { id: 'vokalniyAnsamblSvitanok', label: t('vocalEnsembleSvitanok') },
    { id: 'klubUspishnogoShkolyara', label: t('successfulStudentClub') },
    { id: 'logopedichniZanyattya', label: t('logopedics') },
    { id: 'ranniyMuzychniyRozvytok', label: t('earlyMusicDevelopment') },
    { id: 'khudozhnyeMystetstvo', label: t('fineArts') },
  ];

  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const [visibleCount, setVisibleCount] = useState(12);
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [activeVideo, setActiveVideo] = useState(null);

  const filteredMedia = useMemo(() => {
    return galleryData.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const visibleMedia = filteredMedia.slice(0, visibleCount);

  const lightboxSlides = useMemo(() => {
    return filteredMedia
      .filter((item) => item.type === 'image')
      .map((item) => ({ src: item.src }));
  }, [filteredMedia]);

  const handleCategoryChange = (id) => {
    setActiveCategory(id);
    setVisibleCount(12);
  };

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 12);
  };

  const handleMediaClick = (item) => {
    if (item.type === 'image') {
      const imageOnlyArray = filteredMedia.filter((m) => m.type === 'image');
      const index = imageOnlyArray.findIndex((m) => m.id === item.id);
      setLightboxIndex(index);
    } else if (item.type === 'video') {
      setActiveVideo(item.videoId);
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  return (
    <section id="gallery" className={styles.gallery}>
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
            {' '}
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

        <div className={styles.tabsContainer}>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`${styles.tabButton} ${activeCategory === category.id ? styles.activeTab : ''}`}
            >
              {category.label}
            </button>
          ))}
        </div>

        <motion.div layout className={styles.grid}>
          <AnimatePresence mode="popLayout">
            {visibleMedia.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
                className={styles.mediaCard}
                onClick={() => handleMediaClick(item)}
              >
                <div className={styles.imageWrapper}>
                  <Image
                    src={item.type === 'video' ? `https://img.youtube.com/vi/${item.videoId}/hqdefault.jpg` : item.src}
                    alt="Gallery item"
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    style={{ objectFit: 'cover' }}
                  />
                  {item.type === 'video' && (
                    <div className={styles.playIconOverlay}>
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredMedia.length > visibleCount && (
          <div className={styles.showMoreWrapper}>
            <button className={styles.showMoreBtn} onClick={handleShowMore}>
              {t('showMore')}
            </button>
          </div>
        )}
      </div>

      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        index={lightboxIndex}
        slides={lightboxSlides}
        plugins={[Zoom]}
      />

      <AnimatePresence>
        {activeVideo && (
          <motion.div
            className={styles.videoModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveVideo(null)}
          >
            <button className={styles.closeModalBtn} onClick={() => setActiveVideo(null)}>
              ✕
            </button>
            <motion.div
              className={styles.videoContainer}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
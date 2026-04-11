'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgress = () => {
  // Відстежуємо загальний скрол вікна
  const { scrollYProgress } = useScroll();

  // Додаємо пружинну фізику для плавності (spring)
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{
        scaleX, // Прив'язуємо шкалу X до нашого плавного скролу
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '4px', // Товщина смужки
        originX: 0, // Анімація починається зліва
        backgroundColor: 'var(--color-terracotta)', // Колір "Світанку" (можеш змінити на var(--color-olive))
        zIndex: 9999, // Дуже важливо: смужка має бути поверх усіх хедерів і меню
      }}
    />
  );
};

export default ScrollProgress;

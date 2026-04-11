'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const TypewriterText = ({ text = '', className, tag: Tag = 'p', delay = 0, speed = 0.03 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const safeText = typeof text === 'string' ? text : String(text || '');
  const characters = Array.from(safeText);

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: speed,
        delayChildren: delay,
      },
    },
  };

  const characterVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  if (!safeText) return null;

  return (
    <Tag ref={ref} className={className}>
      <span aria-label={safeText}>
        <motion.span
          aria-hidden="true"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {characters.map((char, index) => (
            <motion.span key={index} variants={characterVariants}>
              {char}
            </motion.span>
          ))}
        </motion.span>
      </span>
    </Tag>
  );
};

export default TypewriterText;

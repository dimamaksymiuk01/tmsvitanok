'use client';

import { useState } from 'react';
import DawnLoader from '@/components/DawnLoader/DawnLoader';
import Header from '@/components/Header/Header';
import Hero from '@/components/Hero/Hero';

const Home = () => {
  const [isLoaderFinished, setIsLoaderFinished] = useState(false);

  return (
    <>
      {/* Лоадер працює окремо */}
      {!isLoaderFinished && <DawnLoader onComplete={() => setIsLoaderFinished(true)} />}

      {/* Основний контент */}
      <div
        style={{
          opacity: isLoaderFinished ? 1 : 0,
          visibility: isLoaderFinished ? 'visible' : 'hidden', // Додатковий захист
          transition: 'opacity 0.8s ease, visibility 0.8s ease',
          backgroundColor: 'var(--color-bg)', // Використовуємо твій колір
          minHeight: '100vh',
        }}
      >
        <Header />

        <main className="container" style={{ paddingTop: '100px' }}>
          <div id="hero">
            <Hero />
          </div>

          <section id="about" style={{ minHeight: '100vh', padding: '100px 0' }}>
            <h2>Про нас</h2>
          </section>

          <section id="services" style={{ minHeight: '100vh', padding: '100px 0' }}>
            <h2>Напрямки</h2>
          </section>

          <section id="gallery" style={{ minHeight: '100vh', padding: '100px 0' }}>
            <h2>Галерея</h2>
          </section>

          <section id="contacts" style={{ minHeight: '100vh', padding: '100px 0' }}>
            <h2>Контакти</h2>
          </section>
        </main>
      </div>
    </>
  );
};

export default Home;

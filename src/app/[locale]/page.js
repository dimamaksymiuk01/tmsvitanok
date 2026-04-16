'use client';

import { useState } from 'react';
import DawnLoader from '@/components/DawnLoader/DawnLoader';
import Header from '@/components/Header/Header';
import Hero from '@/components/Hero/Hero';
import About from '@/components/About/About';
import ScrollProgress from '@/components/ScrollProgress/ScrollProgress';
import Directions from '@/components/Directions/Directions';
import Gallery from '@/components/Gallery/Gallery';
import Contacts from '@/components/Contacts/Contacts';

const Home = () => {
  const [isLoaderFinished, setIsLoaderFinished] = useState(false);

  return (
    <>
      {!isLoaderFinished && <DawnLoader onComplete={() => setIsLoaderFinished(true)} />}

      <div
        style={{
          opacity: isLoaderFinished ? 1 : 0,
          visibility: isLoaderFinished ? 'visible' : 'hidden',
          transition: 'opacity 0.8s ease, visibility 0.8s ease',
          backgroundColor: 'var(--color-bg)',
          minHeight: '100vh',
        }}
      >
        <ScrollProgress />
        <Header />

        <main className="container" style={{ paddingTop: '100px' }}>
          <div id="hero">
            <Hero />
          </div>

          <section id="about">
            <About />
          </section>

          <section id="services">
            <Directions />
          </section>

          <section id="gallery">
            <Gallery/>
          </section>

          <section id="contacts">
            <Contacts/>
          </section>
        </main>
      </div>
    </>
  );
};

export default Home;

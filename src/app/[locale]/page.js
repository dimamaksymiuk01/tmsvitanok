'use client';

import { useState } from 'react';
import DawnLoader from "@/components/DawnLoader/DawnLoader";
import Hero from "@/components/Hero/Hero";
import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher";

const Home = () => {
    const [isLoaderFinished, setIsLoaderFinished] = useState(false);

    return (
        <>
            {!isLoaderFinished && (
                <DawnLoader onComplete={() => setIsLoaderFinished(true)} />
            )}

            <div
                style={{
                    opacity: isLoaderFinished ? 1 : 0,
                    transition: 'opacity 0.8s ease',
                    backgroundColor: '#FEFAE0',
                    minHeight: '100vh'
                }}
            >
                <header style={{ position: 'absolute', top: 0, right: 0, padding: '2rem', zIndex: 10 }}>
                    <LanguageSwitcher />
                </header>

                <main>
                    <Hero />
                </main>
            </div>
        </>
    );
};

export default Home;
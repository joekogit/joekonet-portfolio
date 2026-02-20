import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { Footer } from './components/Footer';
import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    document.title = 'Joe Kocovsky - Design Systems & UX Engineering Leader';
  }, []);

  return (
    <div className="min-h-screen" style={{ fontFamily: 'var(--font-family-base)' }}>
      <Header />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
      </main>
      <Footer />
    </div>
  );
}
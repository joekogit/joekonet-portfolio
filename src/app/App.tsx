import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { Footer } from './components/Footer';
import { useEffect } from 'react';
import { useDarkMode } from './hooks/useDarkMode';

export default function App() {
  const { isDark, toggle } = useDarkMode();

  useEffect(() => {
    document.title = 'Joe Kocovsky - Design Systems & UX Engineering Leader';
  }, []);

  return (
    <div className="min-h-screen" style={{ fontFamily: 'var(--font-family-base)' }}>
      <Header isDark={isDark} onToggle={toggle} />
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
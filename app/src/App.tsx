import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

import CustomCursor from './components/CustomCursor';
import HeroSection from './sections/HeroSection';
import PhilosophySection from './sections/PhilosophySection';
import ProductSection from './sections/ProductSection';
import AboutSection from './sections/AboutSection';
import FounderSection from './sections/FounderSection';
import GallerySection from './sections/GallerySection';
import ClassesSection from './sections/ClassesSection';
import FooterSection from './sections/FooterSection';

import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => 1 - Math.pow(1 - t, 2),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.3,
    });

    lenisRef.current = lenis;

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Global snap for all sections (pause on each section)
    const setupGlobalSnap = () => {
      const maxScroll = ScrollTrigger.maxScroll(window);
      if (!maxScroll) return;

      const sectionEls = Array.from(
        document.querySelectorAll<HTMLElement>('.section-pinned, .section-flowing')
      );
      if (sectionEls.length === 0) return;

      const positions = sectionEls
        .map((el) => el.getBoundingClientRect().top + window.scrollY)
        .map((px) => px / maxScroll)
        .sort((a, b) => a - b);

      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            let closest = positions[0] ?? value;
            for (const p of positions) {
              if (Math.abs(p - value) < Math.abs(closest - value)) {
                closest = p;
              }
            }
            return closest;
          },
          duration: { min: 0.5, max: 0.9 },
          delay: 0.08,
          ease: 'power2.out',
        },
      });
    };

    // Delay snap setup to ensure all ScrollTriggers are created
    const snapTimeout = setTimeout(setupGlobalSnap, 500);

    // Refresh ScrollTrigger on resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(snapTimeout);
      window.removeEventListener('resize', handleResize);
      lenis.destroy();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <>
      <CustomCursor />
      
      <main ref={mainRef} className="relative">
        {/* Section 1: Hero */}
        <HeroSection />
        
        {/* Section 2: Philosophy */}
        <PhilosophySection />
        
        {/* Section 3: Product Focus 1 - Carafe */}
        <ProductSection
          image="/images/carafe.png"
          title="The Morning Carafe"
          subtitle="Collection"
          description="A warm brown ceramic carafe with a natural wooden lid, perfect for serving morning coffee or tea. Each piece is thrown on the wheel and finished with a rich, food-safe glaze."
          price="$85"
          textPosition="right"
          zIndex={30}
        />
        
        {/* Section 4: Product Focus 2 - Cups */}
        <ProductSection
          image="/images/cups.png"
          title="Brushstroke Cups"
          subtitle="Collection"
          description="A set of three black cups, each adorned with a unique brushstroke pattern. No two are exactly alike — the variation is intentional, a celebration of the handmade."
          price="$120 set"
          textPosition="left"
          zIndex={40}
        />
        
        {/* Section 5: About Studio */}
        <AboutSection />
        
        {/* Section 6: Founder */}
        <FounderSection />
        
        {/* Section 7: Gallery */}
        <GallerySection />
        
        {/* Section 8: Classes */}
        <ClassesSection />
        
        {/* Section 9: Footer */}
        <FooterSection />
      </main>
    </>
  );
}

export default App;

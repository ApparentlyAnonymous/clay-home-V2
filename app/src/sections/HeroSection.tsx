import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const image = imageRef.current;
    
    if (!section || !content || !image) return;

    const ctx = gsap.context(() => {
      // Initial reveal animation (elegant, slower)
      gsap.fromTo(content.children, 
        { opacity: 0, y: 40 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.6, 
          stagger: 0.2,
          ease: 'power3.out',
          delay: 0.2
        }
      );

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=200vh',
          pin: true,
          anticipatePin: 1,
          toggleActions: 'play none none reverse',
        }
      });

      // Keep the page static while the text animates in
      scrollTl.to({}, { duration: 0.7 });

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="section-pinned z-10"
    >
      {/* Background Image */}
      <img
        ref={imageRef}
        src="/images/hero-studio.jpg"
        alt="Clay Home Studio interior"
        className="image-cover"
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 overlay-gradient-bottom" />
      
      {/* Content */}
      <div 
        ref={contentRef}
        className="absolute bottom-0 left-0 right-0 p-8 md:p-16 lg:p-24"
      >
        <div className="max-w-4xl">
          <p className="text-[#c4a77d] text-sm md:text-base tracking-[0.2em] uppercase mb-4 font-light">
            A slow, intentional pottery studio
          </p>
          
          <h1 className="text-[#f5f0e8] text-5xl md:text-7xl lg:text-8xl font-light mb-6 leading-[0.95]">
            Clay Home<br />Studio
          </h1>
          
          <p className="text-[#a89a8a] text-base md:text-lg max-w-xl mb-8 leading-relaxed font-light">
            Clay, slowly shaped by hand. Welcome to a space dedicated to slow living, 
            mindful creation, and functional art made with intention.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <a className="btn-primary" href="#our-story">
              Explore the Studio
            </a>
            <a className="btn-secondary" href="#workshops">
              Join a Workshop
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

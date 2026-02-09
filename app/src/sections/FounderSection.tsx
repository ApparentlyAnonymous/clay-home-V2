import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FounderSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const image = imageRef.current;
    
    if (!section || !content || !image) return;

    const ctx = gsap.context(() => {
      const elements = content.querySelectorAll('.animate-item');
      
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

      // Entrance phase (0% - 40%)
      scrollTl.fromTo(image,
        { scale: 1.1 },
        { scale: 1, ease: 'power2.out' },
        0
      );

      scrollTl.fromTo(elements,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, stagger: 0.08, ease: 'power2.out' },
        0.1
      );

      // Hold phase: keep content readable while pinned
      scrollTl.to({}, { duration: 0.7 });

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="section-pinned z-60"
    >
      {/* Background Image */}
      <img
        ref={imageRef}
        src="/images/bowl-spoon.jpg"
        alt="Handcrafted bowl with wooden spoon"
        className="image-cover"
        style={{ filter: 'brightness(0.4)' }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-[#1a1816]/60" />
      
      {/* Content */}
      <div 
        ref={contentRef}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="max-w-3xl px-8 md:px-16 text-center">
          <p className="animate-item text-[#c4a77d] text-sm tracking-[0.2em] uppercase mb-6 font-light">
            The Maker
          </p>
          
          <h2 className="animate-item text-[#f5f0e8] text-4xl md:text-5xl lg:text-6xl font-light mb-8 leading-tight">
            About the<br />Founder
          </h2>
          
          <div className="space-y-6 mb-10">
            <p className="animate-item text-[#f5f0e8] text-lg md:text-xl leading-relaxed font-light">
              Anusha is the heart and hands behind Clay Home Studio.
            </p>
            
            <p className="animate-item text-[#a89a8a] text-base md:text-lg leading-relaxed font-light">
              Drawn to clay for its grounding nature, she found pottery to be both a creative practice 
              and a form of meditation. What started as personal exploration slowly grew into a studio 
              built on intention, patience, and quiet joy.
            </p>
            
            <p className="animate-item text-[#a89a8a] text-base md:text-lg leading-relaxed font-light">
              Her work reflects a deep respect for process — embracing irregularities, subtle textures, 
              and natural forms. Through the studio, Anusha hopes to share not just pottery, but the 
              experience of slowing down and creating with presence.
            </p>
          </div>
          
          <p className="animate-item text-[#c4a77d] text-xl font-light italic">
            — Anusha
          </p>
        </div>
      </div>
    </section>
  );
}

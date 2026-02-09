import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  'Handcrafted ceramics made in small batches',
  'Beginner-friendly pottery classes & workshops',
  'A warm, intimate studio space for learning and reflection'
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    
    if (!section || !content) return;

    const ctx = gsap.context(() => {
      const elements = content.querySelectorAll('.animate-item');
      const image = content.querySelector('.about-image');

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

      scrollTl.fromTo(elements,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.12, ease: 'power3.out' },
        0.1
      );

      if (image) {
        scrollTl.fromTo(image,
          { opacity: 0, scale: 0.96 },
          { opacity: 1, scale: 1, ease: 'power3.out' },
          0.05
        );
      }

      scrollTl.to({}, { duration: 0.7 });

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="our-story"
      className="section-flowing bg-[#1a1816] py-24 md:py-32 lg:py-40 z-50"
    >
      <div 
        ref={contentRef}
        className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text Content */}
          <div>
            <p className="animate-item text-[#c4a77d] text-sm tracking-[0.2em] uppercase mb-6 font-light">
              Our Story
            </p>
            
            <h2 className="animate-item text-[#f5f0e8] text-4xl md:text-5xl lg:text-6xl font-light mb-8 leading-tight">
              About the<br />Studio
            </h2>
            
            <div className="space-y-6 mb-10">
              <p className="animate-item text-[#a89a8a] text-base md:text-lg leading-relaxed font-light">
                Clay Home Studio was born from a desire to slow down. In a world of speed and scale, 
                the studio exists as a counterbalance — a place where time stretches, hands get messy, 
                and creativity unfolds naturally.
              </p>
              
              <p className="animate-item text-[#a89a8a] text-base md:text-lg leading-relaxed font-light">
                The studio focuses on functional ceramics — bowls, cups, plates, and objects meant to 
                be part of everyday rituals. Pieces that age with use, gather stories, and feel at home 
                wherever they live.
              </p>
            </div>
            
            <div className="space-y-4">
              {highlights.map((highlight, index) => (
                <div key={index} className="animate-item belief-item text-base font-light">
                  {highlight}
                </div>
              ))}
            </div>
          </div>
          
          {/* Image */}
          <div className="about-image relative">
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src="/images/candle.png"
                alt="Handcrafted ceramic candle holder"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 border border-[#c4a77d] opacity-30" />
          </div>
        </div>
      </div>
    </section>
  );
}

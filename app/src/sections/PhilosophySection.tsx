import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const beliefs = [
  'Slow processes over shortcuts',
  'Imperfect forms over mass production',
  'Objects made to be used, held, and lived with'
];

export default function PhilosophySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    
    if (!section || !content) return;

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

      // Entrance phase (0% - 30%)
      scrollTl.fromTo(elements,
        { opacity: 0, y: 80 },
        { opacity: 1, y: 0, stagger: 0.08, ease: 'power3.out' },
        0.05
      );

      // Hold phase: keep content readable while pinned
      scrollTl.to({}, { duration: 0.6 });

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="section-pinned z-20 bg-[#1a1816]"
    >
      {/* Decorative Background Image */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-3/4 opacity-10">
        <img
          src="/images/blue-vase.jpg"
          alt=""
          className="w-full h-full object-contain object-right"
          style={{ filter: 'blur(2px)' }}
        />
      </div>
      
      {/* Content */}
      <div 
        ref={contentRef}
        className="absolute inset-0 flex items-center"
      >
        <div className="w-full max-w-4xl px-8 md:px-16 lg:px-24">
          <p className="animate-item text-[#c4a77d] text-sm tracking-[0.2em] uppercase mb-6 font-light">
            Our Philosophy
          </p>
          
          <h2 className="animate-item text-[#f5f0e8] text-4xl md:text-6xl lg:text-7xl font-light mb-8 leading-tight">
            What We<br />Believe
          </h2>
          
          <p className="animate-item text-[#a89a8a] text-lg md:text-xl max-w-xl mb-12 leading-relaxed font-light">
            At Clay Home Studio, pottery is more than a craft — it's a way of life.
          </p>
          
          <div className="space-y-6 mb-12">
            {beliefs.map((belief, index) => (
              <div key={index} className="animate-item belief-item text-lg md:text-xl font-light">
                {belief}
              </div>
            ))}
          </div>
          
          <p className="animate-item text-[#a89a8a] text-base max-w-lg leading-relaxed font-light italic">
            "Each piece carries the marks of the hands that made it — a reminder that beauty lives in the human touch."
          </p>
        </div>
      </div>
    </section>
  );
}

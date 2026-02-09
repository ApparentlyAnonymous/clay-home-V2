import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ProductSectionProps {
  image: string;
  title: string;
  subtitle: string;
  description: string;
  price?: string;
  textPosition: 'left' | 'right';
  zIndex: number;
}

export default function ProductSection({
  image,
  title,
  subtitle,
  description,
  price,
  textPosition,
  zIndex
}: ProductSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const imageEl = imageRef.current;
    const content = contentRef.current;
    
    if (!section || !imageEl || !content) return;

    const ctx = gsap.context(() => {
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

      // Entrance phase (0% - 40%): Fade in and scale up
      scrollTl.fromTo(imageEl,
        { scale: 0.85 },
        { scale: 1, ease: 'power2.out' },
        0
      );

      scrollTl.fromTo(content.children,
        { opacity: 0, x: textPosition === 'right' ? 60 : -60 },
        { opacity: 1, x: 0, stagger: 0.05, ease: 'power2.out' },
        0.1
      );

      // Hold phase: keep content readable while pinned
      scrollTl.to({}, { duration: 0.7 });

    }, section);

    return () => ctx.revert();
  }, [textPosition]);

  return (
    <section 
      ref={sectionRef}
      className="section-pinned"
      style={{ zIndex }}
    >
      {/* Background Image */}
      <img
        ref={imageRef}
        src={image}
        alt={title}
        className="image-cover"
      />
      
      {/* Gradient Overlay */}
      <div className={`absolute inset-0 ${textPosition === 'right' ? 'overlay-gradient-right' : 'overlay-gradient-left'}`} />
      
      {/* Content */}
      <div 
        ref={contentRef}
        className={`absolute inset-0 flex items-center ${
          textPosition === 'right' ? 'justify-end' : 'justify-start'
        }`}
      >
        <div className={`max-w-lg p-8 md:p-16 lg:p-24 ${
          textPosition === 'right' ? 'text-right' : 'text-left'
        }`}>
          <p className="text-[#c4a77d] text-sm tracking-[0.2em] uppercase mb-4 font-light">
            {subtitle}
          </p>
          
          <h2 className="text-[#f5f0e8] text-4xl md:text-5xl lg:text-6xl font-light mb-6 leading-tight">
            {title}
          </h2>
          
          <p className="text-[#a89a8a] text-base md:text-lg leading-relaxed font-light mb-8">
            {description}
          </p>
          
          {price && (
            <p className="text-[#f5f0e8] text-xl font-light mb-6">
              {price}
            </p>
          )}
          
          <button className="btn-primary">
            Inquire
          </button>
        </div>
      </div>
    </section>
  );
}

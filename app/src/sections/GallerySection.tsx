import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const galleryImages = [
  { src: '/images/blue-vase.jpg', alt: 'Blue glazed gourd vase', span: 'col-span-1 row-span-2' },
  { src: '/images/blue-bowl-set.jpg', alt: 'Blue bowl and vase set', span: 'col-span-1 row-span-1' },
  { src: '/images/bowl-interior.jpg', alt: 'Bowl interior spiral', span: 'col-span-1 row-span-1' },
  { src: '/images/bowl.jpg', alt: 'Simple ceramic bowl', span: 'col-span-1 row-span-2' },
  { src: '/images/blue-vase-top.jpg', alt: 'Blue vase top view', span: 'col-span-1 row-span-1' },
  { src: '/images/cups.png', alt: 'Brushstroke cups', span: 'col-span-1 row-span-1' },
];

export default function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    
    if (!section || !content) return;

    const ctx = gsap.context(() => {
      const header = content.querySelector('.gallery-header');
      const images = content.querySelectorAll('.gallery-image');

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

      if (header) {
        scrollTl.fromTo(header.children,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, stagger: 0.12, ease: 'power3.out' },
          0.1
        );
      }

      scrollTl.fromTo(images,
        { opacity: 0, y: 40, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.08, ease: 'power3.out' },
        0.2
      );

      scrollTl.to({}, { duration: 0.7 });

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="section-flowing bg-[#1a1816] py-24 md:py-32 lg:py-40 z-70"
    >
      <div 
        ref={contentRef}
        className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24"
      >
        {/* Header */}
        <div className="gallery-header mb-16 md:mb-24">
          <p className="text-[#c4a77d] text-sm tracking-[0.2em] uppercase mb-6 font-light">
            Collection
          </p>
          
          <h2 className="text-[#f5f0e8] text-4xl md:text-5xl lg:text-6xl font-light mb-6 leading-tight">
            The Work
          </h2>
          
          <p className="text-[#a89a8a] text-base md:text-lg max-w-2xl leading-relaxed font-light">
            Each piece is handmade, one at a time. The gallery showcases finished ceramic pieces, 
            works in progress, and glimpses into studio life. No two pieces are exactly alike — 
            variations in shape, glaze, and texture are intentional. They are part of the story.
          </p>
        </div>
        
        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {galleryImages.map((image, index) => (
            <div 
              key={index}
              className={`gallery-image group relative overflow-hidden cursor-pointer ${image.span}`}
            >
              <div className="aspect-square w-full h-full">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-[#1a1816]/0 group-hover:bg-[#1a1816]/20 transition-colors duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

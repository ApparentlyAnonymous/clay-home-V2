import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ClassesSection() {
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

      scrollTl.fromTo(elements,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.12, ease: 'power3.out' },
        0.1
      );

      scrollTl.to({}, { duration: 0.7 });

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="workshops"
      className="section-flowing bg-[#2d2a26] py-24 md:py-32 lg:py-40 z-75"
    >
      <div 
        ref={contentRef}
        className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image */}
          <div className="animate-item relative order-2 lg:order-1">
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src="/images/hero-studio.jpg"
                alt="Pottery studio workspace"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -top-6 -right-6 w-32 h-32 border border-[#c4a77d] opacity-30" />
          </div>
          
          {/* Text Content */}
          <div className="order-1 lg:order-2">
            <p className="animate-item text-[#c4a77d] text-sm tracking-[0.2em] uppercase mb-6 font-light">
              Workshops
            </p>
            
            <h2 className="animate-item text-[#f5f0e8] text-4xl md:text-5xl lg:text-6xl font-light mb-8 leading-tight">
              Learn the Art<br />of Pottery
            </h2>
            
            <p className="animate-item text-[#a89a8a] text-base md:text-lg leading-relaxed font-light mb-8">
              Clay Home Studio offers small, intimate pottery sessions designed for beginners 
              and curious hands. No prior experience needed — just a willingness to slow down 
              and explore.
            </p>
            
            <div className="animate-item space-y-4 mb-10">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full border border-[#c4a77d] flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-[#c4a77d] text-sm">1</span>
                </div>
                <div>
                  <h4 className="text-[#f5f0e8] text-lg font-light mb-1">Beginner Classes</h4>
                  <p className="text-[#a89a8a] text-sm font-light">Introduction to wheel throwing and hand building</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full border border-[#c4a77d] flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-[#c4a77d] text-sm">2</span>
                </div>
                <div>
                  <h4 className="text-[#f5f0e8] text-lg font-light mb-1">Weekend Workshops</h4>
                  <p className="text-[#a89a8a] text-sm font-light">Intensive sessions for deeper exploration</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full border border-[#c4a77d] flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-[#c4a77d] text-sm">3</span>
                </div>
                <div>
                  <h4 className="text-[#f5f0e8] text-lg font-light mb-1">Private Sessions</h4>
                  <p className="text-[#a89a8a] text-sm font-light">One-on-one instruction tailored to you</p>
                </div>
              </div>
            </div>
            
            <button className="animate-item btn-primary">
              View Class Schedule
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

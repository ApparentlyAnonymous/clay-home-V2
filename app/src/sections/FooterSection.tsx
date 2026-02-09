import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, Mail, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function FooterSection() {
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
    <footer 
      ref={sectionRef}
      className="section-flowing bg-[#1a1816] pt-24 md:pt-32 lg:pt-40 pb-12 z-80"
    >
      <div 
        ref={contentRef}
        className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24"
      >
        {/* Main Footer Content */}
        <div className="text-center mb-20">
          <p className="animate-item text-[#c4a77d] text-sm tracking-[0.2em] uppercase mb-8 font-light">
            Get in Touch
          </p>
          
          <h2 className="animate-item text-[#f5f0e8] text-3xl md:text-4xl lg:text-5xl font-light mb-8 leading-tight max-w-3xl mx-auto">
            Clay Home Studio is an invitation to slow down, create with intention, 
            and bring handmade beauty into everyday life.
          </h2>
          
          <div className="animate-item flex flex-wrap justify-center gap-6 mb-12">
            <a 
              href="mailto:hello@clayhomestudio.com" 
              className="flex items-center gap-2 text-[#a89a8a] hover:text-[#c4a77d] transition-colors duration-300"
            >
              <Mail className="w-5 h-5" />
              <span className="font-light">hello@clayhomestudio.com</span>
            </a>
          </div>
          
          <div className="animate-item flex justify-center gap-6">
            <a 
              href="#" 
              className="w-12 h-12 rounded-full border border-[#3d3a36] flex items-center justify-center text-[#a89a8a] hover:border-[#c4a77d] hover:text-[#c4a77d] transition-all duration-300"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a 
              href="#" 
              className="w-12 h-12 rounded-full border border-[#3d3a36] flex items-center justify-center text-[#a89a8a] hover:border-[#c4a77d] hover:text-[#c4a77d] transition-all duration-300"
            >
              <MapPin className="w-5 h-5" />
            </a>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-[#2d2a26] pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#a89a8a] text-sm font-light">
              © 2026 Clay Home Studio. All rights reserved.
            </p>
            
            <div className="flex gap-8">
              <a href="#" className="text-[#a89a8a] text-sm font-light hover:text-[#c4a77d] transition-colors duration-300">
                Privacy
              </a>
              <a href="#" className="text-[#a89a8a] text-sm font-light hover:text-[#c4a77d] transition-colors duration-300">
                Terms
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

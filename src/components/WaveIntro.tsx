import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Flame, Waves, Sparkles } from 'lucide-react';

interface WaveIntroProps {
  onComplete: () => void;
}

export const WaveIntro: React.FC<WaveIntroProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isSkipped, setIsSkipped] = useState(false);

  useEffect(() => {
    if (isSkipped) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          onComplete();
        }
      });

      // 1. Initial State
      gsap.set(logoRef.current, { scale: 0.8, opacity: 0, y: 30 });
      gsap.set(textRef.current, { opacity: 0, y: 20 });

      // 2. Animate Logo and Text in
      tl.to(logoRef.current, {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out'
      })
      .to(textRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out'
      }, '-=0.3')
      .to({}, { duration: 0.4 }) // Brief pause for readability
      // 3. Logo and text fade out
      .to([logoRef.current, textRef.current], {
        opacity: 0,
        y: -30,
        duration: 0.4,
        ease: 'power2.in'
      })
      // 4. Wave curtain pulls up and reveals the site
      .to(containerRef.current, {
        yPercent: -100,
        duration: 0.9,
        ease: 'power4.inOut'
      });

    }, containerRef);

    return () => ctx.revert();
  }, [onComplete, isSkipped]);

  const handleSkip = () => {
    setIsSkipped(true);
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        yPercent: -100,
        duration: 0.4,
        ease: 'power3.inOut',
        onComplete: () => onComplete()
      });
    } else {
      onComplete();
    }
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#020b10] text-white overflow-hidden select-none pointer-events-auto"
    >
      {/* Background Ocean Atmosphere with Coastal Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020e14] via-[#041d27] to-[#01080c]" />
      
      {/* Ambient Ocean Glow & Fire Sparks (Trocado de verde para ciano/azul marinho) */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[300px] bg-orange-600/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Decorative Wave SVGs floating in background */}
      <svg className="absolute inset-x-0 bottom-0 w-full h-48 opacity-25 text-cyan-500/20" viewBox="0 0 1440 320" fill="currentColor">
        <path d="M0,192L48,197.3C96,203,192,213,288,192C384,171,480,117,576,112C672,107,768,149,864,165.3C960,181,1056,171,1152,149.3C1248,128,1344,96,1392,80L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
      </svg>

      {/* Center Brand Reveal Container */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        
        {/* Brand Logo Image Container */}
        <div ref={logoRef} className="flex flex-col items-center">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.3)] mb-6 border border-cyan-500/30 bg-black/40 flex items-center justify-center">
            <img 
              src="/logo3.jpg" 
              alt="Kaiçara Burger Logo" 
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex items-center gap-2 mb-2">
            <span className="h-px w-8 bg-cyan-400/40"></span>
            <span className="text-[11px] font-mono uppercase tracking-[0.35em] text-cyan-400 font-semibold flex items-center gap-1.5">
              <Waves className="w-3.5 h-3.5" />
              Litoral Norte • Caraguatatuba
            </span>
            <span className="h-px w-8 bg-cyan-400/40"></span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black uppercase font-syne tracking-tighter text-white">
            Kaiçara<span className="text-orange-500">Burger</span>
          </h1>
        </div>

        {/* Sub-tagline */}
        <div ref={textRef} className="mt-4">
          <p className="text-xs sm:text-sm font-mono text-white/70 uppercase tracking-[0.25em] flex items-center gap-2">
            <span>Pé na areia</span>
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
            <span className="text-orange-400">Fogo na brasa</span>
          </p>
        </div>

      </div>

      {/* Skip Intro Button */}
      <button
        onClick={handleSkip}
        className="absolute bottom-8 right-8 z-20 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-[11px] font-mono uppercase tracking-widest text-white/70 hover:text-white backdrop-blur-md transition-all cursor-pointer"
      >
        Pular Intro →
      </button>

    </div>
  );
};
import React, { useRef, useState } from 'react';
import { Sparkles, Flame, Star, ArrowRight, ShieldCheck, Waves } from 'lucide-react';
import { MenuItem } from '../types';

interface HeroBurgerShowcaseProps {
  burger: MenuItem;
  onOrderClick: () => void;
}

export const HeroBurgerShowcase: React.FC<HeroBurgerShowcaseProps> = ({ burger, onOrderClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div className="relative w-full flex items-center justify-center select-none">
      
      {/* Background Volumetric Glow Layers */}
      <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/25 via-amber-500/15 to-emerald-500/15 rounded-3xl blur-[80px] pointer-events-none -z-10" />
      <div className="absolute -top-10 -left-10 w-44 h-44 bg-emerald-500/20 rounded-full blur-[70px] pointer-events-none -z-10" />

      {/* Main Glassmorphism Showcase Card with 3D Parallax Tilt */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        className="relative w-full bg-[#0d151a]/60 border border-white/15 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.85)] group hover:border-orange-500/40"
      >
        
        {/* Subtle Watermark Number */}
        <div className="absolute top-4 right-6 text-7xl font-black text-white/[0.04] uppercase italic font-syne pointer-events-none">
          01
        </div>

        {/* Top Badges */}
        <div className="z-10 flex items-center justify-between gap-2 mb-4">
          <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold font-mono px-3.5 py-1.5 rounded-full border border-emerald-500/35 uppercase tracking-widest flex items-center gap-1.5 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            Destaque do Litoral
          </span>

          <span className="text-[11px] font-mono uppercase text-orange-400/90 bg-orange-500/10 border border-orange-500/20 px-3 py-1 rounded-full flex items-center gap-1.5">
            <Flame className="w-3 h-3 text-orange-500" />
            100% Angus na Brasa
          </span>
        </div>

        {/* Hero Burger Image with Organic Floating Parallax Frame */}
        <div className="relative my-3 w-full h-[260px] sm:h-[320px] rounded-2xl overflow-hidden bg-black/40 group-hover:shadow-[0_0_30px_rgba(249,115,22,0.2)] transition-shadow duration-500">
          <img
            src={burger.image}
            alt={burger.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center scale-105 group-hover:scale-110 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a1116] via-transparent to-transparent opacity-80" />

          {/* Floating Ingredient Chips */}
          <div className="absolute bottom-3 left-3 z-10 flex flex-wrap gap-1.5">
            <span className="text-[10px] font-mono text-white/90 bg-black/70 border border-white/15 px-2.5 py-1 rounded-lg backdrop-blur-md">
              🥓 Bacon Crocante
            </span>
            <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/70 border border-emerald-500/30 px-2.5 py-1 rounded-lg backdrop-blur-md">
              🌿 Maionese Verde
            </span>
          </div>

          <div className="absolute top-3 right-3 z-10">
            <div className="flex items-center gap-1 bg-black/70 border border-white/15 px-2.5 py-1 rounded-full text-xs font-mono backdrop-blur-md">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-bold text-white">4.9</span>
            </div>
          </div>
        </div>

        {/* Bottom Specs & Quick Order Action */}
        <div className="z-10 pt-4 border-t border-white/10">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-2xl sm:text-3xl font-black uppercase font-syne tracking-tight text-white group-hover:text-orange-400 transition-colors">
                {burger.name}
              </h3>
              <p className="text-white/60 text-xs sm:text-sm line-clamp-2 mt-1 leading-relaxed">
                {burger.description}
              </p>
            </div>
          </div>

          <div className="flex justify-between items-end mt-4 pt-2">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-mono tracking-wider text-white/40 mb-0.5">Preço da Casa</span>
              <span className="text-3xl font-black font-syne text-orange-500">
                R$ {burger.price.toFixed(2).replace('.', ',')}
              </span>
            </div>

            <button
              onClick={onOrderClick}
              id="showcase-quick-order-btn"
              className="px-6 py-3.5 bg-orange-500 hover:bg-orange-400 text-black font-extrabold uppercase tracking-wider text-xs rounded-xl shadow-[0_0_25px_rgba(249,115,22,0.45)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer group/btn"
            >
              <span>Quero Esse</span>
              <ArrowRight className="w-4 h-4 text-black group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Ambient Corner Flare */}
        <div className="absolute -bottom-10 -right-10 w-52 h-52 bg-orange-500/15 rounded-full blur-[60px] pointer-events-none" />
      </div>
    </div>
  );
};

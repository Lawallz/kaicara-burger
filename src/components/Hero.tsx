import React from 'react';
import { ArrowRight, Flame, Sparkles, MessageCircle, Star, ChevronDown, Waves } from 'lucide-react';
import { HeroBurgerShowcase } from './HeroBurgerShowcase';
import { MenuItem } from '../types';

interface HeroProps {
  onExploreMenu: () => void;
  onSelectBurger: (item: MenuItem) => void;
  featuredBurger: MenuItem;
}

export const Hero: React.FC<HeroProps> = ({ onExploreMenu, onSelectBurger, featuredBurger }) => {
  return (
    <section id="hero" className="relative min-h-screen pt-32 pb-20 px-4 sm:px-8 flex flex-col justify-between overflow-hidden">
      {/* Deep Ocean Coastal Glow Overlays */}
      <div className="absolute top-[-80px] right-[-100px] w-[600px] h-[600px] bg-orange-600/15 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-[-100px] left-[-80px] w-[550px] h-[550px] bg-emerald-600/15 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute top-[35%] left-[20%] w-[400px] h-[400px] bg-teal-800/10 rounded-full blur-[180px] pointer-events-none -z-10" />

      {/* Main Grid Content */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center flex-1 my-auto">
        
        {/* Left Column: Massive Typography & Storytelling */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left z-10">
          
          {/* Eyebrow Badges */}
          <div className="flex flex-wrap items-center gap-2.5 mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 font-mono text-xs uppercase tracking-widest font-semibold backdrop-blur-md">
              <Flame className="w-3.5 h-3.5 text-orange-500 animate-pulse" />
              Pé na areia. Fogo na brasa.
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-3 py-1.5 rounded-full">
              <Waves className="w-3.5 h-3.5" />
              Caraguatatuba • SP
            </span>
          </div>

          {/* Giant Award-Winning Title */}
          <h1 className="text-5xl sm:text-7xl lg:text-[80px] leading-[0.88] font-black uppercase tracking-tighter font-syne mb-6">
            O Sabor Bruto <br />
            <span className="text-stroke-white select-none">do Litoral</span> <br />
            <span className="text-white relative inline-block">
              na Brasa.
              <span className="absolute -bottom-2 left-0 w-full h-2.5 bg-gradient-to-r from-orange-500 via-amber-500 to-emerald-500 rounded-full opacity-80"></span>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-white/70 max-w-xl mb-10 leading-relaxed font-normal">
            Smash burgers artesanais e cortes nobres <strong className="text-white font-semibold">100% Angus selados no fogo vivo</strong>, pão de fermentação natural levain e a autêntica essência rústica do litoral norte de São Paulo.
          </p>

          {/* Dual Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 mb-14">
            <button
              onClick={onExploreMenu}
              id="hero-menu-cta"
              className="px-8 py-4 bg-orange-500 text-black font-extrabold uppercase tracking-widest text-xs sm:text-sm rounded-xl shadow-[0_0_35px_rgba(249,115,22,0.45)] hover:bg-orange-400 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 flex items-center gap-3 cursor-pointer group"
            >
              <span>Ver Cardápio</span>
              <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="https://wa.me/5512997654321?text=Ol%C3%A1%20Kai%C3%A7ara%20Burger!%20Gostaria%20de%20fazer%20um%20pedido%20direto."
              target="_blank"
              rel="noopener noreferrer"
              id="hero-whatsapp-cta"
              className="px-8 py-4 bg-white/5 border border-white/15 backdrop-blur-xl text-white font-extrabold uppercase tracking-widest text-xs sm:text-sm rounded-xl hover:bg-white/10 hover:border-emerald-500/40 hover:text-emerald-300 transition-all duration-200 flex items-center gap-2.5"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Pedir no WhatsApp</span>
            </a>
          </div>

          {/* Live Proof Metrics */}
          <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-6 sm:gap-10 max-w-lg">
            <div className="flex flex-col gap-1">
              <span className="text-2xl sm:text-3xl font-black font-syne text-white">100%</span>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-white/50 font-mono">Angus Certificado</span>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1">
                <span className="text-2xl sm:text-3xl font-black font-syne text-orange-400">4.9</span>
                <Star className="w-4 h-4 fill-orange-400 text-orange-400 inline" />
              </div>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-white/50 font-mono">Google Reviews (+340)</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-2xl sm:text-3xl font-black font-syne text-emerald-400">+15k</span>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-white/50 font-mono">Burgers Vendidos</span>
            </div>
          </div>

        </div>

        {/* Right Column: High-End Parallax Burger Showcase */}
        <div className="lg:col-span-5 relative">
          <HeroBurgerShowcase
            burger={featuredBurger}
            onOrderClick={() => onSelectBurger(featuredBurger)}
          />
        </div>

      </div>

      {/* Bottom Scroll Indicator */}
      <div className="max-w-7xl mx-auto w-full pt-8 flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity">
        <button 
          onClick={onExploreMenu}
          className="flex flex-col items-center gap-1.5 text-[10px] uppercase tracking-[0.25em] font-mono text-white/50 cursor-pointer"
        >
          <span>Role para explorar a essência</span>
          <ChevronDown className="w-4 h-4 text-orange-400 animate-bounce" />
        </button>
      </div>
    </section>
  );
};

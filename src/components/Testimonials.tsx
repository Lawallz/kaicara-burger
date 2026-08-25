import React from 'react';
import { Star, MessageSquareQuote, CheckCircle, Flame } from 'lucide-react';
import { TESTIMONIALS } from '../data/menu';

export const Testimonials: React.FC = () => {
  return (
    <section id="reviews" className="relative py-28 px-4 sm:px-8">
      {/* Glow Ambience */}
      <div className="absolute top-1/2 right-10 w-[450px] h-[450px] bg-emerald-600/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-emerald-400 font-mono text-xs uppercase tracking-[0.3em] font-semibold mb-3 flex items-center gap-2">
              <Star className="w-3.5 h-3.5 fill-emerald-400 text-emerald-400" />
              Voz de Quem Já Saboreou
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase font-syne tracking-tight leading-tight">
              Aprovado por <span className="text-transparent" style={{ WebkitTextStroke: '1.5px white' }}>Locais & Turistas</span>
            </h2>
          </div>

          <div className="flex items-center gap-4 bg-white/5 border border-white/10 px-6 py-4 rounded-2xl backdrop-blur-md">
            <div className="flex flex-col">
              <span className="text-2xl font-black font-syne text-white flex items-center gap-1.5">
                4.9 <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-white/50">Google Business</span>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div className="flex flex-col">
              <span className="text-2xl font-black font-syne text-orange-400">+340</span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-white/50">Avaliações 5 Estrelas</span>
            </div>
          </div>
        </div>

        {/* Testimonials Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="relative bg-white/[0.03] border border-white/10 backdrop-blur-xl rounded-3xl p-8 flex flex-col justify-between hover:border-white/25 transition-all duration-300 group"
            >
              <div>
                {/* Rating stars & date */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-mono text-white/40">{t.date}</span>
                </div>

                {/* Comment */}
                <p className="text-white/80 text-sm sm:text-base leading-relaxed italic mb-6">
                  "{t.comment}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-6 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-full object-cover border-2 border-orange-500/40"
                  />
                  <div>
                    <h4 className="text-sm font-bold uppercase font-syne text-white flex items-center gap-1.5">
                      {t.name}
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 inline" />
                    </h4>
                    <span className="text-xs text-white/50 block">{t.role} • {t.city}</span>
                    <span className="text-[10px] font-mono text-orange-400 mt-1 block">
                      ❤️ Pediu: {t.favoriteBurger}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flame, Waves, Compass, Sparkles, Utensils, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const StoryVibe: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });

      // Cards staggered entrance
      gsap.from([card1Ref.current, card2Ref.current, card3Ref.current], {
        scrollTrigger: {
          trigger: card1Ref.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="vibe" 
      ref={sectionRef} 
      className="relative py-28 px-4 sm:px-8 overflow-hidden bg-gradient-to-b from-transparent via-[#030d12]/50 to-transparent"
    >
      {/* Glow Orbs */}
      <div className="absolute top-1/3 left-[-150px] w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-[-100px] w-[450px] h-[450px] bg-orange-600/15 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-orange-500 font-mono text-xs uppercase tracking-[0.3em] font-semibold mb-3 flex items-center gap-2">
            <Compass className="w-3.5 h-3.5 text-orange-400" />
            Nossa Identidade & Origem
          </span>
          <h2 ref={titleRef} className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase font-syne tracking-tight max-w-3xl leading-tight text-white">
            Nascido entre as ondas e o <span className="text-transparent" style={{ WebkitTextStroke: '1.5px #f97316' }}>fogo na brasa.</span>
          </h2>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mt-4 leading-relaxed font-normal">
            Fundada em Caraguatatuba, a Kaiçara Burger nasceu do desejo de quebrar os padrões das hamburguerias industriais genéricas. Unimos a atmosfera despretensiosa do litoral com a precisão gastronômica da lenha nobre.
          </p>
        </div>

        {/* Story Grid with Frosted Glass Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Card 1: Large Visual & Manifesto */}
          <div 
            ref={card1Ref} 
            className="lg:col-span-7 relative bg-white/[0.03] border border-white/10 backdrop-blur-xl rounded-3xl p-8 sm:p-12 overflow-hidden flex flex-col justify-between group hover:border-white/20 transition-all duration-300"
          >
            {/* Background Texture / Subtle Smoke */}
            <div 
              className="absolute inset-0 opacity-20 bg-cover bg-center pointer-events-none scale-105 group-hover:scale-100 transition-transform duration-700"
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/75 to-transparent" />

            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400 mb-6">
                <Flame className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono uppercase tracking-widest text-orange-400 font-bold block mb-2">
                Manifesto Caiçara
              </span>
              <h3 className="text-2xl sm:text-4xl font-extrabold uppercase font-syne text-white leading-tight mb-4">
                "Não fazemos fast-food. Criamos conexões em volta da brasa."
              </h3>
              <p className="text-white/70 text-sm sm:text-base leading-relaxed max-w-xl">
                Cada burger é selado individualmente em grelhas de ferro fundido alimentadas por carvão selecionado e nós de lenha frutífera. O resultado é aquela crosta caramelizada rica em umami, com o miolo incrivelmente suculento e defumado no ponto perfeito.
              </p>
            </div>

            <div className="relative z-10 pt-8 mt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Waves className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white">Caraguá Raiz</h4>
                  <span className="text-[11px] text-white/40 font-mono">Orla da Praia do Centro</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-white/50">
                <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                <span>Lenha Nobre • 100% Angus</span>
              </div>
            </div>
          </div>

          {/* Column 2: 2 Stacked Frosted Story Highlights */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Box 1: Pão de Fermentação Natural */}
            <div 
              ref={card2Ref}
              className="bg-white/[0.03] border border-white/10 backdrop-blur-xl rounded-3xl p-7 flex flex-col justify-between hover:border-orange-500/40 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                  <Utensils className="w-5 h-5" />
                </div>
                <span className="text-3xl font-black font-syne text-white/10">02</span>
              </div>
              <h4 className="text-xl font-bold uppercase font-syne text-white mb-2">
                Pão de Fermentação Natural
              </h4>
              <p className="text-white/60 text-xs sm:text-sm leading-relaxed">
                Produzido diariamente por padeiros artesanais. Leve como uma nuvem, com tosta dourada na manteiga de garrafa que aguenta a suculência da carne até a última mordida.
              </p>
            </div>

            {/* Box 2: Molho Secreto da Casa */}
            <div 
              ref={card3Ref}
              className="bg-white/[0.03] border border-white/10 backdrop-blur-xl rounded-3xl p-7 flex flex-col justify-between hover:border-emerald-500/40 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <span className="text-3xl font-black font-syne text-white/10">03</span>
              </div>
              <h4 className="text-xl font-bold uppercase font-syne text-white mb-2">
                Maionese Verde Caiçara
              </h4>
              <p className="text-white/60 text-xs sm:text-sm leading-relaxed">
                Nossa receita secreta leva ervas colhidas na Serra do Mar, alho assado lentamente no azeite extravirgem e gotas de limão cravo caiçara. O vício oficial do litoral norte.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

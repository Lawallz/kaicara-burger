import React from 'react';
import { Flame, Sparkles, Wheat, Award, ShieldCheck, HeartHandshake } from 'lucide-react';

export const CraftDifferentials: React.FC = () => {
  const differentials = [
    {
      icon: <Flame className="w-7 h-7 text-orange-500" />,
      tag: 'Grelha & Brasa',
      title: 'Carne 100% Angus Certificada',
      desc: 'Blends frescos moídos diariamente com a proporção áurea de gordura e carne. Selados em brasa viva com lenhas frutíferas.',
      borderHover: 'hover:border-orange-500/50',
      glow: 'group-hover:bg-orange-500/10'
    },
    {
      icon: <Wheat className="w-7 h-7 text-amber-400" />,
      tag: 'Panificação Artesanal',
      title: 'Fermentação Natural (Levain)',
      desc: 'Pães leves, aromáticos e de fácil digestão, assados nas primeiras horas da manhã e tostados na manteiga da terra.',
      borderHover: 'hover:border-amber-500/50',
      glow: 'group-hover:bg-amber-500/10'
    },
    {
      icon: <Sparkles className="w-7 h-7 text-emerald-400" />,
      tag: 'Segredo do Caiçara',
      title: 'Maionese Verde Secreta',
      desc: 'Nossa alquimia com ervas frescas da serra, alho confitado e limão cravo. Sem conservantes industriais, feita fresca.',
      borderHover: 'hover:border-emerald-500/50',
      glow: 'group-hover:bg-emerald-500/10'
    },
    {
      icon: <Award className="w-7 h-7 text-cyan-400" />,
      tag: 'Origem Local',
      title: 'Queijos da Serra & Bacon Rústico',
      desc: 'Queijo prato e gouda maturados de pequenos produtores da Serra do Mar e bacon defumado artesanalmente por 8 horas.',
      borderHover: 'hover:border-cyan-500/50',
      glow: 'group-hover:bg-cyan-500/10'
    }
  ];

  return (
    <section id="craft" className="relative py-28 px-4 sm:px-8 bg-gradient-to-b from-black/40 via-transparent to-black/40">
      {/* Ambience glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-orange-600/10 rounded-full blur-[180px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-orange-500 font-mono text-xs uppercase tracking-[0.3em] font-semibold mb-3 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-orange-400" />
            Qualidade Inegociável
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase font-syne tracking-tight leading-tight">
            Por que o nosso burger é <span className="text-transparent" style={{ WebkitTextStroke: '1.5px white' }}>diferente?</span>
          </h2>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mt-3">
            O segredo não é mágica — é o respeito obsessivo pela brasa, pelo tempo de preparo e pelos insumos de alta procedência.
          </p>
        </div>

        {/* Grid 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {differentials.map((item, idx) => (
            <div
              key={idx}
              className={`group relative bg-white/[0.03] border border-white/10 backdrop-blur-xl rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${item.borderHover} hover:scale-[1.02]`}
            >
              <div>
                <div className={`w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 transition-colors ${item.glow}`}>
                  {item.icon}
                </div>
                
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-white/40 block mb-2">
                  {item.tag}
                </span>

                <h3 className="text-xl font-extrabold uppercase font-syne text-white mb-3">
                  {item.title}
                </h3>

                <p className="text-white/60 text-xs sm:text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                <span className="text-[11px] font-mono text-orange-400 font-bold uppercase">
                  Padrão Kaiçara
                </span>
                <span className="text-xs text-white/30 font-mono">0{idx + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

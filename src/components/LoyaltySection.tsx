import React, { useState, useEffect } from 'react';
import { Award, Flame, Gift, Sparkles, Check, ChevronRight, Trophy, Star, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

interface LoyaltySectionProps {
  onExploreMenu: () => void;
}

export const LoyaltySection: React.FC<LoyaltySectionProps> = ({ onExploreMenu }) => {
  const TOTAL_STAMPS_REQUIRED = 10;
  
  const [stamps, setStamps] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('kaicara_loyalty_stamps');
      return saved !== null ? parseInt(saved, 10) : 7;
    } catch {
      return 7;
    }
  });

  const [claimed, setClaimed] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('kaicara_loyalty_stamps', stamps.toString());
    } catch {}
  }, [stamps]);

  const handleAddStamp = () => {
    if (stamps < TOTAL_STAMPS_REQUIRED) {
      const next = stamps + 1;
      setStamps(next);
      if (next === TOTAL_STAMPS_REQUIRED) {
        triggerRewardConfetti();
      }
    }
  };

  const handleResetStamps = () => {
    setStamps(1);
    setClaimed(false);
  };

  const triggerRewardConfetti = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#f97316', '#10b981', '#fbbf24', '#ffffff']
      });
    } catch {}
  };

  const isRewardReady = stamps >= TOTAL_STAMPS_REQUIRED;
  const progressPercent = Math.min(100, (stamps / TOTAL_STAMPS_REQUIRED) * 100);

  return (
    <section id="fidelidade" className="relative py-24 px-4 sm:px-8 overflow-hidden bg-gradient-to-b from-[#030d12]/60 via-[#050505] to-[#030d12]/40">
      
      {/* Background Ambience Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[550px] h-[550px] bg-orange-600/10 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 font-mono text-xs uppercase tracking-widest font-semibold mb-4 backdrop-blur-md">
            <Trophy className="w-3.5 h-3.5 text-orange-500" />
            Clube de Vantagens
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase font-syne tracking-tight text-white max-w-2xl leading-tight">
            Fidelidade <span className="text-transparent" style={{ WebkitTextStroke: '1.5px #f97316' }}>Kaiçara</span>
          </h2>
          <p className="text-white/60 text-sm sm:text-base max-w-xl mt-4 leading-relaxed font-normal">
            A cada burger pedido no balcão ou delivery, você ganha 1 selo digital. Complete a cartela de 10 selos e ganhe <strong className="text-white font-semibold">1 Burger O Caiçara + Fritas Rústicas</strong> por nossa conta!
          </p>
        </div>

        {/* Main Loyalty Gamification Card */}
        <div className="bg-gradient-to-br from-white/[0.04] via-white/[0.02] to-transparent border border-white/15 backdrop-blur-2xl rounded-3xl p-6 sm:p-10 lg:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.8)] relative overflow-hidden">
          
          {/* Subtle Watermark */}
          <div className="absolute top-4 right-8 text-8xl font-black text-white/[0.02] uppercase font-syne pointer-events-none">
            VIP
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Progress Info & Level */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              
              {/* Member Tier Card */}
              <div className="bg-black/50 border border-white/10 rounded-2xl p-5 backdrop-blur-md">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/40">Seu Nível Atual</span>
                  <span className="text-xs font-mono uppercase text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3 fill-emerald-400 text-emerald-400" />
                    Mestre da Brasa (Nível 2)
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400 text-2xl font-black font-syne">
                    {stamps}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold font-syne text-white uppercase">
                      {stamps} de {TOTAL_STAMPS_REQUIRED} Selos
                    </h4>
                    <span className="text-xs text-white/50 font-mono">
                      {isRewardReady 
                        ? '🎉 Parabéns! Sua recompensa está liberada!' 
                        : `Faltam apenas ${TOTAL_STAMPS_REQUIRED - stamps} burgers para o prêmio gratuito`}
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-white/60 uppercase">Progresso da Cartela</span>
                  <span className="text-orange-400 font-bold">{progressPercent.toFixed(0)}% Concluído</span>
                </div>
                <div className="w-full h-3.5 bg-white/5 border border-white/10 rounded-full overflow-hidden p-0.5 relative">
                  <div 
                    className="h-full bg-gradient-to-r from-orange-500 via-amber-400 to-emerald-400 rounded-full transition-all duration-700 shadow-[0_0_15px_rgba(249,115,22,0.6)]"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Benefit List */}
              <div className="space-y-2.5 pt-2">
                <div className="flex items-center gap-2.5 text-xs text-white/70">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span>Acumula tanto no balcão físico quanto no delivery via WhatsApp</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-white/70">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span>Sem prazo de validade para os selos acumulados</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-white/70">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span>Descontos secretos e degustações de novos lançamentos</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={onExploreMenu}
                  className="px-6 py-3 bg-orange-500 hover:bg-orange-400 text-black font-extrabold uppercase text-xs rounded-xl shadow-[0_0_20px_rgba(249,115,22,0.4)] transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Flame className="w-4 h-4" />
                  <span>Pedir para Ganhar Selo</span>
                </button>

                <button
                  onClick={handleAddStamp}
                  disabled={isRewardReady}
                  className="px-4 py-3 bg-white/5 hover:bg-white/10 disabled:opacity-40 border border-white/10 text-white font-mono text-xs uppercase rounded-xl transition-all cursor-pointer"
                  title="Simular ganho de selo"
                >
                  +1 Selo (Simular)
                </button>
              </div>

            </div>

            {/* Right Column: Interactive Digital Stamp Grid */}
            <div className="lg:col-span-7 bg-black/40 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-md flex flex-col justify-between">
              
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <div>
                  <h4 className="text-base font-bold font-syne uppercase text-white flex items-center gap-2">
                    Cartela Digital
                    <Sparkles className="w-4 h-4 text-amber-400" />
                  </h4>
                  <span className="text-xs text-white/40 font-mono">10 carimbos = 1 Combo Cortesia</span>
                </div>

                {isRewardReady && (
                  <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-500 text-emerald-300 font-mono font-bold text-xs rounded-full animate-bounce">
                    🎉 Prêmio Desbloqueado!
                  </span>
                )}
              </div>

              {/* 10 Stamps Grid */}
              <div className="grid grid-cols-5 gap-3 sm:gap-4 mb-6">
                {Array.from({ length: TOTAL_STAMPS_REQUIRED }).map((_, index) => {
                  const stampNumber = index + 1;
                  const isEarned = stampNumber <= stamps;
                  const isLast = stampNumber === TOTAL_STAMPS_REQUIRED;

                  return (
                    <div
                      key={index}
                      className={`relative aspect-square rounded-2xl flex flex-col items-center justify-center transition-all duration-300 border ${
                        isEarned
                          ? isLast
                            ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-black border-amber-300 shadow-[0_0_25px_rgba(251,191,36,0.6)] scale-105'
                            : 'bg-orange-500/20 border-orange-500 text-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.3)]'
                          : isLast
                          ? 'bg-amber-500/5 border-amber-500/30 text-amber-400/40 border-dashed'
                          : 'bg-white/[0.02] border-white/10 text-white/20'
                      }`}
                    >
                      {/* Stamp Node */}
                      {isEarned ? (
                        <div className="flex flex-col items-center gap-1">
                          {isLast ? (
                            <>
                              <Gift className="w-5 h-5 sm:w-6 sm:h-6 text-black animate-pulse" />
                              <span className="text-[9px] font-mono font-black uppercase tracking-tight text-black">GRÁTIS</span>
                            </>
                          ) : (
                            <>
                              <Flame className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
                              <span className="text-[10px] font-mono font-black text-white">#{stampNumber}</span>
                            </>
                          )}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-1">
                          {isLast ? (
                            <>
                              <Gift className="w-5 h-5 text-amber-400/50" />
                              <span className="text-[9px] font-mono font-bold text-amber-400/50 uppercase">Grátis</span>
                            </>
                          ) : (
                            <>
                              <span className="text-xs sm:text-sm font-mono font-bold text-white/30">{stampNumber}</span>
                            </>
                          )}
                        </div>
                      )}

                      {/* Earned Stamp Checkmark */}
                      {isEarned && (
                        <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-emerald-500 text-black rounded-full flex items-center justify-center text-[9px] font-bold shadow-md">
                          ✓
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Reward Claim Banner if 10 Stamps */}
              {isRewardReady ? (
                <div className="bg-emerald-500/20 border border-emerald-500/40 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-3 text-left">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500 text-black flex items-center justify-center flex-shrink-0">
                      <Gift className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold uppercase text-emerald-300 font-syne">
                        Burger O Caiçara + Fritas Liberado!
                      </h5>
                      <span className="text-[11px] text-white/70">
                        Informe o cupom <strong className="text-emerald-300 font-mono">#KAIÇARA-VIP-FREE</strong> no WhatsApp
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href="https://wa.me/5512997654321?text=Ol%C3%A1!%20Completei%20minha%20cartela%20de%2010%20selos%20Fidelidade%20Kai%C3%A7ara%20(Cupom%20%23KAI%C3%87ARA-VIP-FREE)%20e%20gostaria%20de%20resgatar%20meu%20burger%20gr%C3%A1tis!"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold uppercase text-[11px] font-mono rounded-xl transition-all whitespace-nowrap"
                    >
                      Resgatar no WhatsApp
                    </a>
                    <button
                      onClick={handleResetStamps}
                      className="px-2.5 py-2 bg-white/5 hover:bg-white/10 text-white/50 hover:text-white rounded-xl text-[10px] font-mono transition-colors"
                      title="Reiniciar cartela para nova rodada"
                    >
                      Reiniciar
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between text-xs font-mono text-white/40 pt-2 border-t border-white/5">
                  <span>Próximo nível: Lenda Caiçara VIP</span>
                  <button 
                    onClick={handleAddStamp}
                    className="text-orange-400 hover:underline cursor-pointer"
                  >
                    + Adicionar Carimbo Teste
                  </button>
                </div>
              )}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

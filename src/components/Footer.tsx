import React from 'react';
import { Flame, Waves, Instagram, Facebook, MessageCircle, ArrowUp, Bike, Search, Eye, Award } from 'lucide-react';

interface FooterProps {
  onOpenTracker: () => void;
  isHighContrast: boolean;
  onToggleHighContrast: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenTracker, isHighContrast, onToggleHighContrast }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/10 bg-[#060606] pt-16 pb-12 px-4 sm:px-8 text-white overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[200px] bg-orange-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col justify-between">
        
        {/* Track Order Quick Banner in Footer */}
        <div className="mb-12 bg-gradient-to-r from-orange-950/30 via-white/[0.03] to-emerald-950/30 border border-white/10 backdrop-blur-xl rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-2xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400 flex-shrink-0">
              <Bike className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-orange-400 font-bold block">
                Rastreamento em Tempo Real & Histórico
              </span>
              <h3 className="text-xl font-bold uppercase font-syne text-white mt-0.5">
                Já pediu e quer saber onde está seu burger?
              </h3>
              <p className="text-xs text-white/60 mt-0.5">
                Consulte o status do seu pedido desde a grelha até a chegada na sua porta em Caraguá.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenTracker}
            id="footer-track-order-btn"
            className="px-6 py-3.5 bg-white/10 hover:bg-orange-500 hover:text-black border border-white/20 text-white font-extrabold uppercase text-xs font-mono tracking-wider rounded-xl transition-all flex items-center gap-2.5 flex-shrink-0 cursor-pointer shadow-lg group"
          >
            <Search className="w-4 h-4 text-orange-400 group-hover:text-black" />
            <span>Acompanhar Pedido</span>
          </button>
        </div>

        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl overflow-hidden shadow-[0_0_20px_rgba(249,115,22,0.4)] bg-neutral-900">
                  <img 
                    src="/logo.png" 
                    alt="Kaiçara Burger Logo" 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <h2 className="text-xl font-extrabold tracking-tighter uppercase font-syne">
                  Kaiçara<span className="text-orange-500">Burger</span>
                </h2>
              </div>
              <p className="text-white/60 text-xs sm:text-sm max-w-sm leading-relaxed mb-6 font-normal">
                Hamburgueria artesanal à beira-mar com foco em cortes nobres 100% Angus, pães de fermentação natural e o autêntico sabor grelhado na brasa de lenha nobre.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-orange-500 hover:text-black transition-all"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-orange-500 hover:text-black transition-all"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/5512997654321"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-emerald-500 hover:text-black transition-all"
                title="WhatsApp Direct"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Location & Hours */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-white/40 block mb-2">
                Localização & Ponto Físico
              </span>
              <p className="text-xs sm:text-sm font-medium text-white/80 leading-relaxed">
                Av. Arthur da Costa Filho, 1240 — Orla da Praia do Centro<br />
                Caraguatatuba, SP • CEP 11660-000
              </p>
            </div>

            <div>
              <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-white/40 block mb-2">
                Horário de Atendimento
              </span>
              <p className="text-xs sm:text-sm font-medium text-white/80">
                Terça a Domingo: <span className="text-orange-400 font-mono">18:00 às 23:30</span><br />
                <span className="text-white/40 text-xs">Segunda-feira: Fechado</span>
              </p>
            </div>
          </div>

          {/* Quick Nav & Accessibility Toggle */}
          <div className="md:col-span-3 flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-white/40 block mb-3">
                Atalhos Rápidos
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono text-white/60">
                <a href="#hero" className="hover:text-orange-400 transition-colors">Início</a>
                <a href="#menu" className="hover:text-orange-400 transition-colors">Cardápio</a>
                <a href="#vibe" className="hover:text-orange-400 transition-colors">A Vibe</a>
                <a href="#fidelidade" className="hover:text-orange-400 transition-colors">🎁 Fidelidade</a>
                <a href="#reviews" className="hover:text-orange-400 transition-colors">Avaliações</a>
                <button onClick={onOpenTracker} className="text-left text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer">
                  🛵 Rastrear
                </button>
              </div>
            </div>

            {/* Accessibility High-Contrast Toggle */}
            <div className="mt-6 pt-4 border-t border-white/10">
              <button
                onClick={onToggleHighContrast}
                id="footer-accessibility-toggle"
                className={`w-full py-2.5 px-3 rounded-xl border flex items-center justify-between text-xs font-mono transition-all cursor-pointer ${
                  isHighContrast
                    ? 'bg-amber-400 text-black border-amber-300 font-bold shadow-md'
                    : 'bg-white/5 text-white/70 border-white/10 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  <span>Alto Contraste:</span>
                </span>
                <span className="uppercase text-[10px] font-bold">
                  {isHighContrast ? 'Ativado' : 'Desativado'}
                </span>
              </button>
            </div>

            <button
              onClick={scrollToTop}
              className="mt-4 flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white/50 hover:text-white transition-colors cursor-pointer"
            >
              <ArrowUp className="w-4 h-4 text-orange-400" />
              <span>Voltar ao Topo</span>
            </button>
          </div>

        </div>

        {/* Bottom Seal & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/40">
          <div>
            © {new Date().getFullYear()} Kaiçara Burger Artesanal Ltda. Todos os direitos reservados.
          </div>

          <div className="text-xs font-bold italic uppercase tracking-wider text-white/80">
            Feito com <span className="text-emerald-400">🌊</span> e <span className="text-orange-500">🔥</span> no Litoral Norte
          </div>
        </div>

      </div>
    </footer>
  );
};
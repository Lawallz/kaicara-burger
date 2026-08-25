import React, { useState, useEffect } from 'react';
import { ShoppingBag, Flame, Menu as MenuIcon, X, MapPin, MessageCircle, Bike } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenTracker: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart, onOpenTracker }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 pt-4 pb-2 transition-all duration-300">
      <div 
        className={`max-w-7xl mx-auto flex items-center justify-between px-5 py-3.5 rounded-2xl sm:rounded-3xl transition-all duration-300 border ${
          isScrolled 
            ? 'bg-[#0a0a0a]/95 border-white/15 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.8)]' 
            : 'bg-white/5 border-white/10 backdrop-blur-md'
        }`}
      >
        {/* Brand Logo - Ajustada para aceitar a logo horizontal inteira */}
        <button 
          onClick={() => scrollToSection('hero')}
          className="flex items-center group cursor-pointer py-0.5 focus:outline-none"
        >
          <img 
            src="/logo3.png" 
            alt="Kaiçara's Burguer Logo" 
            className="h-10 sm:h-12 w-auto object-contain group-hover:scale-105 transition-transform duration-300" 
          />
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-[11px] uppercase tracking-[0.2em] font-semibold text-white/60">
          <button 
            onClick={() => scrollToSection('hero')} 
            className="hover:text-white transition-colors cursor-pointer"
          >
            Início
          </button>
          <button 
            onClick={() => scrollToSection('menu')} 
            className="hover:text-white transition-colors cursor-pointer"
          >
            Cardápio
          </button>
          <button 
            onClick={() => scrollToSection('vibe')} 
            className="hover:text-white transition-colors cursor-pointer"
          >
            A Vibe
          </button>
          <button 
            onClick={() => scrollToSection('craft')} 
            className="hover:text-white transition-colors cursor-pointer"
          >
            Diferenciais
          </button>
          <button 
            onClick={() => scrollToSection('reviews')} 
            className="hover:text-white transition-colors cursor-pointer"
          >
            Avaliações
          </button>
          <button 
            onClick={() => scrollToSection('location')} 
            className="hover:text-white transition-colors cursor-pointer"
          >
            Localização
          </button>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          
          {/* Order Tracker Quick Trigger */}
          <button
            onClick={onOpenTracker}
            id="nav-track-order-btn"
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white text-xs font-mono uppercase tracking-wider transition-all cursor-pointer"
            title="Acompanhar status da entrega"
          >
            <Bike className="w-3.5 h-3.5 text-emerald-400" />
            <span>Rastrear</span>
          </button>

          {/* WhatsApp CTA */}
          <a
            href="https://wa.me/5512997654321?text=Ol%C3%A1%20Kai%C3%A7ara%20Burger!%20Gostaria%20de%20fazer%20um%20pedido%20direto."
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 rounded-full text-xs font-bold uppercase tracking-wider transition-all"
            id="nav-whatsapp-btn"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>

          {/* Cart Button with Counter */}
          <button
            onClick={onOpenCart}
            id="nav-cart-btn"
            className="relative flex items-center gap-2 px-4 py-2 bg-orange-500 text-black font-extrabold uppercase tracking-wider text-xs rounded-full shadow-[0_4px_20px_rgba(249,115,22,0.4)] hover:bg-orange-400 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-black stroke-[2.5]" />
            <span className="hidden sm:inline">Sacola</span>
            {cartCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-black text-white text-[10px] flex items-center justify-center font-mono font-bold animate-bounce">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Abrir menu de navegação"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 max-w-7xl mx-auto bg-[#0a0a0a]/95 border border-white/15 backdrop-blur-2xl rounded-2xl p-6 shadow-2xl flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <span className="text-xs font-mono uppercase tracking-widest text-orange-400">Navegação Rápida</span>
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Aberto Agora
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-bold uppercase tracking-wider">
            <button 
              onClick={() => scrollToSection('hero')}
              className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-left transition-colors"
            >
              🔥 Início
            </button>
            <button 
              onClick={() => scrollToSection('menu')}
              className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-left text-orange-400 transition-colors"
            >
              🍔 Cardápio
            </button>
            <button 
              onClick={() => scrollToSection('vibe')}
              className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-left transition-colors"
            >
              🌊 A Vibe
            </button>
            <button 
              onClick={() => scrollToSection('craft')}
              className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-left transition-colors"
            >
              🥩 Diferenciais
            </button>
            <button 
              onClick={() => scrollToSection('reviews')}
              className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-left transition-colors"
            >
              ⭐ Avaliações
            </button>
            <button 
              onClick={() => scrollToSection('location')}
              className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-left transition-colors"
            >
              📍 Localização
            </button>
          </div>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenTracker();
            }}
            className="w-full py-3 bg-white/10 hover:bg-white/20 border border-white/15 text-white font-mono uppercase text-xs rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <Bike className="w-4 h-4 text-emerald-400" />
            Acompanhar Status da Entrega
          </button>

          <a
            href="https://wa.me/5512997654321?text=Ol%C3%A1%20Kai%C3%A7ara%20Burger!%20Gostaria%20de%20fazer%20um%20pedido%20direto."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase text-center rounded-xl tracking-wider text-xs transition-colors flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            Pedir no WhatsApp
          </a>
        </div>
      )}
    </header>
  );
};
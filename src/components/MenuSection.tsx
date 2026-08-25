import React, { useState } from 'react';
import { Flame, Star, Plus, Eye, Sparkles, SlidersHorizontal, Check } from 'lucide-react';
import { MenuItem, CategoryId } from '../types';
import { MENU_ITEMS } from '../data/menu';

interface MenuSectionProps {
  onSelectBurger: (item: MenuItem) => void;
  onQuickAddToCart: (item: MenuItem) => void;
}

const CATEGORIES: { id: CategoryId; label: string; icon: string }[] = [
  { id: 'all', label: 'Todos os Itens', icon: '🔥' },
  { id: 'burgers', label: 'Burgers na Brasa', icon: '🥩' },
  { id: 'smash', label: 'Smash Burgers', icon: '🍔' },
  { id: 'sides', label: 'Acompanhamentos', icon: '🍟' },
  { id: 'drinks', label: 'Chopps & Bebidas', icon: '🍺' },
  { id: 'desserts', label: 'Sobremesas', icon: '🍨' },
];

export const MenuSection: React.FC<MenuSectionProps> = ({ onSelectBurger, onQuickAddToCart }) => {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const bestSellers = MENU_ITEMS.filter(item => item.isBestSeller);

  const handleQuickAdd = (item: MenuItem, e: React.MouseEvent) => {
    e.stopPropagation();
    onQuickAddToCart(item);
    setJustAddedId(item.id);
    setTimeout(() => setJustAddedId(null), 1200);
  };

  return (
    <section id="menu" className="relative py-28 px-4 sm:px-8">
      {/* Background Ambience */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-0 w-[450px] h-[450px] bg-emerald-600/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Title & Subtitle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-orange-400 font-mono text-xs uppercase tracking-[0.25em] font-semibold flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-orange-500" />
                The Best Sellers & Menu Artesanal
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase font-syne tracking-tight leading-tight">
              Cardápio <span className="text-transparent" style={{ WebkitTextStroke: '1.5px white' }}>da Casa</span>
            </h2>
            <p className="text-white/60 text-sm sm:text-base max-w-xl mt-2">
              Escolha seu corte na brasa, smash crocante ou petisco caiçara preparado na hora.
            </p>
          </div>

          {/* Search bar */}
          <div className="w-full md:w-72">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar no cardápio..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-white/40 focus:outline-none focus:border-orange-500/80 focus:bg-white/10 transition-all backdrop-blur-md"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white text-xs"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-12 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-orange-500 text-black shadow-[0_0_20px_rgba(249,115,22,0.4)] scale-105'
                    : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10 border border-white/10'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Menu Grid with Frosted Glass Cards */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-white/[0.02] border border-white/10 rounded-3xl p-8">
            <p className="text-white/50 text-sm font-mono uppercase tracking-wider">
              Nenhum item encontrado com o termo "{searchTerm}".
            </p>
            <button
              onClick={() => { setSearchTerm(''); setActiveCategory('all'); }}
              className="mt-4 px-6 py-2.5 bg-orange-500 text-black font-bold text-xs uppercase rounded-xl"
            >
              Ver Cardápio Inteiro
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item, index) => {
              const isAdded = justAddedId === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => onSelectBurger(item)}
                  className="group relative bg-white/[0.03] border border-white/10 backdrop-blur-xl rounded-3xl overflow-hidden flex flex-col justify-between hover:border-orange-500/40 hover:bg-white/[0.05] transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)] cursor-pointer"
                >
                  {/* Top Image Preview with Dark Gradient Overlay */}
                  <div className="relative h-56 w-full overflow-hidden bg-black/40">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-90" />
                    
                    {/* Badge */}
                    {item.badge && (
                      <div className="absolute top-4 left-4 z-10">
                        <span className={`text-[10px] font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider border backdrop-blur-md ${
                          item.badgeColor === 'emerald'
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                            : item.badgeColor === 'orange'
                            ? 'bg-orange-500/20 text-orange-300 border-orange-500/40'
                            : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        }`}>
                          {item.badge}
                        </span>
                      </div>
                    )}

                    {/* Rating pill */}
                    <div className="absolute top-4 right-4 z-10 flex items-center gap-1 bg-black/60 border border-white/10 px-2.5 py-1 rounded-full text-xs font-mono backdrop-blur-md">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="font-bold text-white">{item.rating}</span>
                      <span className="text-white/40 text-[10px]">({item.reviewsCount})</span>
                    </div>

                    {/* Weight Spec */}
                    <div className="absolute bottom-3 left-4 z-10">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-orange-300 bg-black/60 border border-orange-500/20 px-2.5 py-0.5 rounded-md backdrop-blur-md">
                        {item.specs.meatWeight}
                      </span>
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-extrabold uppercase font-syne text-white group-hover:text-orange-400 transition-colors mb-1.5 flex items-center justify-between">
                        <span>{item.name}</span>
                      </h3>
                      
                      <p className="text-white/60 text-xs sm:text-sm line-clamp-3 leading-relaxed mb-4">
                        {item.description}
                      </p>

                      {/* Ingredients pills */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {item.ingredients.slice(0, 3).map((ing, i) => (
                          <span
                            key={i}
                            className="text-[10px] font-mono text-white/50 bg-white/5 px-2 py-0.5 rounded border border-white/5"
                          >
                            {ing}
                          </span>
                        ))}
                        {item.ingredients.length > 3 && (
                          <span className="text-[10px] font-mono text-white/40 bg-white/5 px-1.5 py-0.5 rounded">
                            +{item.ingredients.length - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Price and Action Button */}
                    <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase font-mono tracking-wider text-white/40">Valor</span>
                        <span className="text-2xl font-black font-syne text-orange-500">
                          R$ {item.price.toFixed(2).replace('.', ',')}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => handleQuickAdd(item, e)}
                          title="Adicionar direto à sacola"
                          className={`p-3 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-center ${
                            isAdded
                              ? 'bg-emerald-500 text-black border-emerald-400 scale-105'
                              : 'bg-white/5 hover:bg-white/10 border-white/10 text-white'
                          }`}
                        >
                          {isAdded ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectBurger(item);
                          }}
                          className="px-4 py-3 bg-orange-500 hover:bg-orange-400 text-black font-extrabold uppercase text-xs tracking-wider rounded-xl transition-all shadow-[0_0_15px_rgba(249,115,22,0.3)] hover:scale-105 active:scale-95 cursor-pointer"
                        >
                          Quero Esse
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Corner Glow Accent */}
                  <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-orange-500/20 transition-all" />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

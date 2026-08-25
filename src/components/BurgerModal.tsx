import React, { useState } from 'react';
import { X, Flame, Plus, Minus, ShoppingBag, MessageCircle, Star, Sparkles, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { MenuItem, CartItem } from '../types';
import { EXTRA_ADDONS } from '../data/menu';

interface BurgerModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (cartItem: CartItem) => void;
}

export const BurgerModal: React.FC<BurgerModalProps> = ({ item, onClose, onAddToCart }) => {
  if (!item) return null;

  const [quantity, setQuantity] = useState(1);
  const [meatDoneness, setMeatDoneness] = useState<'Ao ponto da casa (suculento)' | 'Bem passado' | 'Ao ponto para mal'>('Ao ponto da casa (suculento)');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [notes, setNotes] = useState('');

  const isMeatItem = item.category === 'burgers' || item.category === 'smash';

  const toggleAddon = (addonId: string) => {
    if (selectedAddons.includes(addonId)) {
      setSelectedAddons(selectedAddons.filter(id => id !== addonId));
    } else {
      setSelectedAddons([...selectedAddons, addonId]);
    }
  };

  const addonsTotal = selectedAddons.reduce((acc, addonId) => {
    const addon = EXTRA_ADDONS.find(a => a.id === addonId);
    return acc + (addon ? addon.price : 0);
  }, 0);

  const unitPrice = item.price + addonsTotal;
  const totalPrice = unitPrice * quantity;

  const handleAdd = () => {
    const addonsObj = selectedAddons.map(id => {
      const a = EXTRA_ADDONS.find(ad => ad.id === id)!;
      return { name: a.name, price: a.price };
    });

    const cartItem: CartItem = {
      id: `${item.id}-${Date.now()}`,
      menuItem: item,
      quantity,
      meatDoneness: isMeatItem ? meatDoneness : undefined,
      extraAddons: addonsObj,
      notes: notes.trim() || undefined,
      itemTotalPrice: totalPrice
    };

    onAddToCart(cartItem);

    // Trigger subtle firework confetti
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#f97316', '#10b981', '#fbbf24', '#ffffff']
      });
    } catch {
      // ignore
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Click backdrop to close */}
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-[#0a0a0a]/95 border border-white/15 backdrop-blur-2xl rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col max-h-[90vh] my-auto">
        
        {/* Modal Header Image */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-black flex-shrink-0">
          <img
            src={item.image}
            alt={item.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/70 border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-colors z-20 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title on Image */}
          <div className="absolute bottom-4 left-6 right-6">
            <div className="flex items-center gap-2 mb-1.5">
              {item.badge && (
                <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full uppercase bg-orange-500/20 text-orange-400 border border-orange-500/30 backdrop-blur-md">
                  {item.badge}
                </span>
              )}
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-emerald-400" />
                {item.rating} ({item.reviewsCount} votos)
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black uppercase font-syne text-white leading-tight">
              {item.name}
            </h2>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
          
          {/* Description */}
          <div>
            <p className="text-white/70 text-sm leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Ingredients list */}
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4">
            <span className="text-[11px] font-mono uppercase tracking-widest text-orange-400 font-bold block mb-2">
              Ingredientes Selecionados
            </span>
            <div className="flex flex-wrap gap-2">
              {item.ingredients.map((ing, idx) => (
                <span key={idx} className="text-xs font-mono text-white/80 bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  {ing}
                </span>
              ))}
            </div>
          </div>

          {/* Meat Doneness (if applicable) */}
          {isMeatItem && (
            <div>
              <label className="text-xs font-mono uppercase tracking-widest text-white/80 font-bold block mb-2.5">
                🔥 Ponto da Carne Angus
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  'Ao ponto da casa (suculento)',
                  'Ao ponto para mal',
                  'Bem passado'
                ].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setMeatDoneness(option as any)}
                    className={`px-3 py-2.5 rounded-xl text-xs font-bold font-mono transition-all text-left border cursor-pointer ${
                      meatDoneness === option
                        ? 'bg-orange-500/20 text-orange-400 border-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.2)]'
                        : 'bg-white/5 text-white/60 hover:text-white border-white/10'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Custom Addons */}
          <div>
            <label className="text-xs font-mono uppercase tracking-widest text-white/80 font-bold block mb-2.5">
              ✨ Turbinar meu pedido (Adicionais)
            </label>
            <div className="space-y-2">
              {EXTRA_ADDONS.map((addon) => {
                const isSelected = selectedAddons.includes(addon.id);
                return (
                  <div
                    key={addon.id}
                    onClick={() => toggleAddon(addon.id)}
                    className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-orange-500/10 border-orange-500/60 text-white'
                        : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                        isSelected ? 'bg-orange-500 border-orange-500 text-black' : 'border-white/30'
                      }`}>
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <span className="text-xs sm:text-sm font-semibold">{addon.name}</span>
                    </div>
                    <span className="text-xs font-mono font-bold text-orange-400">
                      + R$ {addon.price.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Observations */}
          <div>
            <label className="text-xs font-mono uppercase tracking-widest text-white/80 font-bold block mb-2">
              📝 Observações Especiais
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ex: Tirar a cebola, maionese à parte, cortar ao meio..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-white/40 focus:outline-none focus:border-orange-500/80 transition-all"
            />
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="p-6 bg-[#080808] border-t border-white/10 flex flex-wrap items-center justify-between gap-4 flex-shrink-0">
          
          {/* Quantity Stepper */}
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-1.5">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center font-mono font-black text-sm text-white">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Total and Submit */}
          <div className="flex items-center gap-4 flex-1 sm:flex-initial justify-end">
            <div className="text-right">
              <span className="text-[10px] uppercase font-mono text-white/40 block">Total</span>
              <span className="text-2xl font-black font-syne text-orange-500">
                R$ {totalPrice.toFixed(2).replace('.', ',')}
              </span>
            </div>

            <button
              onClick={handleAdd}
              id="modal-add-to-cart-btn"
              className="px-6 py-3.5 bg-orange-500 hover:bg-orange-400 text-black font-extrabold uppercase tracking-wider text-xs sm:text-sm rounded-xl shadow-[0_0_25px_rgba(249,115,22,0.4)] transition-all flex items-center gap-2 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-black stroke-[2.5]" />
              <span>Adicionar à Sacola</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, MessageCircle, ShoppingBag, ArrowRight, Bike, Store, Check, Sparkles, Navigation, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onExploreMenu: () => void;
  onOpenTracker: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onExploreMenu,
  onOpenTracker
}) => {
  if (!isOpen) return null;

  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('delivery');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [address, setAddress] = useState('');
  const [neighborhood, setNeighborhood] = useState('Centro');
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'cartao' | 'dinheiro'>('pix');
  const [changeFor, setChangeFor] = useState('');

  const subtotal = cartItems.reduce((acc, item) => acc + item.itemTotalPrice, 0);
  const deliveryFee = orderType === 'delivery' ? 7.00 : 0.00;
  const total = subtotal + deliveryFee;

  const handleSendWhatsAppOrder = () => {
    if (cartItems.length === 0) return;

    if (!customerName.trim()) {
      alert('Por favor, informe seu nome para o pedido.');
      return;
    }

    if (orderType === 'delivery' && !address.trim()) {
      alert('Por favor, informe o endereço de entrega em Caraguatatuba.');
      return;
    }

    const orderNum = Math.floor(1000 + Math.random() * 9000);
    const newCode = `KC-${orderNum}`;

    // Format WhatsApp order message
    let message = `🔥 *NOVO PEDIDO - KAIÇARA BURGER (#${newCode})* 🔥\n`;
    message += `👤 *Cliente:* ${customerName.trim()}\n`;
    if (customerPhone.trim()) message += `📱 *Telefone:* ${customerPhone.trim()}\n`;
    message += `📍 *Tipo:* ${orderType === 'delivery' ? `Delivery (${neighborhood} - Caraguá)` : 'Retirada no Balcão'}\n`;
    
    if (orderType === 'delivery') {
      message += `🏠 *Endereço:* ${address.trim()} - Bairro ${neighborhood}\n`;
    }
    
    message += `💳 *Pagamento:* ${
      paymentMethod === 'pix' ? 'PIX' : paymentMethod === 'cartao' ? 'Cartão (Máquina no local)' : `Dinheiro ${changeFor ? `(Troco para R$ ${changeFor})` : '(Sem troco)'}`
    }\n\n`;

    message += `🍔 *ITENS DO PEDIDO:*\n`;
    cartItems.forEach((item, index) => {
      message += `${index + 1}. *${item.quantity}x ${item.menuItem.name}* — R$ ${item.itemTotalPrice.toFixed(2).replace('.', ',')}\n`;
      if (item.meatDoneness) {
        message += `   └ Ponto: ${item.meatDoneness}\n`;
      }
      if (item.extraAddons.length > 0) {
        message += `   └ Adicionais: ${item.extraAddons.map(a => a.name).join(', ')}\n`;
      }
      if (item.notes) {
        message += `   └ Obs: ${item.notes}\n`;
      }
    });

    message += `\n💰 *Subtotal:* R$ ${subtotal.toFixed(2).replace('.', ',')}\n`;
    if (orderType === 'delivery') {
      message += `🛵 *Taxa de Entrega:* R$ ${deliveryFee.toFixed(2).replace('.', ',')}\n`;
    }
    message += `🏆 *TOTAL:* R$ ${total.toFixed(2).replace('.', ',')}\n\n`;
    message += `🌊 _Enviado via Kaiçara Burger Web App_`;

    // Save order into localStorage history
    try {
      const now = new Date();
      const timeStr = `Hoje, ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      const newStoredOrder = {
        id: Date.now().toString(),
        code: newCode,
        date: timeStr,
        items: cartItems.map(it => `${it.quantity}x ${it.menuItem.name}`),
        total: `R$ ${total.toFixed(2).replace('.', ',')}`,
        status: 'Confirmado',
        address: orderType === 'delivery' ? `${neighborhood} — Caraguatatuba` : 'Retirada no Balcão'
      };

      const existingHistory = localStorage.getItem('kaicara_order_history');
      const parsed = existingHistory ? JSON.parse(existingHistory) : [];
      const updated = [newStoredOrder, ...parsed];
      localStorage.setItem('kaicara_order_history', JSON.stringify(updated));

      // Also increment loyalty stamps by 1
      const currentStamps = parseInt(localStorage.getItem('kaicara_loyalty_stamps') || '7', 10);
      if (currentStamps < 10) {
        localStorage.setItem('kaicara_loyalty_stamps', (currentStamps + 1).toString());
      }
    } catch {}

    // Multi-burst fire and emerald confetti animation
    try {
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6, x: 0.3 },
        colors: ['#f97316', '#ea580c', '#fbbf24', '#ffffff']
      });
      setTimeout(() => {
        confetti({
          particleCount: 70,
          spread: 80,
          origin: { y: 0.6, x: 0.7 },
          colors: ['#10b981', '#059669', '#34d399', '#ffffff']
        });
      }, 200);
    } catch {}

    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/5512997654321?text=${encoded}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10 z-10">
        <div className="w-screen max-w-md bg-[#0a0a0a]/95 border-l border-white/15 backdrop-blur-2xl shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center text-black">
                <ShoppingBag className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <h3 className="text-lg font-black uppercase font-syne text-white">Sua Sacola</h3>
                <span className="text-xs font-mono text-white/40">
                  {cartItems.length} {cartItems.length === 1 ? 'item adicionado' : 'itens adicionados'}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Track Order Banner inside Drawer */}
          <div className="px-6 py-3 bg-gradient-to-r from-emerald-950/40 via-black to-orange-950/30 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono text-white/80">
              <Bike className="w-4 h-4 text-emerald-400" />
              <span>Já fez um pedido?</span>
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenTracker();
              }}
              className="text-[11px] font-mono font-bold uppercase text-orange-400 hover:text-orange-300 underline underline-offset-4 cursor-pointer"
            >
              Acompanhar Entrega →
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cartItems.length === 0 ? (
              <div className="py-12 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/30 mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold font-syne uppercase text-white mb-1">
                  Sua sacola está vazia
                </h4>
                <p className="text-xs text-white/50 max-w-xs mb-6">
                  Selecione os burgers na brasa mais apetitosos do litoral para começar.
                </p>
                
                <div className="flex flex-col gap-3 w-full max-w-xs">
                  <button
                    onClick={() => {
                      onClose();
                      onExploreMenu();
                    }}
                    className="w-full py-3 bg-orange-500 text-black font-extrabold uppercase text-xs rounded-xl shadow-lg hover:bg-orange-400 transition-all cursor-pointer"
                  >
                    Explorar Cardápio
                  </button>

                  <button
                    onClick={() => {
                      onClose();
                      onOpenTracker();
                    }}
                    className="w-full py-3 bg-white/5 border border-white/10 text-white font-mono uppercase text-xs rounded-xl hover:bg-white/10 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Bike className="w-4 h-4 text-emerald-400" />
                    Rastrear Pedido Realizado
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* List of Cart Items */}
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 flex flex-col gap-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <img
                            src={item.menuItem.image}
                            alt={item.menuItem.name}
                            referrerPolicy="no-referrer"
                            className="w-14 h-14 rounded-xl object-cover border border-white/10 flex-shrink-0"
                          />
                          <div>
                            <h4 className="text-sm font-bold uppercase font-syne text-white">
                              {item.menuItem.name}
                            </h4>
                            <span className="text-xs font-mono text-orange-400 font-bold block">
                              R$ {item.itemTotalPrice.toFixed(2).replace('.', ',')}
                            </span>
                            {item.meatDoneness && (
                              <span className="text-[10px] text-white/50 font-mono block">
                                Ponto: {item.meatDoneness}
                              </span>
                            )}
                          </div>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-white/40 hover:text-red-400 p-1.5 transition-colors cursor-pointer"
                          title="Remover item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Addons and Notes */}
                      {item.extraAddons.length > 0 && (
                        <div className="text-[11px] font-mono text-white/60 bg-white/5 p-2 rounded-lg">
                          + {item.extraAddons.map(a => a.name).join(', ')}
                        </div>
                      )}
                      {item.notes && (
                        <div className="text-[11px] italic text-white/50">
                          Obs: {item.notes}
                        </div>
                      )}

                      {/* Quantity Stepper */}
                      <div className="flex items-center justify-between pt-2 border-t border-white/5">
                        <span className="text-[10px] uppercase font-mono text-white/40">Quantidade</span>
                        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg p-1">
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="w-6 h-6 rounded bg-white/5 hover:bg-white/10 flex items-center justify-center text-white cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-mono font-bold">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="w-6 h-6 rounded bg-white/5 hover:bg-white/10 flex items-center justify-center text-white cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Delivery Option Toggle */}
                <div>
                  <label className="text-xs font-mono uppercase tracking-widest text-white/70 font-bold block mb-2">
                    Tipo de Pedido
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setOrderType('delivery')}
                      className={`p-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold font-mono transition-all cursor-pointer ${
                        orderType === 'delivery'
                          ? 'bg-orange-500/20 text-orange-400 border-orange-500'
                          : 'bg-white/5 text-white/60 border-white/10 hover:text-white'
                      }`}
                    >
                      <Bike className="w-4 h-4" />
                      Delivery Caraguá (+R$7)
                    </button>
                    <button
                      type="button"
                      onClick={() => setOrderType('pickup')}
                      className={`p-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold font-mono transition-all cursor-pointer ${
                        orderType === 'pickup'
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500'
                          : 'bg-white/5 text-white/60 border-white/10 hover:text-white'
                      }`}
                    >
                      <Store className="w-4 h-4" />
                      Retirar no Balcão (Grátis)
                    </button>
                  </div>
                </div>

                {/* Customer Details */}
                <div className="space-y-3 pt-2">
                  <div>
                    <label className="text-[11px] font-mono uppercase text-white/60 block mb-1">Seu Nome *</label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Ex: João da Silva"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  {orderType === 'delivery' && (
                    <>
                      <div>
                        <label className="text-[11px] font-mono uppercase text-white/60 block mb-1">Bairro em Caraguá</label>
                        <select
                          value={neighborhood}
                          onChange={(e) => setNeighborhood(e.target.value)}
                          className="w-full bg-[#121212] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                        >
                          <option value="Centro">Centro</option>
                          <option value="Martim de Sá">Martim de Sá</option>
                          <option value="Prainha">Prainha</option>
                          <option value="Indaiá">Indaiá</option>
                          <option value="Jardim Jaqueira">Jardim Jaqueira</option>
                          <option value="Massaguaçu">Massaguaçu</option>
                          <option value="Poiares">Poiares</option>
                          <option value="Praia das Palmeiras">Praia das Palmeiras</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[11px] font-mono uppercase text-white/60 block mb-1">Endereço Completo e Número *</label>
                        <input
                          type="text"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="Rua, número, apto ou ponto de referência..."
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-orange-500"
                        />
                      </div>
                    </>
                  )}

                  {/* Payment Method */}
                  <div>
                    <label className="text-[11px] font-mono uppercase text-white/60 block mb-1">Forma de Pagamento</label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {[
                        { id: 'pix', label: 'PIX' },
                        { id: 'cartao', label: 'Cartão' },
                        { id: 'dinheiro', label: 'Dinheiro' }
                      ].map((pay) => (
                        <button
                          key={pay.id}
                          type="button"
                          onClick={() => setPaymentMethod(pay.id as any)}
                          className={`py-2 rounded-lg text-xs font-mono font-bold border transition-all cursor-pointer ${
                            paymentMethod === pay.id
                              ? 'bg-orange-500 text-black border-orange-500'
                              : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10'
                          }`}
                        >
                          {pay.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {paymentMethod === 'dinheiro' && (
                    <div>
                      <label className="text-[11px] font-mono uppercase text-white/60 block mb-1">Troco para quanto?</label>
                      <input
                        type="text"
                        value={changeFor}
                        onChange={(e) => setChangeFor(e.target.value)}
                        placeholder="Ex: 50, 100 ou deixe em branco se não precisar"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-white/30"
                      />
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Footer Summary & Checkout */}
          {cartItems.length > 0 && (
            <div className="p-6 bg-[#080808] border-t border-white/10 space-y-4">
              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-white/60">
                  <span>Subtotal</span>
                  <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
                </div>
                {orderType === 'delivery' && (
                  <div className="flex justify-between text-white/60">
                    <span>Taxa de Entrega (Caraguá)</span>
                    <span>R$ {deliveryFee.toFixed(2).replace('.', ',')}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-white/10 font-syne">
                  <span>Total do Pedido</span>
                  <span className="text-orange-500 font-black text-xl">
                    R$ {total.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>

              <button
                onClick={handleSendWhatsAppOrder}
                id="cart-submit-whatsapp-btn"
                className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold uppercase tracking-wider text-xs sm:text-sm rounded-xl shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-all flex items-center justify-center gap-2.5 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              >
                <MessageCircle className="w-5 h-5 text-black fill-black" />
                <span>Enviar Pedido pelo WhatsApp</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

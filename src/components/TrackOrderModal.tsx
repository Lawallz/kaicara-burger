import React, { useState, useEffect } from 'react';
import { X, Search, PackageCheck, Flame, Bike, CheckCircle2, Clock, MapPin, MessageCircle, AlertCircle, Sparkles, History, RotateCcw, ArrowRight } from 'lucide-react';

interface TrackOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRepeatOrder?: (itemsSummary: string) => void;
}

interface OrderStatusStep {
  id: number;
  label: string;
  sublabel: string;
  time: string;
  icon: string;
  status: 'completed' | 'current' | 'upcoming';
}

interface StoredOrder {
  id: string;
  code: string;
  date: string;
  items: string[];
  total: string;
  status: 'Entregue' | 'Em Preparo' | 'A Caminho' | 'Confirmado';
  address: string;
}

export const TrackOrderModal: React.FC<TrackOrderModalProps> = ({ isOpen, onClose, onRepeatOrder }) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'track' | 'history'>('track');
  const [orderCode, setOrderCode] = useState('KC-8924');
  const [activeCode, setActiveCode] = useState('KC-8924');
  
  // Dynamic Countdown Timer State
  const [remainingSeconds, setRemainingSeconds] = useState(14 * 60 + 35); // 14min 35s initial

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingSeconds(prev => {
        if (prev <= 1) return 0;
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatCountdown = (totalSec: number) => {
    if (totalSec <= 0) return 'Chegando agora!';
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins}m ${secs < 10 ? '0' : ''}${secs}s`;
  };

  // Order history from local storage + initial mock fallback
  const [historyOrders, setHistoryOrders] = useState<StoredOrder[]>(() => {
    const fallbackOrders: StoredOrder[] = [
      {
        id: '1',
        code: 'KC-8924',
        date: 'Hoje, 20:10',
        items: ['1x O Caiçara (Ao ponto da casa)', '1x Fritas Rústicas Kaiçara', '1x Chopp IPA 500ml'],
        total: 'R$ 85,80',
        status: 'A Caminho',
        address: 'Martim de Sá — Caraguatatuba'
      },
      {
        id: '2',
        code: 'KC-6102',
        date: '14/08/2026, 21:40',
        items: ['2x Bruta Flor', '1x Dadinhos de Tapioca & Queijo Coalho'],
        total: 'R$ 108,70',
        status: 'Entregue',
        address: 'Praia do Centro — Caraguá'
      },
      {
        id: '3',
        code: 'KC-4419',
        date: '08/08/2026, 19:25',
        items: ['1x Costela da Orla', '1x Banoffee no Pote Caiçara'],
        total: 'R$ 65,80',
        status: 'Entregue',
        address: 'Indaiá — Caraguá'
      }
    ];

    try {
      const saved = localStorage.getItem('kaicara_order_history');
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.length > 0 ? parsed : fallbackOrders;
      }
      return fallbackOrders;
    } catch {
      return fallbackOrders;
    }
  });

  // Sample order simulation data based on order code
  const getOrderData = (code: string) => {
    const clean = code.toUpperCase().trim();
    if (clean === 'KC-8924' || clean.includes('8924') || clean === '') {
      return {
        code: 'KC-8924',
        customer: 'Rodrigo M. Furtado',
        neighborhood: 'Martim de Sá — Caraguatatuba',
        items: ['1x O Caiçara (Ao ponto da casa)', '1x Fritas Rústicas Kaiçara', '1x Chopp IPA 500ml'],
        total: 'R$ 85,80',
        driver: 'Marcos Silveira (Honda Titan Preta)',
        estimatedMinutes: '12 - 18 min',
        currentStepIndex: 3,
        steps: [
          { id: 1, label: 'Pedido Confirmado', sublabel: 'Recebido pela cozinha do Kaiçara', time: '19:42', icon: '📝', status: 'completed' },
          { id: 2, label: 'Na Brasa & Montagem', sublabel: 'Blend Angus grelhado no fogo de lenha', time: '19:55', icon: '🔥', status: 'completed' },
          { id: 3, label: 'Saiu para Entrega', sublabel: 'Entregador a caminho da sua localização', time: '20:10', icon: '🛵', status: 'current' },
          { id: 4, label: 'Chegando na sua Porta', sublabel: 'Prepare o apetite!', time: 'Previsão ~20:25', icon: '🍔', status: 'upcoming' },
        ] as OrderStatusStep[]
      };
    } else if (clean === 'KC-3310' || clean.includes('3310')) {
      return {
        code: 'KC-3310',
        customer: 'Camila Alencar',
        neighborhood: 'Praia do Centro — Retirada no Balcão',
        items: ['2x Bruta Flor', '1x Dadinhos de Tapioca'],
        total: 'R$ 108,70',
        driver: 'Retirada no Balcão',
        estimatedMinutes: '5 min para retirar',
        currentStepIndex: 2,
        steps: [
          { id: 1, label: 'Pedido Confirmado', sublabel: 'Recebido pela recepção', time: '20:05', icon: '📝', status: 'completed' },
          { id: 2, label: 'Finalizando na Chapa', sublabel: 'Derretendo o queijo cheddar inglês', time: '20:15', icon: '🔥', status: 'current' },
          { id: 3, label: 'Pronto no Balcão', sublabel: 'Pode se dirigir ao caixa com o código', time: 'Previsão 20:22', icon: '✨', status: 'upcoming' },
          { id: 4, label: 'Entregue', sublabel: 'Aproveite o seu burger!', time: '--', icon: '🍔', status: 'upcoming' },
        ] as OrderStatusStep[]
      };
    } else {
      return {
        code: clean,
        customer: 'Cliente Kaiçara',
        neighborhood: 'Caraguatatuba, SP',
        items: ['1x Burger Especial Angus', '1x Acompanhamento'],
        total: 'R$ 54,90',
        driver: 'Equipe de Entrega Kaiçara',
        estimatedMinutes: '20 - 30 min',
        currentStepIndex: 1,
        steps: [
          { id: 1, label: 'Pedido Confirmado', sublabel: 'Recebido com sucesso pelo sistema', time: 'Agora', icon: '📝', status: 'completed' },
          { id: 2, label: 'Preparando na Brasa', sublabel: 'Cozinha trabalhando no seu corte Angus', time: 'Em andamento', icon: '🔥', status: 'current' },
          { id: 3, label: 'Despacho Delivery', sublabel: 'Aguardando saída do motoboy', time: 'A seguir', icon: '🛵', status: 'upcoming' },
          { id: 4, label: 'Entregue', sublabel: 'Chegando ao endereço informado', time: 'Previsão ~30 min', icon: '🍔', status: 'upcoming' },
        ] as OrderStatusStep[]
      };
    }
  };

  const orderData = getOrderData(activeCode);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderCode.trim()) {
      setActiveCode(orderCode.trim());
      setRemainingSeconds(18 * 60); // Reset countdown for searched order
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-[#0a0a0a]/95 border border-white/15 backdrop-blur-2xl rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col max-h-[92vh] my-auto">
        
        {/* Modal Header with Tabs */}
        <div className="p-6 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400">
              <Bike className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black uppercase font-syne text-white flex items-center gap-2">
                Acompanhamento & Histórico
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </h3>
              <span className="text-xs font-mono text-white/50">
                Gerencie seus pedidos em tempo real
              </span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2">
            <div className="flex bg-white/5 border border-white/10 rounded-xl p-1">
              <button
                onClick={() => setActiveTab('track')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono uppercase font-bold transition-all cursor-pointer ${
                  activeTab === 'track'
                    ? 'bg-orange-500 text-black shadow-md'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                Rastrear Atual
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono uppercase font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'history'
                    ? 'bg-orange-500 text-black shadow-md'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <History className="w-3.5 h-3.5" />
                Histórico ({historyOrders.length})
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
          
          {activeTab === 'track' ? (
            <>
              {/* Dynamic Live Delivery Countdown Banner */}
              <div className="bg-gradient-to-r from-emerald-950/50 via-[#0d1c1a] to-orange-950/40 border border-emerald-500/30 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 animate-pulse">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold block">
                      Cronômetro de Entrega Estimada
                    </span>
                    <h4 className="text-xl font-black font-mono text-white tracking-tight flex items-center gap-2 mt-0.5">
                      {formatCountdown(remainingSeconds)}
                      <span className="text-xs font-sans text-white/50 font-normal">restantes</span>
                    </h4>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-mono font-bold border border-emerald-500/30">
                    🛵 Motoboy em trânsito
                  </span>
                </div>
              </div>

              {/* Search Order Code Input */}
              <form onSubmit={handleSearch} className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={orderCode}
                    onChange={(e) => setOrderCode(e.target.value)}
                    placeholder="Digite o código do pedido (ex: KC-8924 ou KC-3310)"
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-xs font-mono text-white uppercase placeholder-white/30 focus:outline-none focus:border-orange-500 transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-3 bg-orange-500 hover:bg-orange-400 text-black font-extrabold uppercase text-xs rounded-xl transition-all shadow-[0_0_15px_rgba(249,115,22,0.3)] cursor-pointer"
                >
                  Consultar
                </button>
              </form>

              {/* Quick Sample Code Chips for Testing */}
              <div className="flex items-center gap-2 text-xs font-mono text-white/40 flex-wrap">
                <span>Testar códigos:</span>
                <button
                  type="button"
                  onClick={() => { setOrderCode('KC-8924'); setActiveCode('KC-8924'); }}
                  className={`px-2.5 py-1 rounded-lg border text-[11px] transition-colors cursor-pointer ${
                    activeCode === 'KC-8924' ? 'bg-orange-500/20 text-orange-400 border-orange-500/40' : 'bg-white/5 border-white/10 hover:text-white'
                  }`}
                >
                  #KC-8924 (Em trânsito)
                </button>
                <button
                  type="button"
                  onClick={() => { setOrderCode('KC-3310'); setActiveCode('KC-3310'); }}
                  className={`px-2.5 py-1 rounded-lg border text-[11px] transition-colors cursor-pointer ${
                    activeCode === 'KC-3310' ? 'bg-orange-500/20 text-orange-400 border-orange-500/40' : 'bg-white/5 border-white/10 hover:text-white'
                  }`}
                >
                  #KC-3310 (Na Brasa)
                </button>
              </div>

              {/* Active Order Card */}
              <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 relative overflow-hidden">
                
                {/* Header info */}
                <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-white/10">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-orange-400 font-bold block">
                      Código #{orderData.code}
                    </span>
                    <h4 className="text-xl font-bold uppercase font-syne text-white mt-0.5">
                      {orderData.customer}
                    </h4>
                    <div className="flex items-center gap-1.5 text-xs text-white/60 font-mono mt-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{orderData.neighborhood}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 block">Destino Final</span>
                    <span className="text-lg font-black font-mono text-emerald-400 mt-0.5 block">
                      {orderData.total}
                    </span>
                  </div>
                </div>

                {/* Stepper Timeline */}
                <div className="py-6 space-y-6">
                  {orderData.steps.map((step, idx) => {
                    const isCompleted = step.status === 'completed';
                    const isCurrent = step.status === 'current';
                    return (
                      <div key={step.id} className="relative flex items-start gap-4">
                        {/* Line connector */}
                        {idx < orderData.steps.length - 1 && (
                          <div
                            className={`absolute left-5 top-10 bottom-[-14px] w-0.5 ${
                              isCompleted ? 'bg-orange-500' : 'bg-white/10'
                            }`}
                          />
                        )}

                        {/* Step Icon Node */}
                        <div
                          className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-base flex-shrink-0 z-10 transition-all ${
                            isCompleted
                              ? 'bg-orange-500 text-black shadow-[0_0_15px_rgba(249,115,22,0.4)]'
                              : isCurrent
                              ? 'bg-emerald-500 text-black border-2 border-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.5)] animate-pulse'
                              : 'bg-white/5 border border-white/10 text-white/30'
                          }`}
                        >
                          {step.icon}
                        </div>

                        {/* Text Details */}
                        <div className="flex-1 pt-0.5">
                          <div className="flex items-center justify-between">
                            <h5 className={`text-sm font-bold uppercase font-syne ${
                              isCurrent ? 'text-emerald-300' : isCompleted ? 'text-white' : 'text-white/40'
                            }`}>
                              {step.label}
                            </h5>
                            <span className="text-[11px] font-mono text-white/40">
                              {step.time}
                            </span>
                          </div>
                          <p className="text-xs text-white/60 mt-0.5">
                            {step.sublabel}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Summary Items */}
                <div className="pt-4 border-t border-white/10 bg-black/30 -mx-6 -mb-6 p-6 flex flex-col gap-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-white/40 uppercase">Itens no Pacote:</span>
                    <span className="text-orange-400 font-bold">{orderData.total}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {orderData.items.map((it, i) => (
                      <span key={i} className="text-[11px] font-mono bg-white/5 border border-white/10 text-white/80 px-2.5 py-1 rounded-lg">
                        {it}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono text-white/60 pt-2 border-t border-white/5">
                    <span>🛵 Entregador: <strong className="text-white">{orderData.driver}</strong></span>
                  </div>
                </div>

              </div>

              {/* WhatsApp Support Callout */}
              <div className="bg-emerald-500/10 border border-emerald-500/25 rounded-2xl p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold uppercase text-emerald-300 font-syne">
                      Falar com a Cozinha ou Entregador
                    </h5>
                    <p className="text-[11px] text-white/60">
                      Atualizações imediatas sobre o código #{orderData.code}
                    </p>
                  </div>
                </div>

                <a
                  href={`https://wa.me/5512997654321?text=Ol%C3%A1!%20Gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20o%20pedido%20${orderData.code}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold uppercase text-[11px] font-mono tracking-wider rounded-xl transition-all whitespace-nowrap"
                >
                  WhatsApp
                </a>
              </div>
            </>
          ) : (
            /* Order History Tab */
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-white/50 pb-2 border-b border-white/10">
                <span>Histórico de pedidos salvos no dispositivo</span>
                <span>{historyOrders.length} pedidos encontrados</span>
              </div>

              {historyOrders.map((ord) => (
                <div
                  key={ord.id}
                  className="bg-white/[0.03] border border-white/10 hover:border-orange-500/40 rounded-2xl p-5 transition-all flex flex-col gap-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-orange-400 uppercase">
                          #{ord.code}
                        </span>
                        <span className="text-white/30 text-xs">•</span>
                        <span className="text-xs font-mono text-white/50">{ord.date}</span>
                      </div>
                      <h4 className="text-sm font-bold font-syne uppercase text-white mt-1">
                        {ord.address}
                      </h4>
                    </div>

                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase ${
                      ord.status === 'Entregue' 
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
                    }`}>
                      {ord.status}
                    </span>
                  </div>

                  {/* Items summary */}
                  <div className="flex flex-wrap gap-1.5">
                    {ord.items.map((it, i) => (
                      <span key={i} className="text-[11px] font-mono bg-white/5 border border-white/10 text-white/70 px-2 py-0.5 rounded-lg">
                        {it}
                      </span>
                    ))}
                  </div>

                  {/* Total and Actions */}
                  <div className="flex items-center justify-between pt-3 border-t border-white/5">
                    <div className="text-xs font-mono">
                      <span className="text-white/40">Total: </span>
                      <strong className="text-white font-bold">{ord.total}</strong>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setActiveCode(ord.code);
                          setOrderCode(ord.code);
                          setActiveTab('track');
                        }}
                        className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-mono rounded-lg transition-colors cursor-pointer"
                      >
                        Ver Rastreio
                      </button>

                      <a
                        href={`https://wa.me/5512997654321?text=Ol%C3%A1%20Kai%C3%A7ara%20Burger!%20Gostaria%20de%20repetir%20meu%20pedido%20anterior%20%23${ord.code}:%20${ord.items.join(',%20')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 bg-orange-500 hover:bg-orange-400 text-black text-xs font-mono font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Pedir de Novo</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#080808] border-t border-white/10 text-center">
          <button
            onClick={onClose}
            className="text-xs font-mono uppercase tracking-widest text-white/50 hover:text-white transition-colors cursor-pointer"
          >
            Fechar Janela
          </button>
        </div>

      </div>
    </div>
  );
};

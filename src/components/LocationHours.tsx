import React from 'react';
import { MapPin, Clock, Phone, Navigation, Bike, Shield, Waves, Flame } from 'lucide-react';

export const LocationHours: React.FC = () => {
  return (
    <section id="location" className="relative py-28 px-4 sm:px-8 bg-gradient-to-b from-transparent via-[#080808] to-transparent">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/3 w-[600px] h-[300px] bg-orange-600/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-orange-400 font-mono text-xs uppercase tracking-[0.3em] font-semibold mb-3 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-orange-500" />
            Vem pro Litoral
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase font-syne tracking-tight leading-tight">
            Nossa Casa & <span className="text-transparent" style={{ WebkitTextStroke: '1.5px white' }}>Localização</span>
          </h2>
          <p className="text-white/60 text-sm sm:text-base max-w-xl mt-3">
            Localizado no coração de Caraguá, a poucos passos do mar. Chegue para comer na calçada com a brisa ou peça em casa.
          </p>
        </div>

        {/* 2 Column Content: Info Cards & Interactive Map Simulation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Address, Hours, Delivery */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Address Box */}
            <div className="bg-white/[0.03] border border-white/10 backdrop-blur-xl rounded-3xl p-8 hover:border-white/20 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 flex-shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 block mb-1">Endereço Físico</span>
                  <h3 className="text-xl font-extrabold uppercase font-syne text-white mb-1">
                    Av. Arthur da Costa Filho, 1240
                  </h3>
                  <p className="text-white/60 text-xs sm:text-sm">
                    Orla da Praia do Centro — Caraguatatuba, SP • CEP 11660-000
                  </p>
                  <a
                    href="https://maps.google.com/?q=Caraguatatuba+SP"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-orange-400 hover:text-orange-300 mt-4 uppercase tracking-wider"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    Abrir no Google Maps & Waze →
                  </a>
                </div>
              </div>
            </div>

            {/* Operating Hours Box */}
            <div className="bg-white/[0.03] border border-white/10 backdrop-blur-xl rounded-3xl p-8 hover:border-white/20 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div className="w-full">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">Horários de Atendimento</span>
                    <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
                      Aberto Hoje
                    </span>
                  </div>
                  <h3 className="text-lg font-extrabold uppercase font-syne text-white mb-2">
                    Terça a Domingo
                  </h3>
                  <p className="text-white/70 text-sm font-mono">
                    Salão & Delivery: <strong className="text-white font-bold">18:00 às 23:30</strong>
                  </p>
                  <p className="text-white/40 text-xs font-mono mt-1">
                    Segunda-feira: Fechado para descanso da equipe
                  </p>
                </div>
              </div>
            </div>

            {/* Delivery Areas */}
            <div className="bg-white/[0.03] border border-white/10 backdrop-blur-xl rounded-3xl p-8 hover:border-white/20 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 flex-shrink-0">
                  <Bike className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 block mb-1">Área de Entrega Própria</span>
                  <h3 className="text-lg font-extrabold uppercase font-syne text-white mb-2">
                    Caraguá & Praias Vizinhas
                  </h3>
                  <div className="flex flex-wrap gap-1.5 text-[11px] font-mono text-white/60">
                    <span className="bg-white/5 px-2 py-0.5 rounded border border-white/5">Martim de Sá</span>
                    <span className="bg-white/5 px-2 py-0.5 rounded border border-white/5">Centro</span>
                    <span className="bg-white/5 px-2 py-0.5 rounded border border-white/5">Prainha</span>
                    <span className="bg-white/5 px-2 py-0.5 rounded border border-white/5">Indaiá</span>
                    <span className="bg-white/5 px-2 py-0.5 rounded border border-white/5">Jardim Jaqueira</span>
                    <span className="bg-white/5 px-2 py-0.5 rounded border border-white/5">Massaguaçu</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: High Aesthetic Visual Map Showcase */}
          <div className="lg:col-span-7 relative bg-white/[0.03] border border-white/10 backdrop-blur-xl rounded-3xl overflow-hidden min-h-[400px] flex flex-col justify-between p-8 sm:p-12">
            {/* Background Image of Coast & Burgers */}
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-30 scale-105"
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/75 to-[#050505]/30" />

            {/* Top Tag */}
            <div className="relative z-10 flex justify-between items-center">
              <span className="bg-orange-500/20 text-orange-300 border border-orange-500/30 px-3 py-1 rounded-full text-xs font-mono uppercase font-bold backdrop-blur-md">
                🌊 Na Frente da Praia
              </span>
              <span className="text-xs font-mono text-white/50">
                Litoral Norte • Caraguatatuba
              </span>
            </div>

            {/* Center Pin Showcase */}
            <div className="relative z-10 my-auto text-center py-10 flex flex-col items-center">
              <div className="w-16 h-16 rounded-3xl bg-orange-500 text-black flex items-center justify-center shadow-[0_0_35px_rgba(249,115,22,0.6)] mb-4 animate-bounce">
                <Flame className="w-8 h-8 stroke-[2.5]" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-black uppercase font-syne text-white mb-2">
                Kaiçara Burger Caraguá
              </h3>
              <p className="text-white/70 text-xs sm:text-sm max-w-md font-normal leading-relaxed">
                Venha curtir o som das ondas na orla, sentir o aroma da brasa acesa e saborear um burger de verdade com quem entende.
              </p>
            </div>

            {/* Bottom Button */}
            <div className="relative z-10 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-mono text-white/60">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Mesas ao ar livre • Pet Friendly • Estacionamento</span>
              </div>

              <a
                href="https://wa.me/5512997654321?text=Ol%C3%A1!%20Gostaria%20de%20reservar%20uma%20mesa%20ou%20pedir%20informa%C3%A7%C3%B5es."
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-white text-black font-extrabold uppercase text-xs rounded-xl hover:bg-orange-500 transition-colors shadow-lg"
              >
                Falar com a Equipe
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

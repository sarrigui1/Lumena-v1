
import React, { useState } from 'react';

interface HeatmapFullScreenViewProps {
  onBack: () => void;
}

export const HeatmapFullScreenView: React.FC<HeatmapFullScreenViewProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('Sesión Completa');

  return (
    <div className="flex flex-col min-h-screen bg-[#0a120d] animate-in fade-in duration-500">
      {/* Header */}
      <header className="px-6 pt-8 pb-6 flex items-center justify-between z-20">
        <button onClick={onBack} className="size-10 rounded-full bg-white/5 flex items-center justify-center active:scale-90 transition-all">
          <span className="material-symbols-outlined text-white">arrow_back</span>
        </button>
        <div className="text-center">
          <h1 className="text-xl font-bold text-white leading-none">Julian Alvarez</h1>
          <p className="text-xs font-medium text-slate-500">12 Oct 2023 • Estadio Monumental</p>
        </div>
        <button className="size-10 rounded-full bg-white/5 flex items-center justify-center active:scale-90 transition-all">
          <span className="material-symbols-outlined text-white">share</span>
        </button>
      </header>

      {/* Segment Selectors */}
      <div className="px-6 mb-8 flex gap-2">
        {['Sesión Completa', '1er Tiempo', '2do Tiempo'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 rounded-xl text-[11px] font-black tracking-widest transition-all ${
              activeTab === tab 
                ? 'bg-primary border-primary text-[#0a120d]' 
                : 'bg-white/5 border border-white/5 text-slate-400'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Large Pitch Visual - HU-05 */}
      <main className="flex-1 flex flex-col px-6 justify-center relative pb-32">
        <div className="w-full aspect-[9/16] bg-[#0e1811] border border-white/10 rounded-[40px] relative overflow-hidden shadow-2xl">
          {/* Pitch Lines - Vertical Layout for better mobile view */}
          <div className="absolute inset-6 border-2 border-white/5">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/5"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-32 border-2 border-white/5 rounded-full"></div>
            {/* Goal Areas */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-24 border-b-2 border-x-2 border-white/5"></div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-24 border-t-2 border-x-2 border-white/5"></div>
          </div>

          {/* Grid Overlay */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

          {/* Heatmap Simulation Data */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/4 -translate-y-1/4 size-64 bg-primary/20 blur-[60px] rounded-full animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/3 -translate-y-1/3 size-32 bg-orange-400/30 blur-[40px] rounded-full"></div>
          <div className="absolute bottom-1/3 right-1/4 size-48 bg-primary/10 blur-[50px] rounded-full"></div>

          {/* Map Controls */}
          <div className="absolute bottom-8 right-6 flex flex-col gap-3">
            <MapControl icon="add" />
            <MapControl icon="remove" />
            <MapControl icon="layers" active />
          </div>
        </div>

        {/* Legend */}
        <div className="mt-10 space-y-4 px-2">
           <div className="flex justify-between text-[9px] font-black text-slate-500 uppercase tracking-widest">
             <span>BAJA INTENSIDAD</span>
             <span>ALTA INTENSIDAD</span>
           </div>
           <div className="h-2 w-full rounded-full bg-gradient-to-r from-primary via-yellow-400 to-red-600"></div>
        </div>
      </main>

      {/* Footer Navigation */}
      <div className="fixed bottom-10 left-0 right-0 p-6 flex justify-center z-20 pointer-events-none">
        <button 
          onClick={onBack}
          className="pointer-events-auto bg-white/95 text-[#0a120d] px-10 py-5 rounded-full font-black text-lg flex items-center gap-3 shadow-[0_15px_40px_rgba(0,0,0,0.5)] active:scale-95 transition-all backdrop-blur-md"
        >
          <span className="material-symbols-outlined font-black">close</span>
          Cerrar Mapa
        </button>
      </div>
    </div>
  );
};

const MapControl: React.FC<{ icon: string, active?: boolean }> = ({ icon, active }) => (
  <button className={`size-12 rounded-xl flex items-center justify-center transition-all border ${
    active ? 'bg-primary text-[#0a120d] border-primary shadow-lg shadow-primary/20' : 'bg-[#0a120d]/80 text-white border-white/10'
  }`}>
    <span className="material-symbols-outlined text-[24px] font-bold">{icon}</span>
  </button>
);


import React, { useState } from 'react';

interface PlayerEvolutionViewProps {
  onBack: () => void;
  onSelectSession: (id: string) => void;
  onViewAllHistory: () => void;
}

export const PlayerEvolutionView: React.FC<PlayerEvolutionViewProps> = ({ onBack, onSelectSession, onViewAllHistory }) => {
  const [period, setPeriod] = useState('Últimas 4 semanas');

  return (
    <div className="flex flex-col min-h-screen bg-[#0a120d] animate-in fade-in slide-in-from-right-4 duration-500 pb-32">
      {/* Header */}
      <header className="px-6 pt-8 pb-4 flex items-center justify-between sticky top-0 bg-[#0a120d]/90 backdrop-blur-md z-30">
        <button onClick={onBack} className="size-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center active:scale-90 transition-all">
          <span className="material-symbols-outlined text-white">arrow_back</span>
        </button>
        <h1 className="text-lg font-bold text-white tracking-tight">Evolución del Jugador</h1>
        <button className="size-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center active:scale-90 transition-all">
          <span className="material-symbols-outlined text-primary">share</span>
        </button>
      </header>

      <main className="flex-1 px-6 pt-6 space-y-8">
        {/* Player Snapshot - HU-01 */}
        <section className="flex items-center gap-5">
          <div className="relative">
            <div className="size-20 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 border-2 border-white/10 shadow-xl overflow-hidden">
               {/* Simplified avatar for mock */}
               <div className="w-full h-full flex items-center justify-center">
                 <span className="material-symbols-outlined text-white/20 text-[40px]">person</span>
               </div>
            </div>
            <div className="absolute -bottom-1 -right-1 px-2 py-0.5 bg-primary text-[#0a120d] rounded-md text-[9px] font-black tracking-widest border-2 border-[#0a120d]">
              PRO
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white tracking-tight leading-none mb-2">Carlos Martínez</h2>
            <p className="text-xs font-bold text-primary tracking-wide uppercase">Mediocampista • ID: 28492</p>
          </div>
        </section>

        {/* Period Selector - HU-02 */}
        <section className="space-y-3">
          <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Período de Análisis</label>
          <div className="relative">
            <select 
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="w-full h-16 bg-white/5 border border-white/10 rounded-2xl px-5 text-white appearance-none focus:border-primary/50 transition-all outline-none font-bold"
            >
              <option className="bg-[#152119]">Últimos 7 días</option>
              <option className="bg-[#152119]">Últimas 4 semanas</option>
              <option className="bg-[#152119]">Últimos 3 meses</option>
              <option className="bg-[#152119]">Temporada completa</option>
            </select>
            <div className="absolute right-5 top-1/2 -translate-y-1/2 size-8 bg-gradient-to-br from-orange-200 to-orange-400 rounded-lg pointer-events-none opacity-50"></div>
          </div>
        </section>

        {/* Status Alert - HU-01, HU-05 */}
        <section className="bg-primary p-6 rounded-[28px] flex items-center justify-between shadow-[0_10px_30px_rgba(43,238,108,0.25)] group active:scale-[0.99] transition-all">
          <div className="flex gap-4 items-start">
            <div className="size-10 rounded-full bg-[#0a120d]/10 flex items-center justify-center shrink-0">
               <span className="material-symbols-outlined text-[#0a120d] font-black">check_circle</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#0a120d] leading-none mb-2">Evolución estable</h3>
              <p className="text-[13px] font-medium text-[#0a120d]/70 leading-relaxed">Carga controlada en las últimas semanas</p>
            </div>
          </div>
          <div className="size-12 rounded-full bg-[#0a120d] flex items-center justify-center text-primary shadow-lg">
             <span className="material-symbols-outlined font-black">trending_up</span>
          </div>
        </section>

        {/* KPI Grid - HU-03 */}
        <section className="grid grid-cols-3 gap-3">
          <KPICard label="Sesiones" value="12" accent="text-primary" />
          <KPICard label="Carga Prom." value="450" accent="text-primary" />
          <KPICard label="Distancia" value="4.8km" accent="text-primary" />
        </section>

        {/* Trend Chart - HU-04 */}
        <section className="bg-[#152119] border border-white/5 rounded-[32px] p-6 shadow-2xl space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Tendencia de Carga</h3>
            <div className="flex items-center gap-1.5">
               <div className="size-2 rounded-full bg-primary"></div>
               <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Carga</span>
            </div>
          </div>
          
          <div className="relative h-40 w-full">
            {/* SVG Line Chart Mock */}
            <svg viewBox="0 0 400 150" className="w-full h-full overflow-visible">
               <defs>
                 <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                   <stop offset="0%" stopColor="#2bee6c" stopOpacity="0.4" />
                   <stop offset="100%" stopColor="#2bee6c" stopOpacity="0" />
                 </linearGradient>
               </defs>
               {/* Grid Lines */}
               <line x1="0" y1="140" x2="400" y2="140" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
               <line x1="0" y1="70" x2="400" y2="70" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
               <line x1="0" y1="0" x2="400" y2="0" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
               
               {/* Area under curve */}
               <path 
                 d="M0 100 Q 50 110, 100 80 T 200 80 T 300 100 T 400 40 L 400 150 L 0 150 Z" 
                 fill="url(#chartGradient)"
               />
               {/* Curve */}
               <path 
                 d="M0 100 Q 50 110, 100 80 T 200 80 T 300 100 T 400 40" 
                 fill="none" 
                 stroke="#2bee6c" 
                 strokeWidth="4" 
                 strokeLinecap="round"
                 className="drop-shadow-[0_0_8px_rgba(43,238,108,0.5)]"
               />
               {/* Current Point */}
               <circle cx="320" cy="90" r="5" fill="#2bee6c" className="animate-pulse" />
            </svg>
          </div>
        </section>

        {/* Info Interpretation - HU-05 */}
        <section className="bg-primary/5 border border-primary/10 p-5 rounded-2xl flex items-center gap-4">
           <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
             <span className="material-symbols-outlined text-[20px]">info</span>
           </div>
           <p className="text-[13px] font-bold text-white/90 leading-tight">
             Carga estable sin incrementos bruscos detectados.
           </p>
        </section>

        {/* Recent History - HU-06 */}
        <section className="space-y-6">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">Historial de Sesiones</h3>
            <button 
              onClick={onViewAllHistory}
              className="text-[11px] font-black text-primary uppercase tracking-widest hover:underline"
            >
              VER TODO
            </button>
          </div>

          <div className="space-y-3">
             <SessionCompactCard 
               title="Entrenamiento Táctico" 
               time="Hoy • 10:30 AM" 
               pts="480" 
               dist="5.2 km" 
               icon="fitness_center" 
               onClick={() => onSelectSession('s1')} 
             />
             <SessionCompactCard 
               title="Series de Velocidad" 
               time="Ayer • 09:15 AM" 
               pts="520" 
               dist="3.8 km" 
               icon="bolt" 
               onClick={() => onSelectSession('s2')} 
             />
             <SessionCompactCard 
               title="Partido Amistoso" 
               time="12 Oct • 16:00 PM" 
               pts="890" 
               dist="9.1 km" 
               icon="sports_soccer" 
               onClick={() => onSelectSession('s3')} 
             />
          </div>
        </section>
      </main>
    </div>
  );
};

const KPICard: React.FC<{ label: string; value: string; accent: string }> = ({ label, value, accent }) => (
  <div className="bg-[#152119] border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-lg">
    <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest mb-2 leading-none">{label}</p>
    <p className={`text-xl font-black ${accent} leading-none tracking-tight`}>{value}</p>
  </div>
);

const SessionCompactCard: React.FC<{ title: string; time: string; pts: string; dist: string; icon: string; onClick: () => void }> = ({ title, time, pts, dist, icon, onClick }) => (
  <div 
    onClick={onClick}
    className="bg-white/5 border border-white/5 rounded-2xl p-4 flex items-center justify-between active:bg-white/10 transition-all cursor-pointer group"
  >
    <div className="flex items-center gap-4">
      <div className="size-12 rounded-xl bg-white/5 flex items-center justify-center text-slate-500 group-hover:text-primary transition-colors">
        <span className="material-symbols-outlined text-[24px]">{icon}</span>
      </div>
      <div>
        <h4 className="font-bold text-white text-[15px] tracking-tight mb-0.5">{title}</h4>
        <p className="text-[11px] font-medium text-slate-500">{time}</p>
      </div>
    </div>
    <div className="text-right">
      <p className="text-sm font-black text-white">{pts} <span className="text-[9px] font-bold text-slate-600 uppercase tracking-tighter">pts</span></p>
      <p className="text-[11px] font-black text-primary">{dist}</p>
    </div>
  </div>
);

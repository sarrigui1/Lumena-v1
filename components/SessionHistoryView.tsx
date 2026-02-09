
import React, { useState } from 'react';

interface Session {
  id: string;
  title: string;
  type: 'PARTIDO' | 'ENTRENO' | 'RECUPERACIÓN';
  date: string;
  distance: string;
  icon: string;
}

const MOCK_SESSIONS: Session[] = [
  { id: 's1', title: 'Partido vs Real Madrid B', type: 'PARTIDO', date: '24 Oct, 2023', distance: '10.4km', icon: 'sports_soccer' },
  { id: 's2', title: 'Entrenamiento Táctico', type: 'ENTRENO', date: '22 Oct, 2023', distance: '5.2km', icon: 'sports_score' },
  { id: 's3', title: 'Entrenamiento Físico', type: 'ENTRENO', date: '20 Oct, 2023', distance: '6.8km', icon: 'fitness_center' },
  { id: 's4', title: 'Recuperación Activa', type: 'RECUPERACIÓN', date: '15 Oct, 2023', distance: '3.2km', icon: 'favorite' },
  { id: 's5', title: 'Partido vs Valencia Sub-19', type: 'PARTIDO', date: '12 Oct, 2023', distance: '9.1km', icon: 'sports_soccer' },
];

interface SessionHistoryViewProps {
  onBack: () => void;
  onSelectSession: (id: string) => void;
  isGlobal?: boolean;
}

export const SessionHistoryView: React.FC<SessionHistoryViewProps> = ({ onBack, onSelectSession, isGlobal = false }) => {
  const [activeFilter, setActiveFilter] = useState('Todo el tiempo');

  return (
    <div className="flex flex-col min-h-screen bg-[#0a120d] animate-in fade-in slide-in-from-right-4 duration-500">
      <header className="px-6 pt-8 pb-4 flex items-center sticky top-0 bg-[#0a120d]/80 backdrop-blur-md z-20 border-b border-white/5">
        <button 
          onClick={onBack}
          className="flex items-center justify-center size-10 rounded-full bg-white/5 border border-white/5 active:scale-90 transition-all"
        >
          <span className="material-symbols-outlined text-white">arrow_back</span>
        </button>
        <h1 className="flex-1 text-center text-lg font-bold text-white mr-4">
          {isGlobal ? 'Todas las Sesiones' : 'Sesiones de Carlos Martínez'}
        </h1>
        <div className="size-10 rounded-full overflow-hidden border border-white/10">
          <div className="size-full bg-gradient-to-br from-orange-300 to-orange-500"></div>
        </div>
      </header>

      <main className="flex-1 px-6 pt-6 pb-32">
        {/* Filters - HU-02 */}
        <section className="mb-10">
          <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 mb-4">Filtrar Historial</h3>
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {['Todo el tiempo', 'Último mes', 'Últimos 7 días'].map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`flex-shrink-0 px-6 py-3.5 rounded-full border text-[13px] font-bold transition-all ${
                  activeFilter === filter 
                    ? 'bg-primary border-primary text-[#0a120d]' 
                    : 'bg-white/5 border-white/10 text-slate-400'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </section>

        {/* List - HU-01, HU-03 */}
        <section className="space-y-6">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">Sesiones Recientes</h3>
            <span className="text-[11px] font-black text-primary uppercase tracking-widest">{MOCK_SESSIONS.length} Sesiones</span>
          </div>

          <div className="space-y-4">
            {MOCK_SESSIONS.map(session => (
              <div 
                key={session.id}
                onClick={() => onSelectSession(session.id)}
                className="bg-[#152119] border border-white/5 p-4 rounded-[28px] flex items-center justify-between group active:scale-[0.98] transition-all cursor-pointer shadow-xl"
              >
                <div className="flex items-center gap-5">
                  <div className={`size-14 rounded-2xl flex items-center justify-center ${
                    session.type === 'PARTIDO' ? 'bg-blue-500/10 text-blue-400' : 
                    session.type === 'ENTRENO' ? 'bg-primary/10 text-primary' : 
                    'bg-purple-500/10 text-purple-400'
                  }`}>
                    <span className="material-symbols-outlined text-[28px]">{session.icon}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="font-bold text-[16px] text-white tracking-tight">{session.title}</h4>
                      <span className={`text-[8px] font-black px-1.5 py-0.5 rounded-md border tracking-tighter ${
                        session.type === 'PARTIDO' ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' : 
                        session.type === 'ENTRENO' ? 'bg-primary/10 border-primary/30 text-primary' : 
                        'bg-purple-500/10 border-purple-500/30 text-purple-400'
                      }`}>
                        {session.type}
                      </span>
                    </div>
                    <p className="text-[12px] font-medium text-slate-500">
                      {session.date} • <span className="text-primary/70">{session.distance}</span>
                    </p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-slate-700 group-hover:text-white transition-colors">chevron_right</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

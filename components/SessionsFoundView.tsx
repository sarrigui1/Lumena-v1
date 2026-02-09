
import React, { useState } from 'react';

interface SessionsFoundViewProps {
  onBack: () => void;
  onDownload: () => void;
}

interface Session {
  id: string;
  date: string;
  duration: string;
  distance: string;
  isNew: boolean;
  selected: boolean;
}

const MOCK_SESSIONS: Session[] = [
  { id: '1', date: '12 Oct 2024', duration: '90 min', distance: '14.2 km', isNew: true, selected: true },
  { id: '2', date: '10 Oct 2024', duration: '45 min', distance: '6.8 km', isNew: true, selected: true },
  { id: '3', date: '08 Oct 2024', duration: '60 min', distance: '8.2 km', isNew: true, selected: true },
];

export const SessionsFoundView: React.FC<SessionsFoundViewProps> = ({ onBack, onDownload }) => {
  const [sessions, setSessions] = useState<Session[]>(MOCK_SESSIONS);

  const toggleSession = (id: string) => {
    setSessions(prev => prev.map(s => 
      s.id === id ? { ...s, selected: !s.selected } : s
    ));
  };

  const selectAll = () => {
    const allSelected = sessions.every(s => s.selected);
    setSessions(prev => prev.map(s => ({ ...s, selected: !allSelected })));
  };

  const selectedCount = sessions.filter(s => s.selected).length;

  return (
    <div className="flex flex-col min-h-screen bg-[#0a120d] animate-in fade-in slide-in-from-right-4 duration-500 pb-48">
      {/* Header - HU-SYNC-08 */}
      <header className="px-6 pt-8 pb-4 sticky top-0 bg-[#0a120d]/80 backdrop-blur-md z-20">
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={onBack}
            className="flex items-center justify-center size-10 rounded-full bg-white/5 hover:bg-white/10 active:scale-90 transition-all border border-white/5"
          >
            <span className="material-symbols-outlined text-white font-bold">chevron_left</span>
          </button>
          <div className="px-3 py-1.5 bg-[#152e1e] rounded-full border border-primary/20 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[16px] font-bold">bluetooth</span>
            <span className="text-[10px] font-black text-primary uppercase tracking-wider">CONECTADO</span>
          </div>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-white mb-1">Sesiones encontradas</h1>
        <p className="text-slate-500 text-sm font-medium">Sincronización completada vía Bluetooth</p>
      </header>

      {/* Sessions List - HU-SYNC-08, HU-SYNC-09, HU-SYNC-10 */}
      <main className="flex-1 px-6 mt-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-[17px] font-bold text-white/90">Disponibles para descargar</h2>
            <div className="size-6 rounded-full bg-[#1c3324] border border-primary/20 flex items-center justify-center text-[11px] font-black text-primary">
              {sessions.length}
            </div>
          </div>
          <button 
            onClick={selectAll}
            className="text-[13px] font-bold text-primary hover:underline underline-offset-4"
          >
            {sessions.every(s => s.selected) ? 'Deseleccionar todas' : 'Seleccionar todas'}
          </button>
        </div>

        <div className="space-y-4">
          {sessions.map(session => (
            <SessionCard 
              key={session.id} 
              session={session} 
              onToggle={() => toggleSession(session.id)} 
            />
          ))}
        </div>

        {/* Info Box - HU-SYNC-11 */}
        <div className="mt-8 p-5 rounded-2xl bg-[#0e1811] border border-primary/10 flex gap-4">
          <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
            <span className="material-symbols-outlined text-[20px]">info</span>
          </div>
          <p className="text-[13px] text-slate-400 leading-relaxed font-medium">
            Al descargar estas sesiones, los datos se guardarán localmente y podrás empezar el análisis de rendimiento de tus jugadores.
          </p>
        </div>
      </main>

      {/* Footer CTA - HU-SYNC-11 */}
      <div className="fixed bottom-[96px] left-0 right-0 p-6 bg-gradient-to-t from-[#0a120d] via-[#0a120d] to-transparent z-10">
        <button 
          onClick={onDownload}
          disabled={selectedCount === 0}
          className="w-full bg-primary text-[#0a120d] font-black text-lg py-4.5 rounded-2xl shadow-[0_8px_30px_rgba(43,238,108,0.25)] transition-all active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-40 disabled:grayscale"
        >
          <span className="material-symbols-outlined font-black">download</span>
          Descargar sesiones ({selectedCount})
        </button>
      </div>
      
      {/* iOS indicator spacer */}
      <div className="h-4"></div>
    </div>
  );
};

interface SessionCardProps {
  session: Session;
  onToggle: () => void;
}

const SessionCard: React.FC<SessionCardProps> = ({ session, onToggle }) => (
  <div 
    onClick={onToggle}
    className={`p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between cursor-pointer group ${
      session.selected 
        ? 'bg-[#152e1e]/40 border-primary/30 shadow-[0_4px_20px_rgba(0,0,0,0.3)]' 
        : 'bg-[#152119] border-white/5 active:scale-[0.98]'
    }`}
  >
    <div className="flex items-center gap-5">
      {/* Checkbox */}
      <div className={`size-6 rounded-lg border transition-all flex items-center justify-center ${
        session.selected 
          ? 'bg-primary border-primary' 
          : 'bg-white/5 border-white/20 group-hover:border-white/40'
      }`}>
        {session.selected && (
          <span className="material-symbols-outlined text-[#0a120d] text-[18px] font-black">check</span>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-white text-[17px] tracking-tight">{session.date}</h3>
          {session.isNew && (
            <span className="text-[9px] font-black px-1.5 py-0.5 bg-primary text-[#0a120d] rounded-md">
              NUEVA
            </span>
          )}
        </div>
        <div className="flex items-center gap-4 text-slate-500">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px]">schedule</span>
            <span className="text-[12px] font-bold">{session.duration}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px]">point_scan</span>
            <span className="text-[12px] font-bold">{session.distance}</span>
          </div>
        </div>
      </div>
    </div>

    {/* Status Indicator Dot */}
    <div className="flex flex-col items-center gap-2">
      <div className={`size-2.5 rounded-full ${session.selected ? 'bg-primary' : 'bg-white/20'}`}></div>
    </div>
  </div>
);

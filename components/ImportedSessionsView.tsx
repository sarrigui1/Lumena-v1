
import React, { useState } from 'react';

interface ImportedSessionsViewProps {
  onBack: () => void;
  onContinue: () => void;
}

interface ImportedSession {
  id: string;
  date: string;
  duration: string;
  type: string;
  selected: boolean;
}

const INITIAL_IMPORTED_SESSIONS: ImportedSession[] = [
  { id: '1', date: '12 Oct 2024', duration: '90 min', type: 'Full match', selected: true },
  { id: '2', date: '10 Oct 2024', duration: '45 min', type: 'Entrenamiento', selected: true },
  { id: '3', date: '08 Oct 2024', duration: '60 min', type: 'Recuperación', selected: true },
];

export const ImportedSessionsView: React.FC<ImportedSessionsViewProps> = ({ onBack, onContinue }) => {
  const [sessions, setSessions] = useState<ImportedSession[]>(INITIAL_IMPORTED_SESSIONS);

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
    <div className="flex flex-col min-h-screen bg-[#0a120d] animate-in fade-in duration-500 pb-56">
      {/* Header - Screen Step 4 */}
      <header className="px-6 pt-8 pb-4 sticky top-0 bg-[#0a120d]/80 backdrop-blur-md z-20">
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={onBack}
            className="flex items-center justify-center size-10 rounded-full bg-white/5 hover:bg-white/10 active:scale-90 transition-all border border-white/5"
          >
            <span className="material-symbols-outlined text-white font-bold">close</span>
          </button>
          <div className="px-3 py-1.5 bg-[#152e1e] rounded-full border border-primary/20 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[16px] font-bold">check_circle</span>
            <span className="text-[10px] font-black text-primary uppercase tracking-wider">IMPORTADO</span>
          </div>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Sesiones importadas</h1>
        <p className="text-slate-500 text-sm font-medium">Selecciona las sesiones para asociar a un jugador.</p>
      </header>

      {/* Main List */}
      <main className="flex-1 px-6 mt-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-[20px] font-bold text-white/90">Listas para asociar</h2>
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
            <div 
              key={session.id}
              onClick={() => toggleSession(session.id)}
              className={`p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between group cursor-pointer ${
                session.selected 
                  ? 'bg-[#152e1e]/30 border-primary/20' 
                  : 'bg-[#152119] border-white/5'
              }`}
            >
              <div className="flex items-center gap-5">
                {/* Custom Styled Checkbox matching screenshot */}
                <div className={`size-7 rounded-xl border-2 transition-all flex items-center justify-center shadow-lg ${
                  session.selected 
                    ? 'bg-gradient-to-br from-orange-200 to-orange-400 border-orange-300' 
                    : 'bg-white/5 border-white/10 group-hover:border-white/20'
                }`}>
                  {session.selected && (
                    <div className="size-full rounded-lg bg-[#0a120d]/5 border border-white/10"></div>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-white text-[17px] tracking-tight">{session.date}</h3>
                    <span className="text-[9px] font-black px-1.5 py-0.5 bg-primary/10 text-primary border border-primary/20 rounded-md">
                      IMPORTADA
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px]">schedule</span>
                      <span className="text-[12px] font-bold">{session.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px]">equalizer</span>
                      <span className="text-[12px] font-bold">{session.type}</span>
                    </div>
                  </div>
                </div>
              </div>

              <button className="text-slate-500 hover:text-white transition-colors">
                <span className="material-symbols-outlined text-[20px]">info</span>
              </button>
            </div>
          ))}
        </div>

        {/* Info Box - matching screenshot style */}
        <div className="mt-8 p-6 rounded-3xl bg-[#0e1811] border border-primary/20 flex gap-5">
          <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
            <span className="material-symbols-outlined text-[24px]">person_add</span>
          </div>
          <p className="text-[13px] text-slate-300 leading-relaxed font-medium">
            Las sesiones seleccionadas se encuentran listas en la aplicación. Ahora puedes asociarlas a un jugador para completar el análisis.
          </p>
        </div>
      </main>

      {/* Footer CTA */}
      <div className="fixed bottom-[96px] left-0 right-0 p-6 bg-gradient-to-t from-[#0a120d] via-[#0a120d] to-transparent z-10">
        <button 
          onClick={onContinue}
          disabled={selectedCount === 0}
          className="w-full bg-primary text-[#0a120d] font-black text-lg py-4.5 rounded-2xl shadow-[0_10px_40px_rgba(43,238,108,0.25)] transition-all active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-30 disabled:grayscale"
        >
          Continuar a asociación ({selectedCount})
          <span className="material-symbols-outlined font-black">chevron_right</span>
        </button>
      </div>
    </div>
  );
};

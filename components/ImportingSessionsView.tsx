
import React, { useState, useEffect, useMemo } from 'react';

interface ImportingSessionsViewProps {
  onBack: () => void;
  onFinish: () => void;
}

interface ImportingSession {
  id: string;
  date: string;
  time: string;
  type: string;
  status: 'COMPLETO' | 'FALLIDO' | 'IMPORTANDO';
  error?: string;
}

const INITIAL_IMPORTING_SESSIONS: ImportingSession[] = [
  { id: '1', date: '12 Oct, 2023', time: '10:30 AM', type: 'Entrenamiento matutino', status: 'COMPLETO' },
  { id: '2', date: '12 Oct, 2023', time: '09:15 AM', type: 'Error de lectura', status: 'FALLIDO', error: 'Error de lectura' },
  { id: '3', date: '11 Oct, 2023', time: '18:45 PM', type: 'Partido amistoso', status: 'IMPORTANDO' },
  { id: '4', date: '11 Oct, 2023', time: '16:00 PM', type: 'Recuperación', status: 'IMPORTANDO' },
  { id: '5', date: '10 Oct, 2023', time: '11:00 AM', type: 'Entrenamiento técnico', status: 'IMPORTANDO' },
];

export const ImportingSessionsView: React.FC<ImportingSessionsViewProps> = ({ onBack, onFinish }) => {
  const [sessions, setSessions] = useState<ImportingSession[]>(INITIAL_IMPORTING_SESSIONS);
  const [progress, setProgress] = useState(0);

  // HU-IMP-01: Progress simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setSessions(prev => {
        const next = [...prev];
        const firstImporting = next.find(s => s.status === 'IMPORTANDO');
        if (firstImporting) {
          firstImporting.status = 'COMPLETO';
          return next;
        }
        clearInterval(timer);
        return next;
      });
    }, 1500);

    return () => clearInterval(timer);
  }, []);

  const completedCount = useMemo(() => sessions.filter(s => s.status === 'COMPLETO').length, [sessions]);
  const failedCount = useMemo(() => sessions.filter(s => s.status === 'FALLIDO').length, [sessions]);
  const isFinished = useMemo(() => sessions.every(s => s.status !== 'IMPORTANDO'), [sessions]);

  useEffect(() => {
    setProgress((completedCount / sessions.length) * 100);
  }, [completedCount, sessions.length]);

  const handleRetry = (id: string) => {
    // HU-IMP-03: Retry specific session
    setSessions(prev => prev.map(s => 
      s.id === id ? { ...s, status: 'IMPORTANDO', error: undefined } : s
    ));
    
    // Simulate retry success after 1.2s
    setTimeout(() => {
      setSessions(prev => prev.map(s => 
        s.id === id ? { ...s, status: 'COMPLETO' } : s
      ));
    }, 1200);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0a120d] animate-in fade-in duration-500 pb-56">
      {/* Header - HU-IMP-01 */}
      <header className="px-6 pt-8 pb-4 sticky top-0 bg-[#0a120d]/80 backdrop-blur-md z-20">
        <div className="flex items-center mb-6">
          <button 
            onClick={onBack}
            className="flex items-center justify-center size-10 rounded-full bg-white/5 hover:bg-white/10 active:scale-90 transition-all border border-white/5"
          >
            <span className="material-symbols-outlined text-white font-bold">chevron_left</span>
          </button>
          <h1 className="flex-1 text-center text-xl font-bold tracking-tight text-white mr-10">Importando Sesiones</h1>
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-white mb-2 leading-tight">Organizando la información de la sesión</h2>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 mt-4">
        {/* Global Progress Card - HU-IMP-01 */}
        <div className="bg-[#121d15] border border-white/5 rounded-2xl p-6 mb-10 shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em]">Progreso de sincronización</span>
            <span className="text-[17px] font-black text-primary">{completedCount} DE {sessions.length}</span>
          </div>
          <div className="h-2.5 bg-white/5 rounded-full overflow-hidden mb-4">
            <div 
              className="h-full bg-primary transition-all duration-700 ease-out shadow-[0_0_12px_rgba(43,238,108,0.6)]" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-[11px] font-black text-primary uppercase tracking-[0.2em]">
            {completedCount} de {sessions.length} sesiones sincronizadas
          </p>
        </div>

        {/* Sessions List - HU-IMP-02 */}
        <section className="space-y-4">
          <h3 className="text-[13px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Sesiones detectadas</h3>
          <div className="space-y-3">
            {sessions.map(session => (
              <ImportingSessionItem 
                key={session.id} 
                session={session} 
                onRetry={() => handleRetry(session.id)}
              />
            ))}
          </div>
        </section>
      </main>

      {/* Fixed Footer Area - HU-IMP-04, HU-IMP-06, HU-IMP-07 */}
      <div className="fixed bottom-[96px] left-0 right-0 z-30">
        <div className="px-6 py-4 bg-gradient-to-t from-[#0a120d] via-[#0a120d] to-transparent space-y-4">
          {/* Action Button - HU-IMP-06 */}
          <button 
            onClick={onFinish}
            disabled={completedCount === 0}
            className={`w-full bg-primary text-[#0a120d] font-black text-lg py-4.5 rounded-2xl shadow-[0_10px_30px_rgba(43,238,108,0.2)] transition-all active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-30 disabled:grayscale disabled:shadow-none`}
          >
            Continuar a Asociación
            <span className="material-symbols-outlined font-black">arrow_forward</span>
          </button>

          {/* Warning Message - HU-IMP-04 */}
          <div className="bg-[#1b1c0e]/90 backdrop-blur-md border-t border-[#3d3a0f] p-3.5 flex items-center gap-4 rounded-xl">
            <div className="size-8 rounded-full bg-yellow-400/10 flex items-center justify-center text-yellow-400 shrink-0">
              <span className="material-symbols-outlined text-[20px] font-bold">warning</span>
            </div>
            <p className="text-[11px] font-bold text-yellow-400/90 leading-tight">
              No desconectes los sensores durante la sincronización para evitar pérdida de datos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ImportingSessionItemProps {
  session: ImportingSession;
  onRetry: () => void;
}

const ImportingSessionItem: React.FC<ImportingSessionItemProps> = ({ session, onRetry }) => {
  const isComplete = session.status === 'COMPLETO';
  const isFailed = session.status === 'FALLIDO';
  const isImporting = session.status === 'IMPORTANDO';

  return (
    <div className={`p-4 rounded-2xl border flex items-center justify-between transition-all duration-500 ${
      isFailed ? 'bg-[#1c0f0f] border-red-500/20' : 'bg-[#152119] border-white/5'
    }`}>
      <div className="flex items-center gap-4">
        <div className={`size-12 rounded-xl flex items-center justify-center transition-all ${
          isComplete ? 'bg-primary/10 text-primary' : 
          isFailed ? 'bg-red-500/10 text-red-500' : 
          'bg-white/5 text-slate-500'
        }`}>
          {isImporting ? (
            <div className="w-5 h-5 border-2 border-slate-500 border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <span className="material-symbols-outlined text-[24px]">
              {isComplete ? 'check_circle' : 'error'}
            </span>
          )}
        </div>
        <div className="overflow-hidden">
          <h4 className="font-bold text-white text-[15px] whitespace-nowrap">{session.date} - {session.time}</h4>
          <p className={`text-[12px] font-medium transition-colors ${isFailed ? 'text-red-400' : 'text-slate-500'}`}>
            {isFailed ? session.error : session.type}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        {isComplete && (
          <span className="text-[9px] font-black text-primary px-2.5 py-1.5 bg-primary/10 rounded-lg border border-primary/20 tracking-wider">
            COMPLETO
          </span>
        )}
        {isFailed && (
          <div className="flex flex-col items-end gap-2">
            <span className="text-[9px] font-black text-red-500 px-2 py-1 bg-red-500/10 rounded-md border border-red-500/20 uppercase tracking-tight">
              FALLIDO
            </span>
            <button 
              onClick={(e) => { e.stopPropagation(); onRetry(); }}
              className="text-[10px] font-black text-primary px-3 py-1 bg-[#152e1e] border border-primary/30 rounded-full active:scale-95 transition-all shadow-lg"
            >
              Reintentar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

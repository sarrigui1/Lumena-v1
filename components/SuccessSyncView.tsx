
import React from 'react';

interface SuccessSyncViewProps {
  onHome: () => void;
}

export const SuccessSyncView: React.FC<SuccessSyncViewProps> = ({ onHome }) => {
  return (
    <div className="flex flex-col min-h-screen bg-[#0a120d] items-center justify-center p-6 animate-in fade-in zoom-in duration-700">
      
      {/* Animated Success Icon - HU-SUC-01 */}
      <div className="relative mb-12">
        <div className="absolute inset-0 bg-primary/20 rounded-full blur-[40px] animate-pulse"></div>
        <div className="size-32 rounded-full bg-primary flex items-center justify-center relative shadow-[0_0_50px_rgba(43,238,108,0.4)]">
          <span className="material-symbols-outlined text-[#0a120d] text-[64px] font-black animate-in fade-in zoom-in duration-500 delay-200">
            check
          </span>
        </div>
      </div>

      {/* Main Success Message - HU-SUC-01, HU-SUC-02 */}
      <div className="text-center space-y-4 mb-14 max-w-[280px]">
        <h1 className="text-4xl font-bold tracking-tight text-white">¡Sincronización Exitosa!</h1>
        <p className="text-slate-500 text-[15px] font-medium leading-relaxed">
          Las sesiones se han vinculado correctamente al perfil de <span className="text-white font-bold italic">Carlos Rodríguez</span>.
        </p>
      </div>

      {/* Summary Card - HU-SUC-03, HU-SUC-04 */}
      <div className="w-full max-w-sm bg-[#121d15] border border-white/5 rounded-[32px] p-6 space-y-6 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[24px]">bar_chart</span>
          </div>
          <div>
            <p className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Estado</p>
            <p className="text-base font-bold text-white">3 Sesiones procesadas</p>
          </div>
        </div>

        <div className="h-px bg-white/5 w-full"></div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[24px]">schedule</span>
            </div>
            <div>
              <p className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Tiempo cargado</p>
              <p className="text-base font-bold text-white">Total: 195 min</p>
            </div>
          </div>
          {/* Animated Toggle indicator like in screenshot */}
          <div className="flex items-center gap-1 opacity-50">
             <div className="size-2.5 rounded-full bg-primary"></div>
             <div className="size-4 rounded-full bg-primary"></div>
             <div className="size-3 rounded-full bg-primary"></div>
          </div>
        </div>
      </div>

      {/* Footer CTA - HU-SUC-05 */}
      <div className="fixed bottom-[96px] left-0 right-0 p-6 z-10">
        <button 
          onClick={onHome}
          className="w-full bg-primary text-[#0a120d] font-black text-lg py-5 rounded-3xl shadow-[0_12px_40px_rgba(43,238,108,0.3)] transition-all active:scale-[0.98] flex items-center justify-center gap-3"
        >
          <span className="material-symbols-outlined font-black text-[24px]">home</span>
          Ir al Inicio
        </button>
      </div>
      
      {/* iOS indicator spacer */}
      <div className="h-4"></div>
    </div>
  );
};

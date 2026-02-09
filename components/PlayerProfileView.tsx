
import React from 'react';

interface PlayerProfileViewProps {
  onBack: () => void;
  onEdit: () => void;
  onViewHistory: () => void;
  onViewEvolution: () => void;
}

export const PlayerProfileView: React.FC<PlayerProfileViewProps> = ({ onBack, onEdit, onViewHistory, onViewEvolution }) => {
  return (
    <div className="flex flex-col min-h-screen bg-[#0a120d] animate-in fade-in duration-500 relative">
      <div className="h-[40vh] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-300 to-orange-600 opacity-60 blur-3xl scale-110"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a120d] to-transparent"></div>
        
        <div className="absolute top-8 left-0 right-0 px-6 flex items-center justify-between z-10">
          <button 
            onClick={onBack}
            className="size-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10 active:scale-90 transition-all"
          >
            <span className="material-symbols-outlined text-white">arrow_back</span>
          </button>
          <button className="size-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10 active:scale-90 transition-all">
            <span className="material-symbols-outlined text-white">more_horiz</span>
          </button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col gap-2">
          <h1 className="text-4xl font-bold tracking-tight text-white drop-shadow-lg">Carlos Martínez</h1>
          <div className="flex items-center gap-3">
            <span className="px-4 py-1.5 bg-primary/20 backdrop-blur-md border border-primary/20 rounded-lg text-primary text-[10px] font-black tracking-widest uppercase">
              SENIOR
            </span>
            <span className="text-white/60 text-sm font-bold">Dorsal 10</span>
          </div>
        </div>
      </div>

      <main className="flex-1 px-6 -mt-4 relative z-10 space-y-6 pb-20">
        <div className="bg-[#152119] border border-white/5 rounded-[32px] p-6 shadow-2xl">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-sm font-bold text-slate-400">Carga Promedio (Semanal)</h3>
            <span className="text-primary font-black text-sm uppercase tracking-wider">Óptima</span>
          </div>
          <div className="flex items-end justify-between gap-1.5 h-24 mb-2">
            {[25, 45, 100, 75, 40, 30, 40].map((h, i) => (
              <div key={i} className="flex-1 group flex flex-col items-center">
                <div 
                  className={`w-full rounded-xl transition-all duration-700 ${i === 2 ? 'bg-primary shadow-[0_0_20px_rgba(43,238,108,0.4)]' : i === 3 ? 'bg-primary/60' : 'bg-white/5 group-hover:bg-white/10'}`} 
                  style={{ height: `${h}%` }}
                ></div>
              </div>
            ))}
          </div>
          <div className="flex justify-between px-1">
            {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map(day => (
              <span key={day} className="text-[10px] font-black text-slate-600 w-full text-center">{day}</span>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <ProfileMenuButton 
            onClick={onEdit} 
            icon="edit_note" 
            title="Editar Datos del Jugador" 
            desc="Información personal y deportiva"
            accent="bg-primary/10 text-primary"
          />
          <ProfileMenuButton 
            onClick={onViewHistory} 
            icon="calendar_month" 
            title="Ver Historial de Sesiones" 
            desc="Entrenamientos y partidos pasados"
            accent="bg-blue-500/10 text-blue-400"
          />
          <ProfileMenuButton 
            onClick={onViewEvolution} 
            icon="query_stats" 
            title="Estadísticas Detalladas" 
            desc="Rendimiento físico y técnico"
            accent="bg-orange-500/10 text-orange-400"
          />
        </div>
      </main>
    </div>
  );
};

const ProfileMenuButton: React.FC<{ onClick: () => void; icon: string; title: string; desc: string; accent: string }> = ({ onClick, icon, title, desc, accent }) => (
  <button 
    onClick={onClick}
    className="w-full bg-[#152119] border border-white/5 p-4 rounded-3xl flex items-center justify-between active:scale-[0.98] transition-all group"
  >
    <div className="flex items-center gap-5">
      <div className={`size-14 rounded-2xl flex items-center justify-center ${accent}`}>
        <span className="material-symbols-outlined text-[28px]">{icon}</span>
      </div>
      <div className="text-left">
        <h4 className="font-bold text-[16px] text-white tracking-tight">{title}</h4>
        <p className="text-[11px] font-medium text-slate-500">{desc}</p>
      </div>
    </div>
    <span className="material-symbols-outlined text-slate-600 group-hover:text-white transition-colors">chevron_right</span>
  </button>
);

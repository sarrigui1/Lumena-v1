
import React from 'react';

interface Team {
  id: string;
  name: string;
  players: number;
  category: string;
  icon: string;
}

const MOCK_TEAMS: Team[] = [
  { id: '1', name: 'Senior Masculino', players: 22, category: 'Categoría A', icon: 'groups' },
  { id: '2', name: 'Sub-17 Promesas', players: 18, category: 'Categoría B', icon: 'sports_soccer' },
  { id: '3', name: 'Femenil Senior', players: 20, category: 'Liga Regional', icon: 'shield' },
];

interface ManageTeamsViewProps {
  onBack: () => void;
  onCreateTeam: () => void;
}

export const ManageTeamsView: React.FC<ManageTeamsViewProps> = ({ onBack, onCreateTeam }) => {
  return (
    <div className="flex flex-col min-h-screen bg-[#0a120d] animate-in fade-in slide-in-from-right-4 duration-500">
      <header className="px-6 pt-8 pb-6 flex items-center justify-between sticky top-0 bg-[#0a120d]/80 backdrop-blur-md z-20">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="flex items-center justify-center size-10 rounded-full bg-white/5 border border-white/5 active:scale-90 transition-all"
          >
            <span className="material-symbols-outlined text-white">arrow_back</span>
          </button>
          <h1 className="text-xl font-bold tracking-tight text-white">Gestionar Equipos</h1>
        </div>
        <button className="size-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center">
          <span className="material-symbols-outlined text-[24px]">account_circle</span>
        </button>
      </header>

      <main className="flex-1 px-6 mt-4 pb-32">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">Mis Equipos ({MOCK_TEAMS.length})</h3>
          <button className="text-primary text-[11px] font-black uppercase tracking-widest flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px]">filter_list</span>
            Filtrar
          </button>
        </div>

        <div className="space-y-4">
          {MOCK_TEAMS.map(team => (
            <div key={team.id} className="bg-[#152119] border border-white/5 rounded-3xl p-5 flex items-center justify-between group shadow-lg">
              <div className="flex items-center gap-5">
                <div className="size-14 rounded-2xl bg-[#1c3324] border border-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[30px]">{team.icon}</span>
                </div>
                <div>
                  <h4 className="font-bold text-[17px] text-white tracking-tight">{team.name}</h4>
                  <p className="text-[12px] font-medium text-slate-500">{team.players} Jugadores • {team.category}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="p-2 text-slate-500 hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-[20px]">edit</span>
                </button>
                <button className="p-2 text-slate-500 hover:text-red-500 transition-colors">
                  <span className="material-symbols-outlined text-[20px]">delete</span>
                </button>
              </div>
            </div>
          ))}

          {/* New Team Placeholder - HU-EQ-02 style */}
          <button 
            onClick={onCreateTeam}
            className="w-full py-10 rounded-[40px] border-2 border-dashed border-white/10 bg-white/[0.02] flex flex-col items-center justify-center gap-4 text-slate-500 hover:border-primary/20 hover:text-primary transition-all active:scale-[0.98] group"
          >
            <div className="size-14 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
              <span className="material-symbols-outlined text-[32px]">add</span>
            </div>
            <span className="text-[15px] font-bold">Crear Nuevo Equipo</span>
          </button>
        </div>
      </main>

      <div className="fixed bottom-10 left-0 right-0 p-6 flex justify-center z-10 pointer-events-none">
        <button 
          onClick={onCreateTeam}
          className="pointer-events-auto bg-primary text-[#0a120d] px-8 py-5 rounded-full font-black text-lg flex items-center gap-3 shadow-[0_15px_40px_rgba(43,238,108,0.3)] active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined font-black">add</span>
          Nuevo Equipo
        </button>
      </div>
    </div>
  );
};

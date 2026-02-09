
import React, { useState, useMemo } from 'react';

interface Player {
  id: string;
  name: string;
  category: string;
  dorsal: string;
  avatarColor: string;
}

const MOCK_PLAYERS: Player[] = [
  { id: '1', name: 'Carlos Martínez', category: 'Senior', dorsal: '10', avatarColor: 'from-orange-200 to-orange-400' },
  { id: '2', name: 'Alejandro Ruiz', category: 'Sub-17', dorsal: '7', avatarColor: 'from-yellow-100 to-yellow-300' },
  { id: '3', name: 'Mateo Silva', category: 'Senior', dorsal: '1', avatarColor: 'from-amber-200 to-amber-500' },
  { id: '4', name: 'Hugo Ferrer', category: 'Sub-17', dorsal: '4', avatarColor: 'from-cyan-100 to-cyan-300' },
  { id: '5', name: 'Dani López', category: 'Senior', dorsal: '11', avatarColor: 'from-rose-200 to-rose-400' },
];

const CATEGORIES = ['Todos', 'Sub-17', 'Senior', 'Femenil'];

interface AthletesTabProps {
  onManageTeams: () => void;
  onCreatePlayer: () => void;
  onPlayerSelect: (id: string) => void;
}

export const AthletesTab: React.FC<AthletesTabProps> = ({ onManageTeams, onCreatePlayer, onPlayerSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('Todos');

  const filteredPlayers = useMemo(() => {
    return MOCK_PLAYERS.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.dorsal.includes(searchQuery);
      const matchesFilter = activeFilter === 'Todos' || p.category === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, activeFilter]);

  return (
    <div className="flex flex-col min-h-screen animate-in fade-in slide-in-from-right-4 duration-500 px-6 pt-4 pb-20">
      <div className="flex flex-col gap-6 mb-8">
        <h2 className="text-3xl font-black text-white tracking-tight">Gestionar Jugadores</h2>
        
        <div className="relative">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">search</span>
          <input 
            type="text"
            placeholder="Buscar jugador..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 text-white placeholder:text-slate-600 focus:border-primary/50 transition-all outline-none"
          />
        </div>
      </div>

      <div className="space-y-6 mb-8">
        <div className="flex items-center justify-between">
          <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">Equipos</h3>
          <button 
            onClick={onManageTeams}
            className="flex items-center gap-2 px-4 py-2 bg-[#1c3324] border border-primary/20 rounded-xl text-primary text-[12px] font-black active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">settings</span>
            Gestionar Equipos
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-2 px-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`flex-shrink-0 px-6 py-3 rounded-full border text-[13px] font-bold transition-all ${
                activeFilter === cat 
                  ? 'bg-primary border-primary text-[#0a120d]' 
                  : 'bg-white/5 border-white/10 text-slate-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">Plantilla ({filteredPlayers.length})</h3>
        </div>

        <div className="space-y-3">
          {filteredPlayers.map(player => (
            <div 
              key={player.id}
              onClick={() => onPlayerSelect(player.id)}
              className="bg-[#152119] border border-white/5 p-4 rounded-2xl flex items-center justify-between active:scale-[0.98] transition-all group cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className={`size-14 rounded-xl bg-gradient-to-br ${player.avatarColor} shadow-lg border border-white/10`}></div>
                <div>
                  <h4 className="font-bold text-[17px] text-white tracking-tight">{player.name}</h4>
                  <p className="text-[12px] font-medium text-slate-500">{player.category} • Dorsal {player.dorsal}</p>
                </div>
              </div>
              <button className="text-slate-600 hover:text-white transition-colors">
                <span className="material-symbols-outlined">more_vert</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      <button 
        onClick={onCreatePlayer}
        className="fixed bottom-28 right-6 size-16 bg-primary text-[#0a120d] rounded-full shadow-[0_10px_30px_rgba(43,238,108,0.4)] flex items-center justify-center active:scale-90 transition-all z-20"
      >
        <span className="material-symbols-outlined text-[32px] font-black">add</span>
      </button>
    </div>
  );
};

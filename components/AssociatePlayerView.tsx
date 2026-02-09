
import React, { useState, useMemo } from 'react';

interface AssociatePlayerViewProps {
  onBack: () => void;
  onFinish: () => void;
}

interface Player {
  id: string;
  name: string;
  number: string;
  position: string;
  lastSession: string;
  avatar?: string;
}

const MOCK_PLAYERS: Player[] = [
  { id: '1', name: 'Carlos Rodríguez', number: '10', position: 'Delantero', lastSession: 'Ayer' },
  { id: '2', name: 'Mateo García', number: '05', position: 'Mediocentro', lastSession: '3 oct' },
  { id: '3', name: 'Santiago Peña', number: '01', position: 'Portero', lastSession: 'Sin sesiones este mes' },
];

export const AssociatePlayerView: React.FC<AssociatePlayerViewProps> = ({ onBack, onFinish }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const filteredPlayers = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return MOCK_PLAYERS.filter(p => 
      p.name.toLowerCase().includes(query) || p.number.includes(query)
    );
  }, [searchQuery]);

  const handleFinalize = () => {
    if (!selectedPlayerId) return;
    // HU-ASO-18: Confirm association logic could go here
    onFinish();
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0a120d] animate-in fade-in slide-in-from-bottom-4 duration-500 pb-48">
      {/* Header */}
      <header className="px-6 pt-8 pb-4 sticky top-0 bg-[#0a120d]/80 backdrop-blur-md z-20">
        <div className="flex items-center mb-6">
          <button 
            onClick={onBack}
            className="flex items-center justify-center size-10 rounded-full bg-white/5 hover:bg-white/10 active:scale-90 transition-all border border-white/5"
          >
            <span className="material-symbols-outlined text-white font-bold">chevron_left</span>
          </button>
        </div>
        
        <h1 className="text-3xl font-bold tracking-tight text-white mb-1">Asociar a Jugador</h1>
        <p className="text-slate-500 text-sm font-medium mb-6">Vincula los datos descargados a un perfil</p>
        
        {/* Session Summary Card - HU-ASO-11 */}
        <div className="bg-[#122418] border border-primary/10 rounded-3xl p-5 mb-8 flex items-center justify-between shadow-xl">
          <div className="flex items-center gap-4">
            <div className="size-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[26px]">bar_chart</span>
            </div>
            <div>
              <p className="text-[15px] font-bold text-white">3 sesiones seleccionadas</p>
              <p className="text-[12px] font-medium text-slate-400">Total: 195 min acumulados</p>
            </div>
          </div>
          <button 
            onClick={() => setShowDetails(true)}
            className="text-[13px] font-bold text-primary hover:underline underline-offset-4 px-3 py-2 rounded-xl bg-primary/5"
          >
            Ver detalles
          </button>
        </div>

        {/* Player Selection Section - HU-ASO-13 */}
        <div className="space-y-4">
          <h2 className="text-[20px] font-bold text-white/90">Selecciona el jugador</h2>
          <p className="text-[13px] font-medium text-slate-500 leading-tight">
            Elige quién realizó estas sesiones para sincronizar su perfil.
          </p>
          
          <div className="relative mt-4">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">search</span>
            <input 
              type="text"
              placeholder="Buscar por nombre o número..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 text-white placeholder:text-slate-600 focus:border-primary/50 transition-all"
            />
          </div>
        </div>
      </header>

      {/* Player List - HU-ASO-14, HU-ASO-15 */}
      <main className="flex-1 px-6 mt-2">
        <div className="space-y-3">
          {filteredPlayers.map(player => (
            <div 
              key={player.id}
              onClick={() => setSelectedPlayerId(player.id)}
              className={`p-4 rounded-3xl border transition-all duration-300 flex items-center justify-between cursor-pointer ${
                selectedPlayerId === player.id 
                  ? 'bg-[#152e1e]/40 border-primary/20' 
                  : 'bg-[#152119] border-white/5'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="size-14 rounded-full bg-slate-700/50 flex items-center justify-center text-white/20">
                    <span className="material-symbols-outlined text-[32px]">person</span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 size-6 rounded-full bg-primary flex items-center justify-center text-[10px] font-black text-[#0a120d] border-2 border-[#152119]">
                    {player.number}
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-[17px] text-white tracking-tight">{player.name}</h3>
                  <p className="text-[12px] font-medium text-slate-500">
                    {player.position} • Última sesión: {player.lastSession}
                  </p>
                </div>
              </div>
              
              <div className={`size-6 rounded-full border-2 transition-all flex items-center justify-center ${
                selectedPlayerId === player.id 
                  ? 'border-orange-300 bg-gradient-to-br from-orange-200 to-orange-400' 
                  : 'border-white/20'
              }`}>
                {selectedPlayerId === player.id && <div className="size-2 rounded-full bg-[#0a120d]/20"></div>}
              </div>
            </div>
          ))}

          {/* New Player Button - HU-ASO-16 */}
          <button className="w-full py-5 rounded-3xl border-2 border-dashed border-white/10 flex items-center justify-center gap-3 text-slate-400 hover:border-white/20 transition-all active:scale-[0.98]">
            <span className="material-symbols-outlined text-[20px]">person_add</span>
            <span className="text-[15px] font-bold">Nuevo jugador</span>
          </button>
        </div>
      </main>

      {/* Footer CTA - HU-ASO-17, HU-ASO-18 */}
      <div className="fixed bottom-[96px] left-0 right-0 p-6 bg-gradient-to-t from-[#0a120d] via-[#0a120d] to-transparent z-10">
        <button 
          onClick={handleFinalize}
          disabled={!selectedPlayerId}
          className="w-full bg-primary text-[#0a120d] font-black text-lg py-5 rounded-3xl shadow-[0_12px_40px_rgba(43,238,108,0.3)] transition-all active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-30 disabled:grayscale"
        >
          <span className="material-symbols-outlined font-black text-[24px]">sync</span>
          Finalizar y Sincronizar
        </button>
      </div>

      {/* Details Modal Mockup - HU-ASO-12 */}
      {showDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-[#0a120d]/90 backdrop-blur-md" onClick={() => setShowDetails(false)}></div>
          <div className="bg-[#152119] border border-white/10 w-full max-w-sm rounded-[32px] p-8 relative z-10 shadow-2xl">
            <h4 className="text-xl font-bold mb-6">Detalle de Sesiones</h4>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-sm py-2 border-b border-white/5">
                <span className="text-slate-400">12 Oct 2024</span>
                <span className="text-white font-bold">90 min • Match</span>
              </div>
              <div className="flex justify-between text-sm py-2 border-b border-white/5">
                <span className="text-slate-400">10 Oct 2024</span>
                <span className="text-white font-bold">45 min • Training</span>
              </div>
              <div className="flex justify-between text-sm py-2 border-b border-white/5">
                <span className="text-slate-400">08 Oct 2024</span>
                <span className="text-white font-bold">60 min • Recovery</span>
              </div>
            </div>
            <button 
              onClick={() => setShowDetails(false)}
              className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl font-bold hover:bg-white/10 transition-all"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

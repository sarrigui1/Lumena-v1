
import React from 'react';

interface SyncTabProps {
  onBack: () => void;
}

export const SyncTab: React.FC<SyncTabProps> = ({ onBack }) => {
  return (
    <div className="flex flex-col min-h-screen bg-background-dark animate-in fade-in slide-in-from-right-4 duration-500 pb-40">
      {/* Header */}
      <header className="flex items-center px-4 pt-6 pb-4 bg-background-dark/80 backdrop-blur-md sticky top-0 z-20">
        <button 
          onClick={onBack}
          className="flex items-center justify-center size-10 rounded-full hover:bg-white/10 active:scale-90 transition-all"
        >
          <span className="material-symbols-outlined text-white font-bold">chevron_left</span>
        </button>
        <h1 className="flex-1 text-center text-xl font-bold tracking-tight">Sincronización</h1>
        <div className="size-10"></div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 mt-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-white/90">Chalecos detectados</h2>
          <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(43,238,108,0.8)]"></span>
        </div>

        <div className="space-y-3">
          <DeviceCard 
            id="#042" 
            bt="42:9A:FF:21" 
            status="LISTO" 
            signal={4} 
            active={false} 
          />
          <DeviceCard 
            id="#018" 
            bt="18:BC:C4:02" 
            status="LISTO" 
            signal={2} 
            active={false} 
          />
          <DeviceCard 
            id="#087" 
            bt="87:DE:11:90" 
            status="CONECTANDO..." 
            signal={3} 
            active={true} 
          />
        </div>

        <button className="mt-8 flex items-center justify-center gap-2 w-full py-3 text-sm font-medium text-white/60 hover:text-primary transition-colors active:scale-95">
          <span className="material-symbols-outlined text-lg">sync</span>
          Buscar Dispositivos
        </button>
      </main>

      {/* Footer Fixed Action */}
      <div className="fixed bottom-[96px] left-0 right-0 p-6 bg-background-dark/95 backdrop-blur-md space-y-4 border-t border-white/5 shadow-[0_-20px_40px_rgba(0,0,0,0.5)]">
        <div className="flex items-center justify-center mb-2">
          <span className="text-xs text-white/40 italic">3 chalecos encontrados</span>
        </div>
        
        <button className="w-full bg-primary hover:bg-primary/90 text-background-dark font-black text-lg py-4.5 rounded-2xl shadow-[0_8px_30px_rgba(43,238,108,0.2)] transition-all active:scale-[0.98] flex items-center justify-center gap-2">
          Conectar y Continuar
          <span className="material-symbols-outlined font-black">arrow_forward</span>
        </button>
        
        <button className="w-full py-2 text-white/40 text-[11px] font-bold uppercase tracking-[0.2em] hover:text-white transition-colors">
          Ayuda con la conexión
        </button>
      </div>
    </div>
  );
};

interface DeviceCardProps {
  id: string;
  bt: string;
  status: string;
  signal: number;
  active: boolean;
}

const DeviceCard: React.FC<DeviceCardProps> = ({ id, bt, status, signal, active }) => (
  <div className={`p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between group cursor-pointer ${
    active 
      ? 'bg-primary/5 border-primary/30' 
      : 'bg-card-dark border-white/5 active:scale-[0.98]'
  }`}>
    <div className="flex items-center gap-4">
      <div className={`size-12 rounded-xl flex items-center justify-center transition-colors ${
        active 
          ? 'bg-primary shadow-lg shadow-primary/20' 
          : 'bg-primary/10 border border-primary/20'
      }`}>
        <span className={`material-symbols-outlined text-[24px] ${
          active ? 'text-background-dark font-bold' : 'text-primary'
        }`}>
          app_registration
        </span>
      </div>
      <div>
        <h3 className="font-bold text-white text-sm tracking-tight">Chaleco {id}</h3>
        <p className="text-white/40 text-[11px] font-mono">BT: {bt}</p>
      </div>
    </div>

    <div className="flex items-center gap-3">
      <div className="flex items-end gap-0.5 h-4">
        {[1, 2, 3, 4].map(i => (
          <div 
            key={i} 
            className={`w-1 rounded-full transition-all ${
              i <= signal ? 'bg-primary' : 'bg-white/10'
            }`} 
            style={{ height: `${i * 25}%` }}
          />
        ))}
      </div>
      
      {status === "LISTO" ? (
        <span className="text-[10px] font-bold text-primary px-2 py-0.5 bg-primary/10 rounded-full border border-primary/20">
          LISTO
        </span>
      ) : (
        <span className="text-[10px] font-bold text-white/90 px-2 py-0.5 bg-white/10 rounded-full italic uppercase">
          {status}
        </span>
      )}
    </div>
  </div>
);

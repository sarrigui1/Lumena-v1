
import React, { useState } from 'react';
import { HomeTab } from './HomeTab';
import { AthletesTab } from './AthletesTab';
import { SyncTab } from './SyncTab';

interface DashboardViewProps {
  userEmail: string;
  onLogout: () => void;
}

export type TabType = 'inicio' | 'sincronizar' | 'jugadores' | 'sesiones';

export const DashboardView: React.FC<DashboardViewProps> = ({ userEmail, onLogout }) => {
  const [activeTab, setActiveTab] = useState<TabType>('inicio');

  return (
    <div className="min-h-screen bg-background-dark flex flex-col relative">
      {/* Top Header - Matches Screenshot (HU-DASH-01, HU-DASH-06) */}
      {activeTab !== 'sincronizar' && (
        <header className="sticky top-0 z-30 w-full bg-background-dark/80 backdrop-blur-md px-4 py-5 flex items-center justify-between border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="size-10 bg-[#152e1e] rounded-full flex items-center justify-center border border-primary/20">
              <span className="material-symbols-outlined text-primary text-[24px]">sports_soccer</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight">¡Hola, Entrenador!</h1>
          </div>
          <button 
            onClick={() => {}} // Navigate to profile in the future
            className="size-10 rounded-full bg-white/10 flex items-center justify-center border border-white/10 hover:bg-white/20 transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-[24px]">account_circle</span>
          </button>
        </header>
      )}

      {/* Main Tab Content */}
      <main className={`flex-1 overflow-y-auto ${activeTab === 'sincronizar' ? '' : 'pb-32'}`}>
        {activeTab === 'inicio' && <HomeTab onNavigate={setActiveTab} />}
        {activeTab === 'jugadores' && <AthletesTab userEmail={userEmail} />}
        {activeTab === 'sincronizar' && <SyncTab onBack={() => setActiveTab('inicio')} />}
        {activeTab === 'sesiones' && (
          <div className="flex flex-col items-center justify-center h-[60vh] text-slate-500 gap-4">
            <span className="material-symbols-outlined text-6xl opacity-20">history_edu</span>
            <p className="font-medium">Módulo de Sesiones</p>
            <button 
              onClick={() => setActiveTab('inicio')}
              className="text-primary text-sm font-bold hover:underline"
            >
              Volver al inicio
            </button>
          </div>
        )}
      </main>

      {/* Bottom Navigation (HU-DASH-05) */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-background-dark/95 backdrop-blur-lg border-t border-white/10 pb-8 pt-3 px-6 shadow-[0_-10px_30px_rgba(0,0,0,0.6)]">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <NavButton 
            active={activeTab === 'inicio'} 
            icon="home" 
            label="Inicio" 
            onClick={() => setActiveTab('inicio')} 
          />
          <NavButton 
            active={activeTab === 'sincronizar'} 
            icon="sync" 
            label="Sincronizar" 
            onClick={() => setActiveTab('sincronizar')} 
          />
          <NavButton 
            active={activeTab === 'jugadores'} 
            icon="groups" 
            label="Jugadores" 
            onClick={() => setActiveTab('jugadores')} 
          />
          <NavButton 
            active={activeTab === 'sesiones'} 
            icon="calendar_today" 
            label="Sesiones" 
            onClick={() => setActiveTab('sesiones')} 
          />
        </div>
      </nav>
    </div>
  );
};

const NavButton: React.FC<{ 
  active: boolean; 
  icon: string; 
  label: string; 
  onClick: () => void 
}> = ({ active, icon, label, onClick }) => (
  <button 
    onClick={onClick}
    className="flex flex-col items-center gap-1 group transition-all"
  >
    <span className={`material-symbols-outlined text-[26px] transition-all duration-300 ${
      active ? 'text-primary fill-[1]' : 'text-slate-500 group-active:scale-90'
    }`}>
      {icon}
    </span>
    <span className={`text-[10px] font-black tracking-wide transition-colors ${
      active ? 'text-primary' : 'text-slate-500'
    }`}>
      {label}
    </span>
  </button>
);

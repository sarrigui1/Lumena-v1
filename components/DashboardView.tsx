
import React, { useState } from 'react';
import { HomeTab } from './HomeTab';
import { AthletesTab } from './AthletesTab';
import { SyncTab } from './SyncTab';
import { ManageTeamsView } from './ManageTeamsView';
import { CreateTeamView } from './CreateTeamView';
import { CreatePlayerView } from './CreatePlayerView';
import { PlayerProfileView } from './PlayerProfileView';
import { SessionHistoryView } from './SessionHistoryView';
import { SessionAnalysisView } from './SessionAnalysisView';
import { HeatmapFullScreenView } from './HeatmapFullScreenView';
import { PlayerEvolutionView } from './PlayerEvolutionView';

interface DashboardViewProps {
  userEmail: string;
  onLogout: () => void;
}

export type TabType = 
  | 'inicio' 
  | 'sincronizar' 
  | 'jugadores' 
  | 'sesiones' 
  | 'gestionar-equipos' 
  | 'crear-equipo' 
  | 'crear-jugador' 
  | 'perfil-jugador'
  | 'historial-sesiones'
  | 'analisis-sesion'
  | 'heatmap-completo'
  | 'evolucion-jugador';

export const DashboardView: React.FC<DashboardViewProps> = ({ userEmail, onLogout }) => {
  const [activeTab, setActiveTab] = useState<TabType>('inicio');
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);

  const handlePlayerSelect = (id: string) => {
    setSelectedPlayerId(id);
    setActiveTab('perfil-jugador');
  };

  const handleSessionSelect = (sessionId: string) => {
    setSelectedSessionId(sessionId);
    setActiveTab('analisis-sesion');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'inicio':
        return <HomeTab onNavigate={setActiveTab} />;
      case 'jugadores':
        return <AthletesTab 
          onManageTeams={() => setActiveTab('gestionar-equipos')} 
          onCreatePlayer={() => setActiveTab('crear-jugador')}
          onPlayerSelect={handlePlayerSelect}
        />;
      case 'perfil-jugador':
        return <PlayerProfileView 
          onBack={() => setActiveTab('jugadores')} 
          onEdit={() => setActiveTab('crear-jugador')}
          onViewHistory={() => setActiveTab('historial-sesiones')}
          onViewEvolution={() => setActiveTab('evolucion-jugador')}
        />;
      case 'historial-sesiones':
        return <SessionHistoryView 
          onBack={() => setActiveTab('perfil-jugador')} 
          onSelectSession={handleSessionSelect}
        />;
      case 'evolucion-jugador':
        return <PlayerEvolutionView 
          onBack={() => setActiveTab('perfil-jugador')}
          onSelectSession={handleSessionSelect}
          onViewAllHistory={() => setActiveTab('historial-sesiones')}
        />;
      case 'analisis-sesion':
        return <SessionAnalysisView 
          onBack={() => setActiveTab('historial-sesiones')} 
          onViewHeatmap={() => setActiveTab('heatmap-completo')}
        />;
      case 'heatmap-completo':
        return <HeatmapFullScreenView onBack={() => setActiveTab('analisis-sesion')} />;
      case 'gestionar-equipos':
        return <ManageTeamsView 
          onBack={() => setActiveTab('jugadores')} 
          onCreateTeam={() => setActiveTab('crear-equipo')} 
        />;
      case 'crear-equipo':
        return <CreateTeamView onBack={() => setActiveTab('gestionar-equipos')} />;
      case 'crear-jugador':
        return <CreatePlayerView onBack={selectedPlayerId ? () => setActiveTab('perfil-jugador') : () => setActiveTab('jugadores')} isEdit={!!selectedPlayerId} />;
      case 'sincronizar':
        return <SyncTab onBack={() => setActiveTab('inicio')} />;
      case 'sesiones':
        return <SessionHistoryView onBack={() => setActiveTab('inicio')} onSelectSession={handleSessionSelect} isGlobal />;
      default:
        return <HomeTab onNavigate={setActiveTab} />;
    }
  };

  const noHeaderTabs: TabType[] = ['sincronizar', 'crear-equipo', 'crear-jugador', 'perfil-jugador', 'historial-sesiones', 'analisis-sesion', 'heatmap-completo', 'evolucion-jugador'];
  const noNavTabs: TabType[] = ['sincronizar', 'crear-equipo', 'crear-jugador', 'gestionar-equipos', 'perfil-jugador', 'historial-sesiones', 'analisis-sesion', 'heatmap-completo', 'evolucion-jugador'];

  const showHeader = !noHeaderTabs.includes(activeTab);
  const showNav = !noNavTabs.includes(activeTab);

  return (
    <div className="min-h-screen bg-background-dark flex flex-col relative">
      {showHeader && (
        <header className="sticky top-0 z-30 w-full bg-background-dark/80 backdrop-blur-md px-4 py-5 flex items-center justify-between border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="size-10 bg-[#152e1e] rounded-full flex items-center justify-center border border-primary/20">
              <span className="material-symbols-outlined text-primary text-[24px]">sports_soccer</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight">¡Hola, Entrenador!</h1>
          </div>
          <button className="size-10 rounded-full bg-white/10 flex items-center justify-center border border-white/10">
            <span className="material-symbols-outlined text-[24px]">account_circle</span>
          </button>
        </header>
      )}

      <main className={`flex-1 overflow-y-auto ${showNav ? 'pb-32' : ''}`}>
        {renderContent()}
      </main>

      {showNav && (
        <nav className="fixed bottom-0 left-0 right-0 z-40 bg-background-dark/95 backdrop-blur-lg border-t border-white/10 pb-8 pt-3 px-6 shadow-[0_-10px_30px_rgba(0,0,0,0.6)]">
          <div className="flex items-center justify-between max-w-md mx-auto">
            <NavButton active={activeTab === 'inicio'} icon="home" label="Panel" onClick={() => setActiveTab('inicio')} />
            <NavButton active={activeTab === 'evolucion-jugador' || activeTab === 'analisis-sesion'} icon="trending_up" label="Evolución" onClick={() => setActiveTab('sesiones')} />
            <NavButton active={activeTab === 'jugadores' || activeTab === 'perfil-jugador'} icon="groups" label="Equipo" onClick={() => setActiveTab('jugadores')} />
            <NavButton active={activeTab === 'sesiones'} icon="settings" label="Ajustes" onClick={() => setActiveTab('inicio')} />
          </div>
        </nav>
      )}
    </div>
  );
};

const NavButton: React.FC<{ active: boolean; icon: string; label: string; onClick: () => void }> = ({ active, icon, label, onClick }) => (
  <button onClick={onClick} className="flex flex-col items-center gap-1 group transition-all">
    <span className={`material-symbols-outlined text-[26px] transition-all duration-300 ${active ? 'text-primary fill-[1]' : 'text-slate-500 group-active:scale-90'}`}>
      {icon}
    </span>
    <span className={`text-[10px] font-black tracking-wide transition-colors ${active ? 'text-primary' : 'text-slate-500'}`}>
      {label}
    </span>
  </button>
);

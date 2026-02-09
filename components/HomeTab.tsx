
import React from 'react';
import { TabType } from './DashboardView';

interface HomeTabProps {
  onNavigate: (tab: TabType) => void;
}

export const HomeTab: React.FC<HomeTabProps> = ({ onNavigate }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-700 px-4 pt-4">
      {/* Device Sync Card (HU-DASH-01, HU-DASH-02) */}
      <section className="mt-4">
        <div className="bg-[#121d15] border border-white/5 rounded-2xl p-5 flex items-center justify-between shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="size-12 rounded-full bg-[#1c3324] flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[28px]">sync</span>
            </div>
            <div>
              <p className="text-[10px] text-slate-500 uppercase font-black tracking-[0.1em] mb-0.5">Dispositivos</p>
              <p className="text-base font-bold text-white leading-tight">Listo para sincronizar</p>
            </div>
          </div>
          <button 
            onClick={() => onNavigate('sincronizar')}
            className="bg-primary text-[#0a120d] px-5 py-2.5 rounded-xl font-black text-sm active:scale-95 transition-all flex items-center gap-1.5 shadow-[0_4px_15px_rgba(43,238,108,0.3)]"
          >
            Sincronizar
            <span className="material-symbols-outlined text-sm font-black">bolt</span>
          </button>
        </div>
      </section>

      {/* Sync History Section (HU-DASH-03) */}
      <section className="mt-10">
        <div className="flex items-center justify-between mb-5 px-1">
          <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Historial de Sincronizaciones</h3>
          <span className="text-[10px] bg-[#1a2a20] px-3 py-1.5 rounded-lg text-slate-400 font-bold uppercase tracking-tighter">Últimos 30 días</span>
        </div>
        
        <div className="flex flex-col gap-3">
          <HistoryItem month="OCT" day="24" count={12} time="Hoy, 09:45 AM" />
          <HistoryItem month="OCT" day="22" count={8} time="Martes, 18:20 PM" />
          <HistoryItem month="OCT" day="20" count={15} time="Domingo, 10:30 AM" />
        </div>
      </section>

      {/* Quick Actions Section (HU-DASH-04) */}
      <section className="mt-10 mb-10">
        <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 px-1 mb-5">Acciones Rápidas</h3>
        <div className="grid grid-cols-3 gap-4">
          <QuickAction 
            icon="sync" 
            label="Sincronizar" 
            onClick={() => onNavigate('sincronizar')} 
          />
          <QuickAction 
            icon="group" 
            label="Jugadores" 
            onClick={() => onNavigate('jugadores')} 
          />
          <QuickAction 
            icon="person_add" 
            label="Asociar" 
            onClick={() => {}} 
          />
        </div>
      </section>
    </div>
  );
};

const HistoryItem: React.FC<{ month: string; day: string; count: number; time: string }> = ({ month, day, count, time }) => {
  return (
    <div className="bg-[#121d15] border border-white/5 p-4 rounded-2xl flex items-center justify-between hover:bg-white/[0.03] transition-colors active:scale-[0.98] history-card-shadow">
      <div className="flex items-center gap-4">
        <div className="size-12 rounded-xl bg-[#1c3324] border border-primary/10 flex flex-col items-center justify-center text-primary shrink-0">
          <span className="text-[9px] font-black leading-none uppercase opacity-70 mb-0.5">{month}</span>
          <span className="text-xl font-black leading-none">{day}</span>
        </div>
        <div className="overflow-hidden">
          <p className="text-sm font-bold text-white truncate">{count} sesiones sincronizadas</p>
          <p className="text-xs text-slate-500 font-medium">{time}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <span className="text-xs font-bold text-primary uppercase tracking-tight">Exitoso</span>
        <span className="material-symbols-outlined text-[20px] text-primary fill-[1]">check_circle</span>
      </div>
    </div>
  );
};

const QuickAction: React.FC<{ icon: string; label: string; onClick: () => void }> = ({ icon, label, onClick }) => (
  <button 
    onClick={onClick}
    className="flex flex-col items-center justify-center gap-3 bg-[#121d15] border border-white/5 p-5 rounded-2xl active:bg-white/5 active:scale-95 transition-all group"
  >
    <div className="size-10 rounded-xl bg-[#1c3324] flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
      <span className="material-symbols-outlined text-[22px] font-bold">{icon}</span>
    </div>
    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{label}</span>
  </button>
);

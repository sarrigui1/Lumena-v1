
import React from 'react';

interface SessionAnalysisViewProps {
  onBack: () => void;
  onViewHeatmap: () => void;
}

export const SessionAnalysisView: React.FC<SessionAnalysisViewProps> = ({ onBack, onViewHeatmap }) => {
  return (
    <div className="flex flex-col min-h-screen bg-[#0a120d] animate-in fade-in zoom-in duration-500">
      {/* Header */}
      <header className="px-6 pt-8 pb-4 flex items-center justify-between sticky top-0 bg-[#0a120d]/90 backdrop-blur-md z-30">
        <button onClick={onBack} className="size-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center active:scale-90 transition-all">
          <span className="material-symbols-outlined text-white">arrow_back</span>
        </button>
        <h1 className="text-lg font-bold text-white tracking-tight">Análisis de Sesión</h1>
        <button className="size-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center active:scale-90 transition-all">
          <span className="material-symbols-outlined text-white">share</span>
        </button>
      </header>

      <main className="flex-1 px-6 pt-4 pb-32 space-y-8">
        {/* Player Snapshot - HU-04 */}
        <section className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="size-16 rounded-full bg-gradient-to-br from-orange-300 to-orange-500 border-2 border-primary shadow-lg"></div>
              <div className="absolute -bottom-1 -right-1 size-5 rounded-full bg-primary flex items-center justify-center border-2 border-[#0a120d]">
                <span className="material-symbols-outlined text-[10px] text-[#0a120d] font-black">check</span>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white leading-none mb-1">Lucas Silva</h2>
              <p className="text-xs font-medium text-slate-500">24 Oct, 2023</p>
            </div>
          </div>
          
          <div className="px-4 py-2 bg-[#1c3324] border border-primary/20 rounded-2xl flex flex-col items-end">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="material-symbols-outlined text-[14px] text-primary">trending_up</span>
              <span className="text-[10px] font-black text-primary uppercase tracking-widest">CARGA NORMAL</span>
            </div>
            <p className="text-[9px] font-medium text-primary/70">Dentro de los rangos habituales</p>
          </div>
        </section>

        {/* Metrics Grid - HU-04 */}
        <section className="grid grid-cols-2 gap-4">
          <MetricCard icon="bar_chart" label="CARGA" value="1,450" unit="u.a." />
          <MetricCard icon="location_on" label="DISTANCIA" value="8.4" unit="km" />
          <MetricCard icon="speed" label="VEL. MÁXIMA" value="32.1" unit="km/h" />
          <MetricCard icon="bolt" label="SPRINTS" value="12" unit="veces" />
        </section>

        {/* Comparative Summary - HU-06 */}
        <section className="bg-primary/5 border border-primary/10 p-5 rounded-3xl flex items-center justify-between shadow-inner">
           <div className="flex items-center gap-4">
             <span className="material-symbols-outlined text-primary text-[24px]">insights</span>
             <p className="text-sm font-bold text-white/90">12% más que su promedio semanal</p>
           </div>
           <span className="text-primary font-black text-sm">+12%</span>
        </section>

        {/* Intensity Distribution */}
        <section className="space-y-4">
          <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 px-1">Distribución de Intensidad</h3>
          <div className="bg-[#121d15] border border-white/5 rounded-[32px] p-6">
            {/* Multi-segment bar */}
            <div className="h-4 w-full flex rounded-full overflow-hidden mb-8">
              <div className="h-full bg-blue-500" style={{ width: '40%' }}></div>
              <div className="h-full bg-primary" style={{ width: '30%' }}></div>
              <div className="h-full bg-yellow-400" style={{ width: '20%' }}></div>
              <div className="h-full bg-red-500" style={{ width: '10%' }}></div>
            </div>
            
            <div className="grid grid-cols-2 gap-y-4 gap-x-6">
              <IntensityLabel color="bg-blue-500" label="Caminar" percent="40%" />
              <IntensityLabel color="bg-primary" label="Trote" percent="30%" />
              <IntensityLabel color="bg-yellow-400" label="Carrera" percent="20%" />
              <IntensityLabel color="bg-red-500" label="Sprint" percent="10%" />
            </div>
          </div>
        </section>

        {/* Heatmap Preview - HU-05 */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">Mapa de Calor</h3>
            <button 
              onClick={onViewHeatmap}
              className="text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-1 hover:underline"
            >
              AMPLIAR
              <span className="material-symbols-outlined text-[14px]">grid_view</span>
            </button>
          </div>
          
          <div 
            onClick={onViewHeatmap}
            className="aspect-[4/3] bg-[#0e1811] border border-white/10 rounded-[32px] overflow-hidden relative group cursor-pointer"
          >
            {/* Pitch Lines */}
            <div className="absolute inset-4 border-2 border-white/10 rounded-sm">
              <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-white/10"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-20 border-2 border-white/10 rounded-full"></div>
            </div>
            
            {/* Heat Gradients Mockup */}
            <div className="absolute top-1/4 right-1/4 size-32 bg-yellow-400/30 blur-3xl rounded-full"></div>
            <div className="absolute top-1/3 right-1/4 size-20 bg-orange-500/40 blur-2xl rounded-full"></div>
            <div className="absolute bottom-1/4 left-1/3 size-24 bg-orange-800/20 blur-3xl rounded-full"></div>
            
            <div className="absolute bottom-4 left-0 right-0 text-center">
               <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Predominio en el tercio final derecho</p>
            </div>
          </div>
        </section>

        {/* Export Action - HU-07 */}
        <button className="w-full h-18 bg-white/5 border border-white/10 rounded-[28px] flex items-center justify-center gap-3 text-white font-bold hover:bg-white/10 active:scale-95 transition-all shadow-xl">
          <span className="material-symbols-outlined">picture_as_pdf</span>
          Exportar Informe PDF
        </button>
      </main>
    </div>
  );
};

const MetricCard: React.FC<{ icon: string; label: string; value: string; unit: string }> = ({ icon, label, value, unit }) => (
  <div className="bg-[#152119] border border-white/5 rounded-3xl p-5 shadow-lg">
    <div className="flex items-center gap-2 mb-4">
      <span className="material-symbols-outlined text-slate-500 text-[18px]">{icon}</span>
      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</span>
    </div>
    <div className="flex items-baseline gap-1.5">
      <span className="text-2xl font-black text-white">{value}</span>
      <span className="text-xs font-bold text-slate-600">{unit}</span>
    </div>
  </div>
);

const IntensityLabel: React.FC<{ color: string; label: string; percent: string }> = ({ color, label, percent }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-3">
      <div className={`size-2.5 rounded-full ${color}`}></div>
      <span className="text-xs font-bold text-slate-300">{label}</span>
    </div>
    <span className="text-xs font-black text-white">{percent}</span>
  </div>
);

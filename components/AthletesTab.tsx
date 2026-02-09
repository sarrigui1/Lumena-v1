
import React, { useState, useEffect } from 'react';
import { AthleteStats, GeminiInsight } from '../types';
import { getPerformanceInsight } from '../services/geminiService';

const MOCK_ATHLETES: AthleteStats[] = [
  { id: '1', name: 'Marco Silva', speed: 92, stamina: 85, agility: 88, recovery: 78, performanceScore: 86 },
  { id: '2', name: 'Laura Ortiz', speed: 84, stamina: 95, agility: 82, recovery: 90, performanceScore: 88 },
  { id: '3', name: 'Julian Reyes', speed: 78, stamina: 70, agility: 94, recovery: 65, performanceScore: 77 },
];

interface AthletesTabProps {
  userEmail: string;
}

export const AthletesTab: React.FC<AthletesTabProps> = ({ userEmail }) => {
  const [selectedAthlete, setSelectedAthlete] = useState<AthleteStats>(MOCK_ATHLETES[0]);
  const [insight, setInsight] = useState<GeminiInsight | null>(null);
  const [loadingInsight, setLoadingInsight] = useState(false);

  const fetchInsight = async (athlete: AthleteStats) => {
    setLoadingInsight(true);
    try {
      const result = await getPerformanceInsight(athlete);
      setInsight(result);
    } catch (error) {
      console.error("Error fetching insight", error);
    } finally {
      setLoadingInsight(false);
    }
  };

  useEffect(() => {
    fetchInsight(selectedAthlete);
  }, [selectedAthlete.id]);

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500 p-4 space-y-6">
      <header>
        <h2 className="text-2xl font-bold">Mis Atletas</h2>
        <p className="text-slate-400 text-sm">Análisis de rendimiento avanzado por IA</p>
      </header>

      {/* Athlete Selection */}
      <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4">
        {MOCK_ATHLETES.map(athlete => (
          <button
            key={athlete.id}
            onClick={() => setSelectedAthlete(athlete)}
            className={`flex-shrink-0 px-6 py-4 rounded-2xl border transition-all ${
              selectedAthlete.id === athlete.id 
                ? 'bg-primary/10 border-primary text-primary' 
                : 'bg-white/5 border-white/10 text-slate-400'
            }`}
          >
            <p className="font-bold whitespace-nowrap">{athlete.name}</p>
            <p className="text-[10px] font-bold uppercase opacity-70">Score: {athlete.performanceScore}</p>
          </button>
        ))}
      </div>

      {/* Main Profile Card */}
      <div className="bg-[#193322] border border-white/10 rounded-3xl p-6 relative overflow-hidden group">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl group-hover:scale-125 transition-transform"></div>
        
        <div className="flex flex-col gap-6 relative z-10">
          <div className="flex items-center gap-5">
            <div className="size-20 rounded-2xl bg-slate-800 border-2 border-primary flex items-center justify-center text-3xl font-black text-primary shadow-lg">
               {selectedAthlete.name[0]}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold">{selectedAthlete.name}</h3>
              <p className="text-slate-400 text-xs font-medium">Delantero • 24 años • Pro</p>
              <div className="mt-3 flex items-center gap-3">
                <div className="px-3 py-1 rounded-full bg-background-dark/50 border border-white/10 text-[10px] font-black text-primary uppercase">Elite</div>
                <div className="text-[10px] font-black text-slate-500 uppercase">Est. 2024</div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center bg-background-dark/50 size-16 rounded-2xl border border-white/10">
              <span className="text-2xl font-black text-primary leading-none">{selectedAthlete.performanceScore}</span>
              <span className="text-[8px] uppercase tracking-widest text-slate-500 font-black mt-1">Total</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <StatMetric label="Velocidad" value={selectedAthlete.speed} />
            <StatMetric label="Resistencia" value={selectedAthlete.stamina} />
            <StatMetric label="Agilidad" value={selectedAthlete.agility} />
            <StatMetric label="Recuperación" value={selectedAthlete.recovery} />
          </div>
        </div>
      </div>

      {/* AI Insights Card */}
      <div className="bg-[#193322] border-2 border-primary/20 rounded-3xl p-6 relative overflow-hidden">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-primary/20 p-2 rounded-xl">
              <span className="material-symbols-outlined text-primary text-[20px] font-bold">psychology</span>
            </div>
            <h4 className="font-bold text-sm uppercase tracking-widest">Análisis IA Lumena</h4>
          </div>
          {loadingInsight && (
            <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          )}
        </div>

        {loadingInsight ? (
          <div className="space-y-4 animate-pulse">
            <div className="h-4 bg-white/5 rounded w-3/4"></div>
            <div className="h-4 bg-white/5 rounded w-full"></div>
            <div className="pt-6 space-y-2">
              <div className="h-10 bg-white/5 rounded-xl"></div>
              <div className="h-10 bg-white/5 rounded-xl"></div>
            </div>
          </div>
        ) : insight ? (
          <div className="space-y-6">
            <p className="text-slate-300 text-sm leading-relaxed font-medium italic">
              "{insight.analysis}"
            </p>
            
            <div className="space-y-3">
              <h5 className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-3">Estrategias de Mejora</h5>
              {insight.recommendations.map((rec, i) => (
                <div key={i} className="flex gap-4 bg-background-dark/30 p-4 rounded-2xl border border-white/5 text-sm group hover:border-primary/20 transition-colors">
                  <div className="size-6 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-xs font-black shrink-0">
                    {i + 1}
                  </div>
                  <span className="text-slate-300 leading-snug">{rec}</span>
                </div>
              ))}
            </div>

            <div className={`mt-4 py-3 px-4 rounded-xl text-center text-[10px] font-black uppercase tracking-widest border border-white/10 ${
              insight.priorityLevel === 'High' ? 'bg-red-500/10 text-red-500' : 
              insight.priorityLevel === 'Medium' ? 'bg-orange-500/10 text-orange-500' : 
              'bg-primary/10 text-primary'
            }`}>
              Nivel de Prioridad: {insight.priorityLevel === 'High' ? 'Crítico' : insight.priorityLevel === 'Medium' ? 'Importante' : 'Optimización'}
            </div>
          </div>
        ) : (
          <p className="text-slate-500 text-sm italic text-center py-10">Conectando con Lumena IA...</p>
        )}
      </div>

      <div className="bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 rounded-3xl p-6 text-center shadow-lg">
        <h4 className="font-bold text-primary mb-1">Informe Pro Semanal</h4>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-4">Exportar datos a PDF</p>
        <button className="w-full py-3.5 bg-primary text-background-dark rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-[1.02] transition-transform">
          Generar Informe Completo
        </button>
      </div>
    </div>
  );
};

const StatMetric: React.FC<{ label: string, value: number }> = ({ label, value }) => (
  <div className="space-y-2 bg-background-dark/30 p-4 rounded-2xl border border-white/5">
    <div className="flex justify-between items-end">
      <p className="text-[9px] uppercase tracking-widest text-slate-500 font-black">{label}</p>
      <span className="text-xs font-black text-primary">{value}</span>
    </div>
    <div className="h-1.5 bg-background-dark rounded-full overflow-hidden border border-white/5">
      <div 
        className="h-full bg-gradient-to-r from-primary/50 to-primary transition-all duration-1000 ease-out" 
        style={{ width: `${value}%` }}
      ></div>
    </div>
  </div>
);

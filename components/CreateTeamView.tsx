
import React from 'react';

interface CreateTeamViewProps {
  onBack: () => void;
}

export const CreateTeamView: React.FC<CreateTeamViewProps> = ({ onBack }) => {
  return (
    <div className="flex flex-col min-h-screen bg-[#0a120d] animate-in slide-in-from-bottom-6 duration-500">
      <header className="px-6 pt-8 pb-4 flex items-center sticky top-0 bg-[#0a120d] z-20">
        <button 
          onClick={onBack}
          className="flex items-center justify-center size-10 rounded-full hover:bg-white/5 transition-all"
        >
          <span className="material-symbols-outlined text-primary font-bold">chevron_left</span>
        </button>
        <h1 className="flex-1 text-center text-xl font-bold text-white mr-10">Crear Nuevo Equipo</h1>
      </header>

      <main className="flex-1 px-8 pt-10">
        <form className="space-y-10" onSubmit={(e) => { e.preventDefault(); onBack(); }}>
          
          {/* Shield Upload - HU-EQ-02 Style */}
          <div className="flex flex-col items-center gap-6">
            <div className="relative">
              <div className="size-32 rounded-[32px] border-2 border-dashed border-primary/40 bg-primary/5 flex items-center justify-center text-primary/40">
                <span className="material-symbols-outlined text-[48px]">shield</span>
              </div>
              <button className="absolute -bottom-2 -right-2 size-10 bg-primary text-[#0a120d] rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-all border-4 border-[#0a120d]">
                <span className="material-symbols-outlined text-[20px] font-black">photo_camera</span>
              </button>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold text-white mb-1">Escudo del Equipo</h3>
              <p className="text-[13px] font-medium text-slate-500">Sube el logo o una foto del grupo</p>
            </div>
          </div>

          <div className="space-y-8">
            {/* Team Name */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-primary ml-1">Nombre del Equipo</label>
              <div className="relative">
                <input 
                  type="text"
                  placeholder="Ej. Sub-15 A"
                  className="w-full h-16 bg-white/5 border border-white/10 rounded-2xl px-5 text-white placeholder:text-slate-700 focus:border-primary/50 transition-all outline-none"
                />
                <span className="material-symbols-outlined absolute right-5 top-1/2 -translate-y-1/2 text-slate-600 text-[20px]">edit</span>
              </div>
            </div>

            {/* Category Dropdown */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-primary ml-1">Categoría</label>
              <div className="relative">
                <select className="w-full h-16 bg-white/5 border border-white/10 rounded-2xl px-5 text-white placeholder:text-slate-700 appearance-none focus:border-primary/50 transition-all outline-none">
                  <option className="bg-background-dark">Selecciona una categoría</option>
                  <option className="bg-background-dark">Senior</option>
                  <option className="bg-background-dark">Sub-17</option>
                  <option className="bg-background-dark">Femenil</option>
                </select>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 size-8 bg-gradient-to-br from-white/10 to-transparent rounded-lg pointer-events-none"></div>
              </div>
            </div>

            {/* Season */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-primary ml-1">Temporada</label>
              <div className="relative">
                <input 
                  type="text"
                  placeholder="Ej. 2024 / 2025"
                  className="w-full h-16 bg-white/5 border border-white/10 rounded-2xl px-5 text-white placeholder:text-slate-700 focus:border-primary/50 transition-all outline-none"
                />
                <span className="material-symbols-outlined absolute right-5 top-1/2 -translate-y-1/2 text-slate-600 text-[20px]">calendar_today</span>
              </div>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full h-16 bg-primary text-[#0a120d] font-black text-lg rounded-[24px] flex items-center justify-center gap-3 shadow-[0_15px_40px_rgba(43,238,108,0.25)] active:scale-95 transition-all mt-10"
          >
            <span className="material-symbols-outlined font-black">save</span>
            Guardar Equipo
          </button>
        </form>
      </main>

      <div className="h-10"></div>
    </div>
  );
};

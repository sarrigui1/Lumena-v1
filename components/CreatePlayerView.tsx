
import React, { useState } from 'react';

interface CreatePlayerViewProps {
  onBack: () => void;
  isEdit?: boolean;
}

export const CreatePlayerView: React.FC<CreatePlayerViewProps> = ({ onBack, isEdit }) => {
  const [skillLevel, setSkillLevel] = useState('INTERMEDIO');

  return (
    <div className="flex flex-col min-h-screen bg-[#0a120d] animate-in slide-in-from-bottom-6 duration-500">
      <header className="px-6 pt-8 pb-4 flex items-center sticky top-0 bg-[#0a120d]/80 backdrop-blur-md z-20">
        <button 
          onClick={onBack}
          className="flex items-center justify-center size-12 rounded-full hover:bg-white/5 active:scale-90 transition-all bg-white/5 border border-white/5"
        >
          <span className="material-symbols-outlined text-white">arrow_back</span>
        </button>
        <h1 className="flex-1 text-center text-xl font-bold text-white mr-12">
          {isEdit ? 'Editar Datos del Jugador' : 'Añadir Nuevo Jugador'}
        </h1>
      </header>

      <main className="flex-1 px-8 pt-6 pb-32">
        <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); onBack(); }}>
          
          {/* Avatar Selection Section - HU-JG-06 */}
          <div className="flex flex-col items-center gap-4 mb-10">
            <div className="relative group">
              <div className="size-36 rounded-full bg-slate-800/50 border-4 border-white/5 flex items-center justify-center text-white/10 overflow-hidden relative">
                <span className="material-symbols-outlined text-[64px]">person</span>
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <span className="material-symbols-outlined text-white text-[32px]">cloud_upload</span>
                </div>
              </div>
              <button className="absolute bottom-1 right-1 size-12 bg-primary text-[#0a120d] rounded-full flex items-center justify-center border-4 border-[#0a120d] shadow-2xl active:scale-90 transition-all z-10">
                <span className="material-symbols-outlined text-[24px] font-black">photo_camera</span>
              </button>
            </div>
            <p className="text-[11px] font-black text-primary uppercase tracking-[0.2em]">Subir foto de perfil</p>
          </div>

          {/* Form Fields - HU-JG-05 */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[12px] font-black text-slate-500 uppercase tracking-widest ml-1">Nombre Completo</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-slate-500">badge</span>
                <input 
                  type="text"
                  placeholder="Ej. Juan Pérez"
                  className="w-full h-16 bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 text-white placeholder:text-slate-700 focus:border-primary/50 transition-all outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[12px] font-black text-slate-500 uppercase tracking-widest ml-1">Equipo</label>
                <div className="relative">
                  <select className="w-full h-16 bg-white/5 border border-white/10 rounded-2xl px-5 text-white appearance-none focus:border-primary/50 outline-none">
                    <option className="bg-[#152119]">Seleccionar</option>
                    <option className="bg-[#152119]">Senior</option>
                    <option className="bg-[#152119]">Sub-17</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">expand_more</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[12px] font-black text-slate-500 uppercase tracking-widest ml-1">Dorsal</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 text-[20px]">tag</span>
                  <input 
                    type="number"
                    placeholder="10"
                    className="w-full h-16 bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 text-white focus:border-primary/50 outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[12px] font-black text-slate-500 uppercase tracking-widest ml-1">Posición en el campo</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-slate-500">sports_soccer</span>
                <select className="w-full h-16 bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 text-white appearance-none focus:border-primary/50 outline-none">
                  <option className="bg-[#152119]">Selecciona una posición</option>
                  <option className="bg-[#152119]">Portero</option>
                  <option className="bg-[#152119]">Defensa Central</option>
                  <option className="bg-[#152119]">Mediocampista</option>
                  <option className="bg-[#152119]">Delantero</option>
                </select>
                <span className="material-symbols-outlined absolute right-5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">expand_more</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[12px] font-black text-slate-500 uppercase tracking-widest ml-1">Fecha de Nacimiento</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-slate-500">calendar_today</span>
                <input 
                  type="date"
                  className="w-full h-16 bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 text-white focus:border-primary/50 outline-none block"
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[12px] font-black text-slate-500 uppercase tracking-widest ml-1">Nivel de Habilidad</label>
              <div className="flex gap-2">
                {['PRINCIPIANTE', 'INTERMEDIO', 'PRO'].map(level => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setSkillLevel(level)}
                    className={`flex-1 py-3.5 rounded-xl border text-[11px] font-black tracking-widest transition-all ${
                      skillLevel === level 
                        ? 'bg-primary border-primary text-[#0a120d]' 
                        : 'bg-white/5 border-white/10 text-slate-500'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action Button - HU-JG-07 */}
          <button 
            type="submit"
            className="w-full h-18 bg-primary text-[#0a120d] font-black text-lg rounded-[28px] flex items-center justify-center gap-3 shadow-[0_15px_40px_rgba(43,238,108,0.25)] active:scale-[0.98] transition-all mt-10"
          >
            <span className="material-symbols-outlined font-black">person_add</span>
            Guardar Jugador
          </button>
        </form>
      </main>
    </div>
  );
};

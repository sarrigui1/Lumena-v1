
import React, { useState, useMemo } from 'react';

interface LoginViewProps {
  onLogin: (email: string) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('entrenador@lumena.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Simple email validation regex
  const isEmailValid = useMemo(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }, [email]);

  const isFormValid = isEmailValid && password.length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || isLoading) return;

    setIsLoading(true);
    // Simulate API delay as per HU-LOGIN-01
    setTimeout(() => {
      onLogin(email);
      setIsLoading(false);
    }, 1200);
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center p-8 bg-[#0a120d] overflow-hidden font-display">
      {/* Radial Glow Effect behind the logo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-[400px] flex flex-col items-center z-10 animate-in fade-in zoom-in duration-1000">
        
        {/* Logo Section - Matches Screenshot Exactly */}
        <div className="mb-14 flex flex-col items-center text-center">
          <div className="bg-primary p-4 rounded-2xl shadow-[0_0_40px_rgba(43,238,108,0.25)] mb-6">
            <span className="material-symbols-outlined text-[#0a120d] text-4xl block font-bold">
              sports_soccer
            </span>
          </div>
          <h1 className="text-white text-4xl font-bold tracking-tight mb-2">Lumena</h1>
          <p className="text-primary text-[11px] font-black uppercase tracking-[0.4em]">
            Rendimiento Elite
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="w-full space-y-6">
          {/* Email Field */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-300 ml-1">Correo electrónico</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                <span className="material-symbols-outlined text-[20px]">mail</span>
              </div>
              <input 
                className="w-full h-16 pl-12 pr-4 rounded-2xl border border-white/10 bg-white/5 text-white placeholder:text-slate-600 focus:border-primary/50 focus:ring-0 transition-all outline-none" 
                placeholder="entrenador@lumena.com" 
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Password Field - Includes HU-LOGIN-02 toggle */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-300 ml-1">Contraseña</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                <span className="material-symbols-outlined text-[20px]">lock</span>
              </div>
              <input 
                className="w-full h-16 pl-12 pr-12 rounded-2xl border border-white/10 bg-white/5 text-white placeholder:text-slate-600 focus:border-primary/50 focus:ring-0 transition-all outline-none" 
                placeholder="••••••••" 
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button 
                type="button"
                tabIndex={-1}
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined text-[22px]">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
            {/* Forgot Password link - HU-LOGIN-03 */}
            <div className="flex justify-end pr-1">
              <button 
                type="button"
                className="text-xs font-semibold text-slate-500 hover:text-primary transition-colors py-1"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>
          </div>

          {/* Action Button - HU-LOGIN-01 logic */}
          <div className="pt-6">
            <button 
              type="submit"
              disabled={!isFormValid || isLoading}
              className={`w-full h-16 bg-primary text-background-dark font-black text-lg rounded-2xl shadow-[0_10px_30px_rgba(43,238,108,0.2)] hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:grayscale disabled:hover:scale-100 ${isLoading ? 'cursor-wait' : ''}`}
            >
              {isLoading ? (
                <div className="w-6 h-6 border-3 border-background-dark border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  Entrar
                  <span className="material-symbols-outlined font-black">arrow_forward</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Footer Section */}
        <div className="mt-14 text-center">
          <p className="text-slate-400 text-sm font-medium">
            ¿No tienes cuenta? 
            <button className="text-primary font-bold hover:underline decoration-2 underline-offset-4 transition-all ml-1.5">
              Registrarse
            </button>
          </p>
        </div>
      </div>
      
      {/* iOS Bottom Indicator Mockup */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/10 rounded-full"></div>
    </div>
  );
};

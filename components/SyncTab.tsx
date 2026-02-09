
import React, { useState, useEffect } from 'react';
import { SessionsFoundView } from './SessionsFoundView';
import { ImportingSessionsView } from './ImportingSessionsView';
import { ImportedSessionsView } from './ImportedSessionsView';
import { AssociatePlayerView } from './AssociatePlayerView';
import { SuccessSyncView } from './SuccessSyncView';

interface SyncTabProps {
  onBack: () => void;
}

export type SyncStep = 'device-list' | 'sessions-found' | 'importing' | 'imported-sessions' | 'associate-player' | 'success';

interface Device {
  id: string;
  bt: string;
  status: 'LISTO' | 'CONECTANDO...' | 'CONECTADO';
  signal: number;
}

const INITIAL_DEVICES: Device[] = [
  { id: '#042', bt: '42:9A:FF:21', status: 'LISTO', signal: 4 },
  { id: '#018', bt: '18:BC:C4:02', status: 'LISTO', signal: 2 },
  { id: '#087', bt: '87:DE:11:90', status: 'LISTO', signal: 3 },
];

export const SyncTab: React.FC<SyncTabProps> = ({ onBack }) => {
  const [step, setStep] = useState<SyncStep>('device-list');
  const [devices, setDevices] = useState<Device[]>(INITIAL_DEVICES);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsScanning(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleSelect = (id: string) => {
    setSelectedId(id);
    setDevices(prev => prev.map(d => ({
      ...d,
      status: d.id === id ? 'CONECTANDO...' : 'LISTO'
    })));

    setTimeout(() => {
      setDevices(prev => prev.map(d => ({
        ...d,
        status: d.id === id ? 'CONECTADO' : 'LISTO'
      })));
    }, 2000);
  };

  const handleRescan = () => {
    setIsScanning(true);
    setSelectedId(null);
    setDevices(INITIAL_DEVICES);
    setTimeout(() => setIsScanning(false), 2000);
  };

  const anyConnected = devices.some(d => d.status === 'CONECTADO');

  if (step === 'success') {
    return <SuccessSyncView onHome={onBack} />;
  }

  if (step === 'associate-player') {
    return <AssociatePlayerView onBack={() => setStep('imported-sessions')} onFinish={() => setStep('success')} />;
  }

  if (step === 'imported-sessions') {
    return <ImportedSessionsView onBack={() => setStep('importing')} onContinue={() => setStep('associate-player')} />;
  }

  if (step === 'importing') {
    return <ImportingSessionsView onBack={() => setStep('sessions-found')} onFinish={() => setStep('imported-sessions')} />;
  }

  if (step === 'sessions-found') {
    return (
      <SessionsFoundView 
        onBack={() => setStep('device-list')} 
        onDownload={() => setStep('importing')}
      />
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#0a120d] animate-in fade-in slide-in-from-right-4 duration-500 pb-48">
      <header className="flex items-center px-4 pt-8 pb-4 bg-[#0a120d]/80 backdrop-blur-md sticky top-0 z-20">
        <button 
          onClick={onBack}
          className="flex items-center justify-center size-10 rounded-full hover:bg-white/10 active:scale-90 transition-all"
        >
          <span className="material-symbols-outlined text-white font-bold">chevron_left</span>
        </button>
        <h1 className="flex-1 text-center text-xl font-bold tracking-tight text-white mr-10">Sincronización</h1>
      </header>

      <main className="flex-1 px-6 mt-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[17px] font-bold text-white/90">Chalecos detectados</h2>
          {isScanning && (
            <span className="flex h-2.5 w-2.5 rounded-full bg-primary animate-pulse shadow-[0_0_12px_rgba(43,238,108,0.9)]"></span>
          )}
        </div>

        <div className="space-y-4">
          {devices.map((device) => (
            <DeviceCard 
              key={device.id}
              device={device}
              isSelected={selectedId === device.id}
              onSelect={() => handleSelect(device.id)}
            />
          ))}
        </div>

        <button 
          onClick={handleRescan}
          className="mt-10 flex items-center justify-center gap-3 w-full py-4 text-sm font-bold text-white/50 hover:text-primary transition-all active:scale-95 group"
        >
          <span className={`material-symbols-outlined text-xl ${isScanning ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`}>
            sync
          </span>
          Buscar Dispositivos
        </button>
      </main>

      <div className="fixed bottom-[96px] left-0 right-0 p-6 bg-gradient-to-t from-[#0a120d] via-[#0a120d] to-transparent space-y-4 border-t border-white/5 shadow-[0_-15px_40px_rgba(0,0,0,0.6)]">
        <div className="flex items-center justify-center mb-1">
          <span className="text-[13px] text-white/40 italic font-medium">
            {devices.length} chalecos encontrados
          </span>
        </div>
        
        <button 
          onClick={() => setStep('sessions-found')}
          disabled={!anyConnected}
          className={`w-full bg-primary text-[#0a120d] font-black text-lg py-4.5 rounded-2xl shadow-[0_8px_30px_rgba(43,238,108,0.25)] transition-all active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-40 disabled:grayscale disabled:shadow-none`}
        >
          Conectar y Continuar
          <span className="material-symbols-outlined font-black">arrow_forward</span>
        </button>
        
        <button className="w-full py-2 text-white/40 text-[11px] font-black uppercase tracking-[0.2em] hover:text-white transition-colors">
          AYUDA CON LA CONEXIÓN
        </button>
      </div>
    </div>
  );
};

interface DeviceCardProps {
  device: Device;
  isSelected: boolean;
  onSelect: () => void;
}

const DeviceCard: React.FC<DeviceCardProps> = ({ device, isSelected, onSelect }) => {
  const isConnecting = device.status === 'CONECTANDO...';
  const isConnected = device.status === 'CONECTADO';

  return (
    <div 
      onClick={onSelect}
      className={`p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between group cursor-pointer ${
        isConnecting || isConnected
          ? 'bg-primary/5 border-primary/40 shadow-[0_0_25px_rgba(43,238,108,0.08)]' 
          : 'bg-[#152119] border-white/5 active:scale-[0.98] hover:border-white/10'
      }`}
    >
      <div className="flex items-center gap-4">
        <div className={`size-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
          isConnecting || isConnected
            ? 'bg-primary shadow-lg shadow-primary/20 scale-105' 
            : 'bg-[#1c3324] border border-primary/20'
        }`}>
          <span className={`material-symbols-outlined text-[30px] ${
            isConnecting || isConnected ? 'text-[#0a120d] font-bold' : 'text-primary'
          }`}>
            apps
          </span>
        </div>
        <div>
          <h3 className="font-bold text-white text-[15px] tracking-tight">Chaleco {device.id}</h3>
          <p className="text-white/40 text-[11px] font-mono mt-0.5">BT: {device.bt}</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-end gap-1 h-5 mb-1">
          {[1, 2, 3, 4].map(i => (
            <div 
              key={i} 
              className={`w-1 rounded-full transition-all duration-500 ${
                i <= device.signal ? 'bg-primary' : 'bg-white/10'
              }`} 
              style={{ height: `${i * 25}%` }}
            />
          ))}
        </div>
        
        <div className="min-w-[80px] flex justify-end">
          {device.status === "LISTO" ? (
            <span className="text-[10px] font-black text-primary px-3 py-1.5 bg-primary/10 rounded-full border border-primary/20 tracking-wider">
              LISTO
            </span>
          ) : (
            <span className="text-[10px] font-black text-white/90 px-3 py-1.5 bg-white/10 rounded-full italic uppercase tracking-wider whitespace-nowrap">
              {device.status}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

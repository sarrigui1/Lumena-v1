
import React, { useState } from 'react';
import { LoginView } from './components/LoginView';
import { DashboardView } from './components/DashboardView';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const handleLogin = (email: string) => {
    setUserEmail(email);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserEmail('');
  };

  return (
    <div className="min-h-screen bg-pitch-gradient text-white font-display">
      {!isAuthenticated ? (
        <LoginView onLogin={handleLogin} />
      ) : (
        <DashboardView userEmail={userEmail} onLogout={handleLogout} />
      )}
    </div>
  );
};

export default App;

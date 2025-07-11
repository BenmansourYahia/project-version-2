import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTheme } from './hooks/useTheme';
import Dashboard from './components/Dashboard/Dashboard';
import Magasins from './components/magasins/Magasins';
import Stock from './components/stock/Stock';
import Comparateur from './components/comparateur/Comparateur';
import Profil from './components/profil/Profil';
import SplashScreen from './components/SplashScreen/SplashScreen';
import Sidebar from './components/Sidebar';
import { mockStores } from './data/mockData';
import Login from './components/Login';

function getStoresWithLateData(stores) {
  const now = new Date();
  return stores.filter(store => {
    if (!store.lastUpdate) return true;
    const last = new Date(store.lastUpdate);
    const diffDays = (now - last) / (1000 * 60 * 60 * 24);
    return diffDays > 2;
  });
}

function App() {
  const { theme } = useTheme();
  const [showSplash, setShowSplash] = useState(true);
  const [showAlert, setShowAlert] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const lateStores = getStoresWithLateData(mockStores);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <Router>
      <Sidebar onLogout={() => setIsAuthenticated(false)} />
      <div style={{ background: theme.colors.background, minHeight: '100vh', paddingLeft: 220, transition: 'padding-left 0.2s' }}>
        {showAlert && lateStores.length > 0 && (
          <div style={{
            background: '#fde68a',
            color: '#b45309',
            padding: '16px 32px',
            borderBottom: '1px solid #fbbf24',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontWeight: 500,
            fontSize: 16,
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            boxShadow: '0 2px 8px #fbbf2422',
            marginBottom: 12
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#fbbf24"/><path d="M12 8v4" stroke="#b45309" strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="16" r="1" fill="#b45309"/></svg>
              Attention : Les magasins suivants n'ont pas inséré leurs données depuis plus de 2 jours :
              <span style={{ fontWeight: 700, marginLeft: 8 }}>{lateStores.map(s => s.name).join(', ')}</span>
            </span>
            <button onClick={() => setShowAlert(false)} style={{ background: 'none', border: 'none', color: '#b45309', fontWeight: 700, fontSize: 18, cursor: 'pointer', marginLeft: 24 }} title="Fermer">×</button>
          </div>
        )}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/magasins" element={<Magasins />} />
          <Route path="/stock" element={<Stock />} />
          <Route path="/comparateur" element={<Comparateur />} />
          <Route path="/profil" element={<Profil />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

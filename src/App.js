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

function App() {
  const { theme } = useTheme();
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <Router>
      <Sidebar />
      <div style={{ background: theme.colors.background, minHeight: '100vh', paddingLeft: 220, transition: 'padding-left 0.2s' }}>
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

import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { useTheme } from './hooks/useTheme';
import Dashboard from './components/Dashboard/Dashboard';
import Magasins from './components/magasins/Magasins';
import Stock from './components/stock/Stock';
import Comparateur from './components/comparateur/Comparateur';
import Profil from './components/profil/Profil';
import SplashScreen from './components/SplashScreen/SplashScreen';
import { BarChart3, Store, Package, TrendingUp, User } from 'lucide-react';

function App() {
  const { theme } = useTheme();
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <Router>
      <div style={{ background: theme.colors.background, minHeight: '100vh', paddingBottom: 80 }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/magasins" element={<Magasins />} />
          <Route path="/stock" element={<Stock />} />
          <Route path="/comparateur" element={<Comparateur />} />
          <Route path="/profil" element={<Profil />} />
        </Routes>
        <nav
          style={{
            position: 'fixed',
            left: 0,
            right: 0,
            bottom: 0,
            height: 64,
            background: theme.colors.surface,
            borderTop: `1px solid ${theme.colors.border}`,
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            zIndex: 100,
          }}
        >
          <NavLink
            to="/"
            end
            style={({ isActive }) => ({
              color: isActive ? theme.colors.primary : theme.colors.textSecondary,
              textDecoration: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              fontWeight: 600,
              fontSize: 12,
            })}
          >
            <BarChart3 size={24} />
            Dashboard
          </NavLink>
          <NavLink
            to="/magasins"
            style={({ isActive }) => ({
              color: isActive ? theme.colors.primary : theme.colors.textSecondary,
              textDecoration: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              fontWeight: 600,
              fontSize: 12,
            })}
          >
            <Store size={24} />
            Magasins
          </NavLink>
          <NavLink
            to="/stock"
            style={({ isActive }) => ({
              color: isActive ? theme.colors.primary : theme.colors.textSecondary,
              textDecoration: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              fontWeight: 600,
              fontSize: 12,
            })}
          >
            <Package size={24} />
            Stock
          </NavLink>
          <NavLink
            to="/comparateur"
            style={({ isActive }) => ({
              color: isActive ? theme.colors.primary : theme.colors.textSecondary,
              textDecoration: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              fontWeight: 600,
              fontSize: 12,
            })}
          >
            <TrendingUp size={24} />
            Comparateur
          </NavLink>
          <NavLink
            to="/profil"
            style={({ isActive }) => ({
              color: isActive ? theme.colors.primary : theme.colors.textSecondary,
              textDecoration: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              fontWeight: 600,
              fontSize: 12,
            })}
          >
            <User size={24} />
            Profil
          </NavLink>
        </nav>
      </div>
    </Router>
  );
}

export default App;

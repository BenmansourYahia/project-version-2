import React from 'react';
import { NavLink } from 'react-router-dom';
import { BarChart3, Store, Package, TrendingUp, User } from 'lucide-react';
import './Sidebar.css';

const navItems = [
  { to: '/', label: 'Dashboard', icon: <BarChart3 size={22} /> },
  { to: '/magasins', label: 'Magasins', icon: <Store size={22} /> },
  { to: '/stock', label: 'Stock', icon: <Package size={22} /> },
  { to: '/comparateur', label: 'Comparateur', icon: <TrendingUp size={22} /> },
  { to: '/profil', label: 'Profil', icon: <User size={22} /> },
];

export default function Sidebar({ onLogout }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span className="sidebar-logo-text">Sofisoft</span>
      </div>
      <nav className="sidebar-nav">
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              'sidebar-link' + (isActive ? ' active' : '')
            }
            end={item.to === '/'}
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>
      {/* Bouton Déconnexion en bas */}
      {onLogout && (
        <button
          onClick={onLogout}
          style={{
            marginTop: 'auto',
            width: '90%',
            marginLeft: '5%',
            marginBottom: 24,
            background: 'linear-gradient(90deg, #6c4ccf 60%, #8B5CF6 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '10px 0',
            fontWeight: 600,
            fontSize: 16,
            cursor: 'pointer',
            boxShadow: '0 2px 8px #6c4ccf22',
            display: 'block',
            letterSpacing: 1,
            transition: 'background 0.2s',
          }}
        >
          Déconnexion
        </button>
      )}
    </aside>
  );
} 
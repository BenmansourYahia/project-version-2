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

export default function Sidebar() {
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
    </aside>
  );
} 
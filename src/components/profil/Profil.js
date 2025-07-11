import React, { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { mockUser } from '../../data/mockData';

export default function Profil() {
  const { theme, isDark, toggleTheme } = useTheme();
  const [user] = useState(mockUser);
  const [notifications, setNotifications] = useState(true);
  const [autoSync, setAutoSync] = useState(true);

  return (
    <div style={{ background: theme.colors.background, minHeight: '100vh', paddingBottom: 40 }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: 24 }}>
        <h1 style={{ color: theme.colors.primary, textAlign: 'center', marginBottom: 24 }}>Profil</h1>
        <div style={{ background: theme.colors.surface, border: `1px solid ${theme.colors.border}`, borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <div style={{ fontSize: 20, fontWeight: 600, color: theme.colors.text, marginBottom: 8 }}>{user.prenom} {user.nom}</div>
          <div style={{ color: theme.colors.textSecondary, marginBottom: 8 }}>{user.role}</div>
          <div style={{ color: theme.colors.textSecondary, marginBottom: 8 }}>{user.email}</div>
          <div style={{ color: theme.colors.textSecondary, marginBottom: 8 }}>{user.telephone}</div>
          <div style={{ color: theme.colors.textSecondary, marginBottom: 8 }}>Magasins: {user.magasins.join(', ')}</div>
        </div>
        <div style={{ background: theme.colors.surface, border: `1px solid ${theme.colors.border}`, borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: theme.colors.text, marginBottom: 16 }}>Paramètres</h2>
          <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            <label style={{ color: theme.colors.text }}>Mode sombre</label>
            <input type="checkbox" checked={isDark} onChange={toggleTheme} />
            <label style={{ color: theme.colors.text }}>Notifications</label>
            <input type="checkbox" checked={notifications} onChange={() => setNotifications(!notifications)} />
            <label style={{ color: theme.colors.text }}>Synchronisation auto</label>
            <input type="checkbox" checked={autoSync} onChange={() => setAutoSync(!autoSync)} />
          </div>
        </div>
      </div>
    </div>
  );
} 
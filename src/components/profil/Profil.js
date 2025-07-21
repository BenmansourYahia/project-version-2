import React, { useState } from 'react';
import { useEffect } from 'react';
import { useTheme } from '../../hooks/useTheme';
import apiService from '../../services/api';

// Icônes SVG simples inline pour email, téléphone, magasin, badge, sécurité, etc.
const MailIcon = () => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path stroke="#6c4ccf" strokeWidth="2" d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v11A2.5 2.5 0 0 1 17.5 20h-11A2.5 2.5 0 0 1 4 17.5v-11Z"/><path stroke="#6c4ccf" strokeWidth="2" d="m5 7 7 6 7-6"/></svg>
);
const PhoneIcon = () => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path stroke="#6c4ccf" strokeWidth="2" d="M5 4h4l2 5-3 2c1.5 3 4.5 6 7.5 7.5l2-3 5 2v4a2 2 0 0 1-2 2C8.954 22 2 15.046 2 6a2 2 0 0 1 2-2Z"/></svg>
);
const StoreIcon = () => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path stroke="#6c4ccf" strokeWidth="2" d="M3 9V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2"/><path stroke="#6c4ccf" strokeWidth="2" d="M21 9v2a7 7 0 0 1-14 0V9"/><path stroke="#6c4ccf" strokeWidth="2" d="M5 22v-5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v5"/></svg>
);
const BadgeIcon = () => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" stroke="#8B5CF6" strokeWidth="2"/><path stroke="#8B5CF6" strokeWidth="2" d="M6 20v-2a6 6 0 0 1 12 0v2"/></svg>
);
const EditIcon = () => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path stroke="#6c4ccf" strokeWidth="2" d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z"/></svg>
);
const LockIcon = () => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><rect width="16" height="10" x="4" y="11" stroke="#EF4444" strokeWidth="2" rx="2"/><path stroke="#EF4444" strokeWidth="2" d="M8 11V7a4 4 0 1 1 8 0v4"/></svg>
);

export default function Profil() {
  const { theme, isDark, toggleTheme } = useTheme();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [autoSync, setAutoSync] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      setLoading(true);
      const userData = await apiService.getCurrentUser();
      setUser(userData);
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ background: theme.colors.background, minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ color: theme.colors.text, fontSize: 18 }}>Chargement...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{ background: theme.colors.background, minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ color: theme.colors.error, fontSize: 18 }}>Erreur lors du chargement du profil</div>
      </div>
    );
  }

  // Initiales pour avatar
  const initials = user.prenom[0] + user.nom[0];
  const storesList = user.stores ? user.stores.map(store => store.code).join(', ') : 'Aucun magasin assigné';

  return (
    <div style={{ background: theme.colors.background, minHeight: '100vh', paddingBottom: 40 }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: 24 }}>
        <h1 style={{ color: theme.colors.primary, textAlign: 'center', marginBottom: 24 }}>Profil</h1>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, alignItems: 'flex-start' }}>
          {/* Colonne gauche : infos profil */}
          <div style={{ flex: 1, minWidth: 280 }}>
            <div className="card-3d" style={{ background: theme.colors.surface, border: `1px solid ${theme.colors.border}`, borderRadius: 16, padding: 32, marginBottom: 24, textAlign: 'center', position: 'relative' }}>
              {/* Avatar */}
              <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#f3e8ff', margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, fontWeight: 700, color: '#6c4ccf', border: '3px solid #e9d5ff' }}>
                {user.avatar ? <img src={user.avatar} alt="avatar" style={{ width: '100%', height: '100%', borderRadius: '50%' }} /> : initials}
              </div>
              {/* Nom et badge */}
              <div style={{ fontSize: 22, fontWeight: 700, color: theme.colors.text, marginBottom: 4 }}>{user.prenom} {user.nom}</div>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#ede9fe', color: '#8B5CF6', fontWeight: 600, fontSize: 14, borderRadius: 8, padding: '2px 10px', marginBottom: 14 }}><BadgeIcon />{user.role}</span>
              <div style={{ color: theme.colors.textSecondary, fontSize: 15, marginBottom: 18 }}>{user.description}</div>
              {/* Infos alignées à gauche */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start', margin: '0 auto', maxWidth: 260, textAlign: 'left', background: '#f8fafc', borderRadius: 10, padding: '18px 18px 12px 18px', boxShadow: '0 1px 4px #6c4ccf11' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: theme.colors.textSecondary, fontSize: 15 }}><MailIcon /><span>{user.email}</span></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: theme.colors.textSecondary, fontSize: 15 }}><PhoneIcon /><span>{user.telephone}</span></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: theme.colors.textSecondary, fontSize: 15 }}><StoreIcon /><span>Magasins : {storesList}</span></div>
                <div style={{ color: theme.colors.textSecondary, fontSize: 13, marginTop: 2, marginLeft: 28 }}>Inscrit le {new Date(user.createdAt).toLocaleDateString('fr-FR')}</div>
              </div>
              <button style={{ marginTop: 22, background: '#6c4ccf', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 18px', fontWeight: 600, fontSize: 15, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8, boxShadow: '0 2px 8px #6c4ccf22' }}><EditIcon />Modifier le profil</button>
            </div>
            {/* Section à propos */}
            <div className="card-3d" style={{ background: theme.colors.surface, border: `1px solid ${theme.colors.border}`, borderRadius: 16, padding: 24, marginBottom: 24 }}>
              <h2 style={{ color: theme.colors.primary, fontSize: 18, marginBottom: 10 }}>À propos</h2>
              <div style={{ color: theme.colors.textSecondary, fontSize: 15 }}>{user.description || 'Aucune description disponible'}</div>
            </div>
          </div>
          {/* Colonne droite : paramètres et sécurité */}
          <div style={{ flex: 1, minWidth: 280, display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* Section sécurité */}
            <div className="card-3d" style={{ background: theme.colors.surface, border: `1px solid ${theme.colors.border}`, borderRadius: 16, padding: 24 }}>
              <h2 style={{ color: '#EF4444', fontSize: 18, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}><LockIcon />Sécurité</h2>
              <button style={{ background: '#EF4444', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 16px', fontWeight: 600, fontSize: 15, cursor: 'pointer', marginBottom: 10 }}>Changer le mot de passe</button>
              <button style={{ background: '#fde68a', color: '#b45309', border: 'none', borderRadius: 8, padding: '8px 16px', fontWeight: 600, fontSize: 15, cursor: 'pointer' }}>Activer la double authentification</button>
            </div>
            {/* Section préférences */}
            <div className="card-3d" style={{ background: theme.colors.surface, border: `1px solid ${theme.colors.border}`, borderRadius: 16, padding: 24 }}>
              <h2 style={{ color: theme.colors.primary, fontSize: 18, marginBottom: 10 }}>Préférences</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <label style={{ color: theme.colors.text, display: 'flex', alignItems: 'center', gap: 10 }}>
                  <input type="checkbox" checked={isDark} onChange={toggleTheme} style={{ accentColor: '#6c4ccf' }} /> Mode sombre
                </label>
                <label style={{ color: theme.colors.text, display: 'flex', alignItems: 'center', gap: 10 }}>
                  <input type="checkbox" checked={notifications} onChange={() => setNotifications(!notifications)} style={{ accentColor: '#6c4ccf' }} /> Notifications
                </label>
                <label style={{ color: theme.colors.text, display: 'flex', alignItems: 'center', gap: 10 }}>
                  <input type="checkbox" checked={autoSync} onChange={() => setAutoSync(!autoSync)} style={{ accentColor: '#6c4ccf' }} /> Synchronisation auto
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
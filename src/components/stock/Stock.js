import React, { useState } from 'react';
import { useEffect } from 'react';
import { useTheme } from '../../hooks/useTheme';
import apiService from '../../services/api';
import FilterModal from '../FilterModal';

export default function Stock() {
  const { theme } = useTheme();
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showFilterModal, setShowFilterModal] = useState(false);

  const stockFilters = [
    { value: 'all', label: 'Tous les produits' },
    { value: 'disponible', label: 'Stock disponible' },
    { value: 'rupture', label: 'Stock à zéro' },
    { value: 'stock_faible', label: 'Stock faible' },
  ];

  useEffect(() => {
    loadStocks();
  }, []);

  const loadStocks = async () => {
    try {
      setLoading(true);
      const stocksData = await apiService.getStocks();
      setStocks(stocksData);
    } catch (error) {
      console.error('Error loading stocks:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredStock = stocks.filter(item => {
    const matchesSearch = item.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.code.toLowerCase().includes(searchQuery.toLowerCase());
    let matchesFilter = true;
    switch (selectedFilter) {
      case 'disponible':
        matchesFilter = item.status === 'disponible';
        break;
      case 'rupture':
        matchesFilter = item.quantite === 0;
        break;
      case 'stock_faible':
        matchesFilter = item.status === 'stock_faible';
        break;
      default:
        matchesFilter = true;
    }
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div style={{ background: theme.colors.background, minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ color: theme.colors.text, fontSize: 18 }}>Chargement...</div>
      </div>
    );
  }

  return (
    <div style={{ background: theme.colors.background, minHeight: '100vh', paddingBottom: 40 }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: 24 }}>
        <h1 style={{ color: theme.colors.primary, textAlign: 'center', marginBottom: 24 }}>Stock</h1>
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          <input
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Rechercher un produit..."
            style={{
              flex: 1,
              padding: '8px 12px',
              borderRadius: 8,
              border: `1px solid ${theme.colors.border}`,
              fontSize: 16,
              color: theme.colors.text,
              background: theme.colors.surface
            }}
          />
          <button
            style={{
              background: theme.colors.surface,
              color: theme.colors.text,
              border: `1px solid ${theme.colors.border}`,
              borderRadius: 8,
              padding: '8px 12px',
              cursor: 'pointer',
              fontWeight: 500
            }}
            onClick={() => setShowFilterModal(true)}
          >
            Filtrer
          </button>
        </div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          {stockFilters.map(f => (
            <button
              key={f.value}
              style={{
                background: selectedFilter === f.value ? theme.colors.primary : theme.colors.surface,
                color: selectedFilter === f.value ? '#fff' : theme.colors.text,
                border: `1px solid ${theme.colors.border}`,
                borderRadius: 8,
                padding: '8px 12px',
                cursor: 'pointer',
                fontWeight: 500
              }}
              onClick={() => setSelectedFilter(f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 24 }}>
          {filteredStock.map(item => (
            <div key={item.id} className="card-3d" style={{ border: `1px solid ${theme.colors.border}`, borderRadius: 12, background: theme.colors.surface, padding: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ color: theme.colors.text, fontWeight: 600 }}>{item.designation}</div>
                  <div style={{ color: theme.colors.textSecondary, fontSize: 14 }}>{item.code}</div>
                </div>
                <div style={{ background: item.status === 'disponible' ? theme.colors.success + '20' : item.status === 'rupture' ? theme.colors.error + '20' : theme.colors.warning + '20', borderRadius: 8, padding: '4px 12px' }}>
                  <span style={{ color: item.status === 'disponible' ? theme.colors.success : item.status === 'rupture' ? theme.colors.error : theme.colors.warning, fontWeight: 500 }}>{item.status.replace('_', ' ')}</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 24, margin: '8px 0' }}>
                <div>
                  <div style={{ color: theme.colors.textSecondary, fontSize: 12 }}>Quantité</div>
                  <div style={{ color: item.quantite === 0 ? theme.colors.error : theme.colors.text }}>{item.quantite}</div>
                </div>
                <div>
                  <div style={{ color: theme.colors.textSecondary, fontSize: 12 }}>Seuil</div>
                  <div style={{ color: theme.colors.text }}>{item.seuil}</div>
                </div>
              </div>
              <div style={{ color: theme.colors.textSecondary, fontSize: 12, marginTop: 8 }}>
                Mis à jour: {new Date(item.lastUpdate).toLocaleString('fr-FR')}
                {item.storeName && <span> - {item.storeName}</span>}
              </div>
            </div>
          ))}
        </div>
        <FilterModal
          visible={showFilterModal}
          onClose={() => setShowFilterModal(false)}
          title="Filtrer le stock"
          options={stockFilters.map(f => f.label)}
          selectedOptions={[stockFilters.find(f => f.value === selectedFilter)?.label || '']}
          onApply={opts => {
            const found = stockFilters.find(f => f.label === opts[0]);
            setSelectedFilter(found ? found.value : 'all');
          }}
          multiSelect={false}
        />
      </div>
    </div>
  );
} 
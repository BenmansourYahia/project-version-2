import React, { useState } from 'react';
import { useEffect } from 'react';
import { useTheme } from '../../hooks/useTheme';
import apiService from '../../services/api';
import SearchBar from '../SearchBar';
import FilterModal from '../FilterModal';

export default function Magasins() {
  const { theme } = useTheme();
  const [stores, setStores] = useState([]);
  const [brands, setBrands] = useState([]);
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [showBrandFilter, setShowBrandFilter] = useState(false);
  const [showRegionFilter, setShowRegionFilter] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [storesData, brandsData, regionsData] = await Promise.all([
        apiService.getStores(),
        apiService.getBrands(),
        apiService.getRegions()
      ]);
      setStores(storesData);
      setBrands(brandsData);
      setRegions(regionsData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredStores = stores.filter(store => {
    const matchesSearch = store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(store.brand);
    const matchesRegion = selectedRegions.length === 0 || selectedRegions.some(region => store.address.includes(region));
    return matchesSearch && matchesBrand && matchesRegion;
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
        <h1 style={{ color: theme.colors.primary, textAlign: 'center', marginBottom: 24 }}>Magasins</h1>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Rechercher un magasin..."
          onFilterPress={() => setShowBrandFilter(true)}
        />
        <div style={{ display: 'flex', gap: 8, margin: '16px 0' }}>
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
            onClick={() => setShowBrandFilter(true)}
          >
            Marques {selectedBrands.length > 0 ? `(${selectedBrands.length})` : ''}
          </button>
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
            onClick={() => setShowRegionFilter(true)}
          >
            Régions {selectedRegions.length > 0 ? `(${selectedRegions.length})` : ''}
          </button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 24 }}>
          {filteredStores.map(store => (
            <div key={store.id} className="card-3d" style={{ border: `1px solid ${theme.colors.border}`, borderRadius: 12, background: theme.colors.surface, padding: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ color: theme.colors.text, fontWeight: 600 }}>{store.name}</div>
                  <div style={{ color: theme.colors.textSecondary, fontSize: 14 }}>{store.code} • {store.brand}</div>
                </div>
                <div style={{ background: store.status === 'ouvert' ? theme.colors.success + '20' : theme.colors.error + '20', borderRadius: 8, padding: '4px 12px' }}>
                  <span style={{ color: store.status === 'ouvert' ? theme.colors.success : theme.colors.error, fontWeight: 500 }}>{store.status}</span>
                </div>
              </div>
              <div style={{ color: theme.colors.textSecondary, fontSize: 14, margin: '8px 0' }}>{store.address}</div>
              <div style={{ display: 'flex', gap: 24, margin: '8px 0' }}>
                <div>
                  <div style={{ color: theme.colors.textSecondary, fontSize: 12 }}>CA</div>
                  <div style={{ color: theme.colors.text }}>{store.performance?.ca ? Number(store.performance.ca).toLocaleString('fr-FR') : '0'}€</div>
                </div>
                <div>
                  <div style={{ color: theme.colors.textSecondary, fontSize: 12 }}>Tickets</div>
                  <div style={{ color: theme.colors.text }}>{store.performance?.tickets || 0}</div>
                </div>
                <div>
                  <div style={{ color: theme.colors.textSecondary, fontSize: 12 }}>Objectif</div>
                  <div style={{ color: (store.performance?.objectifAtteint || 0) > 80 ? theme.colors.success : theme.colors.warning }}>{(store.performance?.objectifAtteint || 0).toFixed(1)}%</div>
                </div>
              </div>
              <div style={{ color: theme.colors.textSecondary, fontSize: 12, marginTop: 8 }}>Mis à jour: {new Date(store.lastUpdate).toLocaleString('fr-FR')}</div>
            </div>
          ))}
        </div>
        <FilterModal
          visible={showBrandFilter}
          onClose={() => setShowBrandFilter(false)}
          title="Filtrer par marque"
          options={brands}
          selectedOptions={selectedBrands}
          onApply={setSelectedBrands}
        />
        <FilterModal
          visible={showRegionFilter}
          onClose={() => setShowRegionFilter(false)}
          title="Filtrer par région"
          options={regions}
          selectedOptions={selectedRegions}
          onApply={setSelectedRegions}
        />
      </div>
    </div>
  );
} 
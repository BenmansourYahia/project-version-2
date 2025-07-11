import React, { useState } from 'react';
import { BarChart3, Store, TrendingUp, TrendingDown, Calendar, ArrowRight } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { mockStores, mockPerformances } from '../../data/mockData';
import FilterModal from '../FilterModal';
import './Comparateur.css';

const comparisonTypes = [
  { value: 'store_vs_store', label: 'Magasin vs Magasin', icon: Store },
  { value: 'period_vs_period', label: 'Période vs Période', icon: Calendar },
  { value: 'evolution', label: 'Évolution temporelle', icon: TrendingUp },
  { value: 'benchmark', label: 'Benchmark réseau', icon: BarChart3 },
];

export default function Comparateur() {
  const { theme } = useTheme();
  const [selectedStores, setSelectedStores] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState('Aujourd\'hui');
  const [comparisonType, setComparisonType] = useState('store_vs_store');
  const [showStoreModal, setShowStoreModal] = useState(false);
  const [showPeriodModal, setShowPeriodModal] = useState(false);

  const storeOptions = mockStores.map(store => `${store.name} (${store.code})`);
  const periodOptions = ['Aujourd\'hui', 'Hier', 'Cette semaine', 'Semaine dernière', 'Ce mois', 'Mois dernier'];

  const renderComparisonCard = (title, value1, value2, unit) => {
    const difference = value1 - value2;
    const percentageChange = value2 !== 0 ? ((difference / value2) * 100) : 0;
    const isPositive = difference > 0;
    return (
      <div className="comparison-card" style={{ background: theme.colors.surface, borderColor: theme.colors.border }}>
        <div className="comparison-title" style={{ color: theme.colors.text }}>{title}</div>
        <div className="comparison-values">
          <div className="value-container">
            <div className="value-label" style={{ color: theme.colors.textSecondary }}>Actuel</div>
            <div className="value-text" style={{ color: theme.colors.text }}>{value1.toLocaleString('fr-FR')}{unit}</div>
          </div>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
          <div className="value-container">
            <div className="value-label" style={{ color: theme.colors.textSecondary }}>Précédent</div>
            <div className="value-text" style={{ color: theme.colors.text }}>{value2.toLocaleString('fr-FR')}{unit}</div>
          </div>
        </div>
        <div className="difference-container">
          <div className="difference-badge" style={{ background: isPositive ? `${theme.colors.success}20` : `${theme.colors.error}20` }}>
            {isPositive ? (
              <TrendingUp size={16} color={theme.colors.success} />
            ) : (
              <TrendingDown size={16} color={theme.colors.error} />
            )}
            <span className="difference-text" style={{ color: isPositive ? theme.colors.success : theme.colors.error }}>
              {isPositive ? '+' : ''}{difference.toLocaleString('fr-FR')}{unit}
            </span>
          </div>
          <span className="percentage-text" style={{ color: isPositive ? theme.colors.success : theme.colors.error }}>
            {percentageChange > 0 ? '+' : ''}{percentageChange.toFixed(1)}%
          </span>
        </div>
      </div>
    );
  };

  const renderBenchmarkCard = (title, value, average, unit) => {
    const difference = value - average;
    const percentageChange = average !== 0 ? ((difference / average) * 100) : 0;
    const isAboveAverage = difference > 0;
    return (
      <div className="benchmark-card" style={{ background: theme.colors.surface, borderColor: theme.colors.border }}>
        <div className="benchmark-title" style={{ color: theme.colors.text }}>{title}</div>
        <div className="benchmark-values">
          <div className="benchmark-value">
            <div className="benchmark-label" style={{ color: theme.colors.textSecondary }}>Valeur</div>
            <div className="benchmark-number" style={{ color: theme.colors.text }}>{value.toLocaleString('fr-FR')}{unit}</div>
          </div>
          <div className="benchmark-value">
            <div className="benchmark-label" style={{ color: theme.colors.textSecondary }}>Moyenne réseau</div>
            <div className="benchmark-number" style={{ color: theme.colors.text }}>{average.toLocaleString('fr-FR')}{unit}</div>
          </div>
        </div>
        <div className="benchmark-indicator">
          <div className="benchmark-badge" style={{ background: isAboveAverage ? `${theme.colors.success}20` : `${theme.colors.warning}20` }}>
            <span className="benchmark-badge-text" style={{ color: isAboveAverage ? theme.colors.success : theme.colors.warning }}>
              {isAboveAverage ? 'Au-dessus' : 'En-dessous'} de la moyenne ({percentageChange > 0 ? '+' : ''}{percentageChange.toFixed(1)}%)
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="comparateur-container" style={{ background: theme.colors.background }}>
      <div className="header" style={{ borderBottomColor: theme.colors.border }}>
        <span className="title" style={{ color: theme.colors.text }}>Comparateur</span>
        <BarChart3 size={24} color={theme.colors.primary} />
      </div>
      <div className="content">
        {/* Comparison Type Selection */}
        <div className="type-container">
          <div className="section-title" style={{ color: theme.colors.text }}>Type de comparaison</div>
          <div className="type-grid">
            {comparisonTypes.map((type) => {
              const TypeIcon = type.icon;
              const isSelected = comparisonType === type.value;
              return (
                <button
                  key={type.value}
                  className="type-card"
                  style={{
                    background: isSelected ? theme.colors.primary : theme.colors.surface,
                    borderColor: theme.colors.border,
                    color: isSelected ? '#FFF' : theme.colors.text,
                  }}
                  onClick={() => setComparisonType(type.value)}
                >
                  <TypeIcon size={24} color={isSelected ? '#FFF' : theme.colors.text} />
                  <span className="type-text" style={{ color: isSelected ? '#FFF' : theme.colors.text }}>{type.label}</span>
                </button>
              );
            })}
          </div>
        </div>
        {/* Selection Controls */}
        <div className="selection-container">
          <button
            className="selection-button"
            style={{ background: theme.colors.surface, borderColor: theme.colors.border, color: theme.colors.text }}
            onClick={() => setShowStoreModal(true)}
          >
            <Store size={20} color={theme.colors.text} />
            <span className="selection-text">Magasins {selectedStores.length > 0 ? `(${selectedStores.length})` : ''}</span>
          </button>
          <button
            className="selection-button"
            style={{ background: theme.colors.surface, borderColor: theme.colors.border, color: theme.colors.text }}
            onClick={() => setShowPeriodModal(true)}
          >
            <Calendar size={20} color={theme.colors.text} />
            <span className="selection-text">{selectedPeriod}</span>
          </button>
        </div>
        {/* Comparison Results */}
        <div className="results-container">
          <div className="section-title" style={{ color: theme.colors.text }}>Résultats de comparaison</div>
          {comparisonType === 'benchmark' ? (
            <div className="benchmark-grid">
              {renderBenchmarkCard("Chiffre d'affaires", 25000, 20000, '€')}
              {renderBenchmarkCard('Nombre de tickets', 150, 130, '')}
              {renderBenchmarkCard('Panier moyen', 166.67, 153.85, '€')}
              {renderBenchmarkCard('Taux de transformation', 68.2, 65.5, '%')}
            </div>
          ) : (
            <div className="comparison-grid">
              {renderComparisonCard("Chiffre d'affaires", 25000, 22000, '€')}
              {renderComparisonCard('Nombre de tickets', 150, 140, '')}
              {renderComparisonCard('Panier moyen', 166.67, 157.14, '€')}
              {renderComparisonCard('Taux de transformation', 68.2, 65.0, '%')}
            </div>
          )}
        </div>
        {/* Summary */}
        <div className="summary-container" style={{ background: theme.colors.surface, borderColor: theme.colors.border }}>
          <div className="summary-title" style={{ color: theme.colors.text }}>Résumé de l'analyse</div>
          <div className="summary-content">
            <div className="summary-item">
              <TrendingUp size={16} color={theme.colors.success} />
              <span className="summary-text" style={{ color: theme.colors.text }}>Amélioration du CA de +13.6%</span>
            </div>
            <div className="summary-item">
              <TrendingUp size={16} color={theme.colors.success} />
              <span className="summary-text" style={{ color: theme.colors.text }}>Augmentation du taux de transformation</span>
            </div>
            <div className="summary-item">
              <TrendingDown size={16} color={theme.colors.warning} />
              <span className="summary-text" style={{ color: theme.colors.text }}>Objectifs partiellement atteints</span>
            </div>
          </div>
        </div>
      </div>
      <FilterModal
        visible={showStoreModal}
        onClose={() => setShowStoreModal(false)}
        title="Sélectionner les magasins"
        options={storeOptions}
        selectedOptions={selectedStores}
        onApply={setSelectedStores}
      />
      <FilterModal
        visible={showPeriodModal}
        onClose={() => setShowPeriodModal(false)}
        title="Sélectionner la période"
        options={periodOptions}
        selectedOptions={[selectedPeriod]}
        onApply={(selected) => setSelectedPeriod(selected[0] || 'Aujourd\'hui')}
        multiSelect={false}
      />
    </div>
  );
} 
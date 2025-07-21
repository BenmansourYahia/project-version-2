import React, { useState } from 'react';
import { useEffect } from 'react';
import { useTheme } from '../../hooks/useTheme';
import apiService from '../../services/api';
import KPICard from '../KPICard';
import ChartCardRecharts from '../ChartCardRecharts';
import FilterModal from '../FilterModal';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const monthNames = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];
const trimesters = ['Trim 1', 'Trim 2', 'Trim 3', 'Trim 4'];

function generatePeriodData(baseValue, baseTickets, period, monthIdx = 0, trimesterIdx = 0) {
  switch (period) {
    case "Aujourd'hui":
      return [
        { name: 'Aujourd\'hui', value: Math.round(baseValue * 0.95), tickets: Math.round(baseTickets * 0.95) }
      ];
    case 'Cette semaine':
      return [
        { name: 'Lun', value: Math.round(baseValue * 0.6), tickets: Math.round(baseTickets * 0.6) },
        { name: 'Mar', value: Math.round(baseValue * 0.7), tickets: Math.round(baseTickets * 0.7) },
        { name: 'Mer', value: Math.round(baseValue * 0.8), tickets: Math.round(baseTickets * 0.8) },
        { name: 'Jeu', value: Math.round(baseValue * 0.9), tickets: Math.round(baseTickets * 0.9) },
        { name: 'Ven', value: Math.round(baseValue * 1.0), tickets: Math.round(baseTickets * 1.0) },
        { name: 'Sam', value: Math.round(baseValue * 1.1), tickets: Math.round(baseTickets * 1.1) },
        { name: 'Dim', value: Math.round(baseValue * 0.8), tickets: Math.round(baseTickets * 0.8) },
      ];
    case 'Ce mois':
      return monthNames.map((name, i) => ({
        name,
        value: Math.round(baseValue * (0.7 + 0.02 * i)),
        tickets: Math.round(baseTickets * (0.7 + 0.02 * i))
      }));
    case 'Trimestre':
      return trimesters.map((name, i) => ({
        name,
        value: Math.round(baseValue * (0.7 + 0.1 * i)),
        tickets: Math.round(baseTickets * (0.7 + 0.1 * i))
      }));
    case 'Cette année':
      return [
        { name: '2024', value: Math.round(baseValue * 0.7), tickets: Math.round(baseTickets * 0.7) },
        { name: '2025', value: Math.round(baseValue * 1.0), tickets: Math.round(baseTickets * 1.0) },
      ];
    default:
      return salesEvolutionData;
  }
}

export default function Dashboard() {
  const { theme } = useTheme();
  const [stores, setStores] = useState([]);
  const [brands, setBrands] = useState([]);
  const [performances, setPerformances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('Aujourd\'hui');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [showBrandFilter, setShowBrandFilter] = useState(false);
  const [selectedChart, setSelectedChart] = useState('evolution');
  const [selectedStoreId, setSelectedStoreId] = useState('ALL');
  const [selectedTrimester, setSelectedTrimester] = useState('Trim 1');

  const periods = ['Aujourd\'hui', 'Cette semaine', 'Ce mois', 'Trimestre', 'Cette année'];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [storesData, brandsData, performancesData] = await Promise.all([
        apiService.getStores(),
        apiService.getBrands(),
        apiService.getPerformances()
      ]);
      setStores(storesData);
      setBrands(brandsData);
      setPerformances(performancesData);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filtrer les magasins selon la marque sélectionnée
  const filteredStores = selectedBrands.length > 0
    ? stores.filter(store => selectedBrands.includes(store.brand))
    : stores;

  // Magasin sélectionné ou tous
  const selectedStore = selectedStoreId === 'ALL' ? null : filteredStores.find(store => store.id === selectedStoreId);

  // Agréger les performances si tous les magasins sont sélectionnés
  const aggregatePerformance = stores => {
    const perf = { ca: 0, tickets: 0, panierMoyen: 0, objectif: 0, objectifAtteint: 0 };
    if (stores.length === 0) return perf;
    stores.forEach(store => {
      if (store.performance) {
        perf.ca += Number(store.performance.ca) || 0;
        perf.tickets += Number(store.performance.tickets) || 0;
        perf.panierMoyen += Number(store.performance.panierMoyen) || 0;
        perf.objectif += Number(store.performance.objectif) || 0;
        perf.objectifAtteint += Number(store.performance.objectifAtteint) || 0;
      }
    });
    perf.panierMoyen = perf.panierMoyen / stores.length;
    perf.objectifAtteint = perf.objectifAtteint / stores.length;
    return perf;
  };

  const perf = selectedStore ? selectedStore.performance : aggregatePerformance(filteredStores);

  // Générer les données du graphique selon la période, le magasin et la marque sélectionnés
  let storeSalesEvolution;
  if (selectedStore) {
    storeSalesEvolution = generatePeriodData(
      Number(selectedStore.performance?.ca) || 0,
      Number(selectedStore.performance?.tickets) || 0,
      selectedPeriod
    );
  } else {
    // Agréger les données pour tous les magasins filtrés
    const baseValue = filteredStores.reduce((sum, s) => sum + (Number(s.performance?.ca) || 0), 0) / (filteredStores.length || 1);
    const baseTickets = filteredStores.reduce((sum, s) => sum + (Number(s.performance?.tickets) || 0), 0) / (filteredStores.length || 1);
    storeSalesEvolution = generatePeriodData(baseValue, baseTickets, selectedPeriod);
  }

  // Pour le trimestre, permettre de sélectionner le trimestre
  const showTrimesterSelect = selectedPeriod === 'Trimestre';
  let chartData = storeSalesEvolution;
  let chartTitle = `Évolution des ventes (${selectedPeriod})`;
  if (showTrimesterSelect) {
    chartData = [storeSalesEvolution[trimesters.indexOf(selectedTrimester)]];
    chartTitle = `Évolution des ventes (${selectedTrimester})`;
  }
  if (selectedStore) chartTitle += ` - ${selectedStore.name}`;

  // Résumé des performances pour la période affichée (somme ou moyenne)
  const resume = {
    totalVentes: chartData.reduce((sum, d) => sum + d.value, 0),
    totalTickets: chartData.reduce((sum, d) => sum + d.tickets, 0),
    panierMoyen: chartData.reduce((sum, d) => sum + d.value, 0) / (chartData.length || 1),
    objectif: perf.objectif,
    objectifAtteint: perf.objectifAtteint
  };

  // Trouver le meilleur et le moins bon magasin sur la période affichée
  let bestStore = null;
  let worstStore = null;
  if (filteredStores.length > 0) {
    // Pour chaque magasin, calculer la somme des ventes sur la période affichée
    const storeSums = filteredStores.map(store => {
      const data = generatePeriodData(Number(store.performance?.ca) || 0, Number(store.performance?.tickets) || 0, selectedPeriod);
      const total = data.reduce((sum, d) => sum + d.value, 0);
      return { store, total };
    });
    bestStore = storeSums.reduce((max, s) => (s.total > max.total ? s : max), storeSums[0]);
    worstStore = storeSums.reduce((min, s) => (s.total < min.total ? s : min), storeSums[0]);
  }

  // KPIs dynamiques selon la période affichée
  const kpiData = chartData;
  const kpiSum = key => kpiData.reduce((sum, d) => sum + (d[key] || 0), 0);
  const kpiAvg = key => kpiData.length ? kpiSum(key) / kpiData.length : 0;

  // Agrégation des KPIs avancés (prix moyen, débit moyen, taux transformation, quantité vendue)
  let prixMoyen = null, debitMoyen = null, tauxTransformation = null, quantiteVendue = null;
  if (selectedStore) {
    // On utilise les données de performance du magasin sélectionné
    if (selectedStore.performance) {
      prixMoyen = Number(selectedStore.performance.prixMoyen) || null;
      debitMoyen = Number(selectedStore.performance.debitMoyen) || null;
      tauxTransformation = Number(selectedStore.performance.tauxTransformation) || null;
      quantiteVendue = Number(selectedStore.performance.quantiteVendue) || null;
    }
  } else {
    // Moyenne sur tous les magasins filtrés
    const validPerfs = filteredStores.filter(s => s.performance);
    if (validPerfs.length > 0) {
      prixMoyen = validPerfs.reduce((sum, s) => sum + (Number(s.performance.prixMoyen) || 0), 0) / validPerfs.length;
      debitMoyen = validPerfs.reduce((sum, s) => sum + (Number(s.performance.debitMoyen) || 0), 0) / validPerfs.length;
      tauxTransformation = validPerfs.reduce((sum, s) => sum + (Number(s.performance.tauxTransformation) || 0), 0) / validPerfs.length;
      quantiteVendue = validPerfs.reduce((sum, s) => sum + (Number(s.performance.quantiteVendue) || 0), 0);
    }
  }

  const storeKPIs = [
    {
      id: '1',
      name: "Chiffre d'affaires",
      value: kpiSum('value'),
      previousValue: kpiSum('value') * 0.9,
      unit: '€',
      icon: 'TrendingUp',
      color: '#10B981'
    },
    {
      id: '2',
      name: 'Nombre de tickets',
      value: kpiSum('tickets'),
      previousValue: kpiSum('tickets') - 10,
      unit: '',
      icon: 'Receipt',
      color: '#6c4ccf'
    },
    {
      id: '3',
      name: 'Panier moyen',
      value: kpiAvg('value'),
      previousValue: kpiAvg('value') * 0.95,
      unit: '€',
      icon: 'ShoppingCart',
      color: '#8B5CF6'
    },
    {
      id: '4',
      name: 'Objectifs',
      value: perf.objectifAtteint,
      previousValue: perf.objectifAtteint - 5,
      unit: '%',
      icon: 'Award',
      color: '#EF4444',
      objective: 100
    },
    {
      id: '5',
      name: 'Prix moyen',
      value: typeof prixMoyen === 'number' && !isNaN(prixMoyen) ? prixMoyen : null,
      previousValue: typeof prixMoyen === 'number' && !isNaN(prixMoyen) ? prixMoyen * 0.95 : null,
      unit: '€',
      icon: 'Tag',
      color: '#6366f1'
    },
    {
      id: '6',
      name: 'Débit moyen',
      value: typeof debitMoyen === 'number' && !isNaN(debitMoyen) ? debitMoyen : null,
      previousValue: typeof debitMoyen === 'number' && !isNaN(debitMoyen) ? debitMoyen * 0.95 : null,
      unit: '',
      icon: 'Zap',
      color: '#0ea5e9'
    },
    {
      id: '7',
      name: 'Taux de transformation',
      value: typeof tauxTransformation === 'number' && !isNaN(tauxTransformation) ? tauxTransformation : null,
      previousValue: typeof tauxTransformation === 'number' && !isNaN(tauxTransformation) ? tauxTransformation * 0.95 : null,
      unit: '%',
      icon: 'Target',
      color: '#F59E0B'
    },
    {
      id: '8',
      name: 'Quantité vendue',
      value: typeof quantiteVendue === 'number' && !isNaN(quantiteVendue) ? quantiteVendue : null,
      previousValue: typeof quantiteVendue === 'number' && !isNaN(quantiteVendue) ? quantiteVendue * 0.95 : null,
      unit: '',
      icon: 'Package',
      color: '#10B981'
    }
  ];

  if (loading) {
    return (
      <div style={{ background: theme.colors.background, minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ color: theme.colors.text, fontSize: 18 }}>Chargement du dashboard...</div>
      </div>
    );
  }

  // Fonction d'export PDF
  const handleExportPDF = async () => {
    const input = document.getElementById('dashboard-report');
    if (!input) return;
    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pageWidth - 40;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 20, 20, imgWidth, imgHeight);
    let fileName = 'rapport-dashboard.pdf';
    if (selectedStore) fileName = `rapport-${selectedStore.name.replace(/\s+/g, '_')}.pdf`;
    pdf.save(fileName);
  };

  return (
    <div style={{ background: theme.colors.background, minHeight: '100vh', paddingBottom: 40 }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: 24 }}>
        <h1 style={{ color: theme.colors.primary, textAlign: 'center', marginBottom: 24 }}>Dashboard</h1>
        {/* Bouton Export PDF */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
          <button
            onClick={handleExportPDF}
            style={{
              background: 'linear-gradient(90deg, #6c4ccf 60%, #8B5CF6 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '8px 22px',
              fontWeight: 600,
              fontSize: 16,
              cursor: 'pointer',
              boxShadow: '0 2px 8px #6c4ccf22',
              letterSpacing: 1,
              marginBottom: 8
            }}
          >
            Exporter en PDF
          </button>
        </div>
        {/* Contenu à exporter */}
        <div id="dashboard-report">
        {/* Sélecteur de magasin, reset, période et trimestre */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 16, alignItems: 'center' }}>
          <select
            value={selectedStoreId}
            onChange={e => setSelectedStoreId(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: 8,
              border: `1px solid ${theme.colors.border}`,
              background: theme.colors.surface,
              color: theme.colors.text,
              fontWeight: 500,
              fontSize: 16
            }}
          >
            <option value="ALL">Tous les magasins</option>
            {filteredStores.map(store => (
              <option key={store.id} value={store.id}>{store.name}</option>
            ))}
          </select>
          <button
            onClick={() => setSelectedStoreId('ALL')}
            style={{
              padding: '8px 12px',
              borderRadius: 8,
              border: `1px solid ${theme.colors.border}`,
              background: theme.colors.surface,
              color: theme.colors.text,
              fontWeight: 500,
              fontSize: 16
            }}
          >
            Réinitialiser
          </button>
          {periods.map((period) => (
            <button
              key={period}
              style={{
                background: selectedPeriod === period ? theme.colors.primary : theme.colors.surface,
                color: selectedPeriod === period ? '#fff' : theme.colors.text,
                border: `1px solid ${theme.colors.border}`,
                borderRadius: 8,
                padding: '8px 12px',
                cursor: 'pointer',
                fontWeight: 500
              }}
              onClick={() => setSelectedPeriod(period)}
            >
              {period}
            </button>
          ))}
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
          {showTrimesterSelect && (
            <select
              value={selectedTrimester}
              onChange={e => setSelectedTrimester(e.target.value)}
              style={{
                padding: '8px 12px',
                borderRadius: 8,
                border: `1px solid ${theme.colors.border}`,
                background: theme.colors.surface,
                color: theme.colors.text,
                fontWeight: 500,
                fontSize: 16
              }}
            >
              {trimesters.map(trim => (
                <option key={trim} value={trim}>{trim}</option>
              ))}
            </select>
          )}
        </div>
        {/* KPIs Grid */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, margin: '24px 0' }}>
          {storeKPIs.map((kpi) => (
            <KPICard key={kpi.id} kpi={kpi} />
          ))}
        </div>
        {/* Chart */}
        <ChartCardRecharts
          title={chartTitle}
          data={chartData}
          dataKey={'value'}
          height={250}
        />
        {/* Summary Section */}
        <style>{`
          @media (min-width: 800px) {
            .dashboard-summary-row {
              flex-direction: row !important;
              justify-content: center;
            }
          }
        `}</style>
        <div style={{ background: theme.colors.surface, border: `1px solid ${theme.colors.border}`, borderRadius: 12, marginTop: 32, padding: 24 }}>
          <h2 style={{ color: theme.colors.text, marginBottom: 16 }}>Résumé des performances</h2>
          <div className="dashboard-summary-row" style={{ display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'center' }}>
            {/* Meilleur magasin */}
            {bestStore && (
              <div className="card-3d-animated" style={{ minWidth: 220, textAlign: 'center', background: '#E6FFF2', borderRadius: 12, padding: 18, margin: 0, boxShadow: '0 2px 8px #10B98122' }}>
                <div style={{ color: theme.colors.success, fontWeight: 700, fontSize: 18, marginBottom: 4 }}>Meilleur magasin</div>
                <div style={{ color: theme.colors.text, fontWeight: 600, marginBottom: 2 }}>{bestStore.store.name}</div>
                <div style={{ color: theme.colors.success, fontWeight: 700, fontSize: 22 }}>{bestStore.total.toLocaleString('fr-FR')} €</div>
              </div>
            )}
            {/* Résumé principal */}
            <div className="card-3d-animated" style={{ minWidth: 220, textAlign: 'center', background: '#F8FAFC', borderRadius: 12, padding: 18, margin: 0, boxShadow: '0 2px 8px #6c4ccf22' }}>
              <div style={{ color: theme.colors.textSecondary, fontWeight: 600, marginBottom: 4 }}>Total des ventes</div>
              <div style={{ color: theme.colors.success, fontWeight: 700, fontSize: 20 }}>{resume.totalVentes.toLocaleString('fr-FR')} €</div>
              <div style={{ color: theme.colors.textSecondary, marginTop: 8, fontWeight: 600 }}>Nombre de tickets</div>
              <div style={{ color: theme.colors.text, fontWeight: 700, fontSize: 18 }}>{resume.totalTickets.toLocaleString('fr-FR')}</div>
              <div style={{ color: theme.colors.textSecondary, marginTop: 8, fontWeight: 600 }}>Panier moyen</div>
              <div style={{ color: theme.colors.warning, fontWeight: 700, fontSize: 18 }}>{Math.round(resume.panierMoyen).toLocaleString('fr-FR')} €</div>
            </div>
            {/* Moins bon magasin */}
            {worstStore && (
              <div className="card-3d-animated" style={{ minWidth: 220, textAlign: 'center', background: '#FFF0F0', borderRadius: 12, padding: 18, margin: 0, boxShadow: '0 2px 8px #EF444422' }}>
                <div style={{ color: theme.colors.error, fontWeight: 700, fontSize: 18, marginBottom: 4 }}>Moins bon magasin</div>
                <div style={{ color: theme.colors.text, fontWeight: 600, marginBottom: 2 }}>{worstStore.store.name}</div>
                <div style={{ color: theme.colors.error, fontWeight: 700, fontSize: 22 }}>{worstStore.total.toLocaleString('fr-FR')} €</div>
              </div>
            )}
          </div>
        </div>
        <FilterModal
          visible={showBrandFilter}
          onClose={() => setShowBrandFilter(false)}
          title="Filtrer par marque"
          options={brands}
          selectedOptions={selectedBrands}
          onApply={setSelectedBrands}
        />
        </div>
      </div>
    </div>
  );
} 
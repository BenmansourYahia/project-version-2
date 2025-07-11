export const mockStores = [
  {
    id: '1',
    name: 'Magasin Central Paris',
    code: 'PAR001',
    brand: 'Brand A',
    address: '15 Rue de la Paix, 75001 Paris',
    status: 'ouvert',
    performance: {
      ca: 25000,
      tickets: 150,
      panierMoyen: 166.67,
      objectif: 30000,
      objectifAtteint: 83.33
    },
    lastUpdate: '2024-01-15T14:30:00Z'
  },
  {
    id: '2',
    name: 'Magasin Lyon Centre',
    code: 'LYO001',
    brand: 'Brand B',
    address: '45 Rue de la République, 69002 Lyon',
    status: 'ouvert',
    performance: {
      ca: 18000,
      tickets: 120,
      panierMoyen: 150,
      objectif: 20000,
      objectifAtteint: 90
    },
    lastUpdate: '2024-01-15T14:25:00Z'
  },
  {
    id: '3',
    name: 'Magasin Marseille Vieux Port',
    code: 'MAR001',
    brand: 'Brand A',
    address: '12 Quai du Port, 13002 Marseille',
    status: 'fermé',
    performance: {
      ca: 15000,
      tickets: 90,
      panierMoyen: 166.67,
      objectif: 25000,
      objectifAtteint: 60
    },
    lastUpdate: '2024-01-15T18:00:00Z'
  }
];

export const mockKPIs = [
  {
    id: '1',
    name: 'Chiffre d\'affaires',
    value: 58000,
    previousValue: 52000,
    unit: '€',
    icon: 'TrendingUp',
    color: '#10B981'
  },
  {
    id: '2',
    name: 'Nombre de tickets',
    value: 360,
    previousValue: 340,
    unit: '',
    icon: 'Receipt',
    color: '#6c4ccf'
  },
  {
    id: '3',
    name: 'Panier moyen',
    value: 161.11,
    previousValue: 152.94,
    unit: '€',
    icon: 'ShoppingCart',
    color: '#8B5CF6'
  },
  {
    id: '4',
    name: 'Taux de transformation',
    value: 65.2,
    previousValue: 62.8,
    unit: '%',
    icon: 'Target',
    color: '#F59E0B'
  },
  {
    id: '5',
    name: 'Objectifs',
    value: 75,
    previousValue: 70,
    unit: '%',
    icon: 'Award',
    color: '#EF4444',
    objective: 100
  }
];

export const mockStock = [
  {
    id: '1',
    code: 'PRD001',
    designation: 'T-shirt Blanc Coton Bio',
    quantite: 25,
    status: 'disponible',
    seuil: 10,
    lastUpdate: '2024-01-15T14:30:00Z'
  },
  {
    id: '2',
    code: 'PRD002',
    designation: 'Jean Slim Bleu Délavé',
    quantite: 5,
    status: 'stock_faible',
    seuil: 8,
    lastUpdate: '2024-01-15T14:25:00Z'
  },
  {
    id: '3',
    code: 'PRD003',
    designation: 'Robe Été Fleurie',
    quantite: 0,
    status: 'rupture',
    seuil: 5,
    lastUpdate: '2024-01-15T14:20:00Z'
  },
  {
    id: '4',
    code: 'PRD004',
    designation: 'Sneakers Cuir Blanc',
    quantite: 15,
    status: 'disponible',
    seuil: 12,
    lastUpdate: '2024-01-15T14:15:00Z'
  },
  {
    id: '5',
    code: 'PRD005',
    designation: 'Sac à Main Cuir Noir',
    quantite: 3,
    status: 'stock_faible',
    seuil: 6,
    lastUpdate: '2024-01-15T14:10:00Z'
  }
];

export const mockUser = {
  id: '1',
  nom: 'Dupont',
  prenom: 'Jean',
  email: 'jean.dupont@store.com',
  telephone: '+33 1 23 45 67 89',
  role: 'Manager Régional',
  magasins: ['PAR001', 'LYO001']
};

export const mockPerformances = [
  {
    magasin: 'PAR001',
    periode: '2024-01-15',
    ca: 25000,
    tickets: 150,
    panierMoyen: 166.67,
    prixMoyen: 45.50,
    debitMoyen: 12.5,
    tauxTransformation: 68.2,
    quantiteVendue: 320,
    montantTotal: 25000
  },
  {
    magasin: 'LYO001',
    periode: '2024-01-15',
    ca: 18000,
    tickets: 120,
    panierMoyen: 150,
    prixMoyen: 42.30,
    debitMoyen: 10.8,
    tauxTransformation: 65.5,
    quantiteVendue: 280,
    montantTotal: 18000
  }
];

export const brands = ['Brand A', 'Brand B', 'Brand C', 'Brand D'];
export const regions = ['Paris', 'Lyon', 'Marseille', 'Toulouse', 'Nice'];

// Données pour les graphiques
export const salesEvolutionData = [
  { name: 'Lun', value: 12000, tickets: 80 },
  { name: 'Mar', value: 15000, tickets: 95 },
  { name: 'Mer', value: 18000, tickets: 110 },
  { name: 'Jeu', value: 22000, tickets: 130 },
  { name: 'Ven', value: 28000, tickets: 165 },
  { name: 'Sam', value: 35000, tickets: 200 },
  { name: 'Dim', value: 25000, tickets: 145 },
];

export const storePerformanceData = [
  { name: 'Paris Central', value: 25000 },
  { name: 'Lyon Centre', value: 18000 },
  { name: 'Marseille VP', value: 15000 },
  { name: 'Toulouse', value: 12000 },
  { name: 'Nice', value: 10000 },
];

export const brandDistributionData = [
  { name: 'Brand A', value: 45, color: '#6c4ccf' },
  { name: 'Brand B', value: 30, color: '#10B981' },
  { name: 'Brand C', value: 15, color: '#F59E0B' },
  { name: 'Brand D', value: 10, color: '#EF4444' },
];

export const monthlyTrendsData = [
  { name: 'Jan', ca: 180000, objectif: 200000 },
  { name: 'Fév', ca: 195000, objectif: 200000 },
  { name: 'Mar', ca: 220000, objectif: 210000 },
  { name: 'Avr', ca: 205000, objectif: 215000 },
  { name: 'Mai', ca: 240000, objectif: 220000 },
  { name: 'Jun', ca: 260000, objectif: 225000 },
];

export const hourlyPerformanceData = [
  { name: '9h', value: 1200 },
  { name: '10h', value: 2800 },
  { name: '11h', value: 4200 },
  { name: '12h', value: 5800 },
  { name: '13h', value: 4500 },
  { name: '14h', value: 6200 },
  { name: '15h', value: 7800 },
  { name: '16h', value: 8500 },
  { name: '17h', value: 9200 },
  { name: '18h', value: 7800 },
  { name: '19h', value: 6500 },
  { name: '20h', value: 4200 },
];
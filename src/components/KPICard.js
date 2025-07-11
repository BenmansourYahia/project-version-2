import React from 'react';
import { TrendingUp, TrendingDown, Receipt, ShoppingCart, Target, Award } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const iconMap = {
  TrendingUp,
  TrendingDown,
  Receipt,
  ShoppingCart,
  Target,
  Award,
};

export default function KPICard({ kpi }) {
  const { theme } = useTheme();
  const Icon = iconMap[kpi.icon] || TrendingUp;
  const variation = ((kpi.value - kpi.previousValue) / kpi.previousValue) * 100;
  const isPositive = variation > 0;

  const formatValue = (value) => {
    if (kpi.unit === '€') {
      return `${Math.round(value).toLocaleString('fr-FR')}€`;
    }
    if (kpi.unit === '%') {
      return `${value.toFixed(1)}%`;
    }
    return Math.round(value).toLocaleString('fr-FR');
  };

  return (
    <div style={{
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: theme.colors.border,
      borderRadius: 12,
      padding: 16,
      margin: 8,
      minWidth: 160,
      background: theme.colors.surface,
      flex: 1,
      boxSizing: 'border-box',
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
      }}>
        <div style={{
          width: 48,
          height: 48,
          borderRadius: 24,
          background: `${kpi.color}20`,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Icon size={24} color={kpi.color} />
        </div>
        <div style={{ alignItems: 'flex-end', display: 'flex' }}>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            padding: '4px 8px',
            borderRadius: 12,
            background: isPositive ? `${theme.colors.success}20` : `${theme.colors.error}20`,
          }}>
            {isPositive ? (
              <TrendingUp size={16} color={theme.colors.success} />
            ) : (
              <TrendingDown size={16} color={theme.colors.error} />
            )}
            <span style={{
              fontSize: 12,
              fontWeight: 600,
              marginLeft: 4,
              color: isPositive ? theme.colors.success : theme.colors.error,
            }}>{variation.toFixed(1)}%</span>
          </div>
        </div>
      </div>
      <div style={{
        fontSize: 14,
        fontWeight: 500,
        marginBottom: 4,
        color: theme.colors.textSecondary,
      }}>{kpi.name}</div>
      <div style={{
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
        color: theme.colors.text,
      }}>{formatValue(kpi.value)}</div>
      {kpi.objective && (
        <div style={{ marginTop: 8 }}>
          <div style={{
            height: 6,
            borderRadius: 3,
            overflow: 'hidden',
            marginBottom: 4,
            background: theme.colors.border,
          }}>
            <div style={{
              height: '100%',
              borderRadius: 3,
              width: `${Math.min((kpi.value / kpi.objective) * 100, 100)}%`,
              background: kpi.color,
              transition: 'width 0.3s',
            }} />
          </div>
          <div style={{
            fontSize: 12,
            textAlign: 'center',
            color: theme.colors.textSecondary,
          }}>{kpi.value.toFixed(1)}/{kpi.objective} ({((kpi.value / kpi.objective) * 100).toFixed(0)}%)</div>
        </div>
      )}
    </div>
  );
} 
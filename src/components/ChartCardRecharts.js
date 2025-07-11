import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area } from 'recharts';
import { useTheme } from '../hooks/useTheme';

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length > 0) {
    return (
      <div style={{
        background: '#fff',
        border: '1px solid #1E5AA8',
        borderRadius: 8,
        padding: 8,
        color: '#1E5AA8',
        fontWeight: 600,
        minWidth: 80,
        textAlign: 'center',
        boxShadow: '0 2px 8px rgba(30,90,168,0.08)'
      }}>
        <div style={{ color: '#1E5AA8', marginBottom: 4 }}>{label}</div>
        <div style={{ color: '#222', fontWeight: 700, fontSize: 16 }}>{payload[0].value.toLocaleString('fr-FR')}</div>
      </div>
    );
  }
  return null;
}

export default function ChartCardRecharts({ title, data, dataKey = 'value', xAxisKey = 'name', height = 250 }) {
  const { theme } = useTheme();

  return (
    <div style={{
      borderRadius: 16,
      border: `1px solid ${theme.colors.border}`,
      padding: 16,
      margin: '8px 16px',
      background: theme.colors.surface,
      maxWidth: 900,
      width: '100%'
    }}>
      <div style={{
        fontSize: 18,
        fontWeight: 600,
        marginBottom: 16,
        textAlign: 'center',
        color: theme.colors.text
      }}>
        {title}
      </div>
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={theme.colors.border} />
          <XAxis dataKey={xAxisKey} stroke={theme.colors.textSecondary} />
          <YAxis stroke={theme.colors.textSecondary} />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey={dataKey}
            stroke={theme.colors.primary}
            fill={theme.colors.primary}
            fillOpacity={0.12}
          />
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke={theme.colors.primary}
            strokeWidth={3}
            dot={{ r: 5, stroke: "#fff", strokeWidth: 2 }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
} 
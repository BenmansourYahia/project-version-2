import React, { useState } from 'react';
import { useTheme } from '../hooks/useTheme';

export default function ChartCard({
  title,
  type,
  data,
  dataKey = 'value',
  xAxisKey = 'name',
  color,
  height = 200
}) {
  const { theme } = useTheme();
  const chartColor = color || theme.colors.primary;
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const chartWidth = Math.min((typeof window !== 'undefined' ? window.innerWidth : 400) - 64, 800);
  const chartHeight = height - 60;

  if (!data || data.length === 0) {
    return (
      <div style={{ borderRadius: 16, border: `1px solid ${theme.colors.border}`, padding: 16, margin: '8px 16px', background: theme.colors.surface }}>
        <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 16, textAlign: 'center', color: theme.colors.text }}>{title}</div>
        <div style={{ height: 200, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <span style={{ fontSize: 16, color: theme.colors.textSecondary }}>Aucune donnée disponible</span>
        </div>
      </div>
    );
  }

  const getMaxValue = () => Math.max(...data.map(item => Number(item[dataKey]) || 0));
  const getMinValue = () => Math.min(...data.map(item => Number(item[dataKey]) || 0));

  const renderLineChart = () => {
    const maxValue = getMaxValue();
    const minValue = getMinValue();
    if (maxValue === 0) return null;
    const stepX = chartWidth / Math.max(data.length - 1, 1);
    const stepY = chartHeight / (maxValue - minValue || 1);
    let pathData = '';
    let areaData = '';
    const points = [];
    data.forEach((item, index) => {
      const x = index * stepX;
      const y = chartHeight - ((Number(item[dataKey]) - minValue) * stepY);
      points.push({ x, y, value: Number(item[dataKey]) || 0, label: item[xAxisKey] });
      if (index === 0) {
        pathData += `M${x},${y}`;
        areaData += `M${x},${chartHeight} L${x},${y}`;
      } else {
        pathData += `L${x},${y}`;
        areaData += `L${x},${y}`;
      }
    });
    // Close the area path
    areaData += `L${(data.length - 1) * stepX},${chartHeight} Z`;

    // Y-axis ticks
    const yTicks = 5;
    const yLabels = Array.from({ length: yTicks }, (_, i) => {
      const v = maxValue - ((maxValue - minValue) * i) / (yTicks - 1);
      return Math.round(v / 1000) * 1000; // round to nearest 1000 for clarity
    });

    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
        <svg width={chartWidth + 50} height={chartHeight + 50} style={{ overflow: 'visible', maxWidth: '100%' }}>
          {/* Y-axis grid lines and labels */}
          {yLabels.map((label, i) => {
            const y = (chartHeight * i) / (yTicks - 1);
            return (
              <g key={`ygrid-${i}`}>
                <line
                  x1={40}
                  y1={y}
                  x2={chartWidth + 40}
                  y2={y}
                  stroke={theme.colors.border}
                  strokeWidth={1}
                  strokeDasharray="3,3"
                />
                <text
                  x={35}
                  y={y + 4}
                  fontSize={12}
                  fill={theme.colors.textSecondary}
                  textAnchor="end"
                >
                  {label.toLocaleString('fr-FR')}
                </text>
              </g>
            );
          })}
          {/* Area fill under the line */}
          <path
            d={areaData}
            fill={chartColor}
            opacity={0.12}
          />
          {/* Main line */}
          <path
            d={pathData}
            stroke={chartColor}
            strokeWidth={3}
            fill="none"
          />
          {/* Points and tooltips */}
          {points.map((point, index) => (
            <g key={`point-${index}`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{ cursor: 'pointer' }}
            >
              <circle
                cx={point.x + 40}
                cy={point.y}
                r={5}
                fill={chartColor}
                stroke="#FFFFFF"
                strokeWidth={2}
              />
              {/* Tooltip */}
              {hoveredIndex === index && (
                <g>
                  <rect
                    x={point.x + 25}
                    y={point.y - 40}
                    width="70"
                    height="32"
                    rx="8"
                    fill={theme.colors.surface}
                    stroke={theme.colors.primary}
                    strokeWidth={1}
                    filter="url(#shadow)"
                  />
                  <text
                    x={point.x + 60}
                    y={point.y - 25}
                    fontSize={13}
                    fill={theme.colors.text}
                    textAnchor="middle"
                    fontWeight="bold"
                  >
                    {point.value.toLocaleString('fr-FR')}
                  </text>
                  <text
                    x={point.x + 60}
                    y={point.y - 10}
                    fontSize={12}
                    fill={theme.colors.textSecondary}
                    textAnchor="middle"
                  >
                    {point.label}
                  </text>
                </g>
              )}
            </g>
          ))}
          {/* X-axis labels */}
          {data.map((item, index) => (
            <text
              key={`xlabel-${index}`}
              x={index * stepX + 40}
              y={chartHeight + 30}
              fontSize={13}
              fill={theme.colors.textSecondary}
              textAnchor="middle"
            >
              {String(item[xAxisKey] || '')}
            </text>
          ))}
          {/* Y-axis line */}
          <line
            x1={40}
            y1={0}
            x2={40}
            y2={chartHeight}
            stroke={theme.colors.border}
            strokeWidth={2}
          />
        </svg>
      </div>
    );
  };

  const renderBarChart = () => {
    const maxValue = getMaxValue();
    if (maxValue === 0) return null;
    const barWidth = (chartWidth / data.length) * 0.7;
    const barSpacing = (chartWidth / data.length) * 0.3;
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <svg width={chartWidth} height={chartHeight + 30} style={{ overflow: 'visible' }}>
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => (
            <line
              key={`grid-${index}`}
              x1={0}
              y1={chartHeight * ratio}
              x2={chartWidth}
              y2={chartHeight * ratio}
              stroke={theme.colors.border}
              strokeWidth={1}
              strokeDasharray="3,3"
            />
          ))}
          {data.map((item, index) => {
            const value = Number(item[dataKey]) || 0;
            const barHeight = (value / maxValue) * chartHeight;
            const x = index * (barWidth + barSpacing) + barSpacing / 2;
            const y = chartHeight - barHeight;
            return (
              <g key={`bar-${index}`}>
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  fill={chartColor}
                  rx={4}
                />
                <text
                  x={x + barWidth / 2}
                  y={chartHeight + 20}
                  fontSize={12}
                  fill={theme.colors.textSecondary}
                  textAnchor="middle"
                >
                  {String(item[xAxisKey] || '')}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    );
  };

  const renderPieChart = () => {
    const total = data.reduce((sum, item) => sum + (Number(item[dataKey]) || 0), 0);
    if (total === 0) return null;
    const centerX = chartWidth / 2;
    const centerY = chartHeight / 2;
    const radius = Math.min(centerX, centerY) - 30;
    const colors = [
      theme.colors.primary,
      theme.colors.secondary,
      theme.colors.success,
      theme.colors.warning,
      theme.colors.error,
      '#8B5CF6',
      '#F59E0B',
      '#EF4444'
    ];
    let currentAngle = -Math.PI / 2;
    const slices = data.map((item, index) => {
      const value = Number(item[dataKey]) || 0;
      const percentage = value / total;
      const angle = percentage * 2 * Math.PI;
      const endAngle = currentAngle + angle;
      const x1 = centerX + radius * Math.cos(currentAngle);
      const y1 = centerY + radius * Math.sin(currentAngle);
      const x2 = centerX + radius * Math.cos(endAngle);
      const y2 = centerY + radius * Math.sin(endAngle);
      const largeArcFlag = angle > Math.PI ? 1 : 0;
      const pathData = [
        `M${centerX},${centerY}`,
        `L${x1},${y1}`,
        `A${radius},${radius} 0 ${largeArcFlag},1 ${x2},${y2}`,
        'Z'
      ].join(' ');
      const result = (
        <path
          key={`slice-${index}`}
          d={pathData}
          fill={colors[index % colors.length]}
          stroke="#FFFFFF"
          strokeWidth={2}
        />
      );
      currentAngle = endAngle;
      return result;
    });
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <svg width={chartWidth} height={chartHeight} style={{ overflow: 'visible' }}>
          {slices}
        </svg>
        <div style={{ marginTop: 16, width: '100%' }}>
          {data.map((item, index) => {
            const value = Number(item[dataKey]) || 0;
            const percentage = ((value / total) * 100).toFixed(1);
            return (
              <div key={`legend-${index}`} style={{ display: 'flex', alignItems: 'center', margin: '4px 0', paddingLeft: 8 }}>
                <div style={{ width: 12, height: 12, borderRadius: 6, marginRight: 8, background: colors[index % colors.length] }} />
                <span style={{ fontSize: 14, color: theme.colors.text }}>
                  {String(item[xAxisKey] || '')} ({percentage}%)
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderChart = () => {
    try {
      switch (type) {
        case 'line':
          return renderLineChart();
        case 'bar':
          return renderBarChart();
        case 'pie':
          return renderPieChart();
        default:
          return renderLineChart();
      }
    } catch (error) {
      console.warn('Erreur lors du rendu du graphique:', error);
      return (
        <div style={{ height: 200, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <span style={{ fontSize: 16, color: theme.colors.error }}>Erreur lors du chargement du graphique</span>
        </div>
      );
    }
  };

  return (
    <div style={{ borderRadius: 16, border: `1px solid ${theme.colors.border}`, padding: 16, margin: '8px 16px', background: theme.colors.surface, maxWidth: 900, width: '100%' }}>
      <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 16, textAlign: 'center', color: theme.colors.text }}>{title}</div>
      {type === 'line' && renderLineChart()}
      {type === 'bar' && renderBarChart && renderBarChart()}
      {type === 'pie' && renderPieChart && renderPieChart()}
    </div>
  );
} 
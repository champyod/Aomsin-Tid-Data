"use client";

import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ScatterChart,
  Scatter,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { GlassCard } from './ui/GlassCard';

export type ChartType = "area" | "bar" | "line" | "pie" | "radar" | "scatter" | "composed";

export interface ChartSeries {
  dataKey: string;
  name: string;
  variant?: string; // Color variant name (e.g., 'chart-1', 'pink', 'primary')
  type?: "bar" | "line" | "area" | "scatter"; // For composed charts
  stackId?: string;
}

export interface ChartConfig {
  title: string;
  type: ChartType;
  description?: string;
  xAxis?: {
    dataKey: string;
    label?: string;
  };
  yAxis?: {
    label?: string;
    unit?: string;
  };
  series: ChartSeries[];
  data: any[];
  order?: number;
  size?: "full" | "half"; // Layout size
  variant?: string; // Optional overall chart variant
}

interface UniversalChartProps {
  config: ChartConfig;
  className?: string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-crust/90 backdrop-blur-md border border-primary/20 p-3 rounded-lg shadow-xl">
        <p className="text-text font-medium mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }} className="text-sm">
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

/**
 * Catppuccin Mocha color palette - hardcoded fallbacks in case CSS vars fail
 */
const CHART_COLORS = [
  '#f5c2e7', // chart-1: Pink
  '#cba6f7', // chart-2: Mauve
  '#89b4fa', // chart-3: Blue
  '#a6e3a1', // chart-4: Green
  '#fab387', // chart-5: Peach
  '#f9e2af', // chart-6: Yellow
  '#eba0ac', // chart-7: Maroon
  '#94e2d5', // chart-8: Teal
  '#89dceb', // chart-9: Sky
  '#f38ba8', // chart-10: Red
];

const NAMED_COLORS: Record<string, string> = {
  pink: '#f5c2e7',
  mauve: '#cba6f7',
  blue: '#89b4fa',
  green: '#a6e3a1',
  peach: '#fab387',
  yellow: '#f9e2af',
  maroon: '#eba0ac',
  teal: '#94e2d5',
  sky: '#89dceb',
  red: '#f38ba8',
  primary: '#f5c2e7',
  secondary: '#cba6f7',
  success: '#a6e3a1',
  warning: '#fab387',
  error: '#f38ba8',
  info: '#89b4fa',
};

/**
 * Resolves a variant name to a color with CSS variable + fallback.
 * All colors use Catppuccin Mocha Pink theme defined in global.css.
 *
 * @param variant - Variant name (e.g., 'chart-1', 'pink', 'primary')
 * @param index - Fallback index for auto-generated variant
 * @returns CSS variable string with fallback color
 */
const getSeriesColor = (variant: string | undefined, index: number): string => {
  // Auto-assign chart-N variant if not provided
  if (!variant) {
    variant = `chart-${(index % 10) + 1}`; // Cycle through chart-1 to chart-10
  }

  // Get fallback color
  let fallback: string;
  if (variant.startsWith('chart-')) {
    const num = parseInt(variant.replace('chart-', ''));
    fallback = CHART_COLORS[(num - 1) % CHART_COLORS.length];
  } else {
    fallback = NAMED_COLORS[variant] || CHART_COLORS[index % CHART_COLORS.length];
  }

  // Return CSS variable with fallback
  if (variant.startsWith('chart-')) {
    return `var(--color-${variant}, ${fallback})`;
  } else {
    return `var(--color-variant-${variant}, ${fallback})`;
  }
};

/**
 * Determine a per-chart palette (array of colors).
 * - If a chart-level `variant` is provided, rotate the base palette to start with that color.
 * - Otherwise pick a deterministic rotation based on the chart title so different charts get different schemes.
 */
const getChartPalette = (chartVariant?: string, title?: string): string[] => {
  const base = CHART_COLORS;
  const rotate = (arr: string[], offset: number) => arr.slice(offset).concat(arr.slice(0, offset));

  if (chartVariant) {
    if (chartVariant.startsWith('chart-')) {
      const num = parseInt(chartVariant.replace('chart-', ''), 10);
      const offset = (num - 1) % base.length;
      return rotate(base, offset);
    }
    const named = NAMED_COLORS[chartVariant];
    if (named) {
      const idx = base.findIndex(c => c.toLowerCase() === named.toLowerCase());
      return rotate(base, idx === -1 ? 0 : idx);
    }
    return base;
  }

  if (title) {
    const hash = Array.from(title).reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
    const offset = hash % base.length;
    return rotate(base, offset);
  }

  return base;
};

export const UniversalChart: React.FC<UniversalChartProps> = ({ config, className }) => {
  const { type, data, xAxis, yAxis, series, title, description } = config;
  const chartPalette = getChartPalette(config.variant, title);

  const renderChart = () => {
    switch (type) {
      case 'bar':
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(245,194,231,0.1)" />
            <XAxis
              dataKey={xAxis?.dataKey}
              stroke="var(--color-overlay-1)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="var(--color-overlay-1)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              unit={yAxis?.unit}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
            />
            <Legend wrapperStyle={{ color: 'var(--color-text)' }} iconType="circle" />
            {series.map((s, i) => {
              const color = s.variant ? getSeriesColor(s.variant, i) : chartPalette[i % chartPalette.length];
              return (
                <Bar
                  key={s.dataKey}
                  dataKey={s.dataKey}
                  name={s.name}
                  fill={color}
                  fillOpacity={0.8}
                  radius={[4, 4, 0, 0]}
                  stackId={s.stackId}
                  activeBar={{
                    fillOpacity: 1,
                    stroke: color,
                    strokeWidth: 1,
                    filter: 'brightness(1.1)'
                  }}
                />
              );
            })}
          </BarChart>
        );

      case 'line':
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(245,194,231,0.15)" />
            <XAxis
              dataKey={xAxis?.dataKey}
              stroke="var(--color-overlay-1)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="var(--color-overlay-1)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              unit={yAxis?.unit}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
            />
            <Legend wrapperStyle={{ color: 'var(--color-text)' }} iconType="circle" />
            {series.map((s, i) => {
              const color = s.variant ? getSeriesColor(s.variant, i) : chartPalette[i % chartPalette.length];
              return (
                <Line
                  key={s.dataKey}
                  type="monotone"
                  dataKey={s.dataKey}
                  name={s.name}
                  stroke={color}
                  strokeWidth={2}
                  strokeOpacity={0.8}
                  dot={{ r: 4, strokeWidth: 0, fill: color, fillOpacity: 0.8 }}
                  activeDot={{ r: 6, strokeWidth: 0, fill: color, fillOpacity: 0.8 }}
                />
              );
            })}
          </LineChart>
        );

      case 'area':
        return (
          <AreaChart data={data}>
            <defs>
              {series.map((s, i) => (
                <linearGradient key={s.dataKey} id={`color${s.dataKey}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={s.variant ? getSeriesColor(s.variant, i) : chartPalette[i % chartPalette.length]} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={s.variant ? getSeriesColor(s.variant, i) : chartPalette[i % chartPalette.length]} stopOpacity={0}/>
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(245,194,231,0.15)" />
            <XAxis
              dataKey={xAxis?.dataKey}
              stroke="var(--color-overlay-1)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="var(--color-overlay-1)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              unit={yAxis?.unit}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
            />
            <Legend wrapperStyle={{ color: 'var(--color-text)' }} iconType="circle" />
            {series.map((s, i) => {
              const color = getSeriesColor(s.variant, i);
              return (
                <Area
                  key={s.dataKey}
                  type="monotone"
                  dataKey={s.dataKey}
                  name={s.name}
                  stroke={color}
                  strokeOpacity={0.8}
                  fillOpacity={1}
                  fill={`url(#color${s.dataKey})`}
                  stackId={s.stackId}
                  activeDot={{ r: 6, strokeWidth: 0, fill: color, fillOpacity: 0.8 }}
                />
              );
            })}
          </AreaChart>
        );

      case 'radar':
        return (
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid stroke="rgba(245,194,231,0.15)" />
            <PolarAngleAxis dataKey={xAxis?.dataKey} tick={{ fill: 'var(--color-overlay-1)', fontSize: 12 }} />
            <PolarRadiusAxis angle={30} domain={[0, 'auto']} tick={false} axisLine={false} />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
            />
            <Legend wrapperStyle={{ color: 'var(--color-text)' }} iconType="circle" />
            {series.map((s, i) => {
              const color = s.variant ? getSeriesColor(s.variant, i) : chartPalette[i % chartPalette.length];
              return (
                <Radar
                  key={s.dataKey}
                  name={s.name}
                  dataKey={s.dataKey}
                  stroke={color}
                  strokeOpacity={0.8}
                  fill={color}
                  fillOpacity={0.5}
                />
              );
            })}
          </RadarChart>
        );

      case 'pie':
        // Pie chart handles data differently, generally one series with nameKey and dataKey
        // We'll assume the first series defines the value key and name key usage
        const pieValueKey = series[0]?.dataKey;
        const pieNameKey = xAxis?.dataKey || "name";

        // Custom label with theme colors
        const renderPieLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }: any) => {
          const RADIAN = Math.PI / 180;
          const radius = outerRadius + 25;
          const x = cx + radius * Math.cos(-midAngle * RADIAN);
          const y = cy + radius * Math.sin(-midAngle * RADIAN);

          return (
            <text
              x={x}
              y={y}
              fill="var(--color-text)"
              textAnchor={x > cx ? 'start' : 'end'}
              dominantBaseline="central"
              style={{ fontSize: '12px', fontWeight: '500' }}
            >
              {`${name} ${(percent * 100).toFixed(0)}%`}
            </text>
          );
        };

        return (
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={{ stroke: 'var(--color-overlay-1)', strokeWidth: 1 }}
              label={renderPieLabel}
              outerRadius={80}
              dataKey={pieValueKey}
              nameKey={pieNameKey}
              fillOpacity={0.8}
              activeIndex={undefined}
              activeShape={false}
            >
               {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={series[0]?.variant ? getSeriesColor(series[0]?.variant, index) : chartPalette[index % chartPalette.length]}
                />
              ))}
            </Pie>
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
            />
            <Legend
              wrapperStyle={{ color: 'var(--color-text)' }}
              iconType="circle"
            />
          </PieChart>
        );

      case 'composed':
        return (
          <ComposedChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(245,194,231,0.15)" />
            <XAxis
              dataKey={xAxis?.dataKey}
              stroke="var(--color-overlay-1)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="var(--color-overlay-1)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              unit={yAxis?.unit}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
            />
            <Legend wrapperStyle={{ color: 'var(--color-text)' }} iconType="circle" />
            {series.map((s, i) => {
              const color = s.variant ? getSeriesColor(s.variant, i) : chartPalette[i % chartPalette.length];
              const commonProps = {
                dataKey: s.dataKey,
                name: s.name,
                fill: color,
                stroke: color,
              };

              if (s.type === 'bar') {
                return <Bar key={s.dataKey} {...commonProps} fillOpacity={0.8} activeBar={{ fill: color, fillOpacity: 0.8, stroke: color, strokeWidth: 2 }} radius={[4, 4, 0, 0]} />;
              }
              if (s.type === 'line') {
                return (
                  <Line
                    key={s.dataKey}
                    {...commonProps}
                    type="monotone"
                    strokeWidth={2}
                    strokeOpacity={0.8}
                    dot={{ r: 4, fill: color, fillOpacity: 0.8 }}
                    activeDot={{ r: 6, fill: color, fillOpacity: 0.8 }}
                  />
                );
              }
              if (s.type === 'area') {
                return <Area key={s.dataKey} {...commonProps} type="monotone" fillOpacity={0.3} strokeOpacity={0.8} />;
              }
              if (s.type === 'scatter') {
                return <Scatter key={s.dataKey} {...commonProps} fillOpacity={0.8} />;
              }

              return <Line key={s.dataKey} {...commonProps} type="monotone" strokeOpacity={0.8} />; // Fallback
            })}
          </ComposedChart>
        );

      default:
        return (
          <div className="flex items-center justify-center h-full text-white/50">
            Unsupported chart type: {type}
          </div>
        );
    }
  };

  return (
    <GlassCard className={`p-6 ${className}`}>
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        {description && <p className="text-white/60 text-sm">{description}</p>}
      </div>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
};

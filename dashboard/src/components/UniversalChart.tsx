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
  color?: string;
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
}

interface UniversalChartProps {
  config: ChartConfig;
  className?: string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black border border-[#333333] p-3 rounded-lg shadow-xl">
        <p className="text-white font-medium mb-1">{label}</p>
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

export const UniversalChart: React.FC<UniversalChartProps> = ({ config, className }) => {
  const { type, data, xAxis, yAxis, series, title, description } = config;

  const renderChart = () => {
    switch (type) {
      case 'bar':
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey={xAxis?.dataKey} 
              stroke="#888888" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
            />
            <YAxis 
              stroke="#888888" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false}
              unit={yAxis?.unit}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {series.map((s, i) => (
              <Bar 
                key={s.dataKey} 
                dataKey={s.dataKey} 
                name={s.name} 
                fill={s.color || `hsl(${i * 45}, 70%, 50%)`} 
                radius={[4, 4, 0, 0]}
                stackId={s.stackId}
              />
            ))}
          </BarChart>
        );

      case 'line':
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey={xAxis?.dataKey} 
              stroke="#888888" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
            />
            <YAxis 
              stroke="#888888" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false}
              unit={yAxis?.unit}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {series.map((s, i) => (
              <Line 
                key={s.dataKey} 
                type="monotone" 
                dataKey={s.dataKey} 
                name={s.name} 
                stroke={s.color || `hsl(${i * 45}, 70%, 50%)`} 
                strokeWidth={2}
                dot={{ r: 4, strokeWidth: 0, fill: s.color || `hsl(${i * 45}, 70%, 50%)` }}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            ))}
          </LineChart>
        );

      case 'area':
        return (
          <AreaChart data={data}>
            <defs>
              {series.map((s, i) => (
                <linearGradient key={s.dataKey} id={`color${s.dataKey}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={s.color || `hsl(${i * 45}, 70%, 50%)`} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={s.color || `hsl(${i * 45}, 70%, 50%)`} stopOpacity={0}/>
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey={xAxis?.dataKey} 
              stroke="#888888" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
            />
            <YAxis 
              stroke="#888888" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false}
              unit={yAxis?.unit}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {series.map((s, i) => (
              <Area 
                key={s.dataKey} 
                type="monotone" 
                dataKey={s.dataKey} 
                name={s.name} 
                stroke={s.color || `hsl(${i * 45}, 70%, 50%)`} 
                fillOpacity={1} 
                fill={`url(#color${s.dataKey})`} 
                stackId={s.stackId}
              />
            ))}
          </AreaChart>
        );
      
      case 'radar':
        return (
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid stroke="rgba(255,255,255,0.1)" />
            <PolarAngleAxis dataKey={xAxis?.dataKey} tick={{ fill: '#888888', fontSize: 12 }} />
            <PolarRadiusAxis angle={30} domain={[0, 'auto']} tick={false} axisLine={false} />
            <Tooltip />
            <Legend />
            {series.map((s, i) => (
              <Radar
                key={s.dataKey}
                name={s.name}
                dataKey={s.dataKey}
                stroke={s.color || `hsl(${i * 45}, 70%, 50%)`}
                fill={s.color || `hsl(${i * 45}, 70%, 50%)`}
                fillOpacity={0.6}
              />
            ))}
          </RadarChart>
        );

      case 'pie':
        // Pie chart handles data differently, generally one series with nameKey and dataKey
        // We'll assume the first series defines the value key and name key usage
        const pieValueKey = series[0]?.dataKey;
        const pieNameKey = xAxis?.dataKey || "name";

        return (
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }: any) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey={pieValueKey}
              nameKey={pieNameKey}
            >
               {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={series[0]?.color || `hsl(${index * 45 % 360}, 70%, 50%)`} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        );

      case 'composed':
        return (
          <ComposedChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey={xAxis?.dataKey} 
              stroke="#888888" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
            />
            <YAxis 
              stroke="#888888" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false}
              unit={yAxis?.unit}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {series.map((s, i) => {
              const commonProps = {
                key: s.dataKey,
                dataKey: s.dataKey,
                name: s.name,
                fill: s.color || `hsl(${i * 45}, 70%, 50%)`,
                stroke: s.color || `hsl(${i * 45}, 70%, 50%)`,
              };
              
              if (s.type === 'bar') return <Bar {...commonProps} />;
              if (s.type === 'line') return <Line type="monotone" strokeWidth={2} dot={{r:4}} {...commonProps} />;
              if (s.type === 'area') return <Area type="monotone" fillOpacity={0.3} {...commonProps} />;
              if (s.type === 'scatter') return <Scatter {...commonProps} />;
              
              return <Line type="monotone" {...commonProps} />; // Fallback
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

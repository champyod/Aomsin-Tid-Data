'use client';

import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { ScrollGlassCard } from "@/components/ui/ScrollGlassCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Activity, Fuel, Palette, Car } from "lucide-react";
import { getBasePath } from "@/utils/basePath";
import { fetchToml } from "@/utils/tomlLoader";
import { UniversalChart, ChartConfig } from "@/components/UniversalChart";

interface AnalysisData {
  metrics: unknown;
  price_trend: { year: string; avg_price: number }[];
  engine_distribution: { name: string; value: number }[];
  status_distribution: { name: string; value: number; percentage: number }[];
  color_distribution: { name: string; value: number }[];
  price_by_engine: { engine: string; avg_price: number }[];
}

export default function AnalysisPage() {
  const [data, setData] = useState<AnalysisData | null>(null);
  const [demoConfig, setDemoConfig] = useState<ChartConfig | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const basePath = getBasePath();
      try {
        // Fetch Real Data
        const realData = await fetchToml(`${basePath}/data/analysis/analysis_summary.toml`);
        if (realData) {
            setData(realData as unknown as AnalysisData);
        } else {
            // Fallback? The user said "if there is any file... mean it is real data so overwrite this demo data".
            // Implies we can start with Demo or just wait for Real.
            // If real is missing, maybe we try to fetch demo?
            // "bring back all demo data file ... and if there is any file ion same dir that mean it is real data so overwrite this demo in frontend"
            // So: Fetch Demo first? Or parallel?
            // Let's keep it simple: If real is loaded, great.
            console.warn("Real analysis data missing.");
        }
        
        // Fetch Demo Config (Always fetch, overwrite if real exists - logic happens in how we display it, 
        // or we allow both to exist side-by-side if they represent different things.
        // But here 'demoConfig' drives the 'UniversalChart'. 
        // We should try to load 'demo_chart.toml'.
        const demo = await fetchToml(`${basePath}/data/analysis/demo_chart.toml`);
        if (demo) {
            setDemoConfig(demo as unknown as ChartConfig);
        }

      } catch (err) {
        console.error("Error loading data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-[50vh] flex items-center justify-center text-primary">
          <Activity className="w-10 h-10 animate-pulse" />
        </div>
      </Layout>
    );
  }

  // Tooltip Style Constant
  const tooltipStyle = { 
    backgroundColor: "#000000", 
    borderRadius: "12px", 
    border: "1px solid #333333", 
    color: "#ffffff",
    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.8)"
  };

  return (
    <Layout>
      <div className="space-y-6">
        <ScrollReveal direction="none">
          <h2 className="text-2xl font-bold text-white">Detailed Analysis</h2>
        </ScrollReveal>
        
        {demoConfig && (
          <ScrollReveal direction="down" className="mb-8">
            <UniversalChart config={demoConfig} />
          </ScrollReveal>
        )}
        
        {/* Price Trend Chart */}
        <ScrollGlassCard direction="left" delay={0.1} className="p-6" variant="hover">
          <h3 className="text-lg font-semibold text-white mb-6">Average Price per Year</h3>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data?.price_trend || []}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="year" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} tickFormatter={(v) => `$${v/1000}k`} />
                <Tooltip 
                  cursor={{fill: '#ffffff10'}} 
                  contentStyle={tooltipStyle}
                  itemStyle={{ color: "#ffffff" }}
                  formatter={(value: any) => [`$${value.toLocaleString()}`, "Avg Price"]}
                />
                <Bar dataKey="avg_price" fill="var(--color-chart-1)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ScrollGlassCard>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Engine Distribution */}
          <ScrollGlassCard direction="left" delay={0.2} className="p-6" variant="hover">
            <div className="flex items-center gap-3 mb-6">
              <Fuel className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-white">Engine Type Distribution</h3>
            </div>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data?.engine_distribution || []}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={4}
                    dataKey="value"
                    label={({ name, percent }) => `${name ?? 'Unknown'} (${((percent ?? 0) * 100).toFixed(0)}%)`}
                    labelLine={false}
                  >
                    {(data?.engine_distribution || []).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={`var(--color-chart-${(index % 7) + 1})`} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={tooltipStyle}
                    itemStyle={{ color: "#ffffff" }}
                    formatter={(value: any) => [`${value} cars`, 'Count']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </ScrollGlassCard>

          {/* Status Distribution */}
          <ScrollGlassCard direction="right" delay={0.3} className="p-6" variant="hover">
            <div className="flex items-center gap-3 mb-6">
              <Car className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-white">Inventory Status</h3>
            </div>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data?.status_distribution || []}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {(data?.status_distribution || []).map((_, index) => (
                      <Cell key={`cell-${index}`} fill={`var(--color-chart-${(index % 7) + 1})`} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={tooltipStyle}
                    itemStyle={{ color: "#ffffff" }}
                    formatter={(value: any, name: any) => [`${value} cars`, name]}
                  />
                  <Legend iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </ScrollGlassCard>
        </div>

        {/* Price by Engine Type */}
        <ScrollGlassCard direction="left" delay={0.4} className="p-6" variant="hover">
          <div className="flex items-center gap-3 mb-6">
            <Palette className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-white">Average Price by Engine Type</h3>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data?.price_by_engine || []} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis type="number" stroke="#9ca3af" fontSize={12} tickFormatter={(v) => `$${v/1000}k`} />
                <YAxis type="category" dataKey="engine" stroke="#9ca3af" fontSize={12} width={80} />
                <Tooltip 
                  cursor={{fill: '#ffffff10'}} 
                  contentStyle={tooltipStyle} 
                  itemStyle={{ color: "#ffffff" }}
                  formatter={(value: any) => [`$${value.toLocaleString()}`, "Avg Price"]}
                />
                <Bar dataKey="avg_price" fill="var(--color-chart-3)" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ScrollGlassCard>

        {/* Color Distribution */}
        <ScrollGlassCard direction="right" delay={0.5} className="p-6" variant="hover">
          <div className="flex items-center gap-3 mb-6">
            <Palette className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-white">Color Distribution</h3>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data?.color_distribution || []}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip 
                  cursor={{fill: '#ffffff10'}} 
                  contentStyle={tooltipStyle} 
                  itemStyle={{ color: "#ffffff" }}
                  formatter={(value: any) => [`${value} cars`, 'Count']}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {(data?.color_distribution || []).map((_, index) => (
                    <Cell key={`cell-${index}`} fill={`var(--color-chart-${(index % 7) + 1})`} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ScrollGlassCard>
      </div>
    </Layout>
  );
}

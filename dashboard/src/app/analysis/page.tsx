'use client';

import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { GlassCard } from "@/components/ui/GlassCard";
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
  price_trend: { year: string; avg_price: number }[];
  engine_distribution: { name: string; value: number; color: string }[];
  status_distribution: { name: string; value: number; percentage: number }[];
  color_distribution: { name: string; value: number }[];
  price_by_engine: { engine: string; avg_price: number }[];
}

const STATUS_COLORS = ["#a6e3a1", "#f9e2af", "#f5c2e7"];
const COLOR_PALETTE = ["#cdd6f4", "#313244", "#f38ba8", "#89b4fa", "#6c7086", "#bac2de", "#a6e3a1"];

export default function AnalysisPage() {
  const [data, setData] = useState<AnalysisData | null>(null);
  const [demoConfig, setDemoConfig] = useState<ChartConfig | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const basePath = getBasePath();
    
    // Fetch existing JSON data
    const fetchData = fetch(`${basePath}/data/analysis/analysis_summary.json`)
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error("Failed to load generic analysis:", err));
      
    // Fetch new TOML demo data
    const fetchDemo = fetchToml(`${basePath}/data/analysis/demo_chart.toml`)
      .then((config: any) => setDemoConfig(config as ChartConfig))
      .catch((err: any) => console.warn("Demo chart not found:", err));

    Promise.all([fetchData, fetchDemo])
      .finally(() => setLoading(false));
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
                  contentStyle={{ backgroundColor: "#1e1e2e", borderRadius: "12px", border: "none" }} 
                  formatter={(value: any) => [`$${value.toLocaleString()}`, "Avg Price"]}
                />
                <Bar dataKey="avg_price" fill="#f5c2e7" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ScrollGlassCard>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Engine Distribution */}
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
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#1e1e2e", borderRadius: "12px", border: "none", color: "#f3f4f6" }}
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
                      <Cell key={`cell-${index}`} fill={STATUS_COLORS[index % STATUS_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#1e1e2e", borderRadius: "12px", border: "none", color: "#f3f4f6" }}
                    formatter={(value: any, name: any) => [`${value} cars`, name]}
                  />
                  <Legend iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </ScrollGlassCard>
        </div>

        {/* Price by Engine Type */}
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
                  contentStyle={{ backgroundColor: "#1e1e2e", borderRadius: "12px", border: "none", color: "#f3f4f6" }} 
                  formatter={(value: any) => [`$${value.toLocaleString()}`, "Avg Price"]}
                />
                <Bar dataKey="avg_price" fill="#89b4fa" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ScrollGlassCard>

        {/* Color Distribution */}
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
                  contentStyle={{ backgroundColor: "#1e1e2e", borderRadius: "12px", border: "none", color: "#f3f4f6" }} 
                  formatter={(value: any) => [`${value} cars`, 'Count']}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {(data?.color_distribution || []).map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLOR_PALETTE[index % COLOR_PALETTE.length]} />
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

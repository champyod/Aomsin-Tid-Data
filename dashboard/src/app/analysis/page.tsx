'use client';

import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { GlassCard } from "@/components/ui/GlassCard";
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const basePath = getBasePath();
    fetch(`${basePath}/data/analysis/analysis_summary.json`)
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error(err))
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
      <div className="space-y-6 animate-in fade-in duration-500">
        <h2 className="text-2xl font-bold text-white">Detailed Analysis</h2>
        
        {/* Price Trend Chart */}
        <GlassCard className="p-6" variant="hover">
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
        </GlassCard>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Engine Distribution */}
          <GlassCard className="p-6" variant="hover">
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
                    label={({ name, percent }) => `${name} (${((percent ?? 0) * 100).toFixed(0)}%)`}
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
          </GlassCard>

          {/* Status Distribution */}
          <GlassCard className="p-6" variant="hover">
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
          </GlassCard>
        </div>

        {/* Price by Engine Type */}
        <GlassCard className="p-6" variant="hover">
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
        </GlassCard>

        {/* Color Distribution */}
        <GlassCard className="p-6" variant="hover">
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
        </GlassCard>
      </div>
    </Layout>
  );
}

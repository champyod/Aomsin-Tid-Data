'use client';

import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { StatCard } from "@/components/StatCard";
import { GlassCard } from "@/components/ui/GlassCard";
import {
  LineChart,
  Line,
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
import { Activity, Database, Brain } from "lucide-react";

interface AnalysisData {
  total_records: number;
  average_price: number;
  total_stock: number;
  brand_distribution: { name: string; value: number }[];
  price_trend: { year: string; avg_price: number }[];
}

interface ModelData {
  model_name: string;
  accuracy: number;
  r2_score: number;
  feature_importance: { feature: string; importance: number }[];
}

const COLORS = [
  "#f5c2e7", // Pink
  "#cba6f7", // Mauve
  "#89b4fa", // Blue
  "#a6e3a1", // Green
  "#fab387", // Peach
  "#f9e2af", // Yellow
  "#eba0ac", // Maroon
];

import { getBasePath } from "@/utils/basePath";

export default function Home() {
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [modelData, setModelData] = useState<ModelData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const basePath = getBasePath();
        const [analysisRes, modelRes] = await Promise.all([
          fetch(`${basePath}/data/analysis/analysis_summary.json`),
          fetch(`${basePath}/data/modeling/model_metrics.json`),
        ]);

        if (analysisRes.ok) setAnalysisData(await analysisRes.json());
        if (modelRes.ok) setModelData(await modelRes.json());
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
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

  return (
    <Layout>
      <div className="space-y-8 animate-in fade-in duration-700">
        
        {/* Project Intro Section */}
        <GlassCard className="p-8" variant="hover">
            <h2 className="text-2xl font-bold text-white mb-2">Welcome to Aomsin Tid Data Dashboard</h2>
            <p className="text-gray-300 leading-relaxed font-light">
                This project provides comprehensive intelligence on the automotive market, analyzing trends, pricing models, and inventory distribution.
                Leveraging the <strong>Cleaned Cars Dateset</strong> (sourced from <code>/data/cleaned/Cars_cleaned.csv</code>), we employ 
                machine learning models to predict market values and identify key economic indicators.
            </p>
        </GlassCard>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            label="Total Cars Tracked"
            value={analysisData?.total_records?.toLocaleString() || "0"}
            icon={Database}
            trend={{ value: 5, isPositive: true }}
          />
          <StatCard
            label="Prediction Accuracy"
            value={`${((modelData?.accuracy || 0) * 100).toFixed(1)}%`}
            icon={Brain}
            trend={{ value: 1.2, isPositive: true }}
          />
          <StatCard
            label="Market Average Price"
            value={`$${analysisData?.average_price?.toLocaleString(undefined, { maximumFractionDigits: 0 }) || "0"}`}
            icon={Activity}
          />
          <StatCard
            label="Available Stock"
            value={analysisData?.total_stock?.toLocaleString() || "0"}
            icon={Database}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <GlassCard className="p-6" variant="hover">
            <h3 className="text-lg font-semibold text-white mb-6">Price Trend (Yearly)</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analysisData?.price_trend || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                  <XAxis dataKey="year" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val/1000}k`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#18181b", border: "1px solid #ffffff20", borderRadius: "8px" }}
                    itemStyle={{ color: "#fff" }}
                    formatter={(value: any) => [
                      typeof value === "number" ? `$${value.toLocaleString()}` : value,
                      "Avg Price"
                    ]}
                  />
                  <Line type="monotone" dataKey="avg_price" stroke="#3b82f6" strokeWidth={3} dot={false} activeDot={{ r: 8, fill: "#3b82f6" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          <GlassCard className="p-6" variant="hover">
            <h3 className="text-lg font-semibold text-white mb-6">Brand Distribution</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={analysisData?.brand_distribution || []}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {(analysisData?.brand_distribution || []).map((_: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="rgba(0,0,0,0.2)" />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: "#18181b", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)" }} />
                  <Legend iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </div>
      </div>
    </Layout>
  );
}

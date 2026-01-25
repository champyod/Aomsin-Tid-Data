'use client';

import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { StatCard } from "@/components/StatCard";
import { GlassCard } from "@/components/ui/GlassCard";
import { ScrollGlassCard } from "@/components/ui/ScrollGlassCard";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/ScrollReveal";
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
import { getBasePath } from "@/utils/basePath";
import { fetchToml } from "@/utils/tomlLoader";

interface ProjectInfo {
  title: string;
  description: string;
  dataset_name: string;
  dataset_source_link: string;
}

interface AnalysisData {
  metrics: {
    total_revenue: number;
    total_units: number;
    average_price: number;
    top_performing_region: string;
  };
  project_info: ProjectInfo;
  brand_distribution: { name: string; value: number }[];
  price_trend: { year: string; avg_price: number }[];
  engine_distribution?: { name: string; value: number }[]; // Optional as it might come from demo or real
}

interface ModelData {
  model_name: string;
  accuracy: number;
  r2_score: number;
}

export default function Home() {
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [modelData, setModelData] = useState<ModelData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const basePath = getBasePath();
        
        // Strategy: Try Real -> Fallback to Null (handled by UI) or Demo if specific file exists
        // For analysis_summary, if it fails, we might just show empty state, as there isn't a "demo_summary.toml" unless I create one.
        // The user said "if there is any file in same dir that mean it is real data so overwrite this demo data".
        // This implies we should load Demo first, then overlay Real.
        
        // 1. Fetch Real Data
        const [analysisRes, modelRes] = await Promise.allSettled([
          fetchToml(`${basePath}/data/analysis/analysis_summary.toml`),
          fetchToml(`${basePath}/data/modeling/model_metrics.toml`),
        ]);

        if (analysisRes.status === 'fulfilled' && analysisRes.value) {
           setAnalysisData(analysisRes.value as unknown as AnalysisData);
        } else {
           console.warn("Analysis data missing, dashboard might be empty.");
           // Potential fallback: Load a static demo config if we had one for the whole dashboard.
        }

        if (modelRes.status === 'fulfilled' && modelRes.value) {
           setModelData(modelRes.value as unknown as ModelData);
        }
        
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

  const { project_info, metrics } = analysisData || {};

  return (
    <Layout>
      <div className="space-y-8">
        
        {/* Project Intro Section */}
        <ScrollGlassCard direction="none" className="p-8" variant="hover">
              <h2 className="text-2xl font-bold text-white mb-2">{project_info?.title || "Aomsin Tid Data Dashboard"}</h2>
              <p className="text-gray-300 leading-relaxed font-light">
                  {project_info?.description || "Welcome to the dashboard. No analysis data found. Run the notebooks to generate insights."}
                  {project_info?.dataset_source_link && (
                    <>
                      {" "}Leveraging the <strong><a href={project_info.dataset_source_link} target="_blank" className="text-primary hover:underline">{project_info.dataset_name}</a></strong>.
                    </>
                  )}
              </p>
        </ScrollGlassCard>

        {/* Stats Grid with Stagger Animation */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StaggerItem>
            <StatCard
              label="Total Units Sold"
              value={metrics?.total_units?.toLocaleString() || "0"}
              icon={Database}
              trend={{ value: 5, isPositive: true }}
            />
          </StaggerItem>
          <StaggerItem>
            <StatCard
              label="Prediction Accuracy"
              value={`${((modelData?.accuracy || 0) * 100).toFixed(1)}%`}
              icon={Brain}
              trend={{ value: 1.2, isPositive: true }}
            />
          </StaggerItem>
          <StaggerItem>
            <StatCard
              label="Average Price"
              value={`$${metrics?.average_price?.toLocaleString(undefined, { maximumFractionDigits: 0 }) || "0"}`}
              icon={Activity}
            />
          </StaggerItem>
          <StaggerItem>
            <StatCard
              label="Top Region"
              value={metrics?.top_performing_region || "-"}
              icon={Activity}
            />
          </StaggerItem>
        </StaggerContainer>

        {/* Charts with alternating scroll directions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ScrollGlassCard direction="left" delay={0.1} className="p-6" variant="hover">
              <h3 className="text-lg font-semibold text-white mb-6">Price Trend (Yearly)</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={analysisData?.price_trend || []}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                    <XAxis dataKey="year" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val/1000}k`} />
                    <Tooltip
                    contentStyle={{ 
                      backgroundColor: "#000000", 
                      color: "#ffffff",
                      borderRadius: "12px", 
                      border: "1px solid #333333",
                      boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.8)" 
                    }}
                    itemStyle={{ color: "#ffffff" }}
                    labelStyle={{ color: "#a1a1aa" }}
                    formatter={(value: any) => [
                        typeof value === "number" ? `$${value.toLocaleString()}` : value,
                        "Avg Price"
                      ]}
                    />
                    <Line type="monotone" dataKey="avg_price" stroke="var(--color-primary)" strokeWidth={3} dot={false} activeDot={{ r: 8, fill: "var(--color-primary)" }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
          </ScrollGlassCard>

          <ScrollGlassCard direction="right" delay={0.2} className="p-6" variant="hover">
              <h3 className="text-lg font-semibold text-white mb-6">Engine Type Distribution</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={analysisData?.engine_distribution || []}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={100}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {(analysisData?.engine_distribution || []).map((_: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={`var(--color-chart-${(index % 7) + 1})`} stroke="rgba(0,0,0,0.5)" />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "#000000", 
                        borderRadius: "12px", 
                        border: "1px solid #333333", 
                        color: "#ffffff" 
                      }} 
                      itemStyle={{ color: "#ffffff" }}
                    />
                    <Legend iconType="circle" />
                  </PieChart>
                </ResponsiveContainer>
              </div>
          </ScrollGlassCard>
        </div>
      </div>
    </Layout>
  );
}

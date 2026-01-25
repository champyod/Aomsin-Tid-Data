'use client';

import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { StatCard } from "@/components/StatCard";
import { ScrollGlassCard } from "@/components/ui/ScrollGlassCard";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/ScrollReveal";
import { Activity, Database, Brain } from "lucide-react";
import { getBasePath } from "@/utils/basePath";
import { fetchToml } from "@/utils/tomlLoader";
import { UniversalChart, ChartConfig } from "@/components/UniversalChart";

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
}

interface ModelData {
  model_name: string;
  accuracy: number;
  r2_score: number;
}

export default function Home() {
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [modelData, setModelData] = useState<ModelData | null>(null);
  const [charts, setCharts] = useState<ChartConfig[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const basePath = getBasePath();
        
        // 1. Fetch Metrics (Real) - Analysis Summary & Model Metrics
        const [analysisRes, modelRes] = await Promise.allSettled([
          fetchToml(`${basePath}/data/analysis/analysis_summary.toml`),
          fetchToml(`${basePath}/data/modeling/model_metrics.toml`),
        ]);

        if (analysisRes.status === 'fulfilled' && analysisRes.value) {
           setAnalysisData(analysisRes.value as unknown as AnalysisData);
        }

        if (modelRes.status === 'fulfilled' && modelRes.value) {
           setModelData(modelRes.value as unknown as ModelData);
        }

        // 2. Fetch Charts (Real -> Fallback to Demo)
        const realCharts = await fetchToml(`${basePath}/data/analysis/overview_charts.toml`);
        if (realCharts && (realCharts as any).charts) {
            setCharts((realCharts as any).charts as ChartConfig[]);
        } else {
            console.warn("Real overview charts missing. Loading Demo.");
            const demoCharts = await fetchToml(`${basePath}/data/analysis/demo_overview_charts.toml`);
            if (demoCharts && (demoCharts as any).charts) {
                setCharts((demoCharts as any).charts as ChartConfig[]);
            }
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

        {/* Stats Grid */}
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

        {/* Dynamic Charts Grid */}
        {charts.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {charts.map((config, index) => (
              <ScrollReveal 
                key={index} 
                direction={index % 2 === 0 ? "left" : "right"} 
                delay={0.1 * (index + 1)}
                className="col-span-1" // Assume 2-col grid, let UniversalChart handle sizing info if passed, or standard 50%
              >
                  <UniversalChart config={config} />
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

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
    total_revenue?: number;
    total_inventory_value?: number;
    total_units: number;
    average_price: number;
    top_performing_region?: string;
    top_manufacturer?: string;
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
      const basePath = getBasePath();
      try {
        setLoading(true);

        // Fetch manifest.json to get list of TOML files
        const res = await fetch(`${basePath}/data/general/manifest.json`);
        if (!res.ok) {
          console.warn("No manifest.json found for general data");
          setCharts([]);
          setLoading(false);
          return;
        }

        const { files } = await res.json();

        if (!files || files.length === 0) {
          console.warn("No general/overview files found.");
          setCharts([]);
          return;
        }

        // Load each TOML file
        const loadedCharts: ChartConfig[] = [];

        for (const file of files) {
          try {
            const config = file.data || await fetchToml(`${basePath}${file.path}`);

            if (config) {
              // Check if it contains metrics (for stat cards)
              if ((config as any).metrics) {
                setAnalysisData(config as unknown as AnalysisData);
              }

              // Check if it's model data
              if ((config as any).model_name) {
                setModelData(config as unknown as ModelData);
              }

              // Check if it's a wrapper { charts: [...] }
              if ((config as any).charts) {
                loadedCharts.push(...(config as any).charts);
              }
              // Single chart config (has type field)
              else if ((config as any).type && (config as any).data) {
                loadedCharts.push(config as unknown as ChartConfig);
              }
            }
          } catch (e) {
            console.error(`Failed to load ${file.name}:`, e);
          }
        }

        // Sort by order field (ascending)
        loadedCharts.sort((a, b) => ((a as any).order || 0) - ((b as any).order || 0));
        setCharts(loadedCharts);

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
  const topCategory = metrics?.top_performing_region || metrics?.top_manufacturer || "N/A";

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

        {/* Stats Grid - Only show if data is available */}
        {metrics && (
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StaggerItem>
              <StatCard
                label="Total Units Sold"
                value={metrics.total_units?.toLocaleString() || "N/A"}
                icon={Database}
                trend={{ value: 5, isPositive: true }}
              />
            </StaggerItem>
            <StaggerItem>
              <StatCard
                label="Prediction Accuracy"
                value={modelData ? `${(modelData.accuracy * 100).toFixed(1)}%` : "N/A"}
                icon={Brain}
                trend={{ value: 1.2, isPositive: true }}
              />
            </StaggerItem>
            <StaggerItem>
              <StatCard
                label="Average Price"
                value={`$${metrics.average_price?.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
                icon={Activity}
              />
            </StaggerItem>
            <StaggerItem>
              <StatCard
                label="Top Region"
                value={topCategory}
                icon={Activity}
              />
            </StaggerItem>
          </StaggerContainer>
        )}

        {/* Dynamic Charts Grid */}
        {charts.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {charts.map((config, index) => (
              <ScrollReveal
                key={index}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={0.1 * (index + 1)}
                className={config.size === 'full' ? "lg:col-span-2" : ""}
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
